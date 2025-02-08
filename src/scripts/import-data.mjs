import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Environment Variables Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Validate Required Environment Variables
const requiredEnvVars = [
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "SANITY_API_TOKEN"
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`❌ ERROR: Missing environment variable: ${envVar}`);
    process.exit(1);
  }
});

// Sanity Client Setup
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-01-15',
  useCdn: false, // Set false for fresh data
});

// Function to Upload Image to Sanity
async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`📤 Uploading Image: ${imageUrl}`);
    
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);

    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop(),
    });

    console.log(`✅ Image Uploaded: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`❌ Failed to Upload Image: ${imageUrl}`, error.message);
    return null;
  }
}

// Function to Import Data from API
async function importData() {
  try {
    console.log('🔄 Fetching Product Data From API...');

    const response = await axios.get("https://template-0-beta.vercel.app/api/product", {
      timeout: 10000, // 10 seconds timeout
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log('📥 API Response Status:', response.status);
    console.log('📊 API Response Data:', JSON.stringify(response.data, null, 2));

    const products = response.data;

    if (!Array.isArray(products)) {
      throw new Error('❌ Error: API Response is not an array.');
    }

    for (const item of products) {
      console.log(`🔹 Processing: ${item.name}`);

      let imageRef = null;
      if (item.imagePath && typeof item.imagePath === 'string') {
        imageRef = await uploadImageToSanity(item.imagePath);
      }

      const sanityItem = {
        _type: 'product',
        name: item.name,
        category: item.category || 'Uncategorized',
        price: isNaN(parseFloat(item.price)) ? 0 : parseFloat(item.price),
        description: item.description || '',
        discountPercentage: item.discountPercentage || 0,
        stockLevel: item.stockLevel || 0,
        isFeaturedProduct: item.isFeaturedProduct || false,
        image: imageRef
          ? {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageRef,
              },
            }
          : undefined,
      };

      console.log(`🚀 Uploading ${sanityItem.category} - ${sanityItem.name} to Sanity!`);
      const result = await client.create(sanityItem);
      console.log(`✅ Uploaded Successfully: ${result._id}`);
      console.log("----------------------------------------------------------\n\n");
    }

    console.log('🎉 Data Import Completed Successfully!');
  } catch (error) {
    console.error('❌ Error Importing Data:', error.message);
  }
}

// Run Import Function
importData();

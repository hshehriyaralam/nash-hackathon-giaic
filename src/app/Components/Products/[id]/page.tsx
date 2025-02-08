"use client";

import { useEffect, useState } from "react";
import sanityClient from "@sanity/client";
import { useParams } from "next/navigation";
import star_icon from './star_icon.png';
import star_dull_icon from './star_dull_icon.png';
import Header from "../../Header/Header";
import { useCart } from "@/Context/CartContext"; // Import the useCart hook
import Image from "next/image"; // Use Next.js Image for optimized images

// Sanity Client Configuration
const sanity = sanityClient({
  projectId: "w5mc1npj",
  dataset: "production",
  apiVersion: "2025-01-14",
  useCdn: true,
});

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  discountPercentage: number;
  imageUrl: string;
  category: string;
  stockLevel: number;
  quantity: number;  // Add quantity property
  rating: number; // Assuming there's a rating field to handle
}

const ProductDetails = () => {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);

  const { addToCart } = useCart(); // Destructure the addToCart function from useCart

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const query = `*[_type == "product" && _id == $id]{
            _id,
            name,
            price,
            description,
            discountPercentage,
            "imageUrl": image.asset->url,
            category,
            stockLevel,
            rating
          }[0]`;
          const data = await sanity.fetch(query, { id });
          setProduct({ ...data, quantity: 1 });  // Add quantity to the fetched product
        } catch (error) {
          console.error("Error Fetching Product:", error);
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product); // Now `product` includes `quantity`
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
      <>
        {Array(fullStars).fill(null).map((_, index) => (
          <Image src={star_icon.src} alt="star" width={16} height={16} key={`full-star-${index}`} />
        ))}
        {Array(emptyStars).fill(null).map((_, index) => (
          <Image src={star_dull_icon.src} alt="star" width={16} height={16} key={`empty-star-${index}`} />
        ))}
      </>
    );
  };

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="bg-white">
      <Header />
      <div className="flex flex-col md:flex-row px-4 md:px-20 items-center min-h-screen bg-white w-full">
        <div className="flex flex-col md:flex-row bg-white p-6 shadow-lg rounded-lg w-full max-w-6xl">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="flex flex-row md:flex-col gap-2">
              <Image
                className="h-[90px] w-[90px] md:h-[90px] md:w-[180px]"
                src={product.imageUrl}
                alt={product.name || "Product image"}
                width={180}
                height={90}
              />
              <Image
                className="h-[90px] w-[90px] md:h-[90px] md:w-[180px]"
                src={product.imageUrl}
                alt={product.name || "Product image"}
                width={180}
                height={90}
              />
              <Image
                className="h-[90px] w-[90px] md:h-[90px] md:w-[180px]"
                src={product.imageUrl}
                alt={product.name || "Product image"}
                width={180}
                height={90}
              />
              <Image
                className="h-[90px] w-[90px] md:h-[90px] md:w-[180px]"
                src={product.imageUrl}
                alt={product.name || "Product image"}
                width={180}
                height={90}
              />
            </div>
            <div>
              <Image
                className="w-full h-auto md:w-[500px] md:h-[410px]"
                src={product.imageUrl}
                alt={product.name || "Product image"}
                width={500}
                height={410}
              />
            </div>
          </div>
          <div className="md:ml-8 flex flex-col mt-4">
            <h1 className="text-[#4d4d4d] text-2xl md:text-[30px] font-bold mt-4 md:mt-10">{product.name}</h1>
            <div className="flex items-center mt-1 gap-2 text-[#2c2c2c] text-sm">
              {renderStars(product.rating)}  {/* Render stars based on rating */}
              <p className="text-sm font-bold text-black">({122})</p> {/* Assuming the count is static */}
            </div>
            <div className="flex gap-6 my-2 items-center text-lg font-bold">
              <div className="text-[#ff4141] text-xl md:text-[25px] font-bold my-2">${product.price}</div>
              <div className="text-orange-500">{product.discountPercentage}% Off</div>
            </div>
            <p className="text-black text-sm md:text-[16px] font-normal">{product.description}</p>
            <button 
              className="mt-4 px-4 py-2 w-full md:w-[130px] text-white bg-red-500 text-sm font-semibold border-none outline-none"
              onClick={handleAddToCart} // Add the onClick handler
            >
              ADD TO CART
            </button>
            <div className="mt-4">
              <p className="text-medium text-sm md:text-[15px] mt-2 text-orange-500 font-bold">
                <span className="font-bold text-black">Category :</span> {product.category}
              </p>
              <p className="text-medium text-sm md:text-[15px] text-orange-500 font-bold">
                <span className="font-bold text-black">Stock Level :</span> {product.stockLevel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
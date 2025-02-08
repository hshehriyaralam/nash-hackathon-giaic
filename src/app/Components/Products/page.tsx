"use client";
import { useEffect, useState } from "react";
import sanityClient from "@sanity/client";
import Image from "next/image";
import Link from "next/link";

// Sanity Client Configuration
const sanity = sanityClient({
  projectId: "w5mc1npj",
  dataset: "production",
  apiVersion: "2025-01-14",
  useCdn: false,
});

// Product Interface
interface Product {
  imageUrl: string;
  _id: string;
  name: string;
  price: number;
  discountPercentage: number;
  category: string;
  stockLevel: number;
}

const ProductCards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([100, 990]);
  const [discountRange, setDiscountRange] = useState([0, 25]);
  const [stockLevelFilter, setStockLevelFilter] = useState(5);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Fetch Products from Sanity
  const fetchProducts = async () => {
    try {
      const query = `
        *[_type == "product"]{
          _id,
          name,
          price,
          discountPercentage,
          category,
          stockLevel,
          "imageUrl": image.asset->url
        }
      `;
      const data = await sanity.fetch(query);
      if (data.length === 0) {
        setShowErrorModal(true);
      } else {
        setProducts(data);
        setFilteredProducts(data);
      }
    } catch (error) {
      console.error("Error Fetching Products:", error);
      setShowErrorModal(true);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search term and other filters
  useEffect(() => {
    const filtered = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        product.discountPercentage >= discountRange[0] &&
        product.discountPercentage <= discountRange[1] &&
        product.stockLevel >= stockLevelFilter
      );
    });
    setFilteredProducts(filtered);
  }, [searchTerm, priceRange, discountRange, stockLevelFilter, products]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-red-600">Error</h2>
            <p className="mt-2 text-gray-700">Failed to fetch products. Please try again later.</p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Name"
          className="p-2 border border-gray-400 rounded-md text-gray-800 outline-none bg-white w-60"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Price Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700">Price</label>
          <input
            type="range"
            min="100"
            max="990"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="w-40"
          />
          <span className="text-gray-500">{priceRange[0]} - {priceRange[1]}</span>
        </div>

        {/* Discount Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700">Discount</label>
          <input
            type="range"
            min="0"
            max="25"
            value={discountRange[0]}
            onChange={(e) => setDiscountRange([+e.target.value, discountRange[1]])}
            className="w-40"
          />
          <span className="text-gray-500">{discountRange[0]}% - {discountRange[1]}%</span>
        </div>

        {/* Stock Level Filter */}
        <div className="flex flex-col mb-6">
          <label className="text-sm font-semibold text-gray-700">Stock</label>
          <input
            type="number"
            min="0"
            max="100"
            value={stockLevelFilter}
            onChange={(e) => setStockLevelFilter(+e.target.value)}
            className="p-1 border rounded-md w-20 text-gray-800"
          />
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto w-full max-w-6xl">
        {filteredProducts.map((product) => (
          <Link key={product._id} href={`/Components/Products/${product._id}`} passHref>
            <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              {/* Product Image */}
              {product.imageUrl ? (
                <div className="relative h-40 w-full">
                  <Image
                    src={product.imageUrl}
                    alt={product.name || "Product image"}
                    layout="fill"
                    className="rounded-md"
                  />
                </div>
              ) : (
                <div className="relative h-40 w-full flex items-center justify-center bg-gray-200 text-gray-500">
                  No Image Available
                </div>
              )}

              {/* Product Details */}
              <div className="mt-4">
                <h2 className="text-md font-semibold text-gray-900">{product.name}</h2>
                <div className="mt-3">
                  <p className="text-lg font-bold text-[#ff4141]">${product.price}</p>
                  <p className="text-sm font-semibold text-gray-500">Discount: <span className="text-cyan-600">{product.discountPercentage}%</span></p>
                  <p className="text-sm font-semibold text-gray-500">Stock Level: <span className="text-indigo-500">{product.stockLevel}</span></p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCards;
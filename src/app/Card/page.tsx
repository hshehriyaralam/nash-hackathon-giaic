"use client";
import Image from "next/image"; // Import the next/image component for optimized images
import remove_icon from "./cart_cross_icon.png";

import Header from "../Components/Header/Header";
import { useCart } from "../../Context/CartContext";

const CartPage = () => {
  const { cartItems, calculateTotal, removeFromCart } = useCart();

  return (
    <div className="bg-white text-black">
      <Header />
      <div className="mx-4 md:mx-24 my-6 md:my-12">
        {/* Grid Headers */}
        <div className="hidden md:grid grid-cols-6 gap-10 items-center py-5 text-gray-600 text-lg font-semibold">
          <p>Product</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr className="my-4 border-2" />

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <p>No items in the cart</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item._id} className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-10 items-center py-5">
                {/* Product Image */}
                <div className="col-span-1">
                  <Image
                    src={item.imageUrl}
                    className="h-24 w-24"
                    alt={item.name}
                    width={96}
                    height={96}
                    objectFit="cover"
                  />
                </div>

                {/* Product Name */}
                <p className="col-span-1 md:col-span-1 text-sm md:text-base">{item.name}</p>

                {/* Price */}
                <p className="col-span-1 md:col-span-1 text-sm md:text-base">${item.price}</p>

                {/* Quantity */}
                <button className="col-span-1 md:col-span-1 w-12 h-10 border-2 border-gray-200 bg-white text-sm md:text-base">
                  {item.quantity}
                </button>

                {/* Total */}
                <p className="col-span-1 md:col-span-1 text-sm md:text-base">${item.price * item.quantity}</p>

                {/* Remove Icon */}
                <div className="col-span-1 md:col-span-1">
                  <Image
                    className="w-4 cursor-pointer"
                    src={remove_icon}
                    onClick={() => removeFromCart(item._id)}
                    alt="Remove"
                    width={16}
                    height={16}
                  />
                </div>

                {/* Horizontal Line */}
                <hr className="col-span-2 md:col-span-6 my-4" />
              </div>
            ))}
          </div>
        )}

        {/* Cart Totals */}
        <div className="flex flex-col md:flex-row mt-5">
          <div className="flex flex-col w-full md:w-96">
            <h1 className="text-2xl font-semibold">Cart Totals</h1>
            <div>
              <div className="flex justify-between py-3">
                <p>Subtotal</p>
                <p>${calculateTotal().toFixed(2)}</p>
              </div>
              <hr />
              <div className="flex justify-between py-3">
                <p>Shipping</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="flex justify-between py-3">
                <h3 className="font-semibold">Total</h3>
                <h3 className="font-semibold text-xl">${calculateTotal().toFixed(2)}</h3>
              </div>
              <hr />
            </div>
            <button className="w-full md:w-64 h-12 mt-4 bg-red-500 text-white text-lg font-semibold cursor-pointer">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
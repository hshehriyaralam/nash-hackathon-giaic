'use client'
import Link from "next/link";
import { useState } from "react";
import cart_icon from './cart_icon.png'
import Image from "next/image"; 
import logo from './logo.png'
import { useCart } from "@/Context/CartContext"; 

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useCart();

  return (
    <header className="bg-white text-black shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Image src={logo.src} alt="logo" width={50} height={50} />
          <p className="text-gray-700 text-2xl font-semibold">C A R T Z Y</p>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="lg:hidden text-black focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Navigation Links */}
        <nav className={`lg:flex lg:space-x-6 absolute lg:static top-16 left-0 right-0 bg-white lg:bg-transparent shadow-lg lg:shadow-none transition-all duration-300 ease-in-out ${
          menuOpen ? "block" : "hidden"
        }`}>
          <ul className="flex flex-col lg:flex-row lg:items-center lg:gap-6 text-center p-4 lg:p-0">
            <li>
              <Link href="/" className="hover:text-blue-500 font-bold py-2 block">
                Home
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-blue-500 font-bold py-2 block">
                Products
              </Link>
            </li>
            <li>
              <Link href="/Signup" className="hover:text-blue-500 font-bold py-2 block">
                Signup
              </Link>
            </li>
            <li>
              <Link href="/Login" className="hover:text-blue-500 font-bold py-2 block">
                Login
              </Link>
            </li>
            <li className="relative">
              <Link href="/Card" className="hover:text-blue-500 font-bold flex items-center py-2 block">
                <Image src={cart_icon.src} alt="cart-icon" width={30} height={30} />
                {cartItems.length > 0 && (
                  <div className="absolute -top-2 left-5 w-5 h-5 flex justify-center items-center rounded-full bg-red-600 text-white text-xs p-2 font-medium">
                    {cartItems.length}
                  </div>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

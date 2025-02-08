import Image from "next/image"; // Next.js Image optimization
import footer_logo from "./logo.png";
import instagram_icon from "./instagram_icon.png";
import pintester_icon from "./pintester_icon.png";
import whatsapp_icon from "./whatsapp_icon.png";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-8 py-6 bg-gray-100">
      
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <Image src={footer_logo.src} alt="Footer Logo" width={50} height={50} />
        <p className="text-gray-700 text-2xl font-semibold">C A R T Z Y</p>
      </div>

      {/* Navigation Links */}
      <ul className="flex flex-wrap justify-center gap-6 text-black font-medium text-lg font-poppins">
        <li className="cursor-pointer hover:text-blue-800">Home</li>
        <li className="cursor-pointer hover:text-blue-800">Products</li>
        <li className="cursor-pointer hover:text-blue-800">Signup</li>
        <li className="cursor-pointer hover:text-blue-800">Login</li>
      </ul>

      {/* Social Media Icons */}
      <div className="flex gap-4">
        {[instagram_icon, pintester_icon, whatsapp_icon].map((icon, index) => (
          <div key={index} className="p-2 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-200 transition">
            <Image src={icon.src} alt="Social Icon" width={24} height={24} />
          </div>
        ))}
      </div>

      {/* Copyright Section */}
      <div className="w-full text-gray-600 text-sm text-center">
        <hr className="w-4/5 h-0.5 bg-gray-300 rounded-md mx-auto mb-3" />
        <p>© 2023 - All Rights Reserved.</p>
      </div>

    </footer>
  );
}

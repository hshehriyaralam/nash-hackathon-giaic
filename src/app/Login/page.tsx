import React from 'react';
import Link from 'next/link';
import Header from '../Components/Header/Header';

const Login = () => {
  return (
    <div>

      <Header />
    <div className="w-full min-h-screen bg-pink-100 text-black flex flex-col items-center">
      <div className="w-full max-w-md min-h-[460px] bg-white p-6 mt-8 rounded-lg shadow-md">
        <h1 className="mb-2 text-3xl font-semibold font-poppins text-center mt-4">Login</h1>
        <div className="flex flex-col gap-6 mt-5">
          <input
            type="email"
            placeholder="Email Address"
            className="h-11 w-full px-5 border border-gray-300 outline-none text-gray-600 text-lg rounded-md"
            />
          <input
            type="password"
            placeholder="Password"
            className="h-11 w-full px-5 border border-gray-300 outline-none text-gray-600 text-lg rounded-md"
            />
        </div>
        <button className="w-full h-14 text-white bg-red-500 mt-6 text-xl font-medium cursor-pointer rounded-md hover:bg-red-600 transition">
          Continue
        </button>
        <p className="mt-4 text-gray-600 text-base font-medium text-center">
          Don&apos;t have an account?
          <Link href={'/Signup'}>
            <span className="text-red-500 font-semibold cursor-pointer ml-1">Signup</span>
          </Link>
        </p>
        <div className="flex items-center mt-4 gap-3 text-gray-600 text-sm font-normal">
          <input type="checkbox" className="w-4 h-4" />
          <p>By continuing, I agree to the terms of use &amp; privacy policy</p>
        </div>
      </div>
    </div>
            </div>
  );
};

export default Login;

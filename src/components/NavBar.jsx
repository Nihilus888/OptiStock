import React from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';

export default function NavBar() {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <button className="text-white text-xl">
            <FaBars />
          </button>
          <span className="text-white font-bold text-2xl ml-2">Stock Portfolio</span>
        </div>
        
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search…" 
            className="bg-white rounded-full py-2 pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="text-gray-400" />
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button className="text-white">Home</button>
          <button className="text-white">About</button>
          <button className="text-white">Services</button>
          <button className="text-white">Contact</button>
          <button className="border border-white text-white py-2 px-4 rounded hover:bg-white hover:text-purple-600 transition">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
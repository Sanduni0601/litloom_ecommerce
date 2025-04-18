import React from 'react';
import {
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaBell,
  FaRegistered
} from 'react-icons/fa';

const Header = () => {
  return (
<>
      <div className="bg-cyan-900 text-white text-sm px-4 py-2 flex justify-between">
        <div className="flex gap-4">
          
        </div>
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><FaRegistered /> Register</span>
          <span className="flex items-center gap-1"><FaUser /> Login</span>
        </div>
      </div>

      <nav className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
        <div className="text-2xl font-bold text-red-900 flex items-center gap-2">
          <span role="img" aria-label="logo">📘</span> LimLoom
        </div>
        <ul className="hidden md:flex gap-10 text-gray-700 font-medium">
          <li className="cursor-pointer hover:text-cyan-600">Home</li>
          <li className="cursor-pointer hover:text-cyan-600">Category</li>
          <li className="cursor-pointer hover:text-cyan-600">Authors</li>
          <li className="cursor-pointer hover:text-cyan-600">Contact</li>
        </ul>
        <div className="flex items-center gap-4">
          <FaSearch className="text-gray-600 cursor-pointer" />
          <FaBell className="text-gray-600 cursor-pointer" />
          <FaHeart className="text-gray-600 cursor-pointer" />
          <FaShoppingCart className="text-gray-600 cursor-pointer" />
        </div>
      </nav>

      
    </>
  );
};

export default Header;
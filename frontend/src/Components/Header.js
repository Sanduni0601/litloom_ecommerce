import React, { useState, useEffect } from 'react';
import {
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaBell,
  FaRegistered,
  FaSignOutAlt
} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setIsLoggedIn(true);
    }
  }, []);

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleHomeClick = () => {
    navigate("/");
  };
  const handleAddBookClick = () => {
    navigate("/book");
  };
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUserData(null);
    navigate("/");
  };

  return (
    <>
      <div className="bg-cyan-900 text-white text-sm px-4 py-2 flex justify-between">
        <div className="flex gap-4">
        </div>
        <div className="flex gap-4">
          {isLoggedIn ? (
            <>
              <span className="flex items-center gap-1">Welcome, {userData?.fullName}</span>
              <span className="flex items-center gap-1 cursor-pointer hover:text-cyan-100" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-1 cursor-pointer hover:text-cyan-100" onClick={handleRegisterClick}>
                <FaRegistered /> Register
              </span>
              <span className="flex items-center gap-1 cursor-pointer hover:text-cyan-100" onClick={handleLoginClick}>
                <FaUser /> Login
              </span>
            </>
          )}
        </div>
      </div>

      <nav className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
        <div className="text-2xl font-bold text-red-900 flex items-center gap-2">
          <span role="img" aria-label="logo">📘</span> LimLoom
        </div>
        <ul className="hidden md:flex gap-10 text-gray-700 font-medium">
          <li className="cursor-pointer hover:text-cyan-600" onClick={handleHomeClick}>Home</li>
          <li className="cursor-pointer hover:text-cyan-600">Category</li>
          <li className="cursor-pointer hover:text-cyan-600">Authors</li>
          <li className="cursor-pointer hover:text-cyan-600">Contact</li>
          {isLoggedIn?(
            <li className="cursor-pointer hover:text-cyan-600" onClick={handleAddBookClick}>Add your product</li>
          ):(
            <li></li>
          )}
        </ul>
        <div className="flex items-center gap-4">
          <FaSearch className="text-gray-600 cursor-pointer" />
          <FaBell className="text-gray-600 cursor-pointer" />
          <FaHeart className="text-gray-600 cursor-pointer" />
          <FaShoppingCart onClick={handleCartClick}className="text-gray-600 cursor-pointer" />
        </div>
      </nav>
    </>
  );
};

export default Header;
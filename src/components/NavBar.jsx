import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the useAuth hook
import { toast } from 'react-toastify'; // Import toast for notifications

const NavBar = () => {
  const { user, logout } = useAuth(); // Get user and logout function from context
  const [logoutTimeout, setLogoutTimeout] = useState(null); // State to manage logout timeout
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  const handleLogout = () => {
    // Clear any existing timeout
    if (logoutTimeout) {
      clearTimeout(logoutTimeout);
    }

    // Set a timeout to log out the user
    const timeout = setTimeout(() => {
      localStorage.removeItem('token'); 
      localStorage.removeItem('user');
      localStorage.removeItem('username');
      logout(); 
    }, 2000); 

    // Show a toast notification before logging out
    toast.success('Logout successful! Redirecting...', {
      autoClose: 2000,
    });

    setLogoutTimeout(timeout);
  };

  const toggleMenu = () => setIsOpen(!isOpen); // Toggle mobile menu

  return (
    <nav className="bg-black p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          OptiStock
        </Link>

        {/* Hamburger Menu */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <svg 
            className="w-8 h-8" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          {!user && (
            <>
              <Link to="/" className="text-white px-3 py-2 hover:text-blue-400 transition duration-300 transform hover:-translate-y-1">Home</Link>
              <Link to="/about" className="text-white px-3 py-2 hover:text-blue-400 transition duration-300 transform hover:-translate-y-1">About</Link>
              <Link to="/contact" className="text-white px-3 py-2 hover:text-blue-400 transition duration-300 transform hover:-translate-y-1">Contact</Link>
              <Link to="/create-account" className="text-white px-3 py-2 hover:text-blue-400 transition duration-300 transform hover:-translate-y-1">Create</Link>
            </>
          )}

          {user ? (
            <>
              <Link to="/price" className="text-white px-3 py-2 hover:text-blue-400 transition duration-300 transform hover:-translate-y-1">Price</Link>
              <Link to="/stats" className="text-white px-3 py-2 hover:text-blue-400 transition duration-300 transform hover:-translate-y-1">Stats</Link>
              <Link to="/news" className="text-white px-3 py-2 hover:text-blue-400 transition duration-300 transform hover:-translate-y-1">News</Link>
              <Link to="/dashboard" className="text-white px-3 py-2 hover:text-blue-400 transition duration-300 transform hover:-translate-y-1">Dashboard</Link>
              <Link to="/portfolio-analysis" className="text-white px-3 py-2 hover:text-blue-400 transition duration-300 transform hover:-translate-y-1">Portfolio</Link>
              <Link to="/company-analysis" className="text-white px-3 py-2 hover:text-blue-400 transition duration-300 transform hover:-translate-y-1">Balance Sheet</Link>
              <Link to="/income-statement" className="text-white px-3 py-2 hover:text-blue-400 transition duration-300 transform hover:-translate-y-1">Income</Link>
              <Link to="/trading-bot" className="text-white px-3 py-2 hover:text-blue-400 transition duration-300 transform hover:-translate-y-1">Trading Bot</Link>
              <button 
                onClick={handleLogout} 
                className="text-white px-3 py-2 hover:text-blue-400 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-white px-3 py-2 hover:text-blue-400 transition duration-300 transform hover:-translate-y-1">Login</Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-gray-900 rounded-lg shadow-lg p-4 space-y-2">
          {!user && (
            <>
              <Link to="/" className="block text-white px-3 py-2 rounded hover:bg-gray-800 transform hover:-translate-y-1">Home</Link>
              <Link to="/about" className="block text-white px-3 py-2 rounded hover:bg-gray-800 transform hover:-translate-y-1">About</Link>
              <Link to="/contact" className="block text-white px-3 py-2 rounded hover:bg-gray-800 transform hover:-translate-y-1">Contact</Link>
              <Link to="/create-account" className="block text-white px-3 py-2 rounded hover:bg-gray-800 transform hover:-translate-y-1">Create</Link>
            </>
          )}

          {user ? (
            <>
              <Link to="/price" className="block text-white px-3 py-2 rounded hover:bg-gray-800 transform hover:-translate-y-1">Price</Link>
              <Link to="/stats" className="block text-white px-3 py-2 rounded hover:bg-gray-800 transform hover:-translate-y-1">Stats</Link>
              <Link to="/news" className="block text-white px-3 py-2 rounded hover:bg-gray-800 transform hover:-translate-y-1">News</Link>
              <Link to="/dashboard" className="block text-white px-3 py-2 rounded hover:bg-gray-800 transform hover:-translate-y-1">Dashboard</Link>
              <Link to="/portfolio-analysis" className="block text-white px-3 py-2 rounded hover:bg-gray-800 transform hover:-translate-y-1">Portfolio</Link>
              <Link to="/company-analysis" className="block text-white px-3 py-2 rounded hover:bg-gray-800 transform hover:-translate-y-1">Balance Sheet</Link>
              <Link to="/income-statement" className="block text-white px-3 py-2 rounded hover:bg-gray-800 transform hover:-translate-y-1">Income</Link>
              <Link to="/trading-bot" className="block text-white px-3 py-2 rounded hover:bg-gray-800 transform hover:-translate-y-1">Trading Bot</Link>
              <button 
                onClick={handleLogout} 
                className="w-full text-white px-3 py-2 rounded hover:bg-red-600 transform hover:-translate-y-1"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="block text-white px-3 py-2 rounded hover:bg-gray-800 transform hover:-translate-y-1">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;

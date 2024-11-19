import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the useAuth hook
import { toast } from 'react-toastify'; // Import toast for notifications

const NavBar = () => {
  const { user, logout } = useAuth(); // Get user and logout function from context
  const [logoutTimeout, setLogoutTimeout] = useState(null); // State to manage logout timeout

  const handleLogout = () => {
    // Show a toast notification before logging out
    toast.success('Login successful! Redirecting...', {
      autoClose: 2000,
    });

    // Clear any existing timeout
    if (logoutTimeout) {
      clearTimeout(logoutTimeout);
    }

    // Set a timeout to log out the user
    const timeout = setTimeout(() => {
      localStorage.removeItem('token'); // Remove the token from local storage
      logout(); // Call the logout function to update context state
    }, 2000); // Set the delay to 2 seconds

    setLogoutTimeout(timeout); // Store the timeout ID in state
  };

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl">OptiStock</Link>
        <div>
          {!user && ( // Show these links only if the user is not logged in
            <>
              <Link to="/" className="text-white px-4 hover:text-blue-400 transition-colors duration-300">Home</Link>
              <Link to="/about" className="text-white px-4 hover:text-blue-400 transition-colors duration-300">About</Link>
              <Link to="/contact" className="text-white px-4 hover:text-blue-400 transition-colors duration-300">Contact</Link>
              <Link to="/create-account" className="text-white px-4 hover:text-blue-400 transition-colors duration-300">Create</Link>
            </>
          )}
          {user ? ( // Check if the user is authenticated
            <>
              <Link to="/price" className="text-white px-4 hover:text-blue transition-colors duration-300">Price</Link>
              <Link to="/stats" className="text-white px-4 hover:text-blue-400 transition-colors duration-300">Stats</Link>
              <Link to="/news" className="text-white px-4 hover:text-blue-400 transition-colors duration-300">News</Link>
              <Link to="/dashboard" className="text-white px-4 hover:text-blue-400 transition-colors duration-300">Dashboard</Link>
              <Link to="/portfolio-analysis" className="text-white px-4 hover:text-blue-400 transition-colors duration-300">Portfolio Analysis</Link>
              <Link to="/company-analysis" className="text-white px-4 hover:text-blue-400 transition-colors duration-300">Balance Sheet</Link>
              <Link to="/income-statement" className="text-white px-4 hover:text-blue-400 transition-colors duration-300">Income Statement</Link>
              <button onClick={handleLogout} className="text-white px-4 hover:text-blue-400 transition-colors duration-300">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-white px-4 hover:text-blue-400 transition-colors duration-300">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
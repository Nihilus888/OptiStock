import React, { useState } from 'react';
import { useAuth } from './AuthContext'; 
import { useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify'; // Correctly import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import styles

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { login } = useAuth(); 
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/accountsUser/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User logged in:', data);
        localStorage.setItem('token', data.access); 
        login(data); 
        
        // Show a success notification
        toast.success('Login successful! Redirecting...', {
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate('/dashboard'); 
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        toast.error(`Login failed: ${errorData.message || 'Please try again.'}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <ToastContainer />
      <div className="bg-gray-800 shadow-xl rounded-lg p-10 w-96 animate-slide-up">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Login</h2>
        <p className="text-gray-400 text-center mb-6">Welcome back! Please enter your credentials.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
              placeholder="Your Username"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
              placeholder="Your Password"
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300">
            Login
          </button>

          <p className="mt-4 text-center text-gray-400">
            Don't have an account? <a href="/create-account" className="text-blue-400 hover:underline">Create one</a>
          </p>
        </form>
      </div>
    </div>
  );
}

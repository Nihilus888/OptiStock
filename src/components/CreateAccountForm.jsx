import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Import toast functions
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

export default function CreateAccountForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    experience: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleExperienceChange = (e) => {
    // Update the experience value when the slider changes
    const experienceValue = parseInt(e.target.value, 10); // Convert string to number
    setFormData({
      ...formData,
      experience: experienceValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/accountsUser/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await response.json();
        toast.success('User registered successfully!'); // Show success toast
        setTimeout(() => {
          window.location.href = '/login'; // Redirect to login page
        }, 2000); // Redirect after 2 seconds
      } else {
        toast.error('Registration failed. Please try again.'); // Show error toast
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.'); // Show error toast
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <ToastContainer /> {/* Add ToastContainer here */}
      <div className="bg-gray-800 shadow-md rounded-lg p-8 w-96 animate-slide-up">
        <h2 className="text-2xl font-bold mb-6 text-center text-white animate-slide-up-delay-1">
          Create Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 animate-slide-up-delay-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
            <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} 
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white" placeholder="Your Name" />
          </div>

          <div className="mb-4 animate-slide-up-delay-3">
            <label htmlFor="age" className="block text-sm font-medium text-gray-300">Age</label>
            <input type="number" id="age" name="age" min="18" required value={formData.age} onChange={handleChange} 
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white" placeholder="Your Age" />
          </div>

          <div className="mb-4 animate-slide-up-delay-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} 
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white" placeholder="you@example.com" />
          </div>

          <div className="mb-6 animate-slide-up-delay-5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input type="password" id="password" name="password" required value={formData.password} onChange={handleChange} 
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white" placeholder="Your Password" />
          </div>

          <div className="mb-6 animate-slide-up-delay-7">
            <label htmlFor="experience" className="block text-sm font-medium text-gray-300">Experience</label>
            <input type="range" id="experience" name="experience" min="0" max="10" value={formData.experience} onChange={handleExperienceChange}
              className="mt-2 w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer" />
            <div className="flex justify-between text-sm text-gray-400">
              <span>{formData.experience} years</span> {/* Display the experience value */}
              <span>10 years</span>
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300 animate-slide-up-delay-8">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

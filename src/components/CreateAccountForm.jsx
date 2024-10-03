import React from 'react';

export default function CreateAccountForm() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Password"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="Confirm Password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="Confirm Password"
              id="Confirm Password"
              name="Confirm Password"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm Password"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>
            <input
            type="range"
            id="experience"
            min="0"
            max="10"
            className="mt-2 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            onChange={(e) => console.log(`Experience Level: ${e.target.value}`)} // Optional: Handle change event
            />
            <div className="flex justify-between text-sm text-gray-500">
            <span>0 years</span>
            <span>10 years</span>
            </div>
        </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
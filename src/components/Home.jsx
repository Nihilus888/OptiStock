import React from 'react';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-cover bg-center h-screen text-white flex flex-col justify-center items-center"
           style={{ backgroundImage: 'url(https://source.unsplash.com/random/1600x900)' }}>
        <h1 className="text-5xl font-bold mb-4">Welcome to Stock Portfolio Optimizer</h1>
        <h2 className="text-2xl mb-6">Your one-stop solution for portfolio optimization</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          Get Started
        </button>
      </div>

      {/* Features Section */}
      <div className="container mx-auto my-10">
        <h3 className="text-4xl font-bold text-center mb-8">Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white shadow-md hover:shadow-lg rounded-lg p-5 transition-shadow duration-300">
            <h5 className="text-xl font-semibold mb-2">Real-Time Analytics</h5>
            <p>Get real-time insights into your portfolio's performance and make informed decisions.</p>
          </div>
          <div className="bg-white shadow-md hover:shadow-lg rounded-lg p-5 transition-shadow duration-300">
            <h5 className="text-xl font-semibold mb-2">Automated Recommendations</h5>
            <p>Receive personalized investment recommendations based on your goals and risk tolerance.</p>
          </div>
          <div className="bg-white shadow-md hover:shadow-lg rounded-lg p-5 transition-shadow duration-300">
            <h5 className="text-xl font-semibold mb-2">Risk Assessment Tools</h5>
            <p>Utilize advanced tools to assess and manage risks associated with your investments.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>© {new Date().getFullYear()} Stock Portfolio Optimizer. All rights reserved.</p>
      </footer>
    </div>
  );
}
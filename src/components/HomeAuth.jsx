import React from 'react';
import { ReactTyped as Typed } from 'react-typed';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom'; 

export default function HomeAuth() {
  const { user } = useAuth();
  const navigate = useNavigate(); 

  // Define the handlePortfolioAnalysis function inside the component
  const handlePortfolioAnalysis = () => {
    setTimeout(() => {
      navigate('/portfolio-analysis'); // Use navigate to route without a full reload
    }, 1000); // Delay for 1 second
  };

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero Section */}
      <div
        className="bg-cover bg-center h-screen text-white flex flex-col justify-center items-center"
        style={{
          backgroundImage: 'url(https://source.unsplash.com/random/1600x900)',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="bg-black bg-opacity-60 p-6 rounded-lg text-center">
          <Typed
            strings={[`Welcome${user ? `, ${user.username}` : ''} to OptiStock`]} // Greet the user by username if authenticated
            typeSpeed={50}
            backSpeed={30}
            loop={false}
            showCursor={false}
            className="text-6xl font-bold mb-4"
          />
          <h2 className="text-2xl font-light mb-6">
            <Typed
              strings={['Your one-stop solution for portfolio optimization']}
              typeSpeed={100}
              backSpeed={100}
              loop={false}
              showCursor={false}
            />
          </h2>
          <button
            onClick={handlePortfolioAnalysis}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300"
          >
            Portfolio Analysis
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto py-12">
        <h3 className="text-4xl font-bold text-center mb-12">Our Key Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 text-white shadow-lg hover:shadow-2xl rounded-lg p-6 transition transform hover:-translate-y-2 hover:scale-105 duration-300">
            <h5 className="text-2xl font-semibold mb-3">Real-Time Analytics</h5>
            <p className="text-gray-300">
              Get real-time insights into your portfolio's performance and make informed decisions.
            </p>
          </div>
          <div className="bg-gray-800 text-white shadow-lg hover:shadow-2xl rounded-lg p-6 transition transform hover:-translate-y-2 hover:scale-105 duration-300">
            <h5 className="text-2xl font-semibold mb-3">Automated Recommendations</h5>
            <p className="text-gray-300">
              Receive personalized investment recommendations based on your goals and risk tolerance.
            </p>
          </div>
          <div className="bg-gray-800 text-white shadow-lg hover:shadow-2xl rounded-lg p-6 transition transform hover:-translate-y-2 hover:scale-105 duration-300">
            <h5 className="text-2xl font-semibold mb-3">Risk Assessment Tools</h5>
            <p className="text-gray-300">
              Utilize advanced tools to assess and manage risks associated with your investments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

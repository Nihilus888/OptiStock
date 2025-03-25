import React from 'react';
import { ReactTyped as Typed } from 'react-typed';
import { useNavigate } from 'react-router-dom'; 

export default function HomeAuth() {
  const navigate = useNavigate(); 

  const username = localStorage.getItem("username") || 'Guest';

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
        className="bg-cover bg-center min-h-screen text-white flex flex-col justify-center items-center px-4"
        style={{
          backgroundImage: 'url(https://source.unsplash.com/random/1600x900)',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="bg-black bg-opacity-70 p-8 rounded-lg text-center max-w-lg shadow-lg">
          <Typed
            strings={[`Welcome ${username} to OptiStock`]}  // Greet the user by username if authenticated
            typeSpeed={50}
            backSpeed={30}
            loop={false}
            showCursor={false}
            className="text-4xl md:text-6xl font-bold mb-4"
          />
          <h2 className="text-lg md:text-2xl font-light mb-6">
            <Typed
              strings={['Your one-stop solution for anything related to the financial markets']}
              typeSpeed={100}
              backSpeed={100}
              loop={false}
              showCursor={false}
            />
          </h2>
          <button
            onClick={handlePortfolioAnalysis}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 shadow-lg transform hover:scale-105 w-full sm:w-auto"
          >
            Portfolio Analysis
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto py-12 px-4">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Key Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Real-Time Analytics',
              description: 'Get real-time insights into your portfolio\'s performance and make informed decisions.',
            },
            {
              title: 'Automated Recommendations',
              description: 'Receive personalized investment recommendations based on your goals and risk tolerance.',
            },
            {
              title: 'Risk Assessment Tools',
              description: 'Utilize advanced tools to assess and manage risks associated with your investments.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white shadow-lg hover:shadow-2xl rounded-lg p-6 transition transform hover:-translate-y-2 hover:scale-105 duration-300 flex flex-col"
            >
              <h5 className="text-xl md:text-2xl font-semibold mb-3">{feature.title}</h5>
              <p className="text-gray-300 text-sm md:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
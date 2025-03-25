import React from 'react';
import { ReactTyped as Typed } from 'react-typed';

const handleGetStarted = () => {
  setTimeout(() => {
    window.location.href = '/login'; // Replace with your actual route
  }, 1000);
}

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero Section */}
      <div
        className="bg-cover bg-center sm:bg-fixed h-screen flex flex-col justify-center items-center relative px-6"
        style={{
          backgroundImage: "url(https://source.unsplash.com/random/1600x900)",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="bg-black bg-opacity-70 p-6 sm:p-10 rounded-lg text-center shadow-lg max-w-lg sm:max-w-xl">
          <Typed
            strings={["Welcome to OptiStock"]}
            typeSpeed={50}
            backSpeed={30}
            loop={false}
            showCursor={false}
            className="text-3xl sm:text-5xl font-bold mb-4"
          />
          <h2 className="text-md sm:text-2xl font-light mb-6">
            <Typed
              strings={["Your one-stop solution for portfolio optimization"]}
              typeSpeed={100}
              backSpeed={100}
              loop={false}
              showCursor={false}
            />
          </h2>
          <button
            onClick={handleGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-full transition duration-300 shadow-lg transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto py-12 px-4">
        <h3 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          Our Key Features
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              title: "Real-Time Analytics",
              description:
                "Get real-time insights into your portfolio’s performance.",
              icon: "📈",
            },
            {
              title: "Automated Recommendations",
              description:
                "Receive personalized investment recommendations based on your goals.",
              icon: "🤖",
            },
            {
              title: "Risk Assessment Tools",
              description:
                "Utilize advanced tools to assess and manage risks effectively.",
              icon: "🛡️",
            },
            {
              title: "User-Friendly Dashboard",
              description:
                "Navigate through an intuitive interface designed for ease of use.",
              icon: "📊",
            },
            {
              title: "Multi-Device Support",
              description:
                "Access your portfolio seamlessly on mobile, tablet, or desktop.",
              icon: "💻",
            },
            {
              title: "Security First",
              description:
                "Your data is protected with top-notch security measures.",
              icon: "🔒",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white shadow-lg hover:shadow-2xl rounded-lg p-6 transition transform hover:-translate-y-2 hover:scale-105 duration-300 flex flex-col items-center text-center"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h5 className="text-xl sm:text-2xl font-semibold mb-2">
                {feature.title}
              </h5>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-900 py-12 px-4">
        <h3 className="text-3xl sm:text-4xl font-bold text-center text-white mb-6">
          What Our Users Say
        </h3>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              quote:
                "OptiStock transformed the way I manage my investments. Highly recommend!",
              author: "John Doe",
            },
            {
              quote: "The real-time analytics are a game-changer for my portfolio.",
              author: "Jane Smith",
            },
            {
              quote:
                "I love the automated recommendations; they help me make informed decisions.",
              author: "Mark Johnson",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white rounded-lg p-6 shadow-lg text-center"
            >
              <p className="italic mb-4">"{testimonial.quote}"</p>
              <h5 className="font-semibold">{testimonial.author}</h5>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="container mx-auto py-12 text-center px-4">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6">
          Ready to Optimize Your Portfolio?
        </h3>
        <button
          onClick={handleGetStarted}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-full transition duration-300 shadow-lg transform hover:scale-105"
        >
          Create Your Account
        </button>
      </div>
    </div>
  );
}

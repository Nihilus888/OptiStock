import React from 'react';
import { ReactTyped as Typed } from 'react-typed';

export default function About() {
  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto p-0 m-0">
        {/* About Section */}
        <section className="text-center mb-10 pt-0 mt-0">
          <h1 className="text-5xl font-bold mb-4 pt-10">
            <Typed
              strings={['About Our Stock Portfolio Optimizer']}
              typeSpeed={50}
              backSpeed={30}
              loop={false}
              showCursor={false}
            />
          </h1>
          <p className="text-lg text-gray-400 mb-6">
            Our Stock Portfolio Optimization tool is designed to help investors make the best possible decisions when managing their stock investments.
            By utilizing advanced algorithms and financial models, we offer personalized insights that aim to maximize returns while minimizing risks.
          </p>
          <img
            src="/Nasdaq.jpg"
            alt="Stock Market"
            className="shadow-lg w-full object-cover mb-6"
          />
        </section>

        {/* Why Use the Optimizer */}
        <section className="mb-10">
          <h2 className="text-4xl font-semibold text-center mb-6">Why Use This Optimizer?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:bg-gray-700">
              <h3 className="text-xl font-bold mb-2">Maximized Returns</h3>
              <p className="text-gray-400">
                Our tool helps you find the optimal balance between risk and reward by analyzing historical data and market trends. This enables you to make smarter investment decisions that can yield higher returns.
              </p>
            </div>
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:bg-gray-700">
              <h3 className="text-xl font-bold mb-2">Minimized Risks</h3>
              <p className="text-gray-400">
                The optimizer considers your risk tolerance and diversifies your portfolio to minimize exposure to volatile stocks. This reduces the likelihood of significant financial losses.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-10">
          <h2 className="text-4xl font-semibold text-center mb-6">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:bg-gray-700">
              <h3 className="text-xl font-bold mb-2">Data-Driven Insights</h3>
              <p className="text-gray-400">
                We use historical stock market data and machine learning models to provide actionable insights and optimize your portfolio in real-time.
              </p>
            </div>
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:bg-gray-700">
              <h3 className="text-xl font-bold mb-2">Custom Risk Management</h3>
              <p className="text-gray-400">
                Whether you are risk-averse or seeking high returns, our tool tailors recommendations based on your unique financial goals and risk appetite.
              </p>
            </div>
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:bg-gray-700">
              <h3 className="text-xl font-bold mb-2">Diversification Strategies</h3>
              <p className="text-gray-400">
                We offer portfolio diversification strategies that help you balance risk across different industries and sectors, ensuring better stability for long-term gains.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="text-center mb-0 pb-0">
          <h2 className="text-4xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-400">
            Our mission is to empower investors with the tools they need to make well-informed, data-driven decisions. By leveraging cutting-edge technology and expert financial models, we strive to bring value and growth to your investment portfolio, making complex financial analysis accessible to everyone.
          </p>
        </section>
      </div>
    </div>
  );
}

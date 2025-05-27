import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="max-w-md text-center">
        <h1 className="text-9xl font-extrabold text-gray-300 tracking-widest">404</h1>
        <p className="text-2xl md:text-3xl font-light text-gray-600 mt-4">
          Sorry, the page you're looking for can't be found.
        </p>
        <div className="mt-6">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-semibold transition duration-200 animate-pulse"
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
}


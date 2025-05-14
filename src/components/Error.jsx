import React from 'react';

const Error = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>
      <p className="mt-2 text-gray-600">
        There was an error. Please try refreshing the page or contact support if the problem persists.
      </p>
      {error && (
        <pre className="mt-4 p-3 bg-gray-100 text-sm text-left rounded shadow max-w-md overflow-auto">
          {error.message}
        </pre>
      )}
      {resetErrorBoundary && (
        <button
          onClick={resetErrorBoundary}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;

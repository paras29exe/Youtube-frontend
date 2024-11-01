import React from 'react';

const ServerDown = () => {
  return (
    <div className="flex w-screen flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">Server Not Running</h1>
        <p className="text-2xl text-gray-300 mt-4">It looks like your local server isn't started yet.</p>
        <p className="text-lg text-gray-400 mt-2">Please start the server and try refreshing the page.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default ServerDown;

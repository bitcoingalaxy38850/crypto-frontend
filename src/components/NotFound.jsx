
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-9xl font-bold text-red-500">404</h1>
      <h2 className="mt-4 text-3xl font-semibold text-gray-800">Oops! Page Not Found.</h2>
      <p className="mt-2 text-lg text-gray-600">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/machine_listing"
        className="mt-6 px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200"
      >
        Go to Homepage
      </Link>
   
    </div>
  );
};

export default NotFound;

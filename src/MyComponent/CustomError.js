import React from 'react';
import { Link } from 'react-router-dom';

const CustomError = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-base-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-error">404</h1>
        <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
        <p className="mt-2 text-gray-600">Sorry, the page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary mt-6">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CustomError;

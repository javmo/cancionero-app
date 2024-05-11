// components/LoadingIndicator.js

import React from 'react';

const LoadingIndicator = () => (
  <div className="flex justify-center items-center h-64">
    <div className="spinner"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

export default LoadingIndicator;


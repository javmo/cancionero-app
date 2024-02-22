// components/ErrorIndicator.js

import React from 'react';

const ErrorIndicator = ({ message }) => (
  <div className="text-center py-10">
    <p className="text-lg text-red-500">{message}</p>
  </div>
);

export default ErrorIndicator;

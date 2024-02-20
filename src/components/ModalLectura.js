// ModalLectura.js
import React from 'react';

const ModalLectura = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-w-lg max-h-full overflow-auto">
        <button onClick={onClose} className="float-right font-bold">X</button>
        {children}
      </div>
    </div>
  );
};

export default ModalLectura;

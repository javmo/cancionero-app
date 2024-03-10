// ModalLectura.js
import React from 'react';

const ModalLectura = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex">
      <div className="relative p-4 bg-white w-full max-w-lg m-auto flex-col flex rounded-lg shadow-lg">
        <button onClick={onClose} className="absolute top-0 right-0 mt-4 mr-4">
          {/* Asegúrate de tener un ícono o texto aquí para cerrar el modal */}
          <span>&times;</span>
        </button>
        <div className="overflow-y-auto max-h-[70vh]"> {/* Esta es la parte importante para el scroll */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalLectura;


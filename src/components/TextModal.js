import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isProcessing, recognizedText, setRecognizedText, closeModal, copyToClipboard }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    copyToClipboard();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Resetear el estado después de 2 segundos
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex">
      <div className="relative p-4 bg-white w-full max-w-2xl m-auto flex-col flex rounded-lg shadow">
        {/* Botón de cerrar (X) */}
        <div className="flex justify-end">
          <button onClick={closeModal} className="text-gray-700 p-1">
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
        </div>
        
        {/* Área de texto */}
        <textarea
          className="shadow border rounded w-full h-64 p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={recognizedText}
          onChange={(e) => setRecognizedText(e.target.value)}
        ></textarea>

        {/* Botones */}
    <div className="flex justify-between items-center pt-2">
      <button 
        onClick={handleCopyClick} 
        className={`p-2 ${copied ? 'text-green-500' : 'text-green-600'}`}
        disabled={isProcessing}
      >
        <FontAwesomeIcon 
          icon={faCopy} 
          className={`text-xl transition-transform duration-500 ${copied ? 'scale-125' : 'scale-100'}`}
        />
        {copied && <span className="text-sm pl-2">Copiado</span>}
      </button>
      {isProcessing && <FontAwesomeIcon icon={faSpinner} className="fa-spin text-xl text-green-600" />}
    </div>
      </div>
    </div>
  );
};

export default Modal;

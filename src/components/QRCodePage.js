import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

const QRCodePage = () => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    generateAppUrl();
  }, []);

  const generateAppUrl = () => {
    // Asegúrate de que el subdirectorio sea correcto.
    const baseUrl = window.location.origin;
    const appPath = '/cancionero';
    setUrl(`${baseUrl}${appPath}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4">Generador de Código QR</h1>
      <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
        <QRCode value={url} size={window.innerWidth < 768 ? 192 : 256} />
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg sm:text-xl bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Ir al Cancionero Publicado
      </a>
    </div>
  );
};

export default QRCodePage;



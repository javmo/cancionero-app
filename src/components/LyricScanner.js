import React, { useState, useCallback } from 'react';
import Tesseract from 'tesseract.js';

const LyricScanner = ({ onScan }) => {
  const [isScanning, setIsScanning] = useState(false);

  const scanLyrics = useCallback(async () => {
    try {
      setIsScanning(true);
      const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.getElementById('videoElement'); // Obtener el elemento de video
      videoElement.srcObject = videoStream; // Asignar el stream de video al elemento de video
      videoElement.play(); // Comenzar la reproducción del video
      
      const image = await takePhoto(videoElement); // Capturar una foto del video
      
      videoStream.getTracks().forEach(track => track.stop());
      
      const { data: { text } } = await Tesseract.recognize(image, 'spa', {
        logger: m => console.log(m)
      });
      setIsScanning(false);
      return text;
    } catch (error) {
      setIsScanning(false);
      console.error('Error al escanear la letra:', error);
      throw error;
    }
  }, []);

  const handleScan = () => {
    scanLyrics()
      .then(scannedLyrics => {
        onScan(scannedLyrics);
      })
      .catch(error => {
        // Manejar el error aquí...
      });
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        O escanea la letra con la cámara
      </label>
      <video id="videoElement" className="w-full max-h-96 bg-black" style={{ maxHeight: '400px' }}></video>
      <button
        type="button"
        onClick={handleScan}
        disabled={isScanning}
        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${isScanning ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        {isScanning ? 'Escaneando...' : 'Escanear'}
      </button>
    </div>
  );
};

async function takePhoto(videoElement) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  const dataURL = canvas.toDataURL('image/png');
  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  return { blob, dataURL };
}

export default LyricScanner;

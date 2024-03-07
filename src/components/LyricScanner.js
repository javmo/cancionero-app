import React, { useState, useCallback } from 'react';
import Tesseract from 'tesseract.js';
import  TextModal  from './TextModal';

const LyricScanner = ({ onScan }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [image, setImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [showModal, setShowModal] = useState(false);
  


  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];
      setImage(imageFile);
    }
  };

  const extractText = useCallback(async () => {
    if (!image) {
      console.error('No hay imagen seleccionada');
      return;
    }

    try {
      setIsProcessing(true);
      const { data: { text } } = await Tesseract.recognize(image, 'spa', {
        logger: m => console.log(m)
      });

      setRecognizedText(text);
      setShowModal(true); // Mostrar modal al obtener el texto
      onScan(text);
    } catch (error) {
      console.error('Error al procesar la imagen:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [image, onScan]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(recognizedText).then(() => {
      // Notificar al usuario que el texto ha sido copiado.
      console.log('Texto copiado al portapapeles');
    }).catch(err => {
      console.log('Algo salió mal al copiar el texto', err);
    });
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Selecciona o toma una foto para escanear
        </label>
        <input 
          type="file" 
          onChange={handleImageChange} 
          accept="image/*" 
          className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          disabled={isProcessing}
        />
      </div>
      <div className="mb-4">
        <button
          onClick={extractText}
          disabled={isProcessing || !image}
          className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isProcessing ? 'Procesando...' : 'Extraer Texto'}
        </button>
      </div>
      {/* Modal para mostrar y editar el texto reconocido */}
      {showModal && (
        <TextModal
          isProcessing={isProcessing}
          recognizedText={recognizedText}
          setRecognizedText={setRecognizedText}
          closeModal={() => setShowModal(false)}
          copyToClipboard={copyToClipboard}
        />
      )}
    </div>
  );
};

export default LyricScanner;

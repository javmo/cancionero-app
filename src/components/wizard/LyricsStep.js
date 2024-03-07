import React from 'react';
import LyricScanner from '../LyricScanner'; // Asegúrate de que la ruta sea correcta

const LyricsStep = ({ data, onDataChange, goNextStep, goPrevStep }) => {
  // Función para manejar cuando el texto de la letra es reconocido
  const handleScan = (scannedText) => {
    onDataChange({ ...data, lyrics: scannedText });
  };

  return (
    <div>
      <h2>Letra de la canción</h2>
      <LyricScanner onScan={handleScan} />
      {/* Área de texto que muestra la letra reconocida y permite su edición */}
      <textarea
        value={data.lyrics}
        onChange={(e) => onDataChange({ ...data, lyrics: e.target.value })}
        className="w-full p-2 border"
      />
      <div className="flex justify-between">
        <button onClick={goPrevStep}>Anterior</button>
        <button onClick={goNextStep}>Siguiente</button>
      </div>
    </div>
  );
};

export default LyricsStep;

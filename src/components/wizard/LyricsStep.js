import React from 'react';
import LyricScanner from '../LyricScanner';

const LyricsStep = ({ data, onDataChange, goNextStep, goPrevStep }) => {
  const handleScan = (scannedText) => onDataChange({ ...data, lyrics: scannedText });

  return (
    <div className="step-container p-6">
      <h2 className="text-xl font-semibold mb-4">Letra de la canción</h2>
      <LyricScanner onScan={handleScan} />
      <textarea
        value={data.lyrics}
        onChange={(e) => onDataChange({ ...data, lyrics: e.target.value })}
        className="w-full p-2 border rounded my-4"
        rows="10"
      />
      <div className="flex justify-between">
        <button onClick={goPrevStep} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Anterior
        </button>
        <button onClick={goNextStep} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default LyricsStep;

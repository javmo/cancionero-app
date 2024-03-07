import React from 'react';

const TitleStep = ({ data, onDataChange, goNextStep }) => {
    return (
      <div className="step-container">
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2">
            Título de la canción
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onDataChange({ title: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa el título aquí"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={goNextStep}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Siguiente
          </button>
        </div>
      </div>
    );
  };
  

export default TitleStep;

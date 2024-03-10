import React from 'react';

const TitleStep = ({ data, onDataChange, goNextStep }) => {
  return (
    <div className="step-container p-6">
      <h2 className="text-xl font-semibold mb-4">Título de la canción</h2>
      <input
        type="text"
        value={data.title}
        onChange={(e) => onDataChange({ title: e.target.value })}
        className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Ingresa el título aquí"
      />
      <div className="flex justify-end">
        <button
          onClick={goNextStep}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default TitleStep;

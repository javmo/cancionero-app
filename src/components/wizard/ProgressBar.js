import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  // Asegúrate de que el ancho mínimo sea mayor que 0 para que se muestre algo en el primer paso
  const width = Math.max(((currentStep + 1) / totalSteps) * 100, 5);

  return (
    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
      <div
        className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
        style={{ width: `${width}%` }}
      >{`Paso ${currentStep + 1} de ${totalSteps}`}</div>
    </div>
  );
};

export default ProgressBar;

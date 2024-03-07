const PreviewStep = ({ data, goPrevStep }) => {
    const handleSaveSong = () => {
      console.log('Guardando canción:', data);
      // Aquí podrías enviar los datos a un servidor o a una base de datos
    };
  
    return (
      <div className="step-container">
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Previsualización de la Canción</h2>
          <p><strong>Título:</strong> {data.title}</p>
          <p><strong>Letra:</strong> {data.lyrics}</p>
        </div>
        <div className="flex justify-between">
          <button
            onClick={goPrevStep}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline"
          >
            Atrás
          </button>
          <button
            onClick={handleSaveSong}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
          >
            Guardar Canción
          </button>
        </div>
      </div>
    );
  };
  
  export default PreviewStep;
  
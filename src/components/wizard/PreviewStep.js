import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import SongService from '../../services/SongService';
import Song from '../../models/Song';

const PreviewStep = ({ data, goPrevStep }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessful, setSaveSuccessful] = useState(false);
  const navigate = useNavigate(); // useNavigate en lugar de useHistory
  const songService = new SongService();

  const handleSaveSong = async () => {
    setIsSaving(true);
    try {
      // Lógica para enviar los datos a la API
      const song = new Song(data.title, [] ,data.lyrics);
      const jsonData = song.toJson();
      const response = await songService.postSong(jsonData);
      console.log(response); // Manejo de la respuesta
      setIsSaving(false);
      setSaveSuccessful(true);
      setTimeout(() => {
        navigate('/'); // Redirige a la página de inicio o a la lista de canciones
      }, 2000); // Espera 2 segundos antes de redirigir
    } catch (error) {
      console.error('Error al guardar la canción:', error);
      setIsSaving(false);
      // Manejo de errores
    }
  };

  if (isSaving) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  }

  if (saveSuccessful) {
    return (
      <div>
        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
        <p>Canción guardada con éxito!</p>
      </div>
    );
  }

  return (
    <div className="step-container p-6">
      <h2 className="text-xl font-semibold mb-4">Previsualización de la Canción</h2>
      <div className="mb-4">
        <p><strong>Título:</strong> {data.title}</p>
        <p><strong>Letra:</strong> {data.lyrics}</p>
      </div>
      <div className="flex justify-between">
        <button onClick={goPrevStep} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline">
          Atrás
        </button>
        <button onClick={handleSaveSong} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline">
          Guardar Canción
        </button>
      </div>
    </div>
  );
};

export default PreviewStep;

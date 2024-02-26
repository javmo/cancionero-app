import React, { useState } from 'react';

const SongForm = ({ onAddSong }) => {
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar los datos en la estructura esperada por el backend
    onAddSong({ title, lyric: { text: lyrics } });
    setTitle('');
    setLyrics('');
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Alta de Canciones</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="song-title" className="block text-sm font-medium text-gray-700 mb-2">
            Título de la canción
          </label>
          <input
            type="text"
            id="song-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Ingresa el título aquí"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="song-lyrics" className="block text-sm font-medium text-gray-700 mb-2">
            Letra de la canción
          </label>
          <textarea
            id="song-lyrics"
            rows="4"
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            placeholder="Escribe la letra aquí"
            required
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Publicar Canción
          </button>
        </div>
      </form>
    </div>
  );
};

export default SongForm;

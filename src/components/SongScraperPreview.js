import React, { useState } from 'react';
import ScrapingService from '../services/ScrapingService';
import SongLyricsViewer from './SongLyricsViewer';

function SongScraperPreview() {
  const [url, setUrl] = useState('');
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const fetchSongPreview = async () => {
    setIsLoading(true);
    const scrapingService = new ScrapingService();
    try {
      const data = await scrapingService.getSongPreview(url); // Asegúrate de que esta llamada devuelva el objeto esperado
      setPreview(data);
    } catch (error) {
      console.error(error);
      setPreview(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="songUrl" className="block text-sm font-medium text-gray-700">URL de la Canción</label>
        <input
          type="text"
          id="songUrl"
          value={url}
          onChange={handleUrlChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Ingresa la URL de la canción"
        />
      </div>
      <button
        onClick={fetchSongPreview}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={isLoading}
      >
        {isLoading ? 'Cargando...' : 'Obtener Vista Previa'}
      </button>
      {preview && (
        <SongLyricsViewer
          title={preview.title}
          artist={preview.artist}
          lyric={{ text: preview.lyric.text }} // Asegúrate de que esto coincide con la estructura de tu respuesta
          lyricchord={preview.lyricchord} // Asume que este es el HTML de la letra con acordes
        />
      )}
    </div>
  );
}

export default SongScraperPreview;

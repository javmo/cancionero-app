import React, { useState, useEffect } from 'react';
import SongService from '../services/SongService';
import Modal from './Modal';
import { debounce } from 'lodash'; // Asegúrate de que lodash esté instalado

const SongSearch = () => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [songs, setSongs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce la función de búsqueda para evitar llamadas excesivas al servidor
  const debouncedSearch = debounce(async (q) => {
    if (!q) return;
    setIsLoading(true);
    try {
      const results = searchType === 'title'
        ? await new SongService().searchSongLike(q)
        : await new SongService().searchSongByLyrics(q);
      setSongs(results);
    } catch (error) {
      // Manejo de errores
    }
    setIsLoading(false);
  }, 300);

  // Usa useEffect para manejar la búsqueda en tiempo real
  useEffect(() => {
    debouncedSearch(query);
  }, [query, searchType]);

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="sticky top-0 z-10 bg-gray-100 w-full max-w-md">
        {/* Selector de tipo de búsqueda */}
        <div className="flex justify-center space-x-4 mb-4">
          <button
            className={`py-2 px-4 rounded-md ${searchType === 'title' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSearchType('title')}
          >
            Título
          </button>
          <button
            className={`py-2 px-4 rounded-md ${searchType === 'lyrics' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSearchType('lyrics')}
          >
            Letra
          </button>
        </div>
        <input 
          className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder={`Buscar canciones por ${searchType === 'title' ? 'título' : 'letra'}...`}
          aria-label="Buscar canciones"
        />
      </div>
      <div className="overflow-y-auto w-full max-w-md mt-4">
        {isLoading ? <div className="text-center text-gray-500">Cargando...</div> : null}
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <div 
              key={index}
              onClick={() => handleSongSelect(song)}
              className="p-4 bg-white shadow-md rounded-lg mt-2 cursor-pointer hover:bg-gray-50"
            >
              {song.title}
            </div>
          ))
        ) : (
          !isLoading && <p className="text-gray-500">No se encontraron canciones.</p>
        )}
      </div>
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} song={selectedSong} />}
    </div>
  );
};

export default SongSearch;

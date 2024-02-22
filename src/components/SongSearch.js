import React, { useState } from 'react';
import SongService from '../services/SongService';
import Modal from './Modal';
import { debounce } from 'lodash'; // Ensure lodash is installed

const SongSearch = () => {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = debounce(async (q) => {
    if (!q) return; // avoid empty query search
    setIsLoading(true);
    try {
      const results = await new SongService().searchSongLike(q);
      setSongs(results);
    } catch (error) {
      // Error handling
    }
    setIsLoading(false);
  }, 300);

  const handleSearch = () => {
    debouncedSearch(query);
  };

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <input 
          className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md mt-4 focus:ring-blue-500 focus:border-blue-500" 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Buscar canciones..."
          aria-label="Buscar canciones"
        />
        <button 
          className={`w-full py-3 mt-4 text-white rounded-md ${isLoading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
      <div className="w-full max-w-md mt-4">
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

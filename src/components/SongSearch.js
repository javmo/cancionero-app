import React, { useState } from 'react';
import SongService from '../services/SongService';
import Modal from './Modal';

const SongSearch = () => {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const handleSearch = async () => {
    const songService = new SongService();
    const results = await songService.searchSongLike(query);
    setSongs(results);
  };
  
  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <input 
          className="w-full p-2 border border-gray-300 rounded mt-2 focus:ring-blue-500 focus:border-blue-500" 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Buscar canciones..." 
        />
        <button 
          className="w-full p-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>
      <div className="w-full max-w-md mt-4">
        {songs.map((song, index) => (
          <div 
            key={index}
            onClick={() => handleSongSelect(song)}
            className="p-4 bg-white shadow rounded-lg mt-2 cursor-pointer hover:bg-gray-50"
          >
            {song.title}
          </div>
        ))}
      </div>
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} song={selectedSong} />}
    </div>
  );
  
};

export default SongSearch;

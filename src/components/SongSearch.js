import React, { useState, useEffect } from 'react';
import SongService from '../services/SongService';
import Modal from './Modal';
import { debounce } from 'lodash';

const SongSearch = () => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [songs, setSongs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = debounce(async (q) => {
    if (!q) return;
    setIsLoading(true);
    try {
      const results = searchType === 'title'
        ? await new SongService().searchSongLike(q)
        : await new SongService().searchSongByLyrics(q);
      setSongs(results);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
    setIsLoading(false);
  }, 300);

  useEffect(() => {
    debouncedSearch(query);
  }, [query, searchType]);

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark-900 p-4 text-white">
      <div className="sticky top-0 z-10 bg-dark-900 w-full max-w-md">
        <div className="flex justify-center space-x-4 mb-4">
          <button
            className={`btn-primary ${searchType === 'title' ? '' : 'btn-secondary'}`}
            onClick={() => setSearchType('title')}
          >
            Título
          </button>
          <button
            className={`btn-primary ${searchType === 'lyrics' ? '' : 'btn-secondary'}`}
            onClick={() => setSearchType('lyrics')}
          >
            Letra
          </button>
        </div>
        <input
          className="input-primary"
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
              className="card mt-2"
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

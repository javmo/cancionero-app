// components/PublishedSongsList.js

import React, { useState, useEffect, useCallback } from 'react'; // Importar useCallback
import LyricPublishService from '../services/LyricPublishService';
import SongService from '../services/SongService';
import CategoryService from '../services/CategoryService';
import LyricsPublish from '../models/LyricsPublish';
import PublishedSongItem from './PublishedSongItem';

const PublishedSongsList = () => {
  const [publishedSongs, setPublishedSongs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({}); 

  const fetchPublishedSongs = useCallback(async () => {
    const lyricPublishService = new LyricPublishService();
    const songService = new SongService();
    if (categories.length > 0) {
      const publishedSongsData = await lyricPublishService.getLyricsPublish();
      const songsWithDetails = await Promise.all(publishedSongsData.map(async (song) => {
        const songDetails = await songService.getSong(song.song);
        const category = categories.find(c => c._id === song.category);
        return {
          ...song,
          songTitle: songDetails.title,
          categoryName: category ? category.name : 'Categoría desconocida',
          order: category?.order || 0,
        };
      }));
      songsWithDetails.sort((a, b) => a.order - b.order);
      setPublishedSongs(songsWithDetails);
        const initialSelectedCategories = songsWithDetails.reduce((acc, currentSong) => ({
          ...acc,
          [currentSong._id]: currentSong.category, // Usa el ID de la categoría actual de la canción
        }), {});
  
        setSelectedCategory(initialSelectedCategories);
    }
  }, [categories]);
  

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryService = new CategoryService();
      const fetchedCategories = await categoryService.getCategories();
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPublishedSongs();
  }, [fetchPublishedSongs]); // Dependencia en fetchPublishedSongs para recargar cuando las categorías estén disponibles
  
  const handleCategoryChange = (songId, categoryId) => {
    setSelectedCategory(prev => ({
      ...prev,
      [songId]: categoryId,
    }));
  };

  const handleUpdateCategory = async (songId) => {
    // Aquí iría la lógica para actualizar la categoría de la canción en el backend
    console.log(`Actualizar categoría de la canción ${songId} a ${selectedCategory[songId]}`);
    const lyricPublishService = new LyricPublishService();
    const lyricPubData = await lyricPublishService.getLyricPublish(songId);
    lyricPubData.category = selectedCategory[songId];
    console.log(lyricPubData);
    const updated = await lyricPublishService.updateLyricPub(lyricPubData);
    fetchPublishedSongs();
  };

  const handleRemoveSong = async (songId) => {
    // Filtrar la canción fuera de la lista mostrada
    const lyricPublishService = new LyricPublishService();
    await lyricPublishService.deleteLyricPublish(songId);
    const updatedSongs = publishedSongs.filter(song => song._id !== songId);
    setPublishedSongs(updatedSongs);
  
    // Aquí podrías también llamar a una API para actualizar el estado de la canción en el backend
    // si quieres que esta acción tenga un efecto permanente más allá de solo filtrarla de la vista actual
  };
  

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 text-center p-4 border-b">Canciones Publicadas</h2>
      <div className="max-h-96 overflow-y-auto"> {/* Establece una altura máxima y habilita el desplazamiento vertical */}
        <ul className="divide-y divide-gray-200">
          {publishedSongs.map((song) => (
            <PublishedSongItem
              key={song._id}
              song={song}
              categories={categories}
              selectedCategory={selectedCategory[song._id]}
              onCategoryChange={handleCategoryChange}
              onUpdateCategory={handleUpdateCategory}
              onRemoveSong={handleRemoveSong}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PublishedSongsList;
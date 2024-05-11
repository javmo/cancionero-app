import React, { useState, useEffect, useCallback } from 'react';
import LyricPublishService from '../services/LyricPublishService';
import SongService from '../services/SongService';
import CategoryService from '../services/CategoryService';
import PublishedSongItem from './PublishedSongItem';
import LoadingIndicator from './LoadingIndicator';
import ErrorIndicator from './ErrorIndicator';

const PublishedSongsList = () => {
  const [publishedSongs, setPublishedSongs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const categoryService = new CategoryService();
      const fetchedCategories = await categoryService.getCategories();
      setCategories(fetchedCategories);
      setIsLoading(false);
    } catch (err) {
      setError('Error fetching categories.');
      setIsLoading(false);
    }
  }, []);

  const fetchPublishedSongs = useCallback(async () => {
    if (categories.length === 0) {
      await fetchCategories();
    }
    setIsLoading(true);
    setError('');
    try {
      const lyricPublishService = new LyricPublishService();
      const songService = new SongService();
      const publishedSongsData = await lyricPublishService.getLyricsPublish();
      const songsWithDetails = await Promise.all(
        publishedSongsData.map(async (song) => {
          const songDetails = await songService.getSong(song.song);
          const category = categories.find(c => c._id === song.category);
          return {
            ...song,
            songTitle: songDetails.title,
            categoryName: category ? category.categoryType : 'Categoría desconocida',
            order: category?.order || 999,
          };
        })
      );
      songsWithDetails.sort((a, b) => a.order - b.order);
      setPublishedSongs(songsWithDetails);
    } catch (err) {
      setError('Error fetching songs.');
    } finally {
      setIsLoading(false);
    }
  }, [categories, fetchCategories]);

  const handleCategoryChange = (songId, categoryId) => {
    setPublishedSongs(publishedSongs.map(song => (
      song._id === songId ? { ...song, category: categoryId } : song
    )));
  };

  const handleUpdateCategory = async (songId) => {
    const lyricPublishService = new LyricPublishService();
    try {
      const songToUpdate = publishedSongs.find(song => song._id === songId);
      await lyricPublishService.updateLyricPub(songToUpdate);
      fetchPublishedSongs();
    } catch (err) {
      setError('Error updating category.');
    }
  };

  const handleRemoveSong = async (songId) => {
    const lyricPublishService = new LyricPublishService();
    try {
      await lyricPublishService.deleteLyricPublish(songId);
      setPublishedSongs(publishedSongs.filter(song => song._id !== songId));
    } catch (err) {
      setError('Error removing song.');
    }
  };

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    } else {
      fetchPublishedSongs();
    }
  }, [categories.length, fetchCategories, fetchPublishedSongs]);

  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator message={error} />;

  return (
    <div className="flex flex-col items-center min-h-screen bg-dark-900 p-4 text-white">
      <h2 className="text-2xl font-bold  text-center w-full sticky top-0 bg-dark-800 py-2 shadow-lg z-10">Canciones Publicadas</h2>
      <ul className="divide-y divide-gray-600 w-full">
        {publishedSongs.length > 0 ? (
          publishedSongs.map((song) => (
            <PublishedSongItem
              key={song._id}
              song={song}
              categories={categories}
              selectedCategory={song.category}
              onCategoryChange={handleCategoryChange}
              onUpdateCategory={handleUpdateCategory}
              onRemoveSong={handleRemoveSong}
            />
          ))
        ) : (
          <li className="text-center py-4 text-gray-300">No hay canciones publicadas.</li>
        )}
      </ul>
    </div>
  );
};

export default PublishedSongsList;

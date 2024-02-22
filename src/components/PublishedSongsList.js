// components/PublishedSongsList.js
import React, { useState, useEffect, useCallback } from 'react';
import LyricPublishService from '../services/LyricPublishService';
import SongService from '../services/SongService';
import CategoryService from '../services/CategoryService';
import PublishedSongItem from './PublishedSongItem';
import LoadingIndicator from './LoadingIndicator'; // Make sure to create or import this component
import ErrorIndicator from './ErrorIndicator'; // Make sure to create or import this component

const PublishedSongsList = () => {
  const [publishedSongs, setPublishedSongs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    try {
      const categoryService = new CategoryService();
      const fetchedCategories = await categoryService.getCategories();
      setCategories(fetchedCategories);
    } catch (err) {
      setError('Error fetching categories.');
    }
  };

  const fetchPublishedSongs = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const lyricPublishService = new LyricPublishService();
      const songService = new SongService();
      if (categories.length === 0) {
        await fetchCategories();
      }
      const publishedSongsData = await lyricPublishService.getLyricsPublish();
      const songsWithDetails = await Promise.all(
        publishedSongsData.map(async (song) => {
          const songDetails = await songService.getSong(song.song);
          const category = categories.find(c => c._id === song.category);
          return {
            ...song,
            songTitle: songDetails.title,
            categoryName: category ? category.name : 'Categoría desconocida',
            order: category?.order || 0,
          };
        })
      );
      songsWithDetails.sort((a, b) => a.order - b.order);
      setPublishedSongs(songsWithDetails);
      const initialSelectedCategories = songsWithDetails.reduce((acc, currentSong) => ({
        ...acc,
        [currentSong._id]: currentSong.category,
      }), {});
      setSelectedCategory(initialSelectedCategories);
    } catch (err) {
      setError('Error fetching songs.');
    } finally {
      setIsLoading(false);
    }
  }, [categories]);

  useEffect(() => {
    fetchPublishedSongs();
  }, [fetchPublishedSongs]);

  const handleCategoryChange = (songId, categoryId) => {
    setSelectedCategory(prev => ({
      ...prev,
      [songId]: categoryId,
    }));
  };

  const handleUpdateCategory = async (songId) => {
    setIsLoading(true);
    setError('');
    try {
      const lyricPublishService = new LyricPublishService();
      await lyricPublishService.updateLyricPub({ ...selectedCategory, _id: songId });
      await fetchPublishedSongs(); // Refetch songs to get the updated list
    } catch (err) {
      setError('Error updating category.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveSong = async (songId) => {
    setIsLoading(true);
    setError('');
    try {
      const lyricPublishService = new LyricPublishService();
      await lyricPublishService.deleteLyricPublish(songId);
      setPublishedSongs(publishedSongs.filter(song => song._id !== songId));
    } catch (err) {
      setError('Error removing song.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator message={error} />;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 text-center p-4 border-b">Canciones Publicadas</h2>
      <div className="max-h-96 overflow-y-auto">
        <ul className="divide-y divide-gray-200">
          {publishedSongs.length > 0 ? publishedSongs.map((song) => (
            <PublishedSongItem
              key={song._id}
              song={song}
              categories={categories}
              selectedCategory={selectedCategory[song._id]}
              onCategoryChange={handleCategoryChange}
              onUpdateCategory={handleUpdateCategory}
              onRemoveSong={handleRemoveSong}
            />
          )) : (
            <li className="text-center py-4">No hay canciones publicadas.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PublishedSongsList;

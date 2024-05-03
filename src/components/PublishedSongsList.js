import React, { useState, useEffect, useCallback } from 'react';
import LyricPublishService from '../services/LyricPublishService';
import SongService from '../services/SongService';
import CategoryService from '../services/CategoryService';
import PublishedSongItem from './PublishedSongItem';
import LoadingIndicator from './LoadingIndicator';
import ErrorIndicator from './ErrorIndicator';
import SongDisplay from './SongDisplay';

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
            categoryName: category ? category.name : 'Categoría desconocida',
            order: category?.order || 999, // Use a high order for unknown categories
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
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 text-center p-4 border-b">Canciones Publicadas</h2>
      <div className="max-h-96 overflow-y-auto">
        <ul className="divide-y divide-gray-200">
          {publishedSongs.length > 0 ? publishedSongs.map((song) => (
            <PublishedSongItem
              key={song._id}
              song={song}
              categories={categories}
              selectedCategory={song.category}
              onCategoryChange={() => {}}
              onUpdateCategory={() => {}}
              onRemoveSong={() => {}}
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

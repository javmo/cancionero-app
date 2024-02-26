import React, { useState } from 'react';
import SongForm from './SongForm';
import LyricScanner from './LyricScanner';
import SongService from '../services/SongService';
import Song from '../models/Song'; // Ajusta la ruta según la ubicación de tu modelo

const SongAdder = () => {
  const [lyrics, setLyrics] = useState('');
  const songService = new SongService();

  const addSong = async (songData) => {
    try {
      const song = new Song(songData.title, [] ,songData.lyric);
      const jsonData = song.toJson();
      console.log('Canción agregada:', jsonData);
      await songService.postSong(jsonData);
    } catch (error) {
      console.error('Error al agregar la canción:', error);
    }
  };

  const handleScan = (scannedLyrics) => {
    setLyrics(scannedLyrics);
  };

  return (
    <div>
      <SongForm onAddSong={addSong} />
      <LyricScanner onScan={handleScan} />
      {/* Aquí podrías mostrar la letra escaneada si es necesario */}
    </div>
  );
};

export default SongAdder;

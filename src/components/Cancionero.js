// Cancionero.js
import React, { useState, useEffect } from 'react';
// Suponiendo que los servicios están implementados correctamente
import CategoryService from '../services/CategoryService';
import LyricPublishService from '../services/LyricPublishService';
import SongService from '../services/SongService';
import LyricService from '../services/LyricService';
import Cancion from './Cancion';

const Cancionero = () => {
  const [categorias, setCategorias] = useState([]);
  const [cancionesConLetra, setCancionesConLetra] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const categoryService = new CategoryService();
      const lyricPublishService = new LyricPublishService();
      const songService = new SongService();
      const lyricService = new LyricService();

      const categoriasData = await categoryService.getCategories();
      setCategorias(categoriasData.sort((a, b) => a.order - b.order));

      const cancionesData = await lyricPublishService.getLyricsPublish();
      const cancionesConDetalle = await Promise.all(cancionesData.map(async (cancion) => {
        const songDetails = await songService.getSong(cancion.song);
        const letraDetails = await lyricService.getLyric(songDetails.lyric);
        return {
          ...cancion,
          title: songDetails.title,
          letra: letraDetails.text,
          categoryId: cancion.category
        };
      }));

      setCancionesConLetra(cancionesConDetalle);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-10">Cancionero</h1>
        {categorias.map((categoria) => (
          <div key={categoria._id} className="mb-12">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">{categoria.categoryType}</h2>
            {cancionesConLetra
              .filter(cancion => cancion.categoryId === categoria._id)
              .map(cancion => (
                <Cancion key={cancion._id} titulo={cancion.title} letra={cancion.letra} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cancionero;



import React, { useState, useEffect } from 'react';

import QRCode from 'qrcode.react';
import CategoryService from '../services/CategoryService';
import LyricPublishService from '../services/LyricPublishService';
import SongService from '../services/SongService';
import LyricService from '../services/LyricService';
import Cancion from './Cancion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';

const Cancionero = () => {
  const [categorias, setCategorias] = useState([]);
  const [cancionesConLetra, setCancionesConLetra] = useState([]);
  const [showQR, setShowQR] = useState(false); // State to control QR modal visibility

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

  const handleShowQR = () => {
    setShowQR(true);
  };

  const handleCloseQR = () => {
    setShowQR(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Cancionero</h1>
          <button onClick={handleShowQR} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center shadow-lg">
            <FontAwesomeIcon icon={faQrcode} className="mr-2" />
            QR
          </button>
        </div>
        {showQR && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <QRCode value="https://corosantacecilia.com.ar/cancionero" size={256} />
              <button onClick={handleCloseQR} className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-bold">
                Cerrar
              </button>
            </div>
          </div>
        )}
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

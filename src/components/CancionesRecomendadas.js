import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import OpeniaService from '../services/OpeniaService';
import SongService from '../services/SongService';
import Modal from './Modal';

const CancionesRecomendadas = ({ idioma }) => {
  const [lecturas, setLecturas] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orden, setOrden] = useState('mayorCoincidencia');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const openiaService = new OpeniaService();
        const songService = new SongService();
        const response = await openiaService.getRecomendations();

        const lecturasConCanciones = await Promise.all(response.lecturas.map(async (lectura) => {
          const detallesConCanciones = await Promise.all(lectura.detalles.map(async (detalle) => {
            try {
              const cancion = await songService.getSongByLyricId(detalle.id_cancion);
              return { ...detalle, cancion };
            } catch (error) {
              return { ...detalle, cancion: null };
            }
          }));

          return { ...lectura, detalles: detallesConCanciones };
        }));

        setLecturas(lecturasConCanciones);
      } catch (error) {
        console.error('Error:', error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [orden]);

  const handleSongSelect = (detalle) => {
    setSelectedSong(detalle.cancion);
    setIsModalOpen(true);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-blue-600">
        {idioma === 'la' ? 'Carmina commendata' : 'Canciones Recomendadas'}
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500"></div>
        </div>
      ) : lecturas.length === 0 ? (
        <p className="text-gray-600 text-center">No hay recomendaciones disponibles.</p>
      ) : (
        <Slider {...sliderSettings}>
          {lecturas.map((lectura, indexLectura) => (
            <div key={indexLectura} className="p-4 bg-white shadow-lg rounded-lg">
              <h3 className="text-lg font-semibold mb-2">{lectura.tipo_lectura}</h3>

              {lectura.detalles.length > 0 ? (
                <div className="space-y-2 overflow-y-auto max-h-40 bg-gray-100 p-2 rounded-md shadow-inner">
                  {lectura.detalles.map((detalle, indexDetalle) => (
                    <div key={indexDetalle} 
                         onClick={() => handleSongSelect(detalle)}
                         className="flex justify-between items-center p-2 bg-white shadow rounded-lg cursor-pointer hover:bg-blue-50 transition-colors border border-gray-200">
                      <p className="text-sm md:text-md font-medium text-gray-800 w-2/3 truncate">
                        {detalle.cancion ? detalle.cancion.title : "Canción no encontrada"}
                      </p>
                      <div className="w-1/3 text-right">
                        <span className="text-xs text-gray-600 mr-1">Afinidad:</span>
                        <span className="text-xs md:text-sm font-semibold text-green-500">
                          {Math.round(detalle.similitud * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p>No hay recomendaciones para "{lectura.tipo_lectura}".</p>
                  <p>Desliza ➡️ y fíjate si hay en las otras. 😉</p>
                </div>
              )}
            </div>
          ))}
        </Slider>
      )}

      {isModalOpen && selectedSong && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} song={selectedSong} />
      )}
    </div>
  );
};

export default CancionesRecomendadas;

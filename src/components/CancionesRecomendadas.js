import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OpeniaService from '../services/OpeniaService';
import Modal from './Modal';
import SongService from '../services/SongService';

const CancionesRecomendadas = () => {
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

        // Aquí modificamos para obtener la información de las canciones
        const lecturasConCanciones = await Promise.all(response.lecturas.map(async (lectura) => {
          const detallesConCanciones = await Promise.all(lectura.detalles.map(async (detalle) => {
            const cancion = await songService.getSongByLyricId(detalle.id_cancion);
            return { ...detalle, cancion }; // Añadimos el objeto de la canción completo
          }));
          return { ...lectura, detalles: detallesConCanciones };
        }));

        // Ordenamos las canciones dentro de cada lectura según el criterio especificado
        lecturasConCanciones.forEach(lectura => {
          lectura.detalles = ordenarCanciones(lectura.detalles);
        });

        setLecturas(lecturasConCanciones);
      } catch (error) {
        console.error('Error:', error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [orden]);

  // Esta función ahora espera recibir un arreglo de detalles con canciones para ordenar
  const ordenarCanciones = (detallesConCanciones) => {
    switch (orden) {
      case 'mayorCoincidencia':
        return detallesConCanciones.sort((a, b) => b.similitud - a.similitud);
      case 'menorCoincidencia':
        return detallesConCanciones.sort((a, b) => a.similitud - b.similitud);
      default:
        return detallesConCanciones;
    }
  };

  const handleSongSelect = (detalle) => {
    setSelectedSong(detalle.cancion); // Suponemos que detalle.cancion contiene la información de la canción
    setIsModalOpen(true);
  };

  const mainSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  
  const slideContainerStyle = "p-4 bg-white shadow-lg rounded-lg";

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-blue-600">Canciones Recomendadas</h2>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500"></div>
        </div>
      ) : (
        <Slider {...mainSettings}>
          {lecturas.map((lectura, indexLectura) => (
            <div key={indexLectura} className={slideContainerStyle}>
              <h3 className="text-lg font-semibold mb-2">{lectura.tipo_lectura}</h3>
              {lectura.detalles.length > 0 ? (
                <div className="space-y-2 overflow-y-auto max-h-60">
                  {lectura.detalles.map((detalle, indexDetalle) => (
                    <div key={indexDetalle} onClick={() => handleSongSelect(detalle)} className="flex justify-between items-center p-3 bg-white shadow rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                      <div className="flex-grow">
                        <p className="text-sm md:text-md font-medium text-gray-800">{detalle.cancion.title}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">Afinidad:</p>
                        <p className="text-xs md:text-sm font-semibold text-green-500">{Math.round(detalle.similitud * 100)}%</p>
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

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} song={selectedSong} />
      )}
    </div>
  );
};

export default CancionesRecomendadas;

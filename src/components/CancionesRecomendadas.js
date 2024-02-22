import React, { useState, useEffect } from 'react';
import OpeniaService from '../services/OpeniaService';
import Modal from './Modal';
import SongService from '../services/SongService';

const CancionesRecomendadas = () => {
  const [lecturas, setLecturas] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orden, setOrden] = useState('mayorCoincidencia');
  const [isLoading, setIsLoading] = useState(true); // Estado para indicar que está cargando

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Comenzar a mostrar el indicador de carga
      try {
        const openiaService = new OpeniaService();
        const recomendaciones = await openiaService.getRecomendations();

        let cancionesConDetalles = [];
        for (const lectura of recomendaciones) {
          for (const detalle of lectura.detalles) {
            const songService = new SongService();
            const cancion = await songService.getSongByLyricId(detalle.id_cancion);
            if (cancion) {
              cancionesConDetalles.push({
                ...cancion,
                tipoLectura: lectura.lectura,
                similitud: detalle.similitud
              });
            }
          }
        }

        // Ordena las canciones antes de establecer el estado
        cancionesConDetalles = ordenarCanciones(cancionesConDetalles);

        // Establece el estado de `lecturas` con las canciones ya ordenadas
        setLecturas(cancionesConDetalles);
      } catch (error) {
        console.error('Error:', error);
      }
      setIsLoading(false); // Ocultar el indicador de carga
    };

    fetchData();
  }, [orden]);

  const ordenarCanciones = (canciones) => {
    switch (orden) {
      case 'mayorCoincidencia':
        return canciones.sort((a, b) => b.similitud - a.similitud);
      case 'menorCoincidencia':
        return canciones.sort((a, b) => a.similitud - b.similitud);
      default:
        return canciones;
    }
  };

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-blue-600">Canciones Recomendadas</h2>
      
      {/* Selector de orden */}
      <div className="mb-4">
        {/* ... Resto del componente del selector de orden */}
      </div>
      
      {/* Lista de canciones */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]"> {/* Ajusta la altura mínima según tus necesidades */}
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500"></div>
        </div>
      ) : (
        <div className="space-y-2 overflow-y-auto max-h-60">
          {lecturas.map((song, index) => (
            <div key={index} onClick={() => handleSongSelect(song)} className="flex justify-between items-center p-3 bg-white shadow rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
              <div className="flex-grow">
                <p className="text-sm md:text-md font-medium text-gray-800">{song.title}</p>
                <p className="text-xs text-gray-500">{song.tipoLectura}</p>
              </div>
              <div className="text-right ml-4">
                <p className="text-xs text-gray-600">Afinidad:</p>
                <p className="text-xs md:text-sm font-semibold text-green-500">{Math.round(song.similitud * 100)}%</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} song={selectedSong} />
      )}
    </div>
  );
};

export default CancionesRecomendadas;

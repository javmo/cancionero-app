import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import ScrapingService from '../services/ScrapingService';
import Modal from './Modal'; // Asegúrate de tener este componente
import SongService from '../services/SongService';

const CancionesRecomendadas = () => {
    const [canciones, setCanciones] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fraseEvangelio, setFraseEvangelio] = useState('');
    const [fraseSalmo, setFraseSalmo] = useState('');

  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const scrapingService = new ScrapingService();
                const lecturaDelDia = await scrapingService.getlectura();
    
                // Extraer frases del evangelio y del salmo
                const { Evangelio, Salmo } = lecturaDelDia;
                
                // Calcular el punto medio del texto
                const medioEvangelio = Math.ceil(Evangelio.length / 1.2);
                const medioSalmo = Math.ceil(Salmo.length / 1.2);
    
                // Tomar las palabras clave desde el punto medio del texto hacia adelante
                if (Evangelio) {
                    const palabrasClaveEvangelio = Evangelio.substring(medioEvangelio).split(' ').slice(0, 7).join(' ');
                    setFraseEvangelio(palabrasClaveEvangelio);
                    console.log("Palabras clave Evangelio: ", palabrasClaveEvangelio);
                }
                if (Salmo) {
                    const palabrasClaveSalmo = Salmo.substring(medioSalmo).split(' ').slice(0,7).join(' ');
                    setFraseSalmo(palabrasClaveSalmo);
                    console.log("Palabras clave Salmo: ", palabrasClaveSalmo);
                }
    
                // Luego de obtener las frases del día, buscar canciones
                const songService = new SongService();
                const resultadosEvangelio = await songService.searchSongLike(fraseEvangelio);
                const resultadosSalmo = await songService.searchSongLike(fraseSalmo);
                console.log("Resultados Evangelio: ", resultadosEvangelio);
                console.log("Resultados Salmo: ", resultadosSalmo);
            
                const cancionesCombinadas = [...resultadosEvangelio, ...resultadosSalmo];

                // Utilizar un mapa para almacenar las canciones únicas basadas en su título
                const mapaCanciones = new Map();
                cancionesCombinadas.forEach(cancion => {
                    mapaCanciones.set(cancion.title, cancion);
                });

                // Convertir el mapa de canciones de nuevo en un array
                const cancionesUnicas = [...mapaCanciones.values()];
                console.log("Canciones combinadas: ", cancionesUnicas);

                // Establecer las canciones combinadas como estado
                setCanciones(cancionesUnicas);
            } catch (error) {
                console.error('Error:', error);
                // Manejar errores
            }
        };
    
        fetchData();
    }, []); // Se ejecuta solo una vez al montar el componente
    
      


  

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Canciones Recomendadas</h2>
      <div>
        {canciones.map((song, index) => (
          <div key={index} onClick={() => handleSongSelect(song)}  className="p-4 bg-white shadow rounded-lg mt-2 cursor-pointer hover:bg-gray-50">
            {/* Renderiza información de la canción */}
            <p>{song.title}</p>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} song={selectedSong} />
      )}
    </div>
  );
};

export default CancionesRecomendadas;

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import ScrapingService from '../services/ScrapingService';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ModalLectura from './ModalLectura';

const LecturaDelDia = ({ idioma }) => {
  const [lecturas, setLecturas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLectura, setSelectedLectura] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLectura = async () => {
      setIsLoading(true);
      const scrapingService = new ScrapingService();
      try {
        const endpoint = idioma === 'la' ? '/api/lectura-latin' : '/api/lectura-es';
        const lecturaDelDia = await scrapingService.getlectura();

        setLecturas(Object.entries(lecturaDelDia).map(([titulo, contenido]) => ({
          titulo,
          contenido
        })));
      } catch (error) {
        console.error("Error fetching lectura: ", error);
      }
      setIsLoading(false);
    };

    fetchLectura();
  }, [idioma]);

  const getFechaFormateada = () => {
    const opciones = { weekday: 'long', day: 'numeric', month: 'long' };
    return new Date().toLocaleDateString(idioma === 'la' ? 'la' : 'es-ES', opciones);
  };

  const handleOpenModal = (lectura) => {
    setSelectedLectura(lectura);
    setModalOpen(true);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">
        {idioma === 'la' ? 'Lectiones Diei 🙏' : 'Lecturas del Día 🙏'}
      </h2>
      <h2 className="text-1xl text-gray-600">{getFechaFormateada()}</h2>

      {isLoading ? (
        <div className="min-h-[200px] flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <Slider {...settings}>
          {lecturas.map((lectura, index) => (
            <div key={index} className="p-2">
              <h3 className="text-lg font-semibold">{lectura.titulo}</h3>
              <p className="text-md line-clamp-3 overflow-hidden">
                {lectura.contenido.substring(0, 200)}...
              </p>
              <button 
                onClick={() => handleOpenModal(lectura)}
                className="text-blue-500 hover:text-blue-700 mt-2"
              >
                {idioma === 'la' ? 'Vide plura' : 'Ver Más'}
              </button>
            </div>
          ))}
        </Slider>
      )}

      {selectedLectura && (
        <ModalLectura isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <div>
            <h3 className="text-lg font-semibold">{selectedLectura.titulo}</h3>
            <p className="text-md whitespace-pre-line">{selectedLectura.contenido}</p>
          </div>
        </ModalLectura>
      )}
    </div>
  );
};

export default LecturaDelDia;

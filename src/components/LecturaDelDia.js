import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import ScrapingService from '../services/ScrapingService';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ModalLectura from './ModalLectura';

const LecturaDelDia = () => {
  const [lecturas, setLecturas] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLectura, setSelectedLectura] = useState(null);

  const handleOpenModal = (lectura) => {
      setSelectedLectura(lectura);
      setModalOpen(true);
   };

  useEffect(() => {
    const fetchLectura = async () => {
      const scrapingService = new ScrapingService();
      const lecturaDelDia = await scrapingService.getlectura();
      setLecturas(lecturaDelDia);
    };

    fetchLectura();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Convertir el objeto de lecturas en un array para el carrusel
  const lecturaArray = Object.entries(lecturas).map(([titulo, contenido]) => ({
    titulo,
    contenido
  }));

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Lectura del Día</h2>
      <Slider {...settings}>
        {lecturaArray.map((lectura, index) => (
          <div key={index} className="p-2">
            <h3 className="text-lg font-semibold">{lectura.titulo}</h3>
            <p className="text-md line-clamp-3 overflow-hidden">{lectura.contenido.substring(0, 200)}...</p> {/* Acorta el texto */}
            <button 
              onClick={() => handleOpenModal(lectura)}
              className="text-blue-500 hover:text-blue-700 mt-2"
            >
              Ver Más
            </button> {/* Botón para abrir modal */}
          </div>
        ))}
      </Slider>
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


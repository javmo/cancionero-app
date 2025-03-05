import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { FaTimes, FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const Fiestas = ({ fiestas, fecha, idioma }) => {
  const [selectedFiesta, setSelectedFiesta] = useState(null);

  const openModal = (fiesta) => {
    setSelectedFiesta(fiesta);
  };

  const closeModal = () => {
    setSelectedFiesta(null);
  };

  // 📆 Obtener el mes en el idioma correcto
  const obtenerMes = (fecha, lang) => {
    const opciones = { month: "long" };
    return new Date(fecha).toLocaleDateString(lang === "la" ? "la" : "es-ES", opciones);
  };

  // 📆 Formatear fecha correctamente (solo Día y Mes)
  const formatFecha = (date, lang) => {
    return new Date(date + "T00:00:00").toLocaleDateString(lang === "la" ? "la" : "es-ES", {
      day: "2-digit",
      month: "long",
    });
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded shadow-md w-full max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold border-b pb-2 mb-4 text-gray-800 text-center">
        🎉 {idioma === "la" ? `Festivitates Mensis ${obtenerMes(fecha, idioma)}` : `Fiestas del mes de ${obtenerMes(fecha, idioma)}`}
      </h2>

      {/* Contenedor con scroll horizontal */}
      <div className="overflow-x-auto whitespace-nowrap py-2">
        <div className="flex space-x-4">
          {fiestas.map((fiesta, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md w-72 flex-shrink-0">
              {/* Fecha con ícono de calendario - Solo Día y Mes */}
              <p className="text-blue-600 font-semibold flex items-center gap-2 text-sm">
                <FaCalendarAlt />
                {formatFecha(fiesta.fecha, idioma)}
              </p>

              {/* Nombre de la fiesta */}
              <p className="text-lg md:text-xl font-bold text-center text-gray-900 mt-1">
                {idioma === "la" ? `Festum ${fiesta.nombre}` : fiesta.nombre}
              </p>

              {/* Descripción con límite de caracteres y "Ver más" */}
              <div className="text-gray-700 text-sm md:text-base mt-2 text-center leading-relaxed overflow-hidden text-ellipsis whitespace-nowrap">
                <span dangerouslySetInnerHTML={{ __html: fiesta.subtitulo.substring(0, 80) + "..." }}></span>
              </div>

              {/* Botón para abrir el modal */}
              <div className="text-center mt-2">
                <button
                  onClick={() => openModal(fiesta)}
                  className="text-blue-500 font-semibold hover:underline flex items-center justify-center gap-1"
                >
                  {idioma === "la" ? "Plura Legere" : "Ver más"} <FaArrowRight />
                </button>
              </div>

              {/* Imagen de la fiesta */}
              {fiesta.imagen && (
                <div className="flex justify-center mt-3">
                  <img
                    src={fiesta.imagen}
                    alt={fiesta.nombre}
                    className="w-full max-h-32 object-cover rounded-lg shadow-md"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal para ver más detalles */}
      <Modal open={!!selectedFiesta} onClose={closeModal} className="flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto relative max-h-[80vh] overflow-y-auto">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-2"
          >
            <FaTimes size={20} />
          </button>
          {selectedFiesta && (
            <>
              <h3 className="text-2xl font-bold text-center text-gray-900">
                {idioma === "la" ? `Festum ${selectedFiesta.nombre}` : selectedFiesta.nombre}
              </h3>
              <p className="text-sm text-gray-500 text-center mb-2">
                📅 {formatFecha(selectedFiesta.fecha, idioma)}
              </p>
              {selectedFiesta.imagen && (
                <div className="flex justify-center my-3">
                  <img src={selectedFiesta.imagen} alt={selectedFiesta.nombre} className="rounded-lg shadow-md" />
                </div>
              )}
              <p
                className="text-gray-700 text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedFiesta.subtitulo }}
              ></p>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Fiestas;

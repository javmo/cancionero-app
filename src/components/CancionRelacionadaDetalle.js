import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CancionService from "../services/CancionService";
import ScrapingService from "../services/ScrapingService";
import { 
  FaShareAlt, FaArrowLeft, FaCheck, 
  FaBookOpen, FaMusic, FaHeart, FaLightbulb 
} from "react-icons/fa";

const cancionService = new CancionService();
const scrapingService = new ScrapingService();

const CancionRelacionadaDetalle = () => {
  const { id } = useParams();
  const [cancion, setCancion] = useState(null);
  const [lectura, setLectura] = useState(null);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    fetchCancion();
  }, [id]);

  const fetchCancion = async () => {
    try {
      const data = await cancionService.getCancionById(id);
      setCancion(data);
      if (data.fecha) {
        fetchLectura(data.fecha);
      }
    } catch (error) {
      console.error("Error al obtener la canción recomendada", error);
    }
  };

  const fetchLectura = async (fecha) => {
    try {
      const data = await scrapingService.getLecturaVa(fecha);
      setLectura(data);
    } catch (error) {
      console.error("Error al obtener la lectura", error);
    }
  };

  const handleShare = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const getEmbedPlayer = (url) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.split("v=")[1]?.split("&")[0] || url.split("youtu.be/")[1];
      return (
        <iframe
          className="w-full h-48 rounded-lg shadow-md"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Reproductor de YouTube"
          allowFullScreen
        ></iframe>
      );
    } else if (url.includes("spotify.com")) {
      return (
        <iframe
          className="w-full h-20 rounded-lg shadow-md"
          src={`https://open.spotify.com/embed/track/${url.split("/track/")[1]?.split("?")[0]}`}
          allow="encrypted-media"
        ></iframe>
      );
    }
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-semibold hover:underline">
        ▶️ Escuchar Canción
      </a>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg overflow-y-auto">
      
      {/* Botón de regreso con un mensaje motivador */}
      <Link 
        to="/lecturaSantosFiestas" 
        className="text-blue-600 hover:underline flex items-center gap-2 mb-4 text-lg font-semibold transition-transform transform hover:scale-105"
      >
        <FaArrowLeft />
        Sigue explorando más reflexiones y canciones 🎵✨
      </Link>

      {cancion ? (
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-2">
            <FaMusic /> Canción Recomendada
          </h1>
          <p className="text-gray-700 italic">📅 Fecha: {cancion.fecha}</p>

          <div className="p-4 bg-gray-50 border-l-4 border-purple-500 rounded-lg shadow-sm">
            <p className="text-lg font-semibold text-gray-900">🎤 {cancion.nombre}</p>
            <p className="text-gray-700 mt-2">🎵 {cancion.titulo}</p>
            <div className="mt-3">{getEmbedPlayer(cancion.link)}</div>
          </div>

          {/* Botón de compartir */}
          <button
            onClick={handleShare}
            className="mt-4 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 shadow-md"
          >
            {shared ? <FaCheck className="text-green-500" /> : <FaShareAlt />}
            {shared ? " Copiado" : " Compartir Canción"}
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Cargando canción recomendada...</p>
      )}

      {lectura ? (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2">
            <FaBookOpen /> 📖 Lectura del Día
          </h2>
          <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-green-500 shadow-sm">
            <p className="text-gray-800 leading-relaxed">
              <strong>📜 Evangelio:</strong> {lectura["evangelio"] || "No disponible"}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Cargando lectura...</p>
      )}

      {/* Nota Inspiradora */}
      <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg shadow-md flex gap-3">
        <FaLightbulb className="text-yellow-600 text-2xl" />
        <div>
          <h3 className="text-lg font-semibold text-yellow-700">¿Sabías que…?</h3>
          <p className="text-gray-700 text-sm">
            La música y la reflexión van de la mano. A veces, una canción nos puede recordar un pasaje del Evangelio, o una lectura nos puede inspirar una melodía. 
            ¿Qué te dejó esta lectura? ¿Qué canción se te viene a la mente? 🎶💡
          </p>
        </div>
      </div>

      {/* Espaciado adicional para evitar que el navbar tape contenido */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default CancionRelacionadaDetalle;

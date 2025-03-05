import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CancionService from "../services/CancionService";
import ScrapingService from "../services/ScrapingService";
import { FaShareAlt, FaArrowLeft, FaCheck, FaThumbsUp, FaLightbulb, FaMusic } from "react-icons/fa";

const cancionService = new CancionService();
const scrapingService = new ScrapingService();

const CancionRelacionadaDetalle = () => {
  const { id } = useParams();
  const [cancion, setCancion] = useState(null);
  const [lectura, setLectura] = useState(null);
  const [shared, setShared] = useState(false);
  const [loading, setLoading] = useState(false);
  const [voted, setVoted] = useState({});

  useEffect(() => {
    fetchCancion();
    const storedVotes = JSON.parse(localStorage.getItem("cancionVotes")) || {};
    setVoted(storedVotes);
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

  const shareOnWhatsApp = () => {
    if (!lectura || !cancion) return;

    const mensaje = `✨ *Evangelio del Día* ✨\n📅 *Fecha:* ${cancion.fecha}\n\n📖 *Evangelio:*\n${lectura["Evangelio"].substring(0, 300)}...\n\n🎶 *Canción recomendada:*\n📌 *${cancion.titulo}* (por ${cancion.nombre})\n🔗 ${cancion.link}\n\n📝 Reflexionemos y compartamos juntos! 🙌`;

    const encodedMessage = encodeURIComponent(mensaje);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Link to="/lecturaSantosFiestas" className="text-blue-500 hover:underline flex items-center gap-2 mb-4">
        <FaArrowLeft /> Volver a Canciones
      </Link>

      {cancion ? (
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🎶 Canción Recomendada</h1>
          <p className="text-gray-700 italic">Fecha: {cancion.fecha}</p>
          <div className="p-4 bg-gray-50 border-l-4 border-purple-500 rounded">
            <p className="text-lg font-semibold text-gray-900">{cancion.nombre}</p>
            <p className="text-gray-700 mt-2">🎵 {cancion.titulo}</p>
            <div className="mt-3">{getEmbedPlayer(cancion.link)}</div>
          </div>

          {/* Botón de compartir */}
          <button
            onClick={handleShare}
            className="mt-4 flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded transition duration-300"
          >
            {shared ? <FaCheck className="text-green-500" /> : <FaShareAlt />}
            {shared ? " Copiado" : " Compartir Canción"}
          </button>

          {/* Botón compartir en WhatsApp */}
          <button
            onClick={shareOnWhatsApp}
            className="mt-4 ml-2 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
          >
            📤 Compartir en WhatsApp
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Cargando canción recomendada...</p>
      )}

      {lectura ? (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">📖 Lectura del Día</h2>
          <div className="p-4 bg-gray-50 rounded">
            <p><strong>📜 Evangelio:</strong> {lectura["Evangelio"] || "No disponible"}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Cargando lectura...</p>
      )}
    </div>
  );
};

export default CancionRelacionadaDetalle;

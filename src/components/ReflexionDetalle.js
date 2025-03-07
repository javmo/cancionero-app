import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReflexionService from "../services/ReflexionService";
import ScrapingService from "../services/ScrapingService";
import { 
  FaShareAlt, FaArrowLeft, FaCheck, 
  FaThumbsUp, FaLightbulb, FaBookOpen, FaCommentDots 
} from "react-icons/fa";

const reflexionService = new ReflexionService();
const scrapingService = new ScrapingService();

const ReflexionDetalle = () => {
  const { id } = useParams();
  const [reflexion, setReflexion] = useState(null);
  const [lectura, setLectura] = useState(null);
  const [shared, setShared] = useState(false);
  const [voted, setVoted] = useState({});

  useEffect(() => {
    fetchReflexion();
    const storedVotes = JSON.parse(localStorage.getItem("reflexionVotes")) || {};
    setVoted(storedVotes);
  }, [id]);

  const fetchReflexion = async () => {
    try {
      const data = await reflexionService.getReflexionById(id);
      setReflexion(data);
      if (data.fecha) {
        fetchLectura(data.fecha);
      }
    } catch (error) {
      console.error("Error al obtener la reflexión", error);
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

  const handleVote = async (type) => {
    if (voted[id]) return;
    try {
      if (type === "like") {
        await reflexionService.likeReflexion(reflexion._id);
      } else {
        await reflexionService.inspirarReflexion(reflexion._id);
      }

      setVoted((prev) => {
        const updatedVotes = { ...prev, [id]: true };
        localStorage.setItem("reflexionVotes", JSON.stringify(updatedVotes));
        return updatedVotes;
      });

      fetchReflexion();
    } catch (error) {
      console.error("Error al votar", error);
    }
  };

  const handleShare = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Botón de regreso con una invitación motivadora */}
      <Link to="/lecturaSantosFiestas" className="text-blue-600 hover:underline flex items-center gap-2 mb-4 text-lg font-semibold">
        <FaArrowLeft />
        Explora más reflexiones y deja tu huella ✨
      </Link>

      {reflexion ? (
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
            <FaCommentDots /> Reflexión del Día
          </h1>
          <p className="text-gray-700 italic">📅 Fecha: {reflexion.fecha}</p>

          <div className="p-4 bg-gray-50 border-l-4 border-blue-500 rounded-lg shadow-sm">
            <p className="text-lg font-semibold text-gray-900">✍️ {reflexion.nombre}</p>
            <p className="text-gray-700 mt-2 leading-relaxed">{reflexion.comentario}</p>
          </div>

          {/* Botones de interacción */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => handleVote("like")}
              className={`flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md ${
                voted[id] ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={voted[id]}
            >
              <FaThumbsUp /> Me gusta ({reflexion.likes})
            </button>
            <button
              onClick={() => handleVote("inspirar")}
              className={`flex items-center gap-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-600 font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md ${
                voted[id] ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={voted[id]}
            >
              <FaLightbulb /> Me inspiró ({reflexion.inspirador})
            </button>
          </div>

          {/* Botón de compartir */}
          <button
            onClick={handleShare}
            className="mt-4 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md"
          >
            {shared ? <FaCheck className="text-green-500" /> : <FaShareAlt />}
            {shared ? " Copiado" : " Compartir Reflexión"}
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Cargando reflexión...</p>
      )}

      {lectura ? (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2">
            <FaBookOpen /> 📖 Lectura del Día
          </h2>
          <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-green-500 shadow-sm">
            <p className="text-gray-800 leading-relaxed"><strong>📜 Evangelio:</strong> {lectura["evangelio"] || "No disponible"}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Cargando lectura...</p>
      )}
    </div>
  );
};

export default ReflexionDetalle;

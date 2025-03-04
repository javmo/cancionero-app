import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReflexionService from "../services/ReflexionService";
import ScrapingService from "../services/ScrapingService";
import { FaShareAlt, FaArrowLeft, FaCheck, FaThumbsUp, FaLightbulb } from "react-icons/fa";

const reflexionService = new ReflexionService();
const scrapingService = new ScrapingService();

const ReflexionDetalle = () => {
  const { id } = useParams();
  const [reflexion, setReflexion] = useState(null);
  const [lectura, setLectura] = useState(null);
  const [shared, setShared] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
    } finally {
      setLoading(false);
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
      <Link to="/lecturaSantosFiestas" className="text-blue-500 hover:underline flex items-center gap-2 mb-4">
        <FaArrowLeft /> Volver a Reflexiones
      </Link>

      {reflexion ? (
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📝 Reflexión del Día</h1>
          <p className="text-gray-700 italic">Fecha: {reflexion.fecha}</p>
          <div className="p-4 bg-gray-50 border-l-4 border-blue-500 rounded">
            <p className="text-lg font-semibold text-gray-900">{reflexion.nombre}</p>
            <p className="text-gray-700 mt-2">{reflexion.comentario}</p>
          </div>

          {/* Botones de interacción */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => handleVote("like")}
              className={`flex items-center gap-1 text-blue-500 hover:text-blue-700 transition duration-200 ${
                voted[id] ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={voted[id]}
            >
              <FaThumbsUp /> {reflexion.likes}
            </button>
            <button
              onClick={() => handleVote("inspirar")}
              className={`flex items-center gap-1 text-yellow-500 hover:text-yellow-700 transition duration-200 ${
                voted[id] ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={voted[id]}
            >
              <FaLightbulb /> {reflexion.inspirador}
            </button>
          </div>

          {/* Botón de compartir */}
          <button
            onClick={handleShare}
            className="mt-4 flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded transition duration-300"
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">📖 Lectura del Día</h2>
          <div className="p-4 bg-gray-50 rounded">
            <p><strong>📜 Primera Lectura:</strong> {lectura["Primera lectura"] || "No disponible"}</p>
            <p><strong>📜 Segunda Lectura:</strong> {lectura["Segunda lectura"] || "No disponible"}</p>
            <p><strong>📜 Evangelio:</strong> {lectura["Evangelio"] || "No disponible"}</p>
            <p><strong>🙏 Ángelus:</strong> {lectura["Ángelus"] || "No disponible"}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Cargando lectura...</p>
      )}
    </div>
  );
};

export default ReflexionDetalle;

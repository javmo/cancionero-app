import React, { useState, useEffect } from "react";
import ReflexionService from "../services/ReflexionService";
import { FaThumbsUp, FaLightbulb, FaPaperPlane, FaShareAlt, FaInfoCircle, FaCheck } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";

const reflexionService = new ReflexionService();

const Reflexiones = ({ fecha }) => {
  const [reflexiones, setReflexiones] = useState([]);
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [shared, setShared] = useState(null);
  const [voted, setVoted] = useState({});

  useEffect(() => {
    fetchReflexiones();
    const storedVotes = JSON.parse(localStorage.getItem("reflexionVotes")) || {};
    setVoted(storedVotes);
  }, [fecha]);

  const fetchReflexiones = async () => {
    try {
      const data = await reflexionService.getReflexiones(fecha);
      setReflexiones(data);
    } catch (error) {
      console.error("Error al obtener reflexiones", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comentario.trim()) return;

    setLoading(true);
    const nuevaReflexion = {
      nombre: nombre || "Anónimo",
      comentario,
      fecha,
    };

    try {
      await reflexionService.postReflexion(nuevaReflexion);
      setComentario("");
      setMessage({ type: "success", text: "Reflexión enviada con éxito!" });
      fetchReflexiones();
    } catch (error) {
      setMessage({ type: "error", text: "Error al enviar la reflexión" });
      console.error("Error al enviar la reflexión", error);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleVote = async (id, type) => {
    if (voted[id]) return;

    try {
      if (type === "like") {
        await reflexionService.likeReflexion(id);
      } else {
        await reflexionService.inspirarReflexion(id);
      }
      setVoted((prev) => {
        const updatedVotes = { ...prev, [id]: true };
        localStorage.setItem("reflexionVotes", JSON.stringify(updatedVotes));
        return updatedVotes;
      });
      fetchReflexiones();
    } catch (error) {
      console.error("Error al votar", error);
    }
  };

  const handleShare = (id) => {
    const link = `${window.location.origin}/reflexion/${id}`;
    navigator.clipboard.writeText(link);
    setShared(id);
    setTimeout(() => setShared(null), 2000);
  };

  return (
    <div className="bg-white p-1 md:p-6 rounded shadow-md mb-6 w-full max-w-3xl mx-auto">


      {/* 📌 Sección 1: Lista de Reflexiones con Scroll Interno */}
      <div className="max-h-80 overflow-y-auto space-y-4 mb-6 border border-gray-300 rounded p-3 md:p-6 bg-gray-50 shadow-inner">
        {reflexiones.length > 0 ? (
          reflexiones.map((reflexion) => (
            <div key={reflexion._id} className="border border-gray-200 rounded p-3 md:p-6 shadow bg-white">
              <p className="text-lg font-semibold text-gray-900">{reflexion.nombre}</p>
              <p className="text-gray-700 text-base md:text-lg">{reflexion.comentario}</p>
              <div className="flex items-center gap-4 mt-2">
                <Tooltip title="Me gusta">
                  <button
                    onClick={() => handleVote(reflexion._id, "like")}
                    className="flex items-center gap-1 text-blue-500 hover:text-blue-700 transition duration-200 text-base md:text-lg"
                  >
                    <FaThumbsUp /> {reflexion.likes}
                  </button>
                </Tooltip>
                <Tooltip title="Me inspira">
                  <button
                    onClick={() => handleVote(reflexion._id, "inspirar")}
                    className="flex items-center gap-1 text-yellow-500 hover:text-yellow-700 transition duration-200 text-base md:text-lg"
                  >
                    <FaLightbulb /> {reflexion.inspirador}
                  </button>
                </Tooltip>
                <Tooltip title="Compartir reflexión">
                  <button
                    onClick={() => handleShare(reflexion._id)}
                    className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition duration-200 text-base md:text-lg"
                  >
                    {shared === reflexion._id ? <FaCheck className="text-green-500" /> : <FaShareAlt />} Compartir
                  </button>
                </Tooltip>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center text-base md:text-lg">Sé el primero en compartir tu reflexión ✨</p>
        )}
      </div>

      {/* 📌 Sección 2: Formulario para agregar reflexión */}
      <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
        <p className="flex items-center gap-2 font-semibold text-base md:text-lg">
          <FaInfoCircle className="text-blue-500" /> ¿Tenés algo que te haya hecho pensar hoy?
        </p>
        <p className="text-sm text-gray-700">
          Compartí con la comunidad una reflexión sobre la lectura del día. Puede ser algo que te inspiró,
          una enseñanza que te llegó o simplemente unas palabras que te nacen del corazón. Animate a dejar tu huella. ✨
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-50 p-3 md:p-4 rounded shadow">
        <textarea
          className="w-full border border-gray-300 rounded p-2 text-base md:text-lg bg-white focus:ring focus:ring-blue-300"
          placeholder="Escribe tu reflexión..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        ></textarea>
        <input
          type="text"
          className="border border-gray-300 rounded p-2 w-full text-base md:text-lg bg-white focus:ring focus:ring-blue-300"
          placeholder="Tu nombre (opcional)"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow transition duration-300 text-base md:text-lg"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar Reflexión"} <FaPaperPlane />
        </button>
      </form>

      {message && (
        <div className={`p-3 mt-4 text-white rounded text-base md:text-lg ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default Reflexiones;

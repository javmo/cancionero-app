import React, { useState, useEffect } from "react";
import CancionService from "../services/CancionService";
import { FaMusic, FaPlusCircle, FaSpinner, FaInfoCircle } from "react-icons/fa";

const cancionService = new CancionService();

const CancionesRelacionadas = ({ fecha }) => {
  const [canciones, setCanciones] = useState([]);
  const [nombre, setNombre] = useState("");
  const [titulo, setTitulo] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchCanciones();
  }, [fecha]);

  const fetchCanciones = async () => {
    try {
      const data = await cancionService.getCanciones(fecha);
      setCanciones(data);
    } catch (error) {
      console.error("Error al obtener canciones", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo.trim() || !link.trim()) return;

    setLoading(true);
    const nuevaCancion = {
      fecha,
      nombre: nombre || "Anónimo",
      titulo,
      link,
    };

    try {
      await cancionService.postCancion(nuevaCancion);
      setTitulo("");
      setLink("");
      setMessage({ type: "success", text: "Canción sugerida con éxito! 🎶" });
      fetchCanciones();
    } catch (error) {
      setMessage({ type: "error", text: "Error al sugerir la canción" });
      console.error("Error al sugerir la canción", error);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded shadow-md mb-6 w-full max-w-3xl mx-auto">

      {/* 📌 Sección 1: Lista de Canciones */}
      {canciones.length > 0 ? (
        <div className="space-y-3 md:space-y-4 mb-6">
          {canciones.map((cancion, index) => (
            <div key={index} className="border border-gray-200 rounded p-3 md:p-4 shadow bg-gray-50">
              <p className="text-base md:text-lg font-semibold flex items-center gap-2 text-gray-900">
                <FaMusic /> {cancion.titulo}
              </p>
              <p className="text-gray-700 text-sm md:text-base">
                🎤 Recomendada por: <strong>{cancion.nombre}</strong>
              </p>
              <a
                href={cancion.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 font-semibold hover:underline text-sm md:text-base"
              >
                ▶️ Escuchar en Spotify / YouTube
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-sm md:text-base mb-6">
          Aún no hay canciones sugeridas. ¡Sé el primero en compartir una! 🎶
        </p>
      )}

      {/* 📌 Sección 2: Formulario para agregar canción */}
      <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-900 p-3 md:p-4 mb-4 rounded">
        <p className="flex items-center gap-2 font-semibold text-base md:text-lg">
          <FaInfoCircle /> ¿Tenés una canción que te llena el alma?
        </p>
        <p className="text-sm md:text-base">
          Compartí con la comunidad ese tema que te inspira y te hace sentir más cerca de la fe.
          Puede ser una alabanza, una canción que te haga reflexionar o simplemente una melodía
          que te ponga la piel de gallina. ¡Sumala a la lista y hacela sonar! 🎶
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-4 bg-gray-50 p-3 md:p-4 rounded shadow">
        <input
          type="text"
          className="border border-gray-300 rounded p-2 w-full mb-2 text-sm md:text-base bg-white focus:ring focus:ring-green-300"
          placeholder="Tu nombre (opcional)"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          className="border border-gray-300 rounded p-2 w-full mb-2 text-sm md:text-base bg-white focus:ring focus:ring-green-300"
          placeholder="Título de la canción"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          className="border border-gray-300 rounded p-2 w-full mb-2 text-sm md:text-base bg-white focus:ring focus:ring-green-300"
          placeholder="Enlace de Spotify/YouTube"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow transition duration-300 text-sm md:text-base"
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin" /> : "Sugerir Canción"} <FaPlusCircle />
        </button>
      </form>

      {message && (
        <div className={`p-3 mb-4 text-white rounded text-sm md:text-base ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default CancionesRelacionadas;

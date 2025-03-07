import React, { useState, useEffect } from "react";
import CancionService from "../services/CancionService";
import { 
  FaMusic, FaPlusCircle, FaSpinner, FaInfoCircle, 
  FaCopy, FaWhatsapp, FaCheck 
} from "react-icons/fa"; 

const cancionService = new CancionService();

const CancionesRelacionadas = ({ fecha, lecturas }) => {
  const [canciones, setCanciones] = useState([]);
  const [nombre, setNombre] = useState("");
  const [titulo, setTitulo] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [copied, setCopied] = useState({}); // Estado individual para cada canción

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

  // Obtener el reproductor embebido según el enlace
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

  // Compartir en WhatsApp
  const shareOnWhatsApp = (cancion) => {
    if (!lecturas || !lecturas["evangelio"]) return;

    const cancionUrl = `${window.location.origin}/cancionrelacionada/${cancion._id}`;
    const mensaje = `✨ *Evangelio del Día* ✨\n📅 *Fecha:* ${fecha}\n\n📖 *Evangelio:*\n${lecturas["evangelio"]}\n\n🎶 *Canción recomendada:*\n📌 *${cancion.titulo}* (por ${cancion.nombre})\n🔗 ${cancionUrl}\n\n📝 Reflexionemos y compartamos juntos! 🙌`;

    const encodedMessage = encodeURIComponent(mensaje);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };



  return (
    <div className="bg-white p-1 rounded shadow-md mb-6 w-full max-w-3xl mx-auto">
      {/* 📌 Lista de Canciones */}
      {canciones.length > 0 ? (
        <div className="space-y-4 mb-6">
          {canciones.map((cancion) => (
            <div key={cancion._id} className="border border-gray-300 rounded-lg p-4 shadow-md bg-white">
              <p className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                <FaMusic /> {cancion.titulo}
              </p>
              <p className="text-gray-600 text-sm">
                🎤 Recomendada por: <strong>{cancion.nombre}</strong>
              </p>
              {/* Reproductor embebido */}
              <div className="mt-3">{getEmbedPlayer(cancion.link)}</div>
              
              {/* Botones de acción */}
              <div className="flex justify-between mt-3">
                <button
                  onClick={() => shareOnWhatsApp(cancion)}
                  className="flex items-center gap-1 text-green-700 font-semibold hover:text-green-900 transition duration-200"
                >
                  <FaWhatsapp /> Compartir en WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-sm mb-6">
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

      <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-md shadow">
        <input type="text" placeholder="Tu nombre (opcional)" value={nombre} onChange={(e) => setNombre(e.target.value)} className="border p-2 rounded w-full mb-2"/>
        <input type="text" placeholder="Título de la canción" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="border p-2 rounded w-full mb-2"/>
        <input type="text" placeholder="Enlace de Spotify/YouTube" value={link} onChange={(e) => setLink(e.target.value)} className="border p-2 rounded w-full mb-2"/>
        <button type="submit" className="bg-green-500 text-white p-3 rounded w-full text-lg font-semibold">{loading ? <FaSpinner className="animate-spin" /> : "Sugerir Canción"}</button>
      </form>
    </div>
  );
};

export default CancionesRelacionadas;

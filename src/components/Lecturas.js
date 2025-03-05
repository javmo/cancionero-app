import React, { useState, useEffect } from "react";
import Reflexiones from "./Reflexiones";
import CancionesRelacionadas from "./CancionesRelacionadas";
import ReflexionService from "../services/ReflexionService";
import CancionService from "../services/CancionService";

const reflexionService = new ReflexionService();
const cancionService = new CancionService();

const Lecturas = ({ lecturas, fecha, idioma }) => {
  const [mostrarReflexiones, setMostrarReflexiones] = useState(false);
  const [mostrarCanciones, setMostrarCanciones] = useState(false);
  const [cargandoReflexiones, setCargandoReflexiones] = useState(false);
  const [cargandoCanciones, setCargandoCanciones] = useState(false);
  const [reflexionCount, setReflexionCount] = useState(0);
  const [cancionCount, setCancionCount] = useState(0);
  const [expandirLectura, setExpandirLectura] = useState({});

  useEffect(() => {
    obtenerContadores();
  }, [fecha]);

  const obtenerContadores = async () => {
    try {
      const reflexiones = await reflexionService.getReflexiones(fecha);
      const canciones = await cancionService.getCanciones(fecha);
      setReflexionCount(reflexiones.length);
      setCancionCount(canciones.length);
    } catch (error) {
      console.error("Error al obtener contadores", error);
    }
  };

  const toggleExpandir = (tipo) => {
    setExpandirLectura((prev) => ({ ...prev, [tipo]: !prev[tipo] }));
  };

  const traducirTitulo = (titulo) => {
    if (idioma === "la") {
      switch (titulo) {
        case "primeraLectura":
          return "Lectio Prima";
        case "segundaLectura":
          return "Lectio Secunda";
        case "evangelio":
          return "Evangelium";
        case "angelus":
          return "Angelus";
        default:
          return titulo;
      }
    }
    return titulo;
  };

  const shareOnWhatsApp = () => {
    if (!lecturas || !lecturas.evangelio || lecturas.evangelio === "No disponible") return;

    const currentUrl = encodeURIComponent(window.location.href);
    let mensaje = `✨ *Lectura del Evangelio de hoy* ✨\n📅 *Fecha:* ${fecha}\n\n`;

    mensaje += `📖 *Evangelio:*\n${lecturas.evangelio}\n\n`;

    mensaje += `💭 *¿Qué te dejó esta lectura?* Compartí tu reflexión, lo que te hizo pensar o sentir.\n\n`;
    mensaje += `🎶 *¿Se te vino a la mente una canción especial?* Contanos qué tema te inspira hoy. 🎵🙌\n\n`;
    mensaje += `🔗 *Sumate a la conversación y encontrá más reflexiones:* ${decodeURIComponent(currentUrl)}`;

    const encodedMessage = encodeURIComponent(mensaje);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border-2 border-blue-400 mb-6 relative w-full max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-600 border-b-2 border-blue-400 pb-3 mb-4 text-center">
        📖 {idioma === "la" ? "Lectiones Diei" : "Lecturas del Día"}
      </h2>
      <div className="space-y-4 text-base md:text-lg text-gray-800">
        {["primeraLectura", "segundaLectura", "evangelio", "angelus"].map((tipo) => {
          const contenido = lecturas?.[tipo] || "No disponible";
          if (contenido !== "No disponible") {
            return (
              <div key={tipo}>
                <p>
                  <strong>📖 {traducirTitulo(tipo)}</strong>
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {expandirLectura[tipo]
                    ? contenido
                    : `${contenido.substring(0, 300)}...`}
                </p>
                {contenido.length > 300 && (
                  <button
                    onClick={() => toggleExpandir(tipo)}
                    className="text-blue-500 font-semibold hover:underline text-sm"
                  >
                    {expandirLectura[tipo] ? (idioma === "la" ? "Legere minus" : "Leer menos") : (idioma === "la" ? "Legere plura" : "Leer más")}
                  </button>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>

      <button
        onClick={shareOnWhatsApp}
        className="mt-4 w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md flex justify-center items-center mx-auto text-lg transition-transform transform hover:scale-105"
      >
        📤 {idioma === "la" ? "Communicare" : "Compartir"}
      </button>

      <div className="mt-6">
        <button
          onClick={() => {
            setCargandoReflexiones(true);
            setTimeout(() => {
              setMostrarReflexiones(!mostrarReflexiones);
              setCargandoReflexiones(false);
            }, 500);
          }}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md flex items-center justify-between text-lg transition-transform transform hover:scale-105 hover:shadow-lg"
        >
          📝 {idioma === "la" ? "Cogitationes Diei" : "Reflexiones del Día"} ({reflexionCount})
          <span className="transition-transform">
            {mostrarReflexiones ? "⬆" : "⬇"}
          </span>
        </button>
        {mostrarReflexiones && <Reflexiones fecha={fecha} />}
      </div>

      <div className="mt-6">
        <button
          onClick={() => {
            setCargandoCanciones(true);
            setTimeout(() => {
              setMostrarCanciones(!mostrarCanciones);
              setCargandoCanciones(false);
            }, 500);
          }}
          className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md flex items-center justify-between text-lg transition-transform transform hover:scale-105 hover:shadow-lg"
        >
          🎶 {idioma === "la" ? "Cantiones ad Iter" : "Canciones para el Camino"} ({cancionCount})
          <span className="transition-transform">
            {mostrarCanciones ? "⬆" : "⬇"}
          </span>
        </button>
        {mostrarCanciones && <CancionesRelacionadas fecha={fecha} lecturas={lecturas} />}
      </div>
    </div>
  );
};

export default Lecturas;

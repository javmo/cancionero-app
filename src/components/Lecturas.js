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
        case "Primera lectura":
          return "Lectio Prima";
        case "Segunda lectura":
          return "Lectio Secunda";
        case "Evangelio":
          return "Evangelium";
        case "Ángelus":
          return "Angelus";
        default:
          return titulo;
      }
    }
    return titulo;
  };

  const shareOnWhatsApp = () => {
    if (!lecturas) return;

    const currentUrl = encodeURIComponent(window.location.href);
    let mensaje = `✨ *${idioma === "la" ? "Lectiones Diei" : "Lecturas del Día"}* ✨\n📅 *Fecha:* ${fecha}\n\n`;

    const agregarLecturaSiDisponible = (titulo, contenido) => {
      if (contenido && contenido !== "No disponible") {
        return `📖 *${traducirTitulo(titulo)}:*\n${contenido.normalize("NFKD")}\n\n`;
      }
      return "";
    };

    mensaje += agregarLecturaSiDisponible("Primera Lectura", lecturas["Primera lectura"]);
    mensaje += agregarLecturaSiDisponible("Segunda Lectura", lecturas["Segunda lectura"]);
    mensaje += agregarLecturaSiDisponible("Evangelio", lecturas["Evangelio"]);
    mensaje += agregarLecturaSiDisponible("Ángelus", lecturas["Ángelus"]);

    mensaje += `💭 *${
      idioma === "la" ? "Quid tibi reliquerunt hae lectiones?" : "¿Qué te dejó esta lectura?"
    }*\n✨\n\n`;
    mensaje += `🎶 *${
      idioma === "la" ? "Habesne carmen quod te movet?" : "¿Se te vino a la mente una canción especial?"
    }*\n🎵🙌\n\n`;
    mensaje += `🔗 *${
      idioma === "la" ? "Participa et invenire plures cogitationes" : "Sumate a la conversación y encontrá más reflexiones"
    }*\n${decodeURIComponent(currentUrl)}`;

    const encodedMessage = encodeURIComponent(mensaje);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border-2 border-blue-400 mb-6 relative w-full max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-600 border-b-2 border-blue-400 pb-3 mb-4 text-center">
        📖 {idioma === "la" ? "Lectiones Diei" : "Lecturas del Día"}
      </h2>
      <div className="space-y-4 text-base md:text-lg text-gray-800">
        {["Primera lectura", "Segunda lectura", "Evangelio", "Ángelus"].map((tipo) => {
          if (lecturas[tipo] && lecturas[tipo] !== "No disponible") {
            return (
              <div key={tipo}>
                <p>
                  <strong>📖 {traducirTitulo(tipo)}</strong>
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {expandirLectura[tipo]
                    ? lecturas[tipo]
                    : `${lecturas[tipo].substring(0, 300)}...`}
                </p>
                {lecturas[tipo].length > 300 && (
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
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md flex items-center justify-between text-lg transition-transform transform hover:scale-105"
        >
          📝 {idioma === "la" ? "Cogitationes Diei" : "Reflexiones del Día"} ({reflexionCount})
          <span>{cargandoReflexiones ? "Cargando..." : mostrarReflexiones ? "⬆" : "⬇"}</span>
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
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-md flex items-center justify-between text-lg transition-transform transform hover:scale-105"
        >
          🎶 {idioma === "la" ? "Cantiones ad Iter" : "Canciones para el Camino"} ({cancionCount})
          <span>{cargandoCanciones ? "Cargando..." : mostrarCanciones ? "⬆" : "⬇"}</span>
        </button>
        {mostrarCanciones && <CancionesRelacionadas fecha={fecha} />}
      </div>
    </div>
  );
};

export default Lecturas;

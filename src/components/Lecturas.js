import React, { useState, useEffect } from "react";
import Reflexiones from "./Reflexiones";
import CancionesRelacionadas from "./CancionesRelacionadas";
import ReflexionService from "../services/ReflexionService";
import CancionService from "../services/CancionService";
import { FaShareAlt } from "react-icons/fa";

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

  // Traducción de los títulos
  const traducirTitulo = (tipo) => {
    const titulos = {
      primeraLectura: idioma === "la" ? "Lectio Prima" : "Primera Lectura",
      segundaLectura: idioma === "la" ? "Lectio Secunda" : "Segunda Lectura",
      evangelio: idioma === "la" ? "Evangelium" : "Evangelio",
      angelus: idioma === "la" ? "Angelus" : "Ángelus",
    };

    return titulos[tipo] || tipo;
  };

  // Compartir lectura en WhatsApp con un mensaje cálido y sin recortar
  const compartirLectura = (tipo) => {
    const textoLectura = lecturas[tipo] || "No disponible";
    if (textoLectura === "No disponible") return;

    const currentUrl = `${window.location.origin}`;

    const mensaje = `📖 *${traducirTitulo(tipo)}*\n📅 *Fecha:* ${fecha}\n\n` +
      `${textoLectura}\n\n` +  // Ahora la lectura se envía completa
      `💭 ¿Qué te pareció esta lectura? Podés compartir tu reflexión o una canción que te haya inspirado. 🎶✨\n\n` +
      `🔗 Sumate a la conversación y descubrí más reflexiones acá: ${currentUrl}`;

    const encodedMessage = encodeURIComponent(mensaje);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };


  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border-2 border-blue-400 mb-6 relative w-full max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-600 border-b-2 border-blue-400 pb-3 mb-4 text-center">
        📖 {idioma === "la" ? "Lectiones Diei" : "Lecturas del Día"}
      </h2>

      <div className="space-y-6 text-base md:text-lg text-gray-800">
        {["primeraLectura", "segundaLectura", "evangelio", "angelus"].map((tipo) => {
          const contenido = lecturas?.[tipo] || "No disponible";
          if (contenido !== "No disponible") {
            return (
              <div key={tipo} className="bg-gray-100 p-4 rounded-lg shadow-sm border-l-4 border-blue-400">
                <p className="text-xl font-bold text-blue-700 flex items-center gap-2">
                  📖 {traducirTitulo(tipo)}
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
                {/* Botón para compartir cada lectura */}
                <button
                  onClick={() => compartirLectura(tipo)}
                  className="mt-2 text-green-600 hover:text-green-800 font-semibold flex items-center gap-2 text-sm"
                >
                  <FaShareAlt /> {idioma === "la" ? "Communicare" : "Compartir"} {traducirTitulo(tipo)}
                </button>
              </div>
            );
          }
          return null;
        })}
      </div>

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
          <span className="transition-transform">{mostrarReflexiones ? "⬆" : "⬇"}</span>
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
          <span className="transition-transform">{mostrarCanciones ? "⬆" : "⬇"}</span>
        </button>
        {mostrarCanciones && <CancionesRelacionadas fecha={fecha} lecturas={lecturas} />}
      </div>
    </div>
  );
};

export default Lecturas;

import React, { useEffect, useState } from "react";
import ScrapingService from "../services/ScrapingService";
import Lecturas from "./Lecturas";
import Santos from "./Santos";
import Fiestas from "./Fiestas";
import { BeatLoader } from "react-spinners";

const scrapingService = new ScrapingService();

const traducirTexto = (texto, idioma) => {
  const traducciones = {
    "Lecturas y Santos del Día": {
      es: "🔥 Encendé tu Espíritu: Lecturas y Santos del Día",
      la: "🔥 Accende Spiritum Tuum: Lectiones et Sancti Diei"
    },
    "Selecciona una fecha": {
      es: "📅 Selecciona una fecha:",
      la: "📅 Elige diem:"
    },
    "Cargando datos...": {
      es: "⏳ Cargando datos...",
      la: "⏳ Data onerans..."
    },
    "Error al cargar los datos. Intenta nuevamente más tarde.": {
      es: "❌ Error al cargar los datos. Intenta nuevamente más tarde.",
      la: "❌ Error dum data oneraretur. Iterum conare postea."
    }
  };

  return traducciones[texto]?.[idioma] || texto;
};

const LecturasSantosFiestas = ({ idioma }) => {
  const [lecturas, setLecturas] = useState(null);
  const [santos, setSantos] = useState(null);
  const [fiestas, setFiestas] = useState(null);
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const lecturaRes = await scrapingService.getLecturaVa(fecha);
        const santosRes = await scrapingService.getSantos(fecha);
        const fiestasRes = await scrapingService.getFiestas(fecha);

        setLecturas(lecturaRes || {});
        setSantos(santosRes || { santos: [] });
        setFiestas(fiestasRes || { fiestas: [] });
      } catch (error) {
        console.error("Error fetching data", error);
        setError(traducirTexto("Error al cargar los datos. Intenta nuevamente más tarde.", idioma));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fecha, idioma]);

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      
      {/* Título Principal */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-6">
        {traducirTexto("Lecturas y Santos del Día", idioma)}
      </h1>

      {/* Selector de Fecha */}
      <div className="flex flex-col items-center mb-6">
        <label className="text-gray-600 font-semibold mb-2">
          {traducirTexto("Selecciona una fecha", idioma)}
        </label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="border p-3 rounded-lg text-lg shadow-md focus:ring-2 focus:ring-blue-400 transition duration-200"
        />
      </div>

      {/* Estado de Carga */}
      {loading && (
        <div className="flex justify-center my-6">
          <BeatLoader color="#2563EB" size={12} />
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500 text-center font-semibold bg-red-100 p-2 rounded-md shadow">
          {error}
        </p>
      )}

      {/* Sección de Lecturas */}
      {!loading && lecturas && (
        <div className="mt-6">
          <Lecturas lecturas={lecturas} fecha={fecha} idioma={idioma} />
        </div>
      )}

      {/* Sección de Santos */}
      {!loading && santos?.santos?.length > 0 && (
        <div className="mt-6">
          <Santos santos={santos.santos} idioma={idioma} />
        </div>
      )}

      {/* Sección de Fiestas */}
      {!loading && fiestas?.fiestas?.length > 0 && (
        <div className="mt-6">
          <Fiestas fiestas={fiestas.fiestas} fecha={fecha} idioma={idioma} />
        </div>
      )}
    </div>
  );
};

export default LecturasSantosFiestas;

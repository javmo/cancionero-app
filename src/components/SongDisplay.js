import React, { useState, useRef, useEffect } from 'react'; // Asegúrate de importar useRef y useEffect
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const SPACE_UNIT = 8.84; // Ancho del espacio unitario en píxeles

const SongDisplay = ({  song, onBack }) => {
    const [isScrolling, setIsScrolling] = useState(false);
    const [scrollSpeed, setScrollSpeed] = useState(50); // Velocidad de scroll en milisegundos
    const scrollRef = useRef(null); // Definición de scrollRef con useRef

    useEffect(() => {
        return () => {
            clearInterval(scrollRef.current); // Limpia el intervalo cuando el componente se desmonta
        };
    }, []);

    const renderChordsLine = (acordes, espacios) => {
        let renderedLine = [];
        let currentSpaceWidth = 0;

        acordes.forEach((chord, index) => {
            if (espacios[index] > 0) {
                currentSpaceWidth += espacios[index] * SPACE_UNIT;
            }
            if (chord) {
                if (currentSpaceWidth > 0) {
                    renderedLine.push(
                        <span style={{ display: 'inline-block', width: `${currentSpaceWidth}px` }} key={`space-${index}`}></span>
                    );
                    currentSpaceWidth = 0;
                }
                renderedLine.push(
                    <sup key={`chord-${index}`} className="font-bold text-blue-500">{chord}</sup>
                );
            }
        });

        return renderedLine;
    };

    const toggleAutoScroll = () => {
        setIsScrolling(!isScrolling);
        console.log("isScrolling:", !isScrolling);
    };

    useEffect(() => {
        const container = document.getElementById("lyricsContainer");
        if (isScrolling) {
            scrollRef.current = setInterval(() => {
                container.scrollTop += 1; // Desplaza el contenedor 1px hacia abajo
            }, scrollSpeed);
        } else {
            clearInterval(scrollRef.current); // Limpia el intervalo cuando el autoscroll se desactiva
        }
    }, [isScrolling, scrollSpeed]);
    

    return (
        <div id="lyricsContainer" className="p-4 text-sm sm:text-base bg-white rounded-lg shadow-lg overflow-y-auto max-h-[calc(100vh-10rem)]">
            <button onClick={onBack} className="absolute top-4 left-4 text-gray-600 text-4xl z-10">
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h1 className="text-xl font-bold text-center mb-1">{song.title}</h1>
            <h2 className="text-lg text-center text-gray-600">{song.interprete}</h2>
            <h3 className="text-md text-center text-gray-500 mb-4">Álbum: {song.album}</h3>
            <div className="text-center text-blue-600 mb-2">Tono: {song.tono}</div>
            <div className="flex justify-center space-x-2">
                <button onClick={toggleAutoScroll} className="bg-blue-500 text-white px-4 py-2 rounded shadow">
                    {isScrolling ? 'Detener Auto-Scroll' : 'Iniciar Auto-Scroll'}
                </button>
                <button onClick={() => setScrollSpeed(prev => Math.max(prev - 10, 10))} className="bg-green-500 text-white px-4 py-2 rounded shadow flex items-center">
                    <FontAwesomeIcon icon={faPlus} className="mr-1" /></button>
                <button onClick={() => setScrollSpeed(prev => prev + 10)} className="bg-red-500 text-white px-4 py-2 rounded shadow flex items-center">
                    <FontAwesomeIcon icon={faMinus} className="mr-1" /></button>
            </div>
            {song.partes.map((parte, index) => (
                <div key={index} className="my-4" >
                    {parte.letra && <p className="whitespace-nowrap leading-none tracking-widest" >{parte.letra}</p>}
                    <div className="chords flex whitespace-nowrap justify-start mt-2">
                        {renderChordsLine(parte.acordes, parte.espacios_entre_acordes)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SongDisplay;


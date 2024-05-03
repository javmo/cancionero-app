import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faArrowLeft, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { transposeChord, notes } from '../utils/chordUtils'; // Asegúrate de que el path sea correcto

const SPACE_UNIT = 8.84; // Ancho del espacio unitario en píxeles

const SongDisplay = ({ song, onBack }) => {
    const [isScrolling, setIsScrolling] = useState(false);
    const [scrollSpeed, setScrollSpeed] = useState(50); // Velocidad de auto-scroll
    const [keyShift, setKeyShift] = useState(0); // Desplazamiento de tono inicial
    const scrollRef = useRef(null); // Referencia para el intervalo de auto-scroll

    // Efecto para manejar el auto-scroll
    useEffect(() => {
        const scrollInterval = scrollRef.current;
        if (isScrolling) {
            scrollRef.current = setInterval(() => {
                document.getElementById("lyricsContainer").scrollTop += 1;
            }, 101 - scrollSpeed); // Invertimos la relación de velocidad
        } else {
            clearInterval(scrollInterval);
        }
    
        return () => clearInterval(scrollRef.current); // Limpieza al desmontar
    }, [isScrolling, scrollSpeed]);
    

    // Función para renderizar las líneas de acordes con espacios adecuados
    const renderChordsLine = (acordes, espacios) => {
        let renderedLine = [];
        let currentSpaceWidth = 0;

        acordes.forEach((chord, index) => {
            let transposedChord = transposeChord(chord, keyShift);
            if (espacios[index] > 0) {
                currentSpaceWidth += espacios[index] * SPACE_UNIT;
            }
            if (transposedChord) {
                if (currentSpaceWidth > 0) {
                    renderedLine.push(
                        <span style={{ display: 'inline-block', width: `${currentSpaceWidth}px` }} key={`space-${index}`}></span>
                    );
                    currentSpaceWidth = 0;
                }
                renderedLine.push(
                    <sup key={`chord-${index}`} className="font-bold text-blue-500">{transposedChord}</sup>
                );
            }
        });

        return renderedLine;
    };

    // Función para alternar el estado de auto-scroll
    const toggleAutoScroll = () => setIsScrolling(!isScrolling);

    // Cálculo del tono mostrado, ajustando según keyShift
    const displayedKey = notes[(notes.indexOf(song.tono.toUpperCase()) + keyShift + 12) % 12] || song.tono;

    return (
        <div id="lyricsContainer" className="p-4 text-sm sm:text-base bg-white rounded-lg shadow-lg overflow-y-auto max-h-[calc(100vh-10rem)] sticky top-0">
            <div className="sticky top-0 z-50 bg-white p-4">
                <button onClick={onBack} className="text-gray-600 text-4xl">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div className="text-center text-blue-600 mb-2 flex justify-center items-center">
                    <button onClick={() => setKeyShift(prev => Math.max(prev - 1, -12))} className="bg-blue-500 text-white px-4 py-2 rounded shadow">
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="mx-4">Tono: {displayedKey}</span>
                    <button onClick={() => setKeyShift(prev => Math.min(prev + 1, 12))} className="bg-blue-500 text-white px-4 py-2 rounded shadow">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
                <div className="flex justify-center space-x-2 mb-4">
                    <button onClick={toggleAutoScroll} className={`bg-${isScrolling ? 'red' : 'green'}-500 text-white px-4 py-2 rounded shadow`}>
                        <FontAwesomeIcon icon={isScrolling ? faPause : faPlay} />
                    </button>
                    <input type="range" min="10" max="100" value={scrollSpeed} onChange={(e) => setScrollSpeed(Number(e.target.value))} className="w-1/2" />
                </div>
            </div>
            {song.partes.map((parte, index) => (
                <div key={index} className="my-4">
                    {parte.letra && <p className="whitespace-nowrap leading-none tracking-widest">{parte.letra}</p>}
                    <div className="chords flex whitespace-nowrap justify-start mt-2">
                        {renderChordsLine(parte.acordes, parte.espacios_entre_acordes)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SongDisplay;

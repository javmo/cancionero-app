import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faArrowLeft, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { transposeChord, notes } from '../utils/chordUtils';
import ModalChord from './ModalChord';

const SPACE_UNIT = 8.84; // Ancho del espacio unitario en píxeles

const SongDisplay = ({ song, onBack }) => {
    const [isScrolling, setIsScrolling] = useState(false);
    const [scrollSpeed, setScrollSpeed] = useState(50); // Velocidad de auto-scroll
    const [keyShift, setKeyShift] = useState(0); // Desplazamiento de tono inicial
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const [modalChordName, setModalChordName] = useState('');

    const scrollRef = useRef(null); // Referencia para el intervalo de auto-scroll

    useEffect(() => {
        if (isScrolling) {
            scrollRef.current = setInterval(() => {
                document.getElementById("lyricsContainer").scrollTop += 1;
            }, 101 - scrollSpeed);
        } else {
            clearInterval(scrollRef.current);
        }
        return () => clearInterval(scrollRef.current);
    }, [isScrolling, scrollSpeed]);

    const openChordModal = (chordName) => {
        const imageUrl = `${process.env.REACT_APP_API_URL}/chords/image/${encodeURIComponent(chordName)}`;
        setModalImage(imageUrl);
        setModalChordName(chordName);
        setIsModalOpen(true);
    };

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
                    renderedLine.push(<span style={{ display: 'inline-block', width: `${currentSpaceWidth}px` }} key={`space-${index}`}></span>);
                    currentSpaceWidth = 0;
                }
                renderedLine.push(<sup key={`chord-${index}`} className="font-bold text-blue-400 cursor-pointer hover:underline" onClick={() => openChordModal(transposedChord)}>{transposedChord}</sup>);
            }
        });

        return renderedLine;
    };

    const toggleAutoScroll = () => setIsScrolling(!isScrolling);

    return (
        <div id="lyricsContainer" className="p-2  bg-dark-800 text-white rounded-lg shadow-lg overflow-y-auto 
        py-1  max-h-[calc(100vh-2rem)]">
            <div className="sticky top-0 z-50 bg-black bg-opacity-10 p-2 rounded-lg">
                <button onClick={onBack} className="text-3xl text-white mb-2">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div className="text-center text-blue-400 mb-2 flex justify-center items-center">
                    <button onClick={() => setKeyShift(prev => Math.max(prev - 1, -12))} className="px-2 py-1 text-white btn-primary">
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="mx-2">Tono: {notes[(notes.indexOf(song.tono.toUpperCase()) + keyShift + 12) % 12]}</span>
                    <button onClick={() => setKeyShift(prev => Math.min(prev + 1, 12))} className="px-2 py-1 text-white btn-primary">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
                <div className="flex justify-center space-x-2 mb-1">
                    <button onClick={toggleAutoScroll} className={`px-3 py-1 text-white ${isScrolling ? 'bg-red-500' : 'bg-green-500'}`}>
                        <FontAwesomeIcon icon={isScrolling ? faPause : faPlay} />
                    </button>
                    <input type="range" min="10" max="100" value={scrollSpeed} onChange={(e) => setScrollSpeed(Number(e.target.value))} className="w-1/2" />
                </div>
            </div>
            
                {song.partes.map((parte, index) => (
                    <div key={index} className="my-3">
                        {parte.letra && <p className="whitespace-nowrap ">{parte.letra}</p>}
                        <div className="chords flex whitespace-nowrap justify-start ">
                            {renderChordsLine(parte.acordes, parte.espacios_entre_acordes)}
                        </div>
                    </div>
                ))}
            
            <ModalChord isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Acorde: ${modalChordName}`} imageUrl={modalImage} />
        </div>
    );
};

export default SongDisplay;

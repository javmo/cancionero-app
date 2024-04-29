import React, { useState } from 'react';
import { transposeChord } from '../utils/transposeChord';

const CHORD_SPACE_WIDTH = 53.04; // ancho del espacio para los acordes en píxeles

const SongDisplay = ({ song }) => {
    const [currentTone, setCurrentTone] = useState(song.tono);

    const handleToneChange = (increment) => {
        setCurrentTone(transposeChord(currentTone, increment));
    };

    const renderChord = (chord, isSpace) => {
        if (isSpace) {
            // Si es un espacio, retornar un div con un ancho fijo.
            return <div style={{ display: 'inline-block', width: `${CHORD_SPACE_WIDTH}px` }}>&nbsp;</div>;
        } else {
            // Si es un acorde, transponer y retornar como superíndice.
            return <sup className="chord">{transposeChord(chord, currentTone - song.tono)}</sup>;
        }
    };

    const combineLyricsAndChords = (letra, acordesArray) => {
        const combined = [];
        let acordeIndex = 0;

        // Procesar cada palabra y acorde
        letra.split(' ').forEach((word, index) => {
            if (acordesArray[acordeIndex] === '') {
                // Si el elemento de acorde actual es un espacio, añadir el espacio para acordes
                combined.push(renderChord('', true));
                acordeIndex++; // Mover al siguiente elemento de acorde
            }

            if (acordesArray[acordeIndex]) {
                // Si el elemento de acorde actual es un acorde, añadir el acorde
                combined.push(renderChord(acordesArray[acordeIndex], false));
                acordeIndex++; // Mover al siguiente elemento de acorde
            }

            // Añadir la palabra actual
            combined.push(<span key={`word-${index}`}>{word} </span>);
        });

        // Agregar espacios al final si hay acordes restantes
        while (acordeIndex < acordesArray.length) {
            if (acordesArray[acordeIndex] === '') {
                combined.push(renderChord('', true));
            } else {
                combined.push(renderChord(acordesArray[acordeIndex], false));
            }
            acordeIndex++;
        }

        return <div className="line">{combined}</div>;
    };

    return (
        <div className="song-display">
            <h1>{song.titulo}</h1>
            <h2>Interprete: {song.interprete}</h2>
            <h3>Álbum: {song.album}</h3>
            <div>Tono actual: {currentTone}</div>
            {song.partes.map((parte, index) => (
                <div key={index} className="parte">
                    {combineLyricsAndChords(parte.letra, parte.acordes)}
                </div>
            ))}
            <div>
                <button onClick={() => handleToneChange(1)}>Subir Tono</button>
                <button onClick={() => handleToneChange(-1)}>Bajar Tono</button>
            </div>
        </div>
    );
};

export default SongDisplay;











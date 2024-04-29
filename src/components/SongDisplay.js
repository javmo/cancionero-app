import React, { useState } from 'react';
import { transposeChord } from '../utils/transposeChord';

const SPACE_UNIT = 8.84; // ancho del espacio unitario en píxeles

const SongDisplay = ({ song }) => {
    const [currentTone, setCurrentTone] = useState(song.tono);

    const handleToneChange = (increment) => {
        setCurrentTone(prevTone => transposeChord(prevTone, increment));
    };

    // Esta función renderiza los acordes con los espacios correspondientes entre ellos.
    const renderChordsLine = (acordes, espacios) => {
        let renderedLine = [];
        let currentSpaceWidth = 0;

        acordes.forEach((chord, index) => {
            // Agrega espacio antes del acorde si es necesario.
            if (espacios[index] > 0) {
                currentSpaceWidth += espacios[index] * SPACE_UNIT;
            }

            if (chord) {
                // Si hay un espacio acumulado, inserta un span con el ancho total de los espacios antes del acorde.
                if (currentSpaceWidth > 0) {
                    renderedLine.push(
                        <span style={{ display: 'inline-block', width: `${currentSpaceWidth}px` }} key={`space-${index}`}></span>
                    );
                    currentSpaceWidth = 0; // Restablece el ancho acumulado de espacio después de agregar el span.
                }

                // Agrega el acorde.
                renderedLine.push(
                    <sup key={`chord-${index}`}>{transposeChord(chord, currentTone - song.tono)}</sup>
                );
            }
        });

        // Si queda espacio sin utilizar al final, agregalo también.
        if (currentSpaceWidth > 0) {
            renderedLine.push(
                <span style={{ display: 'inline-block', width: `${currentSpaceWidth}px` }} key="final-space"></span>
            );
        }

        return renderedLine;
    };

    return (
        <div className="song-display">
            <h1>{song.titulo}</h1>
            <h2>{song.interprete}</h2>
            <h3>{song.album}</h3>
            <div>Tono actual: {currentTone}</div>
            {song.partes.map((parte, index) => (
                <div key={index} className="parte">
                    <p>{parte.letra}</p>
                    <div className="chords">
                        {renderChordsLine(parte.acordes, parte.espacios_entre_acordes)}
                    </div>
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
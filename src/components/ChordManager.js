import React, { useState, useEffect } from 'react';
import SongDisplay from './SongDisplay';
import { transposeChord, notes } from '../utils/transposeChord';

const ChordManager = ({ song }) => {
    const [currentTone, setCurrentTone] = useState(song.tono);
    const [partes, setPartes] = useState(song.partes);

    useEffect(() => {
        const calculateToneDifference = () => {
            const originalIndex = notes.indexOf(song.tono);
            const currentIndex = notes.indexOf(currentTone);
            const diff = (currentIndex - originalIndex + 12) % 12;
            return diff;  // Returns the difference in semitones
        };

        const toneDifference = calculateToneDifference();
        const transposedParts = partes.map(parte => ({
            ...parte,
            acordes: parte.acordes.map(chord => chord ? transposeChord(chord, toneDifference) : chord)
        }));

        setPartes(transposedParts);
    }, [currentTone]);

    const increaseTone = () => {
        const newIndex = (notes.indexOf(currentTone) + 1) % notes.length;
        setCurrentTone(notes[newIndex]);
    };

    const decreaseTone = () => {
        const newIndex = (notes.indexOf(currentTone) - 1 + notes.length) % notes.length;
        setCurrentTone(notes[newIndex]);
    };

    return (
        <div className="p-4">
            <div className="flex justify-center space-x-4 mb-4">
                <button onClick={decreaseTone} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow">
                    Bajar Tono
                </button>
                <button onClick={increaseTone} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow">
                    Subir Tono
                </button>
            </div>
            <SongDisplay song={{ ...song, partes, tono: currentTone }} />
        </div>
    );
};

export default ChordManager;








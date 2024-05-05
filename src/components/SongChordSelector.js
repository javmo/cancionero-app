import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChordsService from '../services/ChordsService';
import SongDisplay from './SongDisplay';
import LoadingIndicator from './LoadingIndicator'; // Asegúrate de que el path sea correcto
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const SongChordSelector = () => {
    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [viewingDetail, setViewingDetail] = useState(false);
    const navigate = useNavigate();
    const { songId } = useParams();

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const chordsService = new ChordsService();
                const fetchedSongs = await chordsService.getChordBySongId(songId);
                setSongs(fetchedSongs);
            } catch (error) {
                console.error('Failed to fetch songs', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSongs();
    }, [songId]);

    const handleSongSelect = (song) => {
        setSelectedSong(song);
        setViewingDetail(true);
    };

    const handleBack = () => {
        setViewingDetail(false);
        setSelectedSong(null);
    };

    if (viewingDetail && selectedSong) {
        return <SongDisplay song={selectedSong} onBack={handleBack} />;
    }

    return (
        <div className="container mx-auto px-4 mt-12 flex flex-col items-center">
            <button onClick={() => navigate(-1)} className="absolute top-4 left-4 text-gray-600 text-4xl z-10">
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            {isLoading ? (
                <LoadingIndicator />
            ) : songs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-w-lg text-center">
                    {songs.map(song => (
                        <button
                            key={song.id}
                            onClick={() => handleSongSelect(song)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {song.title} <br />
                            Intérprete: {song.interprete || "No especificado"} <br />
                            Tono: {song.tono}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center bg-gray-200 rounded-lg shadow-lg text-center p-6 mt-12">
                    <p className="text-2xl mb-4">¡Ups! No se encontraron canciones con acordes.</p>
                    <p className="text-4xl">😢</p>
                </div>
            )}
        </div>
    );
};

export default SongChordSelector;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LyricService from '../services/LyricService';
import LyricPublishService from '../services/LyricPublishService';
import CategoryService from '../services/CategoryService';
import LyricsPublish from '../models/LyricsPublish';

const Modal = ({ isOpen, onClose, song }) => {
    const [lyrics, setLyrics] = useState([]);
    const [preview, setPreview] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isFullLyricVisible, setIsFullLyricVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLyricsAndCategories = async () => {
            if (song) {
                const lyricService = new LyricService();
                const songLyrics = await lyricService.getLyric(song.lyric);
                const lyricsArray = Array.isArray(songLyrics.text) ? songLyrics.text : [songLyrics.text];
                setLyrics(lyricsArray);
                const previewText = lyricsArray.slice(0, 3).join('\n').substring(0, 150);
                setPreview(previewText + (lyricsArray.join('\n').length > 150 ? '...' : ''));
            }
            const categoryService = new CategoryService();
            const fetchedCategories = await categoryService.getCategories();
            setCategories(fetchedCategories);
            if (fetchedCategories.length > 0) {
                setSelectedCategory(fetchedCategories[0]._id);
            }
        };

        fetchLyricsAndCategories();
    }, [song]);

    const handlePublish = async () => {
        const publishService = new LyricPublishService();
        const lyricPub = new LyricsPublish(song._id, selectedCategory);
        await publishService.postLyricPublish(lyricPub.toJson());
        onClose();
    };

    const toggleFullLyrics = () => {
        setIsFullLyricVisible(!isFullLyricVisible);
    };

    const handleNavigateToSongChordSelector = () => {
        navigate(`/songChordSelector/${song._id}`);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="card w-full max-w-lg p-6 bg-gray-900 text-white">
                <h2 className="text-xl font-bold mb-4">{song.title}</h2>
                <p className="text-sm mb-4">
                    {isFullLyricVisible ? lyrics.join('\n') : preview}
                </p>
                <button
                    onClick={toggleFullLyrics}
                    className="text-blue-500 hover:text-blue-700 text-sm mb-4"
                >
                    {isFullLyricVisible ? 'Ver menos' : 'Ver más'}
                </button>
                <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="w-full p-2 mb-4 text-sm bg-gray-100 rounded-lg focus:bg-white border-gray-300 text-black"
                >
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.categoryType}</option>
                    ))}
                </select>
                <div className="flex justify-around items-center">
                    <button
                        onClick={onClose}
                        className="btn-danger"
                    >
                        Cerrar
                    </button>
                    <button
                        onClick={handleNavigateToSongChordSelector}
                        className="btn-primary"
                    >
                        Acordes
                    </button>
                    <button
                        onClick={handlePublish}
                        className="btn-post"
                    >
                        Publicar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;

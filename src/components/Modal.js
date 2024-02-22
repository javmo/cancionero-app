import React, { useState, useEffect } from 'react';
import LyricService from '../services/LyricService';
import LyricPublishService from '../services/LyricPublishService'; // Asume que tienes un servicio similar
import CategoryService from '../services/CategoryService'; // Asume que tienes este servicio para obtener el orden
import LyricsPublish from '../models/LyricsPublish'; // Asume que tienes este modelo

const Modal = ({ isOpen, onClose, song }) => {
    const [lyrics, setLyrics] = useState([]);
    const [preview, setPreview] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isFullLyricVisible, setIsFullLyricVisible] = useState(false);
    useEffect(() => {
        const fetchLyricsAndCategories  = async () => {
            if (song) {
                const publishService = new LyricPublishService();
                const lyricService = new LyricService();
                const songLyrics = await lyricService.getLyric(song.lyric);
                const lyricsArray = Array.isArray(songLyrics.text) ? songLyrics.text : [songLyrics.text];
                setLyrics(lyricsArray);
                // Crear una vista previa acortada de los versos
                const previewText = lyricsArray.slice(0, 3).join('\n').substring(0, 150); // Ajusta según tus necesidades
                setPreview(previewText + (lyricsArray.join('\n').length > 150 ? '...' : ''));
            }
            const categoryService = new CategoryService();
            const fetchedCategories = await categoryService.getCategories(); // Asume este método devuelve las categorías
            setCategories(fetchedCategories);
            if (fetchedCategories.length > 0) {
                setSelectedCategory(fetchedCategories[0]._id); // Establecer por defecto el ID de la primera categoría disponible
            }
        };

        fetchLyricsAndCategories ();
    }, [song]);

    const handlePublish = async () => {
        const publishService = new LyricPublishService();
        const lyricPub = new LyricsPublish(song._id,selectedCategory);
        // Preparar el cuerpo de la solicitud

        console.log(lyricPub.toJson()); // Asegúrate de que el cuerpo de la solicitud sea correcto

        // Llamar al método de publicación con el cuerpo de la solicitud
        await publishService.postLyricPublish(lyricPub.toJson());
        onClose(); // Cierra el modal después de publicar
    };

    const toggleFullLyrics = () => {
        setIsFullLyricVisible(!isFullLyricVisible);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-4 sm:p-6 border w-11/12 max-w-md sm:max-w-lg shadow-lg rounded-md bg-white">
                <div className="mb-4 overflow-y-auto max-h-96">
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">{song.title}</h2>
                    <p className="text-sm text-gray-700 mb-4">
                        {isFullLyricVisible ? lyrics.join('\n') : preview}
                    </p>
                    <button
                        onClick={toggleFullLyrics}
                        className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                        {isFullLyricVisible ? 'Ver menos' : 'Ver más'}
                    </button>
                    <select 
                        value={selectedCategory} 
                        onChange={e => setSelectedCategory(e.target.value)} 
                        className="w-full p-2 mb-4 text-sm bg-gray-100 rounded-lg focus:bg-white border-gray-300"
                    >
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>{category.categoryType}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-around items-center">
                    <button 
                        onClick={onClose} 
                        className="py-3 px-5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                    >
                        Cerrar
                    </button>
                    <button 
                        onClick={handlePublish} 
                        className="py-3 px-5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                    >
                        Publicar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;


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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 transition-opacity duration-300 ease-in-out">
  <div className="relative top-1/4 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white transition-transform duration-300 ease-in-out transform-gpu">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">{song.title}</h2>
                    <p className="text-gray-700">{preview || 'Loading lyrics...'}</p>
                    {/* Selector para la categoría de publicación */}
                    <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="mb-4">
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>{category.categoryType}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-between items-center">
                    <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Cerrar</button>
                    <button onClick={handlePublish} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Publicar</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate desde React Router

const PublishedSongItem = ({
  song,
  categories,
  selectedCategory,
  onCategoryChange,
  onUpdateCategory,
  onRemoveSong,
}) => {
  const navigate = useNavigate(); // Obtenemos la función navigate desde React Router

  const handleNavigateToSongChordSelector = (songId) => {
    navigate(`/songChordSelector/${songId}`); // Navega al SongChordSelector con el ID del song
  };

  return (
    <li className="py-4 px-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-150 rounded-lg my-2 shadow-sm">
      <div className="flex flex-col">
        <p className="text-lg font-semibold text-blue-700">{song.songTitle}</p>
        <div className="flex items-center mt-1">
          <label className="text-sm font-medium text-gray-700 mr-2">Categoría:</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(song._id, e.target.value)}
            className="text-sm p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.categoryType}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => handleNavigateToSongChordSelector(song._id)} // Utiliza la función para navegar al SongChordSelector
          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors duration-150 mr-2"
          aria-label="Ver detalles"
        >
          <FontAwesomeIcon icon={faEye} />
        </button>
        <button
          onClick={() => onUpdateCategory(song._id)}
          className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-150 mr-2"
          aria-label="Actualizar"
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          onClick={() => onRemoveSong(song._id)}
          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors duration-150"
          aria-label="Eliminar"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </li>
  );
};

export default PublishedSongItem;

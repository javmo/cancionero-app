// components/PublishedSongItem.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const PublishedSongItem = ({ song, categories, selectedCategory, onCategoryChange, onUpdateCategory, onRemoveSong }) => {
  return (
    <li className="py-4 px-4 flex justify-between items-center bg-white border-b border-gray-300 hover:shadow-lg transition-shadow duration-150 rounded-md">
      <div>
        <p className="text-xl text-blue-600 font-semibold">{song.songTitle}</p>
        <p className="text-sm text-gray-700 font-medium">
          Categoría: 
          <select
            value={selectedCategory}
            onChange={e => onCategoryChange(song._id, e.target.value)}
            className="ml-2"
          >
            {categories.map(category => (
              <option key={category._id} value={category._id}>{category.categoryType}</option>
            ))}
          </select>
        </p>
      </div>
      <button
        onClick={() => onUpdateCategory(song._id)}
        className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-700 transform transition ease-in-out duration-150"
      >
        Actualizar
      </button>
      <button
        onClick={() => onRemoveSong(song._id)}
        className="p-2 bg-red-500 hover:bg-red-700 text-white rounded transition ease-in-out duration-150 transform active:scale-95"
        aria-label="Eliminar"
    >
        <FontAwesomeIcon icon={faTrash} />
    </button>

      {/* Considerar agregar el botón para despublicar aquí si es necesario */}
    </li>
  );
};

export default PublishedSongItem;

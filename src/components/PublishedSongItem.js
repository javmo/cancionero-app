// components/PublishedSongItem.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'; // Añade el icono faEdit

const PublishedSongItem = ({ song, categories, selectedCategory, onCategoryChange, onUpdateCategory, onRemoveSong }) => {
  return (
    <li className="py-4 px-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-150 rounded-lg my-2 shadow-sm">
      <div className="flex flex-col">
        <p className="text-lg font-semibold text-blue-700">{song.songTitle}</p>
        <div className="flex items-center mt-1">
          <label className="text-sm font-medium text-gray-700 mr-2">Categoría:</label>
          <select
            value={selectedCategory}
            onChange={e => onCategoryChange(song._id, e.target.value)}
            className="text-sm p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category._id} value={category._id}>{category.categoryType}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center">
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

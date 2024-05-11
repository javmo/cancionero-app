import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const PublishedSongItem = ({
  song,
  categories,
  selectedCategory,
  onCategoryChange,
  onUpdateCategory,
  onRemoveSong,
}) => {
  const navigate = useNavigate();

  const handleNavigateToSongChordSelector = (songId) => {
    navigate(`/songChordSelector/${songId}`);
  };

  return (
    <li className="flex items-center justify-between p-4 bg-dark-700 shadow-lg rounded-lg my-2 space-x-4">
      <div className="flex-grow">
        <p className="text-lg font-semibold text-blue-400">{song.songTitle}</p>
        <div className="flex items-center mt-1">
          <label className="text-sm font-medium text-gray-300 mr-2">Categoría:</label>
          <select
            value={selectedCategory || song.category || ''}
            onChange={(e) => onCategoryChange(song._id, e.target.value)}
            className="text-sm p-2 rounded-md border border-gray-600 bg-dark-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{category.categoryType}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center">
        <button
          className={`text-blue-400 hover:text-blue-500 p-2 rounded-full ${window.innerWidth < 640 ? 'button-small icon-small' : ''}`}
          onClick={() => handleNavigateToSongChordSelector(song.song)}
          aria-label="View details"
        >
          <FontAwesomeIcon icon={faEye} />
        </button>
        <button
          onClick={() => onUpdateCategory(song._id)}
          className="text-green-400 hover:text-green-500 p-2 rounded-full"
          aria-label="Update category"
        >
          <FontAwesomeIcon icon={faEdit} size="lg" />
        </button>
        <button
          onClick={() => onRemoveSong(song._id)}
          className="text-red-500 hover:text-red-600 p-2 rounded-full"
          aria-label="Delete"
        >
          <FontAwesomeIcon icon={faTrash} size="lg" />
        </button>
      </div>
    </li>
  );
};

export default PublishedSongItem;


// ModalChord.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ModalChord = ({ isOpen, onClose, title, imageUrl }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 text-xl">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <img src={imageUrl} alt={`Acorde ${title}`} className="max-w-full h-auto" />
            </div>
        </div>
    );
};

export default ModalChord;


import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faMusic, faQrcode, faGlobe } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ idioma, setIdioma }) => {
  const location = useLocation();

  const getLinkClasses = (path) => {
    const isActive = location.pathname === path;
    return `text-white px-4 py-2 rounded-md text-base font-medium transition-colors duration-300 
            ${isActive ? 'bg-blue-700 shadow-md' : 'hover:bg-blue-600'}`;
  };

  if (location.pathname === '/cancionero') {
    return null;
  }

  return (
    <nav className="bg-blue-500 p-3 shadow-lg fixed inset-x-0 bottom-0 z-10 flex justify-between items-center md:relative md:top-0">
      {/* Menú de navegación */}
      <ul className="flex space-x-4 items-center">
        {[
          { to: "/", icon: faHome, label: idioma === 'la' ? "Domus" : "Inicio" },
          { to: "/search", icon: faSearch, label: idioma === 'la' ? "Quaerere" : "Buscar" },
          { to: "/publishedSongsList", icon: faMusic, label: idioma === 'la' ? "Publicata" : "Publicadas" },
          { to: "/qrLink", icon: faQrcode, label: "QR/Link" }
        ].map(link => (
          <li key={link.to}>
            <Link to={link.to} className={getLinkClasses(link.to)} title={link.label}
                  aria-current={location.pathname === link.to ? 'page' : undefined}>
              <FontAwesomeIcon icon={link.icon} className="text-lg" />
              <span className="hidden md:inline ml-2">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Selector de idioma */}
      <div className="flex items-center space-x-2">
        <FontAwesomeIcon icon={faGlobe} className="text-white text-lg" />
        <select 
          value={idioma} 
          onChange={(e) => setIdioma(e.target.value)}
          className="border rounded px-2 py-1 bg-white text-black"
        >
          <option value="es">Español</option>
          <option value="la">Latín</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;

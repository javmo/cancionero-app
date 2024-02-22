import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const getLinkClasses = (path) => {
    let baseClasses = "text-white px-4 py-2 rounded-md text-base font-medium transition-colors duration-300";
    let activeClasses = "bg-blue-700 font-semibold";
    let hoverClasses = "hover:bg-blue-600";
    return `${baseClasses} ${hoverClasses} ${location.pathname === path ? activeClasses : ''}`;
  };

  if (location.pathname === '/cancionero') {
    return null;
  }

  return (
    <nav className="bg-blue-500 p-3 shadow-lg fixed inset-x-0 bottom-0 md:relative md:inset-x-0 md:top-0 z-10">
      <ul className="flex justify-evenly md:justify-start">
        <li>
          <Link to="/" className={getLinkClasses("/")}>Inicio</Link>
        </li>
        <li>
          <Link to="/search" className={getLinkClasses("/search")}>Buscar Canciones</Link>
        </li>
        <li>
          <Link to="/publishedSongsList" className={getLinkClasses("/publishedSongsList")}>Canciones Publicadas</Link>
        </li>
        <li>
          <Link to="/qrLink" className={getLinkClasses("/qrLink")} aria-label="QR/Link">
            <svg aria-hidden="true" focusable="false" className="w-5 h-5 inline-block" /* Add your SVG path here */></svg>
            QR/Link
          </Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;

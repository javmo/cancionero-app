import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation(); // Hook de React Router para obtener la ubicación actual

  const getLinkClasses = (path) => {
    // Función para determinar las clases de un enlace basado en si coincide con la ubicación actual
    let classes = "text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium";
    if (location.pathname === path) {
      classes += " bg-blue-700"; // Resalta el fondo si es la página actual
    }
    return classes;
  };

  // Oculta el Navbar en la página del Cancionero Publicado
  if (location.pathname === '/cancionero') {
    return null;
  }

  return (
    <nav className="bg-blue-500 p-6 shadow-md">
      <ul className="flex justify-between">
        <li className="mr-6">
          <Link to="/" className={getLinkClasses("/")}>Inicio</Link>
        </li>
        <li className="mr-6">
          <Link to="/search" className={getLinkClasses("/search")}>Buscar Canciones</Link>
        </li>
        <li className="mr-6">
          <Link to="/publishedSongsList" className={getLinkClasses("/publishedSongsList")}>Canciones Publicadas</Link>
        </li>
        <li className="mr-6">
          <Link to="/qrLink" className={getLinkClasses("/qrLink")}>QR/Link🔗</Link>
        </li>
        {/* Agrega más enlaces según necesites */}
      </ul>
    </nav>
  );
};

export default Navbar;




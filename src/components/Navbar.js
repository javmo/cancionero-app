import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faMusic, faQrcode } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
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
    <nav className="bg-blue-500 p-3 shadow-lg fixed inset-x-0 bottom-0 md:relative md:inset-x-0 md:top-0 z-10" role="navigation">
      <ul className="flex justify-evenly md:justify-start items-center">
        {[
          { to: "/", icon: faHome, label: "Inicio" },
          { to: "/search", icon: faSearch, label: "Buscar" },
          { to: "/publishedSongsList", icon: faMusic, label: "Publicadas" },
          { to: "/qrLink", icon: faQrcode, label: "QR/Link" }
        ].map(link => (
          <li key={link.to}>
            <Link to={link.to} className={getLinkClasses(link.to)} title={link.label}
                  aria-current={location.pathname === link.to ? 'page' : undefined}>
              <FontAwesomeIcon icon={link.icon} className="text-lg" />
              <span className="hidden md:inline">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;


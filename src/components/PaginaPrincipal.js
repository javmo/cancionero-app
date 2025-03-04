import React from 'react';
import LecturaDelDia from './LecturaDelDia';
import CancionesRecomendadas from './CancionesRecomendadas';

const PaginaPrincipal = ({ idioma }) => {
  return (
    <div>
      <LecturaDelDia idioma={idioma} />
      <CancionesRecomendadas idioma={idioma} />
    </div>
  );
};

export default PaginaPrincipal;

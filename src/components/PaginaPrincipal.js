import React from 'react';
import LecturaDelDia from './LecturaDelDia'; // Asegúrate de que la ruta de importación sea correcta
import CancionesRecomendadas from './CancionesRecomendadas'; // Componente hipotético para canciones recomendadas

const PaginaPrincipal = () => {
  return (
    <div>
      <LecturaDelDia />
      <CancionesRecomendadas />
    </div>
  );
};

export default PaginaPrincipal;

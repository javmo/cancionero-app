// CancionesRecomendadas.stories.js
import React from 'react';
import CancionesRecomendadas from './CancionesRecomendadas'; // Asume que ya tienes datos mockeados como en el ejemplo anterior

export default {
  title: 'Componentes/CancionesRecomendadas',
  component: CancionesRecomendadas,
};

const Template = () => <CancionesRecomendadas />;

export const Default = Template.bind({});
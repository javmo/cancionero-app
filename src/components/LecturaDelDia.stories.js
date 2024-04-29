// SongDisplay.stories.js
import React from 'react';
import LecturaDelDia from './LecturaDelDia'; // Asume que ya tienes datos mockeados como en el ejemplo anterior

export default {
  title: 'Componentes/LecturaDelDia',
  component: LecturaDelDia,
};

const Template = () => <LecturaDelDia />;

export const Default = Template.bind({});

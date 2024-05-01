// CancionesRecomendadas.stories.js
import React from 'react';
import ChordManager from './ChordManager'; // Asume que ya tienes datos mockeados como en el ejemplo anterior
import { mockSongData } from './mockdata/mockSongData';

export default {
  title: 'Componentes/ChordManager',
  component: ChordManager,
};
const Template = (args) => <ChordManager {...args} />;

export const Default = Template.bind({});
Default.args = {
  song: mockSongData,
};
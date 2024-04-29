// SongDisplay.stories.js
import React from 'react';
import SongDisplay from './SongDisplay';
import { mockSongData } from './mockdata/mockSongData'; // Asume que ya tienes datos mockeados como en el ejemplo anterior

export default {
  title: 'Componentes/SongDisplay',
  component: SongDisplay,
};

const Template = (args) => <SongDisplay {...args} />;

export const Default = Template.bind({});
Default.args = {
  song: mockSongData,
};

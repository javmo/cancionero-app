// SongChordSelector.stories.js
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SongChordSelector from './SongChordSelector';
import { mockSongId } from './mockdata/mockSongId'; // Asegúrate de que este archivo existe y exporta un mockSongId
import { withConsole } from '@storybook/addon-console';

export default {
  title: 'Componentes/SongChordSelector',
  component: SongChordSelector,
  decorators: [ // Agregamos el decorador para simular la ruta
    (Story) => (
      <MemoryRouter initialEntries={[`/songs/${mockSongId}`]}>
        <Routes> // Envuelve el Route en un componente Routes
          <Route path="/songs/:songId" element={<Story />} />
        </Routes>
      </MemoryRouter>
    )
  ],
};

const Template = (args) => <SongChordSelector {...args} />;

export const Default = Template.bind({});
// No necesitas pasar songId como arg si ya está configurado en la ruta




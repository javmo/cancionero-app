import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import SongSearch from './components/SongSearch';
import PublishedSongsList from './components/PublishedSongsList';
import Navbar from './components/Navbar';
import QRCodePage from './components/QRCodePage';
import Cancionero from './components/Cancionero';
import PaginaPrincipal from './components/PaginaPrincipal';
import SongScraperPreview from './components/SongScraperPreview';
import SongAdder from './components/SongAdder';
import SongCreationWizard from './components/wizard/SongCreationWizard';
import SongChordSelector from './components/SongChordSelector';
import LecturaSantosFiestas from './components/LecturasSantosFiestas';
import ReflexionDetalle from './components/ReflexionDetalle';

function App() {
  // Estado global del idioma
  const [idioma, setIdioma] = useState('es'); // 'es' para español, 'la' para latín

  return (
    <Router>
      {/* PASAMOS idioma y setIdioma al Navbar */}
      <Navbar idioma={idioma} setIdioma={setIdioma} />
      <Routes>
        <Route path="/home" element={<PaginaPrincipal idioma={idioma} />} />
        <Route path="/search" element={<SongSearch />} />
        <Route path="/publishedSongsList" element={<PublishedSongsList />} />
        <Route path="/qrLink" element={<QRCodePage />} />
        <Route path="/cancionero" element={<Cancionero />} />
        <Route path="/scrapingPreview" element={<SongScraperPreview />} />
        <Route path="/addSong" element={<SongAdder />} />
        <Route path="/addSongWizard" element={<SongCreationWizard />} />
        <Route path="/songChordSelector/:songId" element={<SongChordSelector />} />
        <Route path="/lecturaSantosFiestas" element={<LecturaSantosFiestas idioma={idioma} />} />
        <Route path="/reflexion/:id" element={<ReflexionDetalle />} />
        <Route path="/" element={<LecturaSantosFiestas idioma={idioma}  />} />
      </Routes>
    </Router>
  );
}

export default App;

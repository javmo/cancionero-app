import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SongSearch from './components/SongSearch';
import PublishedSongsList from './components/PublishedSongsList';
import Navbar from './components/Navbar';
import QRCodePage from './components/QRCodePage';
import Cancionero from './components/Cancionero';
import PaginaPrincipal from './components/PaginaPrincipal';
import SongScraperPreview from './components/SongScraperPreview';
import SongAdder  from './components/SongAdder';
import SongCreationWizard from './components/wizard/SongCreationWizard';
import SongChordSelector from './components/SongChordSelector';

function App() {
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/search" element={<SongSearch />} />
        <Route path="/publishedSongsList" element={<PublishedSongsList />} />
        <Route path="/qrLink" element={<QRCodePage />} />
        <Route path="/cancionero" element={<Cancionero />} />
        <Route path="/scrapingPreview" element={<SongScraperPreview />} />
        <Route path="/addSong" element={<SongAdder />} />
        <Route path="/addSongWizard" element={<SongCreationWizard />} />
        <Route path="/songChordSelector/:songId" element={<SongChordSelector />} />
        {/* Define otras rutas aquí */}
      </Routes>
    </Router>
  );
}

export default App;


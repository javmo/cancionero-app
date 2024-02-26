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
        {/* Define otras rutas aquí */}
      </Routes>
    </Router>
  );
}


export default App;

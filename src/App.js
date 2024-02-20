import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SongSearch from './components/SongSearch';
import PublishedSongsList from './components/PublishedSongsList';
import Navbar from './components/Navbar';
import QRCodePage from './components/QRCodePage';
import Cancionero from './components/Cancionero';
import PaginaPrincipal from './components/PaginaPrincipal';

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
        {/* Define otras rutas aquí */}
      </Routes>
    </Router>
  );
}


export default App;

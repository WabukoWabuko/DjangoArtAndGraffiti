import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Navbar from './components/Navbar'; // We'll create this next
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import EventsPage from './pages/EventsPage';
import ArtistsPage from './pages/ArtistsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/AdminLoginPage';
import UserProfilePage from './pages/UserProfilePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Navigation bar for all pages */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // We'll create this
import MainPage from './pages/MainPage';
import AdminLoginPage from './pages/AdminLoginPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          </Routes>
          <Footer /> {/* Add Footer here */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Login from './components/auth/login';
import Register from './components/auth/register';
import GoogleAuth from './components/auth/googleAuth';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/protectedRoute';
import LandingPage from './components/LandingPage';

const App = () => (
    <AuthProvider>
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/google-auth" element={<GoogleAuth />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    </AuthProvider>
);

export default App;
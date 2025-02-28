import { createContext, useState, useEffect } from 'react';
import API from '../api/axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // No session or token check; rely on frontend state
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            console.log('Attempting login with:', { email, password });
            const { data } = await API.post('/auth/login/', { email, password });
            console.log('Login response:', data);
            if (data.error) {
                throw new Error(data.error);
            }
            setUser(data.user);
            setError(null);
        } catch (error) {
            console.error('Login failed:', error.message);
            setError(error.message || 'Invalid credentials or server error.');
            throw error;
        }
    };

    const register = async (email, fullName, password, password2) => {
        try {
            console.log('Attempting registration with:', { email, fullName, password, password2 });
            const { data } = await API.post('/auth/register/', { 
                email, 
                full_name: fullName, 
                password, 
                password2 
            });
            console.log('Registration response:', data);
            if (data.error) {
                throw new Error(data.error);
            }
            setUser(data.user);
            setError(null);
        } catch (error) {
            console.error('Registration failed:', error.message);
            setError(error.message || 'Registration failed. Please try again.');
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setError(null);
    };

    const contextValue = {
        user,
        loading,
        error,
        login,
        register,
        logout,
    };

    if (error) {
        return (
            <div className="error-boundary">
                <p>{error}</p>
                <button onClick={() => setError(null)}>Retry</button>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

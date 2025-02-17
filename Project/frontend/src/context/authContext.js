import { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import API from '../api/axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to decode and set the user from the token
    const setUserFromToken = useCallback((token) => {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
    }, []);

    // Check for existing token on initial load
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setUserFromToken(token);
        }
        setLoading(false);
    }, [setUserFromToken]);

    // Function to handle user login
    const login = async (email, password) => {
        try {
            const { data } = await API.post('/auth/login/', { email, password });
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            setUserFromToken(data.access);
        } catch (error) {
            console.error('Login failed:', error);
            throw error; // Re-throw the error for handling in the component
        }
    };

    // Function to handle user logout
    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
    };

    // Function to refresh the access token
    const refreshToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const { data } = await API.post('/auth/refresh/', { refresh: refreshToken });
            localStorage.setItem('accessToken', data.access);
            setUserFromToken(data.access);
            return data.access;
        } catch (error) {
            console.error('Token refresh failed:', error);
            logout(); // Logout the user if token refresh fails
            throw error;
        }
    };

    // Provide the context value to the children
    const contextValue = {
        user,
        login,
        logout,
        refreshToken,
        loading,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
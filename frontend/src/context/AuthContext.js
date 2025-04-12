import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser, logoutUser } from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const logout = () => {
    logoutUser()
      .then(() => {
        setUser(null);
        window.location.href = '/'; // Redirect to home
      })
      .catch(error => console.error('Logout failed:', error));
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

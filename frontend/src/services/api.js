import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true, // Include cookies for Django session auth
});

export const loginAdmin = (username, password) =>
  api.post('admin-login/', { username, password });

export const getUser = (id) => api.get(`users/${id}/`);
export const updateUser = (id, data) => api.patch(`users/${id}/`, data);

export const getEvents = () => api.get('events/');
export const getArtworks = () => api.get('artworks/');
export const getArtists = () => api.get('artists/');

export default api;

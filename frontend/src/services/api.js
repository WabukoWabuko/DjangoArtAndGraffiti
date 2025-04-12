import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true, // Include cookies for Django session auth
});

export const loginAdmin = (username, password) =>
  api.post('admin-login/', { username, password });

export const getCurrentUser = () => api.get('current-user/');

export const getUser = (id) => api.get(`users/${id}/`);
export const updateUser = (id, data) => api.patch(`users/${id}/`, data);

export const getEvents = () => api.get('events/');
export const createEvent = (data) => api.post('events/', data);
export const updateEvent = (id, data) => api.patch(`events/${id}/`, data);
export const deleteEvent = (id) => api.delete(`events/${id}/`);

export const getArtworks = () => api.get('artworks/');
export const createArtwork = (data) => api.post('artworks/', data);
export const updateArtwork = (id, data) => api.patch(`artworks/${id}/`, data);
export const deleteArtwork = (id) => api.delete(`artworks/${id}/`);

export const getArtists = () => api.get('artists/');
export const createArtist = (data) => api.post('artists/', data);
export const updateArtist = (id, data) => api.patch(`artists/${id}/`, data);
export const deleteArtist = (id) => api.delete(`artists/${id}/`);

export const getAnalytics = () => api.get('analytics/');

export default api;

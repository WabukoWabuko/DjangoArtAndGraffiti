import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api',  // Django backend URL
    headers: {
        'Content-Type': 'application/json'
    }
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;

import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api',  // Django backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to attach the token to every request
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle global errors
API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
            console.error('Unauthorized access - redirecting to login...');
            localStorage.removeItem('accessToken');
            window.location.href = '/login'; // Adjust the login route as needed
        }
        return Promise.reject(error);
    }
);

export default API;
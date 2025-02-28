import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,  // No credentials (no sessions, cookies, or tokens)
});

// Request interceptor (no token or CSRF needed)
API.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for basic error handling
API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized - please log in.');
        }
        return Promise.reject(error);
    }
);

export default API;

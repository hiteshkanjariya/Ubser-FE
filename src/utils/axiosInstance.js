// utils/axiosInstance.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Automatically add token from localStorage/sessionStorage or redux
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // or from Redux
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;

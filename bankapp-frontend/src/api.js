import axios from "axios";
import { getToken } from "./auth/token";

const api = axios.create({
    baseURL: "${process.env.REACT_APP_API_URL}",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true // Important for CORS with credentials
});

// Set default headers with token if it exists
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            clearToken(); // Clear invalid token
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
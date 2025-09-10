import axios from "axios";
import { getToken, clearToken } from "./auth/token";

// A variable to hold the callback function to be executed on a 401 error.
// This allows the API module to be separate from the React component tree.
let onSessionExpiredCallback = null;

/**
 * Sets the callback function to be executed when a 401 (Unauthorized) error occurs.
 * This callback should handle displaying the modal and any necessary navigation.
 * @param {Function} handler The function to call on session expiration.
 */
export const setOnSessionExpiredHandler = (handler) => {
    onSessionExpiredCallback = handler;
};

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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

// Response interceptor to handle session expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear invalid token from storage
            clearToken();

            // Check if the callback function has been set and execute it
            if (onSessionExpiredCallback) {
                onSessionExpiredCallback();
            }
            
            // Return a rejected promise to prevent further execution
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

export default api;
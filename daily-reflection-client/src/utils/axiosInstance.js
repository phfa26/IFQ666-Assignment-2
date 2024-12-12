import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { getLogout } from '../contexts/AuthContext';

const baseURL = `http://${process.env.SERVER_ENDPOINT}/api`

// Create an axios instance
const axiosInstance = axios.create({
    baseURL,
})

// Intercept all requests and add the token to headers if available
axiosInstance.interceptors.request.use(
    async (config) => {
        // Retrieve the token from secure store (or wherever you store it)
        const token = await SecureStore.getItemAsync('token');
        
        // If token exists, add it to the request headers
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercept responses and handle token expiration globally
axiosInstance.interceptors.response.use(
    response => response,  // If no error, simply return the response
    async (error) => {
        // Handle token expiration (status code 401)
        if (error.response && error.response.status === 401) {
            if (error.response.data.error === 'Token expired. Please log in again.') {
                const logout  = getLogout();
                if (logout) await logout();
                // // Token expired, logout the user
                // const navigation = useNavigation();
                // navigation.replace('Login');  // Navigate to login screen
            }
        }
        // Handle other errors
        return Promise.reject(error);
    }
);

export default axiosInstance;

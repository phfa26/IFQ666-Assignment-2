import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; // Use the axiosInstance
import { deleteFromSecureStore, getFromSecureStore, saveToSecureStore } from '../utils/secureStore';

export const AuthContext = createContext();
let logoutCallback;

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const loadAuthState = async () => {
            const storedToken = await getFromSecureStore('token');
            if (storedToken) {
                setToken(storedToken);
                setIsLoggedIn(true);
            }
        };
        loadAuthState();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axiosInstance.post('/users/login', { username, password });
            const userToken = response.data.token;
            await saveToSecureStore('token', userToken);
            setToken(userToken);
            setIsLoggedIn(true);

            const settingsResponse = await axiosInstance.get('/settings');
            const { font_size } = settingsResponse.data;

            await saveToSecureStore('fontSize', font_size.toString());

        } catch (error) {
            throw new Error('Invalid username or password');
        }
    };

    const logout = async () => {
        await deleteFromSecureStore('token');
        setToken(null);
        setIsLoggedIn(false);
    };

    logoutCallback = logout;

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const getLogout = () => logoutCallback;
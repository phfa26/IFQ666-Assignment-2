import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { deleteFromSecureStore, getFromSecureStore, saveToSecureStore } from '../utils/secureStore';

export const AuthContext = createContext();

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
            const response = await axios.post('http://192.168.1.202:3007/api/users/login', { username, password });
            const userToken = response.data.token;
            await saveToSecureStore('token', userToken);
            setToken(userToken);
            setIsLoggedIn(true);
        } catch (error) {
            throw new Error('Invalid username or password');
        }
    };

    const logout = async () => {
        await deleteFromSecureStore('token');
        setToken(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

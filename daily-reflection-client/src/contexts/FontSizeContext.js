import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState(16); // Default value

    // Fetch settings from the server and sync with local storage
    const fetchFontSize = async () => {
        try {
            const response = await axiosInstance.get('/settings');
            const { font_size } = response.data;
            const size = font_size || 16;
            setFontSize(size);
            await AsyncStorage.setItem('fontSize', size.toString()); // Update local storage
        } catch (error) {
            console.error('Failed to fetch font size:', error);
            // Fallback to stored local value
            const storedSize = await AsyncStorage.getItem('fontSize');
            if (storedSize) {
                setFontSize(Number(storedSize));
            }
        }
    };

    const updateFontSize = async (size) => {
        try {
            setFontSize(size);
            await AsyncStorage.setItem('fontSize', size.toString()); // Update local storage
            await axiosInstance.put('/settings', { font_size: size }); // Update server
        } catch (error) {
            console.error('Failed to update font size:', error);
        }
    };

    useEffect(() => {
        fetchFontSize(); // Fetch font size on context load
    }, []);

    return (
        <FontSizeContext.Provider value={{ fontSize, updateFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
};

export const useFontSize = () => useContext(FontSizeContext);

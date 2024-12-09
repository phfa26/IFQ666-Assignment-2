import React, { createContext, useEffect, useState } from 'react';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import { getFromSecureStore, saveToSecureStore } from '../utils/secureStore';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedTheme = await getFromSecureStore('theme');
                if (storedTheme) {
                    setIsDarkMode(storedTheme === 'dark');
                }
            } catch (error) {
                console.error('Failed to load theme:', error);
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        try {
            await saveToSecureStore('theme', newMode ? 'dark' : 'light');
        } catch (error) {
            console.error('Failed to save theme:', error);
        }
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <PaperProvider theme={isDarkMode ? MD3DarkTheme : MD3LightTheme}>
                {children}
            </PaperProvider>
        </ThemeContext.Provider>
    );
};

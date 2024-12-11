import React, { createContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { configureFonts, MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import { getFromSecureStore, saveToSecureStore } from '../utils/secureStore';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState(16); // Default font size

    useEffect(() => {
        const loadPreferences = async () => {
            try {
                const storedTheme = await getFromSecureStore('theme');
                const storedFontSize = await getFromSecureStore('fontSize');
                if (storedTheme) setIsDarkMode(storedTheme === 'dark');
                if (storedFontSize) setFontSize(parseInt(storedFontSize, 10));
            } catch (error) {
                console.error('Failed to load preferences:', error);
            }
        };
        loadPreferences();
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

    const updateFontSize = async (size) => {
        if (typeof size !== 'number' || isNaN(size)) {
            console.error('Invalid font size:', size);
            return;
        }

        setFontSize(size);
        try {
            await saveToSecureStore('fontSize', size.toString());
        } catch (error) {
            console.error('Failed to save font size:', error);
        }
    };

    const fontConfig = {
        default: {
            regular: {
                fontFamily: Platform.select({
                    web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
                    ios: 'System',
                    android: 'sans-serif',
                }),
                fontWeight: '400',
                fontSize,
            },
            medium: {
                fontFamily: Platform.select({
                    web: 'Roboto-Medium, "Helvetica Neue", Helvetica, Arial, sans-serif',
                    ios: 'System',
                    android: 'sans-serif-medium',
                }),
                fontWeight: '500',
                fontSize: fontSize + 2,
            },
            light: {
                fontFamily: Platform.select({
                    web: 'Roboto-Light, "Helvetica Neue", Helvetica, Arial, sans-serif',
                    ios: 'System',
                    android: 'sans-serif-light',
                }),
                fontWeight: '300',
                fontSize: fontSize - 2,
            },
            thin: {
                fontFamily: Platform.select({
                    web: 'Roboto-Thin, "Helvetica Neue", Helvetica, Arial, sans-serif',
                    ios: 'System',
                    android: 'sans-serif-thin',
                }),
                fontWeight: '100',
                fontSize: fontSize - 4,
            },
        },
    };

    const theme = {
        ...(isDarkMode ? MD3DarkTheme : MD3LightTheme),
        fonts: configureFonts(fontConfig),
        fontSize,
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, updateFontSize }}>
            <PaperProvider theme={theme}>
                {children}
            </PaperProvider>
        </ThemeContext.Provider>
    );
};

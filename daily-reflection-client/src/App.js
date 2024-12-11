import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { FontSizeProvider } from './contexts/FontSizeContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
    return (
        <AuthProvider>
            <FontSizeProvider>
                <ThemeProvider>
                    <AppNavigator />
                </ThemeProvider>
            </FontSizeProvider>
        </AuthProvider>
    );
};

export default App;

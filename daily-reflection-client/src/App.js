import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
    return (
        <AuthProvider>
            <ThemeProvider>
                <AppNavigator />
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;

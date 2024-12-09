import React from 'react';
import { darkTheme, lightTheme, Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeContext, ThemeProvider } from './contexts/ThemeContext';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
    return (
        <AuthProvider>
            <ThemeProvider>
                <ThemeContext.Consumer>
                    {({ isDarkMode, toggleTheme }) => (
                        <PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
                            <AppNavigator screenProps={{ toggleTheme, isDarkMode }} />
                        </PaperProvider>
                    )}
                </ThemeContext.Consumer>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTheme } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';
import { useFontSize } from '../contexts/FontSizeContext'; // Import FontSizeProvider
import AboutPage from '../pages/AboutPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SettingsPage from '../pages/SettingsPage';
import SplashScreen from '../pages/SplashScreen';
import { CombinedDarkTheme, CombinedLightTheme } from '../theme.js'; // Import the merged themes

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [isAppReady, setIsAppReady] = useState(false);
    const { isDarkMode } = useTheme(); // Access the current theme mode
    const { fontSize } = useFontSize(); // Access global font size

    const theme = isDarkMode ? CombinedDarkTheme : CombinedLightTheme;

    // Generate dynamic styles based on font size and theme
    const drawerScreenOptions = useMemo(
        () => ({
            drawerStyle: { backgroundColor: theme.colors.surface },
            drawerActiveTintColor: theme.colors.primary,
            drawerInactiveTintColor: theme.colors.text,
            drawerLabelStyle: { fontSize }, // Use global font size for drawer items
        }),
        [fontSize, theme]
    );

    useEffect(() => {
        const loadApp = async () => {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate async task like auth check
            setIsAppReady(true); // Once ready, set the state to true
        };

        loadApp();
    }, []);

    // Show SplashScreen until app is ready
    if (!isAppReady) {
        return (
            <NavigationContainer theme={theme}>
                <SplashScreen />
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer theme={theme}>
            {isLoggedIn ? (
                <Drawer.Navigator initialRouteName="Home" screenOptions={{ ...drawerScreenOptions, headerShown: true }}>
                    <Drawer.Screen name="Home" component={HomePage} options={{ title: 'Home' }} />
                    <Drawer.Screen name="About" component={AboutPage} options={{ title: 'About This App' }} />
                    <Drawer.Screen name="Settings" component={SettingsPage} options={{ title: 'Settings' }} />
                </Drawer.Navigator>
            ) : (
                <Drawer.Navigator
                    screenOptions={{ ...drawerScreenOptions, headerShown: true, swipeEnabled: false }}
                >
                    <Drawer.Screen name="Login" component={LoginPage} />
                </Drawer.Navigator>
            )}
        </NavigationContainer>
    );
};

export default AppNavigator;

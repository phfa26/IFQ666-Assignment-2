import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';
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

    const theme = isDarkMode ? CombinedDarkTheme : CombinedLightTheme;

    useEffect(() => {
        const loadApp = async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));  // Simulate async task like auth check
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
                <Drawer.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerShown: true,
                        drawerStyle: { backgroundColor: theme.colors.surface },
                        drawerActiveTintColor: theme.colors.primary,
                        drawerInactiveTintColor: theme.colors.text,
                    }}
                >
                    <Drawer.Screen name="Home" component={HomePage} options={{ title: 'Home' }} />
                    <Drawer.Screen name="About" component={AboutPage} options={{ title: 'About This App' }} />
                    <Drawer.Screen name="Settings" component={SettingsPage} options={{ title: 'Settings' }} />
                </Drawer.Navigator>
            ) : (
                <Drawer.Navigator
                    screenOptions={{
                        headerShown: false,
                        swipeEnabled: false,
                        drawerStyle: { backgroundColor: theme.colors.surface },
                        drawerActiveTintColor: theme.colors.primary,
                        drawerInactiveTintColor: theme.colors.text,
                    }}
                >
                    <Drawer.Screen name="Login" component={LoginPage} />
                </Drawer.Navigator>
            )}
        </NavigationContainer>
    );
};

export default AppNavigator;

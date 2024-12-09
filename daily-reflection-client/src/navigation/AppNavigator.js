import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext'; // Assuming you have a ThemeContext
import AboutPage from '../pages/AboutPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SettingsPage from '../pages/SettingsPage';
import SplashScreen from '../pages/SplashScreen';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const { isDarkMode, toggleTheme } = useContext(ThemeContext); // Access theme context
    const [isAppReady, setIsAppReady] = useState(false);

    useEffect(() => {
        const loadApp = async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));  // Simulate async task like auth check
            setIsAppReady(true); // Once ready, set the state to true
        };

        loadApp();
    }, []);

    // Show SplashScreen until app is ready
    if (!isAppReady) {
        return <NavigationContainer><SplashScreen /></NavigationContainer>;
    }

    return (
        <NavigationContainer>
            {isLoggedIn ? (
                <Drawer.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerShown: true,
                    }}
                >
                    <Drawer.Screen name="Home" component={HomePage} options={{ title: 'Home' }} />
                    <Drawer.Screen name="About" component={AboutPage} options={{ title: 'About This App' }} />
                    <Drawer.Screen
                        name="Settings"
                        component={SettingsPage}
                        options={{ title: 'Settings' }}
                    />
                </Drawer.Navigator>
            ) : (
                <Drawer.Navigator
                    screenOptions={{
                        headerShown: false,
                        swipeEnabled: false, // Disable swipe on login flow
                    }}
                >
                    <Drawer.Screen name="Login" component={LoginPage} />
                </Drawer.Navigator>
            )}
        </NavigationContainer>
    );
};

export default AppNavigator;

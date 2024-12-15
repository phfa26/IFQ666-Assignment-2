import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useMemo } from 'react';
import { useTheme } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';
import { useFontSize } from '../contexts/FontSizeContext';
import AboutPage from '../pages/AboutPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SettingsPage from '../pages/SettingsPage';
import { CombinedDarkTheme, CombinedLightTheme } from '../theme.js';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { isDarkMode } = useTheme(); 
  const { fontSize } = useFontSize();

  const theme = isDarkMode ? CombinedDarkTheme : CombinedLightTheme;

  const drawerScreenOptions = useMemo(
    () => ({
      drawerStyle: { backgroundColor: theme.colors.surface },
      drawerActiveTintColor: theme.colors.primary,
      drawerInactiveTintColor: theme.colors.text,
      drawerLabelStyle: { fontSize },
    }),
    [fontSize, theme]
  );

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

import Entypo from '@expo/vector-icons/Entypo'; // Example font
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './contexts/AuthContext';
import { FontSizeProvider } from './contexts/FontSizeContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AppNavigator from './navigation/AppNavigator';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 5000,
  fade: true,
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts or any other resources here
        await Font.loadAsync({
          ...Entypo.font,
          // Add other custom fonts if needed
        });

        // Simulate any other async tasks (like fetching tokens or API data)
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true); // Mark app as ready
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Once the root view has layout and the app is ready, hide the splash screen
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    // While app is still loading resources, do not render app UI
      return (
        <View style={styles.container}>
            <Image source={require('../assets/icon.png')} style={styles.logo} />
            <Text style={styles.title}>Daily Reflection Journal</Text>
        </View>); 
  }

  return (
    <AuthProvider>
      <FontSizeProvider>
        <ThemeProvider>
          {/* Once layout is done and app is ready, hide the splash screen */}
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <AppNavigator />
          </View>
        </ThemeProvider>
      </FontSizeProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#011e36' },
    logo: { width: 150, height: 150, marginBottom: 20 },
    title: { fontSize: 24, fontWeight: 'bold' },
});
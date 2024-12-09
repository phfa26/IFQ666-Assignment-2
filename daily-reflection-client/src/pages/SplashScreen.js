import { useNavigation } from '@react-navigation/native';
import * as ExpoSplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

// Prevent the splash screen from auto-hiding
ExpoSplashScreen.preventAutoHideAsync();

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const prepareApp = async () => {
            // Simulate some async tasks (e.g., fetching resources or checking auth)
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate async task
            
            // Hide splash screen once tasks are complete
            await ExpoSplashScreen.hideAsync(); 
            
            // Navigate to the login screen
            navigation.replace('Login');  // Replace 'Login' with your target screen
        };

        prepareApp();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/icon.png')} style={styles.logo} />
            <Text style={styles.title}>Daily Reflection Journal</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' },
    logo: { width: 150, height: 150, marginBottom: 20 },
    title: { fontSize: 24, fontWeight: 'bold' },
});

export default SplashScreen;

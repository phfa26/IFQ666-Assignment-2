import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';
import axiosInstance from '../utils/axiosInstance'; // Use the axiosInstance


const LoginPage = ({ navigation }) => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSignup, setIsSignup] = useState(false); // Toggle for Signup Form

    // Handle login functionality
    const handleLogin = async () => {
        try {
            await login(username, password);
            navigation.replace('Home');
        } catch (err) {
            setError('Invalid username or password. Please try again.');
        }
    };

    // Handle signup functionality
    const handleSignup = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await axiosInstance.post('/users/signup', {
                username,
                password,
            });

            if (response.status === 201) {
                setSuccessMessage('Signup successful! Please login now.');
                setUsername('');
                setPassword('');
            }
        } catch (error) {
            // Handle error response from backend
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error); // Show backend error message
            } else {
                setError('Signup failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Toggle between Login and Signup */}
            {isSignup ? (
                <>
                    {/* Signup Form */}
                    <TextInput
                        label="Username"
                        value={username}
                        onChangeText={setUsername}
                        style={styles.input}
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                    />
                    {error ? <Text style={styles.error}>{error}</Text> : null}

                    {/* Signup Button */}
                    <Button mode="contained" onPress={handleSignup} style={styles.button} loading={isLoading} disabled={isLoading}>
                        Sign Up
                    </Button>

                    {/* Success Message After Signup */}
                    {successMessage && <Text style={styles.success}>{successMessage}</Text>}

                    <Button mode="text" onPress={() => setIsSignup(false)} style={styles.button}>
                        Back to Login
                    </Button>
                </>
            ) : (
                <>
                    {/* Login Form */}
                    <TextInput
                        label="Username"
                        value={username}
                        onChangeText={setUsername}
                        style={styles.input}
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                    />
                    {error ? <Text style={styles.error}>{error}</Text> : null}

                    {/* Login Button */}
                    <Button mode="contained" onPress={handleLogin} style={styles.button} loading={isLoading} disabled={isLoading}>
                        Login
                    </Button>

                    {/* Signup Button */}
                    <Button mode="outlined" onPress={() => setIsSignup(true)} style={styles.button}>
                        Sign Up
                    </Button>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
    input: { marginBottom: 15 },
    button: { marginTop: 20 },
    error: { color: 'red', marginBottom: 15 },
    success: { color: 'green', marginBottom: 15, fontWeight: 'bold' },
});

export default LoginPage;

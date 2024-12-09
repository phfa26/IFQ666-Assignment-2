import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Button, Switch, Text, TextInput } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';

const SettingsPage = () => {
    const { toggleTheme, isDarkMode } = useContext(ThemeContext);;
    const { token, logout } = useContext(AuthContext);

    const [fontSize, setFontSize] = useState(16);
    const [reminderTime, setReminderTime] = useState('09:00');
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    // Fetch current settings from the API
    const fetchSettings = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get('http://192.168.1.202:3007/api/settings', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const { font_size, reminder_time } = response.data;
            setFontSize(font_size || 16);
            setReminderTime(reminder_time || '09:00');
        } catch (error) {
            console.error('Failed to fetch settings:', error);
            setError('Failed to load settings. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Save updated settings to the API
    const saveSettings = async () => {
        try {
            setIsSaving(true);
            setError('');
            await axios.put(
                'http://192.168.1.202:3007/api/settings',
                { font_size: fontSize, reminder_time: reminderTime },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Settings saved successfully!');
        } catch (error) {
            console.error('Failed to save settings:', error);
            setError('Failed to save settings. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
                <Text>Loading Settings...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Error Fallback */}
            {error && <Text style={styles.errorText}>{error}</Text>}

            {!error && (
                <>
                    {/* Theme Toggle */}
                    <View style={styles.row}>
                        <Text style={styles.label}>Enable Dark Mode</Text>
                        <Switch value={isDarkMode} onValueChange={toggleTheme} />
                    </View>

                    {/* Font Size Setting */}
                    <View style={styles.row}>
                        <Text style={styles.label}>Font Size: {fontSize}</Text>
                        <Button mode="outlined" onPress={() => setFontSize((prev) => Math.max(prev - 1, 12))}>
                            -
                        </Button>
                        <Button mode="outlined" onPress={() => setFontSize((prev) => Math.min(prev + 1, 24))}>
                            +
                        </Button>
                    </View>

                    {/* Reminder Time Setting */}
                    <Text style={styles.label}>Set Reminder Time</Text>
                    <TextInput
                        label="Reminder Time (HH:MM)"
                        value={reminderTime}
                        onChangeText={setReminderTime}
                        style={styles.input}
                        keyboardType="numeric"
                    />

                    {/* Save and Logout */}
                    <Button
                        mode="contained"
                        onPress={saveSettings}
                        loading={isSaving}
                        disabled={isSaving}
                        style={styles.saveButton}
                    >
                        Save Settings
                    </Button>
                    <Button mode="outlined" onPress={logout} style={styles.logoutButton}>
                        Logout
                    </Button>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 },
    label: { fontSize: 16 },
    input: { marginVertical: 10 },
    saveButton: { marginTop: 20 },
    logoutButton: { marginTop: 10 },
    errorText: { color: 'red', textAlign: 'center', marginVertical: 10 },
});

export default SettingsPage;

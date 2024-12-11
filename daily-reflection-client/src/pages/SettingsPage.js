import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Button, Switch, Text, TextInput, useTheme } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import axiosInstance from '../utils/axiosInstance'; // Use the axiosInstance


const SettingsPage = () => {
    const { toggleTheme, isDarkMode, updateFontSize } = useContext(ThemeContext);;
    const { logout } = useContext(AuthContext);

    const [reminderTime, setReminderTime] = useState('09:00');
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    const { fontSize, colors } = useTheme();

    // Fetch current settings from the API
    const fetchSettings = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axiosInstance.get('/settings');
            const { font_size, reminder_time } = response.data;
            setReminderTime(reminder_time || '09:00');
            updateFontSize(font_size || 16)
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
            if (!fontSize || typeof fontSize !== 'number' || isNaN(fontSize)) {
                setError('Invalid font size. Please correct it.');
                return;
            }

            setIsSaving(true);
            setError('');
            await axiosInstance.put('/settings', {
                font_size: fontSize,
                reminder_time: reminderTime,
            });
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
            <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" />
                <Text>Loading Settings...</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Error Fallback */}
            {error && <Text style={styles.errorText}>{error}</Text>}

            {!error && (
                <>
                    {/* Theme Toggle */}
                    <View style={[styles.row, { backgroundColor: colors.background }]}>
                        <Text style={styles.label}>Enable Dark Mode</Text>
                        <Switch value={isDarkMode} onValueChange={toggleTheme} />
                    </View>

                    {/* Font Size Setting */}
                    <View style={[styles.row, { backgroundColor: colors.background }]}>
                        <Text style={styles.label}>Font Size: {fontSize}</Text>
                        <Button mode="outlined" onPress={() => updateFontSize(Math.max(fontSize - 1, 16))}>
                            -
                        </Button>
                        <Button mode="outlined" onPress={() => updateFontSize(Math.min(fontSize + 1, 32))}>
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

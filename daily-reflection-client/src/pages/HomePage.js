import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import EntryModal from '../components/EntryModal'; // Import the EntryModal for editing and adding entries
import { useFontSize } from '../contexts/FontSizeContext'; // Access FontSizeProvider
import axiosInstance from '../utils/axiosInstance'; // Use the axiosInstance

const HomePage = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [entries, setEntries] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedEntry, setSelectedEntry] = useState(null); // Store selected entry for editing

    const { fontSize } = useFontSize(); // Access global font size
    const { colors } = useTheme(); // Access theme colors

    const styles = useMemo(() => getDynamicStyles(fontSize, colors), [fontSize, colors]); // Generate styles dynamically

    const fetchEntries = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axiosInstance.get('/entries'); // Use axiosInstance
            // Sort entries by date (most recent first)
            const sortedEntries = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setEntries(sortedEntries);
        } catch (error) {
            console.error('Failed to fetch entries:', error);
            setError('Failed to load entries. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const saveEntry = async ({ response, question }, clearResponses) => {
        try {
            // Check if we are editing an existing entry or adding a new one
            if (selectedEntry) {
                // Update the existing entry
                await axiosInstance.put(`/entries/${selectedEntry.id}`, {
                    question: newQuestion,
                    response,
                    date: new Date().toISOString().split('T')[0], // Format the date as YYYY-MM-DD
                });
            } else {
                // Add a new entry
                await axiosInstance.post('/entries', {
                    question,
                    response,
                    date: new Date().toISOString().split('T')[0], // Format the date as YYYY-MM-DD
                });
            }

            // After saving, reset the modal and state
            setModalVisible(false);
            clearResponses(!!selectedEntry);
            setSelectedEntry(null); // Reset selected entry
            fetchEntries(); // Refresh the entries after saving
        } catch (error) {
            console.error('Failed to save entry:', error);
            alert('Failed to save the entry. Please try again.');
        }
    };

    const openModal = (entry = null) => {
        if (entry) {
            // Editing an existing entry
            setSelectedEntry(entry);
            setNewQuestion(entry.question);
        } else {
            // Adding a new entry
            setSelectedEntry(null); // No selected entry
            setNewQuestion('');
        }
        setModalVisible(true);
    };

    const handleDeleteEntry = (entryId) => {
        // Show confirmation before deleting the entry
        Alert.alert(
            'Delete Entry',
            'Are you sure you want to delete this entry?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await axiosInstance.delete(`/entries/${entryId}`);
                            fetchEntries(); // Refresh the entries after deleting
                            setModalVisible(false); // Close the modal
                            setSelectedEntry(null); // Reset selected entry after delete
                        } catch (error) {
                            console.error('Failed to delete entry:', error);
                            alert('Failed to delete the entry. Please try again.');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <View style={styles.container}>
            <Button
                mode="contained"
                onPress={() => openModal(null)}
                style={styles.addButton}
                labelStyle={styles.buttonLabel}
            >
                Add New Entry
            </Button>

            <EntryModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                entry={selectedEntry}
                onSave={saveEntry}
                onDelete={handleDeleteEntry} // Pass the handleDeleteEntry function as a prop to the modal
            />

            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.loadingText}>Loading Entries...</Text>
                </View>
            )}

            {error && <Text style={styles.errorText}>{error}</Text>}

            {!loading && !error && (
                <ScrollView style={styles.scrollView} key={colors.background}>
                    {entries.length === 0 ? (
                        <Text style={styles.errorText}>No entries available</Text>
                    ) : (
                        entries.map((entry, index) => (
                            <Card
                                key={index}
                                style={styles.entryCard}
                                onPress={() => openModal(entry)}
                            >
                                <Card.Title
                                    title={entry.question}
                                    subtitle={entry.date}
                                    titleStyle={styles.cardTitle}
                                    subtitleStyle={styles.cardSubtitle}
                                />
                                <Card.Content>
                                    <Text style={styles.cardContent}>{entry.response}</Text>
                                </Card.Content>
                            </Card>
                        ))
                    )}
                </ScrollView>
            )}
        </View>
    );
};

const getDynamicStyles = (fontSize, colors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 10,
            backgroundColor: colors.background,
        },
        addButton: {
            marginBottom: 10,
            backgroundColor: colors.primary,
        },
        buttonLabel: {
            fontSize,
            lineHeight: fontSize * 1.2,
            color: colors.onPrimary,
        },
        scrollView: {
            flex: 1,
        },
        entryCard: {
            marginBottom: 10,
            backgroundColor: colors.surface,
        },
        cardTitle: {
            fontSize: fontSize + 2,
            color: colors.primary,
        },
        cardSubtitle: {
            fontSize,
            color: colors.onBackground,
        },
        cardContent: {
            fontSize,
            color: colors.onBackground,
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        loadingText: {
            fontSize,
            color: colors.onBackground,
        },
        errorText: {
            fontSize,
            textAlign: 'center',
            color: colors.error,
        },
    });

export default HomePage;

import React, { useEffect, useMemo, useState } from 'react';
import { Keyboard, Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { useFontSize } from '../contexts/FontSizeContext';

const questions = [
    "What made you smile today?",
    "What is one thing you learned today?",
    "What was the highlight of your day?",
    "What challenged you today?",
    "What are you most grateful for?",
];

const EntryModal = ({ visible, onClose, entry, onSave, onDelete }) => {
    const { fontSize } = useFontSize(); // Access global font size
    const [editResponse, setEditResponse] = useState('');
    const [newResponse, setNewResponse] = useState('');
    const [randomQuestion, setRandomQuestion] = useState(''); // Store random question for new entry

    const styles = useMemo(() => getStyles(fontSize), [fontSize]); // Generate styles dynamically

    const generateRandomQuestion = () => {
        const randomIndex = Math.floor(Math.random() * questions.length);
        setRandomQuestion(questions[randomIndex]);
    };

    useEffect(() => {
        if (entry) {
            // If editing an existing entry
            setEditResponse(entry.response);
        } else if (visible) {
            // Generate a new random question only when modal is opened for a new entry
            generateRandomQuestion();
        }
    }, [entry, visible]);

    const clearResponses = (editRes) => {
        editRes ? setEditResponse('') : setNewResponse('');
    };

    const handleSave = () => {
        if ((entry ? editResponse : newResponse).length < 10) {
            alert('Response must be at least 10 characters long.');
            return;
        }

        const newEntry = entry
            ? { ...entry, response: editResponse } // For editing
            : { response: newResponse, question: randomQuestion }; // For new entry

        onSave(newEntry, clearResponses); // Pass to parent
        onClose(); // Close the modal
    };

    const handleDelete = () => {
        if (entry) {
            onDelete(entry.id); // Delete entry
            onClose(); // Close the modal
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            {/* Dismiss the keyboard when tapping outside */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalContainer}>
                    <Card style={styles.modalCard}>
                        <Text style={styles.modalTitle}>
                            {entry ? 'Edit Journal Entry' : 'New Journal Entry'}
                        </Text>
                        <Text style={styles.modalQuestion}>
                            {entry ? entry.question : randomQuestion}
                        </Text>
                        <TextInput
                            value={entry ? editResponse : newResponse}
                            onChangeText={entry ? setEditResponse : setNewResponse}
                            multiline
                            style={styles.input}
                            labelStyle={styles.buttonLabel}
                        />
                        <Button
                            mode="contained"
                            onPress={handleSave}
                            style={styles.saveButton}
                            labelStyle={styles.buttonLabel}
                        >
                            {entry ? 'Save Changes' : 'Add Entry'}
                        </Button>
                        {entry && (
                            <Button
                                mode="outlined"
                                onPress={handleDelete}
                                style={styles.deleteButton}
                                labelStyle={styles.buttonLabel}
                            >
                                Delete Entry
                            </Button>
                        )}
                        <Button onPress={onClose} style={styles.closeButton} labelStyle={styles.buttonLabel}>
                            Close
                        </Button>
                    </Card>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const getStyles = (fontSize) =>
    StyleSheet.create({
        modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
        modalCard: { width: '90%', padding: fontSize },
        modalTitle: { fontSize: fontSize + 2, fontWeight: 'bold', marginBottom: fontSize / 2 },
        modalQuestion: { fontSize, fontWeight: 'normal', marginBottom: fontSize / 2 },
        input: {
            fontSize,
            marginBottom: fontSize,
            lineHeight: fontSize * 1.2,
        },
        saveButton: { marginBottom: fontSize / 2 },
        deleteButton: { marginBottom: fontSize / 2 },
        closeButton: { marginBottom: fontSize / 2 },
        buttonLabel: { fontSize, lineHeight: fontSize * 1.2 },
    });

export default EntryModal;

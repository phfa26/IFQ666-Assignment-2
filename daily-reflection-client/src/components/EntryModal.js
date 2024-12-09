import React, { useEffect, useState } from 'react';
import { Keyboard, Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';

const questions = [
    "What made you smile today?",
    "What is one thing you learned today?",
    "What was the highlight of your day?",
    "What challenged you today?",
    "What are you most grateful for?",
];

const EntryModal = ({ visible, onClose, entry, onSave, onDelete }) => {
    const [editResponse, setEditResponse] = useState('');
    const [newResponse, setNewResponse] = useState('');
    const [randomQuestion, setRandomQuestion] = useState(''); // Store random question for new entry

    useEffect(() => {
        if (entry) {
            // If editing an existing entry
            setEditResponse(entry.response); // Set response for editing
        } else {
            // If adding a new entry, generate a random question
            const randomIndex = Math.floor(Math.random() * questions.length);
            setRandomQuestion(questions[randomIndex]);
        }
    }, [entry]);

    const clearResponses = (editRes) => {
        editRes ? setEditResponse('') : setNewResponse('');
    }

    const handleSave = () => {
        if ((entry ? editResponse : newResponse).length < 10) {
            alert('Response must be at least 10 characters long.');
            return;
        }

        const newEntry = entry
            ? { ...entry, response: editResponse }  // For editing
            : {response: newResponse,  question: randomQuestion };  // For new entry

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
                            label="Response"
                            value={ entry ? editResponse : newResponse}
                            onChangeText={entry ? setEditResponse : setNewResponse}
                            multiline
                            style={styles.input}
                        />
                        <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
                            {entry ? 'Save Changes' : 'Add Entry'}
                        </Button>
                        {entry && (
                            <Button mode="outlined" onPress={handleDelete} style={styles.deleteButton}>
                                Delete Entry
                            </Button>
                        )}
                        <Button onPress={onClose}>Close</Button>
                    </Card>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalCard: { width: '90%', padding: 20 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    modalQuestion: { fontSize: 16, fontWeight: 'normal', marginBottom: 10 },
    input: { marginBottom: 15 },
    saveButton: { marginBottom: 10 },
    deleteButton: { marginBottom: 10, color: 'red' },
});

export default EntryModal;

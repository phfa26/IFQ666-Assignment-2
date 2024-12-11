import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

const AboutPage = () => {
    const { colors } = useTheme(); // Access the current theme colors

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.primary }]}>About Daily Reflection Journal</Text>
            <Text style={[styles.text, { color: colors.onBackground }]}>
                The Daily Reflection Journal app is designed to encourage mindfulness and gratitude by helping users
                reflect on their day. Answer one thought-provoking question each day and look back at your responses to
                track your growth and journey.
            </Text>

            <Text style={[styles.subtitle, { color: colors.primary }]}>Acknowledgments</Text>
            <Text style={[styles.text, { color: colors.onBackground }]}>
                This app was built using the following open-source technologies:
            </Text>
            <Text style={[styles.listItem, { color: colors.onBackground }]}>- React Native</Text>
            <Text style={[styles.listItem, { color: colors.onBackground }]}>- React Native Paper</Text>
            <Text style={[styles.listItem, { color: colors.onBackground }]}>- Axios</Text>

            <Text style={[styles.subtitle, { color: colors.primary }]}>Version</Text>
            <Text style={[styles.text, { color: colors.onBackground }]}>Version 1.0.0</Text>

            <Button
                mode="outlined"
                onPress={() => Linking.openURL('https://github.com/phfa26/IFQ666-Assignment-2')}
                style={[styles.button, { borderColor: colors.primary }]}
                labelStyle={{ color: colors.primary }}
            >
                View Source Code
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
    },
    listItem: {
        fontSize: 16,
        marginLeft: 10,
        lineHeight: 24,
    },
    button: {
        marginTop: 20,
    },
});

export default AboutPage;

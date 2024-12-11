import React from 'react';
import { Linking, ScrollView, StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useFontSize } from '../contexts/FontSizeContext'; // Import FontSizeContext

const AboutPage = () => {
    const { colors } = useTheme(); // Access the current theme colors
    const { fontSize } = useFontSize(); // Access global font size

    // Pass fontSize and theme colors to the styles
    const styles = getStyles(fontSize, colors);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>About Daily Reflection Journal</Text>
            <Text style={styles.text}>
                The Daily Reflection Journal app is designed to encourage mindfulness and gratitude by helping users
                reflect on their day. Answer one thought-provoking question each day and look back at your responses to
                track your growth and journey.
            </Text>

            <Text style={styles.subtitle}>Acknowledgments</Text>
            <Text style={styles.text}>This app was built using the following open-source technologies:</Text>
            <Text style={styles.listItem}>- React Native</Text>
            <Text style={styles.listItem}>- React Native Paper</Text>
            <Text style={styles.listItem}>- Axios</Text>

            <Text style={styles.subtitle}>Version</Text>
            <Text style={styles.text}>Version 1.0.0</Text>

            <Button
                mode="outlined"
                onPress={() => Linking.openURL('https://github.com/phfa26/IFQ666-Assignment-2')}
                style={styles.button}
                labelStyle={styles.buttonLabel}
            >
                View Source Code
            </Button>
        </ScrollView>
    );
};

// Dynamically generate styles based on fontSize and colors
const getStyles = (fontSize, colors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 30,
            backgroundColor: colors.background,
        },
        title: {
            fontSize: fontSize + 8,
            fontWeight: 'bold',
            marginBottom: 20,
            color: colors.primary,
        },
        subtitle: {
            fontSize: fontSize + 2,
            fontWeight: 'bold',
            marginTop: 20,
            marginBottom: 10,
            color: colors.primary,
        },
        text: {
            fontSize,
            lineHeight: fontSize * 1.5,
            marginBottom: 10,
            color: colors.onBackground,
        },
        listItem: {
            fontSize,
            marginLeft: 10,
            lineHeight: fontSize * 1.5,
            color: colors.onBackground,
        },
        button: {
            marginTop: 20,
        },
        buttonLabel: {
            fontSize,
            lineHeight: fontSize * 1.2,
            color: colors.secondary,
        },
    });

export default AboutPage;

import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

const AboutPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>About Daily Reflection Journal</Text>
            <Text style={styles.text}>
                The Daily Reflection Journal app is designed to encourage mindfulness and gratitude by helping users
                reflect on their day. Answer one thought-provoking question each day and look back at your responses to
                track your growth and journey.
            </Text>

            <Text style={styles.subtitle}>Acknowledgments</Text>
            <Text style={styles.text}>
                This app was built using the following open-source technologies:
            </Text>
            <Text style={styles.listItem}>- React Native</Text>
            <Text style={styles.listItem}>- React Native Paper</Text>
            <Text style={styles.listItem}>- Axios</Text>

            <Text style={styles.subtitle}>Version</Text>
            <Text style={styles.text}>Version 1.0.0</Text>

            <Button
                mode="outlined"
                onPress={() => Linking.openURL('https://github.com/phfa26/IFQ666-Assignment-2')}
                style={styles.button}
            >
                View Source Code
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    subtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
    text: { fontSize: 16, lineHeight: 24, marginBottom: 10 },
    listItem: { fontSize: 16, marginLeft: 10, lineHeight: 24 },
    button: { marginTop: 20 },
});

export default AboutPage;

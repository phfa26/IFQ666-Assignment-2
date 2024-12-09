import * as SecureStore from 'expo-secure-store';

// Save a key-value pair securely
export const saveToSecureStore = async (key, value) => {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (error) {
        console.error(`Error saving ${key} to SecureStore:`, error);
    }
};

// Retrieve a value by its key
export const getFromSecureStore = async (key) => {
    try {
        const result = await SecureStore.getItemAsync(key);
        return result;
    } catch (error) {
        console.error(`Error retrieving ${key} from SecureStore:`, error);
        return null;
    }
};

// Delete a key-value pair
export const deleteFromSecureStore = async (key) => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.error(`Error deleting ${key} from SecureStore:`, error);
    }
};

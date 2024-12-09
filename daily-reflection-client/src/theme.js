import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

const CombinedDarkTheme = {
    ...NavigationDarkTheme,
    ...MD3DarkTheme,
    colors: {
        ...NavigationDarkTheme.colors,
        ...MD3DarkTheme.colors,
    },
};

const CombinedLightTheme = {
    ...NavigationLightTheme,
    ...MD3LightTheme,
    colors: {
        ...NavigationLightTheme.colors,
        ...MD3LightTheme.colors,
    },
};

export { CombinedDarkTheme, CombinedLightTheme };

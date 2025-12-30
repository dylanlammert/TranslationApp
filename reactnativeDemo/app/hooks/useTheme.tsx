import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface ColorScheme {
    background: string;
    cardBackground: string;
    text: string;
    textMuted: string;
    border: string;
    primary: string;
    secondary: string;
    gradient: {
        background: [string, string];
        primary: [string, string];
    };
    backgrounds: {
        input: string;
        editInput: string;
    };
    statusBarStyle: 'lightMode' | 'darkMode';
}

const lightScheme: ColorScheme = {
    background: '#FFFFFF',
    cardBackground: '#c0c0c0ff',
    text: '#000000',
    textMuted: '#8E8E93',
    border: '#C7C7CC',
    primary: '#007AFF',
    secondary: '#FF3B30',
    gradient: {
        background: ['#FFFFFF', '#F5F5F5'],
        primary: ['#007AFF', '#0055D4'],
    },
    backgrounds: {
        input: '#F5F5F5',
        editInput: '#E1E1E1',
    },
    statusBarStyle: 'darkMode' as const,

};

const darkScheme: ColorScheme = {
    background: '#000000',
    cardBackground: '#2a2a2aaa',
    text: '#FFFFFF',
    textMuted: '#8E8E93',
    border: '#3C3C43',
    primary: '#0A84FF',
    secondary: '#FF3B30',
    gradient: {
        background: ['#333333ff', '#000000ff'],
        primary: ['#0A84FF', '#0055D4'],
    },
    backgrounds: {
        input: '#1C1C1E',
        editInput: '#2C2C2E',
    },
    statusBarStyle: 'lightMode' as const,
};

interface ThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    colors: ColorScheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode}) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem("darkMode").then((value) => {
            if (value == "true") setIsDarkMode(JSON.parse(value));
        });
    }, []);

    const toggleDarkMode = async () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
    };

    const colors = isDarkMode ? darkScheme : lightScheme;

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors}}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider class");
    }

    return context;
};

export default useTheme;
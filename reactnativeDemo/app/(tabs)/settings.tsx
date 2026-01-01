import useTheme from "@/hooks/useTheme";
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const settings = () => {
        const {toggleDarkMode} = useTheme();
        const {colors} = useTheme();

    return (
         <LinearGradient
                colors = {colors.gradient.background}
                style={{
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}
                >
            <TouchableOpacity onPress={toggleDarkMode} >
                            
                <Text style={{ color: colors.text }}>Change Theme</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default settings
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, View, Switch, Alert } from 'react-native';
import {containers} from "@/styles/containerStyles";
import { fonts } from "@/styles/fonts";
import historyContext from "@/hooks/historyContext";
import { deleteStack } from "@/hooks/historyContext";

const settings = () => {
        const {isDarkMode, toggleDarkMode} = useTheme();
        const {colors} = useTheme();
        const {historyEnabled, toggleHistory} = historyContext();

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
            {/* 
                This is the start of the preferences list
            */}
            <View style ={{
                ...containers.cardContainer,
                backgroundColor: colors.background,
                
                }}>
                
                <View>
                    <Text style={{
                        ...fonts.h1,
                        color: colors.text,
                    }}>
                        Preferences
                    </Text>
                </View>
                {/* Darkness Setting */}
                <View style= {{
                    ...containers.settingItem,
                    ...containers.rowContainer,
                    alignContent: "center",
                    justifyContent: "space-between",
                    borderColor: colors.border,
                }}>
                    {/* Left Side */}
                    <View style = {{justifyContent: "center"}}>
                        <Text style={{
                            ...fonts.h2,
                            color: colors.text,
                            fontWeight: 100,
                            
                            }}>Dark Mode</Text>
                    </View>
                    <Switch 
                    value= {isDarkMode}
                    onValueChange={toggleDarkMode}
                    thumbColor={"white"}
                    trackColor={{false: colors.textMuted, true: colors.textMuted}}
                    style= {{
                        transform: [{scale: 1.5}],
                    }}
                    ></Switch>
                </View>
                
                {/*  */}
                <View style= {{
                    ...containers.settingItem,
                    ...containers.rowContainer,
                    alignContent: "center",
                    justifyContent: "space-between",
                    borderColor: colors.border,
                }}>
                    {/* Left Side */}
                    <View style = {{justifyContent: "center"}}>
                        <Text style={{
                            ...fonts.h2,
                            color: colors.text,
                            fontWeight: 100,
                            
                            }}>Save Translation History
                        </Text>
                    </View>
                    <Switch 
                    value= {historyEnabled}
                    onValueChange={historyWarning}
                    thumbColor={"white"}
                    trackColor={{false: colors.textMuted, true: colors.textMuted}}
                    style= {{
                        transform: [{scale: 1.5}],
                    }}
                    ></Switch>
                </View>
            </View>
        </LinearGradient>
    )
    async function historyWarning() {
    if (historyEnabled) {
        Alert.alert(
            "Turn off translation history?",
            "This will delete all current translation history",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Turn Off",
                    style: "destructive",
                    onPress: () => toggleHistory(),
                },
            ]   

        );
    } else {
        toggleHistory();
    }
}
}


export default settings
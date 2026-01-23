import useTheme from "@/hooks/useTheme";
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View, Switch, Alert } from 'react-native';
import {containers} from "@/styles/containerStyles";
import { fonts } from "@/styles/fonts";
import historyContext from "@/hooks/historyContext";
import {Link} from "expo-router";

const settings = () => {
        const {isDarkMode, toggleDarkMode} = useTheme();
        const {colors} = useTheme();
        const {historyEnabled, toggleHistory} = historyContext();

    return (
        <LinearGradient
                colors = {colors.gradient.background}
                style={{
                    ...containers.flexContainer,
                }}
                >
            
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
                
                <View>
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
                    <View style= {{
                    ...containers.rowContainer,
                    gap: 4,
                    }}>
                        <Text style= {{
                            ...fonts.text,
                            color: colors.textMuted,
                        }}>
                            See previous translation history
                            
                        </Text>
                        <Link href="../history" style= {{...fonts.text, color: colors.primary}}>
                            here
                        </Link>    
                    
                    </View>
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
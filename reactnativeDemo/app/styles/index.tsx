import useTheme from "@/hooks/useTheme";
import languageArray from "@/languages";
import { containers } from "@/styles/containerStyles";
import { fonts } from "@/styles/fonts";
import { Picker } from "@react-native-picker/picker";
import { translate } from "@vitalets/google-translate-api";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

/**
 * Current Issues:
 *  - sending too many requests to GT api getting timeout error
 *      - maybe try to only have a subimt button instead
 *  - Finish design on settings tab
 *  - create history stack utilizing async local storage
 *  - 
 */
export default function Index() {
    const {toggleDarkMode} = useTheme();
    const {colors} = useTheme();

    // Define message and setMessage for sending text input to GoogleTranslate API 
    const [message, setMessage] = useState("");
    const [debouncedMessage, setDebouncedMessage] = useState("");
    const [translatedMessage, setTranslatedMessage] = useState("");
    const [fromLanguageCode, setFromLanguageCode] = useState("");
    const [toLanguageCode, setToLangauageCode] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedMessage(message);
        }, 750);

        return () => clearTimeout(timeout);
    }, [message]);

    useEffect(() => {
        if(!debouncedMessage.trim()) return;

        async function sendMessage() {
            console.log("sending '" + debouncedMessage + "' to Google Translate");
            
            const result = await translate(debouncedMessage, {
                from: fromLanguageCode,
                to: toLanguageCode,
            });
            

        // set the var translatedMessage to the text result from the obj that got returned by translate()
            setTranslatedMessage(result.text);
        }
         sendMessage(); 
    }, [debouncedMessage]);

    return (
        <LinearGradient
        colors = {colors.gradient.background}
        style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
        }}
        >
            <TextInput
                placeholder="Enter text here..."
                placeholderTextColor={colors.textMuted}
                // message will be the value within the text input
                value={message}
                onChangeText={setMessage}
                style={{
                width: "100%",
                borderWidth: 1,
                borderColor: colors.border,
                padding: 16,
                color: colors.text,
                ...fonts.h1,
                }}
            />
            {translatedMessage ? (
                <Text
                style= {{
                alignSelf: "flex-start",
                color: colors.text,
                ...fonts.h1,
                padding: 16,
                textAlign: "left",
                }}> 
                    {translatedMessage}
                </Text>) : null }
            
            <TouchableOpacity onPress={toggleDarkMode} >
                
                <Text style={{ color: colors.text }}>Change Theme</Text>
            </TouchableOpacity>
            <View style={{...containers.rowContainer}}>
                <Picker
                    onValueChange={(value) => setFromLanguageCode(value)}
                    selectedValue = {fromLanguageCode}
                    mode="dropdown"
                    style = {{
                        ...containers.pickerContainer
                    }}
                >
                    {languageArray.map((language) => (
                        <Picker.Item
                            label= {language.label}
                            value={language.value}
                        />
                    ))}            
                </Picker>

                <Picker
                    onValueChange={setToLangauageCode}
                    selectedValue = {toLanguageCode}
                    mode = "dropdown"
                    style = {{
                        ...containers.pickerContainer
                    }}
                >
                    {languageArray.map((language) => (
                        <Picker.Item
                            key={language.value}
                            label= {language.label}
                            value={language.value}
                        />
                    ))}            
                </Picker>
            </View>
            
        </LinearGradient>
    );
    }


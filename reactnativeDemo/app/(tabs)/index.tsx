import useTheme from "@/hooks/useTheme";
import historyContext from "@/hooks/historyContext";
import languageArray from "@/languages";
import { containers } from "@/styles/containerStyles";
import { fonts } from "@/styles/fonts";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { translate } from "@vitalets/google-translate-api";
import { Audio } from "expo-av";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, } from "react-native";
/**
 * Current Issues:
 *  - sending too many requests to GT api getting timeout error
 * [] move change theme to settings
 * [] create submit button
 * [] create a recent languages setion within the picker items
 * [] Finish design on settings tab
 * [] create history stack utilizing async local storage
 * [] fix header so that phone utility bar shows
 * [] create button in between language pickers for voice input
 */
export default function Index() {
    const {colors} = useTheme();

    // Define message and setMessage for sending text input to GoogleTranslate API 
    const [message, setMessage] = useState("");
    const [debouncedMessage, setDebouncedMessage] = useState("");
    const [translatedMessage, setTranslatedMessage] = useState("");
    const [fromLanguageCode, setFromLanguageCode] = useState("");
    const [toLanguageCode, setToLangauageCode] = useState("");
    const [recording, setRecording] = useState<Audio.Recording | null> (null);
    const [permissionResponse, requestPermission] = Audio.usePermissions();

    /*
    async function startRecording() {
        try {
            if(permissionResponse?.status !== 'granted') {
                console.log("requesting permission...");
                await requestPermission();
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log("start recording...");
            const {recording} = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);

            setRecording(recording);
            console.log("recording...");
        } catch(error) {
            console.error("failed to start recording", error);
        }
    }
    async function stopRecording() {
        if(!recording) return;
        console.log('Stopping recording..');
        setRecording(null);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        });
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
    }
    */
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
            
            
            <View style={{
                ...containers.rowContainer, 
                ...containers.pickerParentContainer,
                marginTop:"auto",
            }}>
                <View style= {{
                    ...containers.pickerContainer, 
                    borderColor:colors.border,
                    backgroundColor: colors.primary,
                    }}>
                    <Picker
                        onValueChange={(value) => setFromLanguageCode(value)}
                        selectedValue = {fromLanguageCode}
                        mode="dropdown"
                        dropdownIconColor={colors.text}
                        style = {{
                            color: colors.text,
                            
                            
                        }}
                        
                    >
                        {languageArray.map((language) => (
                            <Picker.Item
                                label= {language.label}
                                value={language.value}
                            />
                        ))}
                    </Picker>
                </View>

                {/* Below is code for a future audio input option

                <TouchableOpacity onPress={recording ? stopRecording : startRecording} style= {{...containers.flexContainer}}>
                    <Ionicons name={recording ? "mic-off-outline" : "mic"} size={30} color={colors.primary}/>
                </TouchableOpacity>
                */}
                <View style= {{
                    ...containers.pickerContainer, 
                    borderColor:colors.border,
                    backgroundColor: colors.primary,
                    }}>
                    <Picker
                        onValueChange={setToLangauageCode}
                        selectedValue = {toLanguageCode}
                        mode = "dropdown"
                        dropdownIconColor={colors.text}
                        style = {{
                            color: colors.text,
                            
                            
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
            </View>
            
        </LinearGradient>
    );
    }
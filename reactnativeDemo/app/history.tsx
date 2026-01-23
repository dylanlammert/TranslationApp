import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import {useEffect, useState} from "react";
import {loadStack} from '@/hooks/historyContext';
import type {TranslationHistoryEntry} from "@/types/TranslationHistoryEntry"
import containers from './styles/containerStyles';
import fonts from "@/styles/fonts";
import useTheme from "@/hooks/useTheme";



const history = () => {
    const [history, setHistory] = useState<TranslationHistoryEntry[]>([]);
    const {colors} = useTheme();
    useEffect(() => {
        const loadHistory = async() => {
            const storedHistory = await loadStack();
            setHistory  (storedHistory);
        };

        loadHistory();
    }, []);
    
       
    return (
        <View style={{...containers.flexContainer}}>
            {history.map((entry) => (
                <View key= {entry.id} style= {{
                        ...containers.columContainer, 
                    }}>
                    <Text style= {{
                        ...fonts.h2,
                    }}>
                        {entry.sourceLang}: {entry.sourceText}
                    </Text>
                    <Text style={{
                        ...fonts.h2,
                    }}>
                        {entry.toLang}: {entry.translatedText}
                    </Text>
                
                </View>
            ))}
        </View>
    )
}

export default history
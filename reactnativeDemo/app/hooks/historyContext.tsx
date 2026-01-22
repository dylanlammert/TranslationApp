import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// create a stack that can hold at most 100 past translations
// each stack slot holds an entry object that looks like the following
type TranslationHistoryEntry = {
    id: string;
    sourceText: string;
    translatedText: string;
    sourceLang: string;
    toLang: string;
};

type HistoryContextType = {
    historyEnabled: boolean;
    toggleHistory: () => void;
};

const key = "translationStack";
const maxSize = 50;
/**
 * 
 * @returns either an empty array or an array filled with TranslationHistoryEntry
 */
export async function loadStack() :Promise<TranslationHistoryEntry[]> {
    const rawData = await AsyncStorage.getItem(key);
    // if rawData == null then return a new TranslationHistoryEntry Array
    return rawData ? JSON.parse(rawData) : [];
}
/**
 * @brief Every time text is sent to the translate module it will push the translation to the next slot in the history stack
 * @param entry this function takes a translationHistoryEntry type
 * @returns returns TranslationHistoryEntry
 */
export async function pushTranslation (entry: TranslationHistoryEntry): Promise<TranslationHistoryEntry[]> {
    const stack = await loadStack();

    stack.push(entry);
    // if the stack is too big then get rid of the oldest entry
    if (stack.length > maxSize) {
        stack.shift();
    }

    await AsyncStorage.setItem(key, JSON.stringify(stack));
    return stack;
};

/**
 * @brief This function will delete the stored stack info
 */
export async function deleteStack() {
    await AsyncStorage.removeItem(key);
};

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);
// create a settingscontext to wrap the application
export const HistoryProvider = ({ children }: { children: ReactNode}) => {
    const [historyEnabled, setIsHistoryOn] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem("historyEnabled").then((value) => {
            if (value == "true") setIsHistoryOn(JSON.parse(value));
        });
    }, []);

    const toggleHistory = async () => {
        const change = !historyEnabled;
        setIsHistoryOn(change);
        if(!change) {
            deleteStack();
        }
        await AsyncStorage.setItem("historyEnabled", JSON.stringify(change));
    };


    return (
        <HistoryContext.Provider value={{ historyEnabled, toggleHistory}}>
            {children}
        </HistoryContext.Provider>
    );
};

const historyContext = () => {
    const context = useContext(HistoryContext);
    if (context === undefined) {
        throw new Error("historyContext must be used within a HistoryProvider class");
    }

    return context;
};

export default historyContext;

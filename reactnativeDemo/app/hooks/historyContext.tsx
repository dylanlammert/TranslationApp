import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import type { TranslationHistoryEntry } from "@/types/TranslationHistoryEntry";
import type { HistoryContextType } from "@/types/HistoryContextType";

// this is the key to retrieve the history from Aysnc storage
const key:string = "translationStack";
// this represents the masSize of the TranslationHistoryEntry array
const maxSize:number = 50;
// create a uniqueId for each TranslationStackEntry
let uniqueId:number = 1;

/**
 * 
 * @param sourceText 
 * @param translatedText 
 * @param sourceLang 
 * @param toLang 
 * @returns newEntry type of TranslationHistoryEntry
 */
export function createHistoryEntry(sourceText:string,translatedText:string,sourceLang:string,toLang:string) : TranslationHistoryEntry {
    const newEntry: TranslationHistoryEntry = {
        id: uniqueId,
        sourceText: sourceText,
        translatedText: translatedText,
        sourceLang: sourceLang,
        toLang: toLang,
    };
    if(uniqueId == 50) {
        uniqueId = 1;
    } else {
        uniqueId = uniqueId + 1;
    }
    return newEntry
}
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
// create a settings context to wrap the application
export const HistoryProvider = ({ children }: { children: ReactNode}) => {
    const [historyEnabled, setIsHistoryOn] = useState(false);
    const [history, setHistory] = useState<TranslationHistoryEntry[]>([]);

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
        <HistoryContext.Provider value={{ historyEnabled, toggleHistory, history}}>
            {children}
        </HistoryContext.Provider>
    );
};

export const useHistory = () => {
    const context = useContext(HistoryContext);
    if (context === undefined) {
        throw new Error("useHistory must be used within a HistoryProvider class");
    }

    return context;
};

export default useHistory;

import { TranslationHistoryEntry } from "./TranslationHistoryEntry";

// this is the data that can be passed between app tabs
export type HistoryContextType = {
    historyEnabled: boolean;
    toggleHistory: () => void;
    history: TranslationHistoryEntry[];
};


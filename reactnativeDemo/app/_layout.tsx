import { Stack } from "expo-router";
import { ThemeProvider } from "./hooks/useTheme";
import { HistoryProvider } from "./hooks/historyContext"

export default function RootLayout() {
    
    return (
        <HistoryProvider>
            <ThemeProvider>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
                    <Stack.Screen name="history" options={{presentation:'modal',}} />
                </Stack>
            </ThemeProvider>
        </HistoryProvider>
        );
}

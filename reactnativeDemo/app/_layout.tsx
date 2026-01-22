import { Stack } from "expo-router";
import { ThemeProvider } from "./hooks/useTheme";
import { HistoryProvider } from "./hooks/historyContext"

export default function RootLayout() {
    
    return (
        <ThemeProvider>
            <HistoryProvider>
                <Stack>
                    {/* Edit the content found within the header */}
                    <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
                </Stack>
            </HistoryProvider>
        </ThemeProvider>
        );
}

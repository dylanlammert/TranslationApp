import { Stack } from "expo-router";
import { ThemeProvider } from "./hooks/useTheme";

export default function RootLayout() {
    
    return (
        <ThemeProvider>
            <Stack>
                {/* Edit the content found within the header */}
                <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
            </Stack>
        </ThemeProvider>
        );
}

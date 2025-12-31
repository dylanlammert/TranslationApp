import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
const TabsLayout = () => {
    const {colors} = useTheme();
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textMuted,
            tabBarStyle: {
                backgroundColor: colors.background,
                borderTopWidth: 1,
                borderTopColor: colors.border,
                paddingTop: 10,
                height: 100,
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: "bold",
            },
            headerShown: true,
            headerStyle: {
                backgroundColor: colors.background,
                borderBottomColor: colors.border,
                borderBottomWidth:1,
            }
        }}>
            <Tabs.Screen name="index" options={{title:"" ,tabBarLabel: "Text-to-Text", tabBarIcon: ({color,size}) => ( <Ionicons name="language" size={size} color={color}/>)}}/>
            {/*<Tabs.Screen name="conversationMode" options={{title:"" ,tabBarLabel: "Conversation", tabBarIcon: ({color,size}) => ( <Ionicons name="people"size={size} color={color}/>)}}/>*/}
            <Tabs.Screen name="settings" options={{title:"" ,tabBarLabel: "settings", tabBarIcon: ({color,size}) => ( <Ionicons name="settings" size={size} color={color}/>)}}/>

        </Tabs>
    );
};
export default TabsLayout;
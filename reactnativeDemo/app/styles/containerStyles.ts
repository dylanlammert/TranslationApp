
import { StyleSheet } from "react-native";

export const containers = StyleSheet.create({
    flexContainer: {
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: 16,
        gap:16,
    },
    rowContainer: {
        display: "flex",
        flexDirection: "row",
    },
    columContainer: {
        display: "flex",
        flexDirection: "column",
    },
    
    pickerParentContainer: {
        boxSizing: "border-box",
        padding: 16,
        width: "100%",
        justifyContent: "space-between",


    },
    pickerContainer: {
        height: 50,
        width: 150,
        borderWidth: 1,
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
    },

    cardContainer: {
        borderRadius: 10,
        height: "auto",
        width: "100%",
        padding: 16,
        gap: 32,

    },

    settingItem: {
        height: 50,
        width: "100%",
        borderTopWidth: 1,
    },
    historyItem: {
        borderBottomWidth: 1,
    }
})

export default containers;
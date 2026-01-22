
import { StyleSheet } from "react-native";


export const containers = StyleSheet.create({
    flexContainer: {
        display: "flex",
        justifyContent: "center",
    },
    rowContainer: {
        display: "flex",
        flexDirection: "row",
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

    },

    settingItem: {
        height: 50,
        width: "100%",
        borderTopWidth: 1,
    }
})
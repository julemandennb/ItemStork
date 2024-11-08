import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

class StorageService {

    // Retrieves an item from storage
    public async GetItemFromStorage(name: string): Promise<string | null> {
        if (Platform.OS === "web") {
            return window.localStorage.getItem(name);
        } else {
            return await AsyncStorage.getItem(name);
        }
    }

    // Sets an item in storage
    public async SetItemFromStorage(name: string, data: string): Promise<void> {
        if (Platform.OS === "web") {
            window.localStorage.setItem(name, data);
        } else {
            await AsyncStorage.setItem(name, data);
        }
    }

    // Removes an item from storage
    public async RemoveItemFromStorage(name: string): Promise<void> {
        if (Platform.OS === "web") {
            window.localStorage.removeItem(name);
        } else {
            await AsyncStorage.removeItem(name);
        }
    }
}

export default StorageService;

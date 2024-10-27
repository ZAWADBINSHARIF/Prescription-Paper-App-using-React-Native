import AsyncStorage from '@react-native-async-storage/async-storage';
import { ColorSchemeName } from 'nativewind/dist/style-sheet/color-scheme';

interface LocalStorageItem {
    theme_color: ColorSchemeName;
}

const useLocalStorage = () => {
    const localStorage = {
        async setItem(key: keyof LocalStorageItem, value: ColorSchemeName | string) {
            try {
                await AsyncStorage.setItem(key, value);
            } catch (error) {
                console.log(error);
            }
        },
        async getItem(key: keyof LocalStorageItem) {
            try {
                const value = await AsyncStorage.getItem(key);
                if (value)
                    return value;
                else
                    return null;
            } catch (error) {
                console.log(error);
            }
        }
    };

    return localStorage;
};

export default useLocalStorage;
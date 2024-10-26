import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import useStyleChange from '@/hooks/useStyleChange';
import useGlobalContext from '@/hooks/useGlobalContext';

const Header = () => {
    const { patientDetailsError, medicineFormErrorsIDs } = useGlobalContext();
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const { StyleChange } = useStyleChange();
    const pathname = usePathname();

    const [headerName, setHeaderName] = useState<"Home" | "Files" | "Prescription">("Home");
    const [errorText, setErrorText] = useState("");

    useEffect(() => {
        setHeaderName(pathname === "/" ? "Home" : pathname === "/files" ? "Files" : "Prescription");
    }, [pathname]);

    useEffect(() => {
        if (medicineFormErrorsIDs.length > 0 || patientDetailsError) {
            setErrorText("⚠ Write the prescription properly");
        } else {
            setErrorText("");
        }
    }, [medicineFormErrorsIDs]);

    return (
        <View className='h-16 mt-2'
            style={{
                paddingHorizontal: 16
            }}
        >
            <View className={`h-full rounded-[32px] shadow-lg shadow-gray-600 items-center px-5 justify-between flex-row ${StyleChange("bg-white", "bg-gray-900 shadow-none")}`}>
                <Text className={`text-2xl font-bold ${StyleChange("text-blue-600", "text-white")}`}>{headerName}</Text>

                {errorText &&
                    <View>
                        <Text className='text-yellow-600 text-xs font-bold'>{errorText}</Text>
                    </View>
                }
                <View>
                    {
                        colorScheme === 'dark' ?
                            <Ionicons name='sunny' color={'white'} size={30} onPress={toggleColorScheme} /> :
                            <MaterialCommunityIcons name="weather-night" size={30} color="black" onPress={toggleColorScheme} />
                    }
                </View>
            </View>
        </View>
    );
};

export default Header;
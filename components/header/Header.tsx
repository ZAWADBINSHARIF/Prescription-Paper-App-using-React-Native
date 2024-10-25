import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import useStyleChange from '@/hooks/useStyleChange';

const Header = () => {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const { StyleChange } = useStyleChange();
    const [headerName, setHeaderName] = useState<"Home" | "Files" | "Prescription">("Home");
    const pathname = usePathname();

    useEffect(() => {
        setHeaderName(pathname === "/" ? "Home" : pathname === "/files" ? "Files" : "Prescription");
    }, [pathname]);

    return (
        <View className='h-16 mt-2'
            style={{
                paddingHorizontal: 16
            }}
        >
            <View className={`h-full rounded-[32px] shadow-lg shadow-gray-600 items-center px-5 justify-between flex-row ${StyleChange("bg-white", "bg-gray-900 shadow-none")}`}>
                <Text className={`text-2xl font-bold ${StyleChange("text-blue-600", "text-white")}`}>{headerName}</Text>
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
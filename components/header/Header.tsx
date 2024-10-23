import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

const Header = () => {
    const { colorScheme, toggleColorScheme } = useColorScheme();
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
            <View className='bg-white h-full rounded-[32px] shadow-lg shadow-gray-600 items-center px-5 justify-between flex-row dark:bg-gray-900 dark:shadow-none'>
                <Text className='text-2xl font-bold text-blue-600 dark:text-white'>{headerName}</Text>
                <View>
                    {
                        colorScheme === 'dark' ?
                            <Ionicons name='sunny' color={'white'} size={30} onPress={toggleColorScheme} /> :
                            <Ionicons name='moon' size={30} onPress={toggleColorScheme} />
                    }
                </View>
            </View>
        </View>
    );
};

export default Header;
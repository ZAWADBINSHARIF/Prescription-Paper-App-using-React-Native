import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/header/Header';
import StatusBarColor from '@/components/Status/StatusBarColor';

const files = () => {

    return (
        <SafeAreaView className='flex-1 bg-neutral-100 dark:bg-gray-800'>
            <StatusBarColor />

            <View className='flex-1'>
                <Header />

                <View className='px-6 py-4 h-full'>

                </View>

            </View>

        </SafeAreaView>
    );
};

export default files;
import { View, Text } from 'react-native';
import React from 'react';

import StatusBarColor from '@/components/Status/StatusBarColor';
import useStyleChange from '@/hooks/useStyleChange';

const files = () => {

    const { StyleChange } = useStyleChange();

    return (
        <View className={`flex-1 ${StyleChange("bg-neutral-100", "bg-gray-800")}`}>
            <StatusBarColor />

            <View className='flex-1'>

                <View className='px-6 py-4 h-full'>

                </View>

            </View>

        </View>
    );
};

export default files;
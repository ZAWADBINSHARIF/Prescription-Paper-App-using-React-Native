import { View, Text, TextInput, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarColor from '@/components/Status/StatusBarColor';
import Header from '@/components/header/Header';
import Checkbox from 'expo-checkbox';
import useStyleChange from '@/hooks/useStyleChange';


const writePrescription = () => {

    const { StyleChange } = useStyleChange();

    return (
        <SafeAreaView className='flex-1 bg-neutral-100 dark:bg-gray-800'>
            <StatusBarColor />

            <Header />

            <View className='px-6 pt-4 flex-1'>

                {/* Patient's Details  */}
                <View className={`${StyleChange("bg-white", "bg-gray-900")} rounded-xl px-3 py-1 w-full`}>
                    <Text className={`text-xl font-bold ${StyleChange("text-neutral-700", "text-white")}`}>Patient's Details</Text>

                    <View className='py-3 gap-1 justify-center space-y-3 w-full'>

                        <View className='flex-row space-x-3'>
                            <TextInput className='bg-neutral-100 flex-1 rounded-xl p-2 text-lg' placeholder='Name' />
                            <TextInput className='bg-neutral-100 flex-1 rounded-xl p-2 text-lg' placeholder='Age' />
                        </View>

                        <View className='flex-row space-x-3'>
                            <TextInput className='bg-neutral-100 flex-1 rounded-xl p-2 text-lg' placeholder='Pressure' />
                            <TextInput className='bg-neutral-100 flex-1 rounded-xl p-2 text-lg' placeholder='Diabetic' />
                        </View>

                    </View>
                </View>
                {/* bg-secondaryLight dark:bg-gray-900  */}
                {/* Prescription  */}
                <View className='rounded-xl py-1 space-y-3 mt-6 flex-1 flex-col w-full'>

                    <View className={`${StyleChange("bg-white", "bg-gray-900")} rounded-xl py-3 px-3 space-x-3 justify-around w-full flex-row items-center`}>

                        <View className='flex-row flex-1 space-x-5'>
                            <Text className='text-base flex-1 text-white font-bold'>Medicine name</Text>
                            <Text className='text-base flex-1 text-white font-bold'>Power</Text>
                        </View>

                        <View className='flex-row space-x-3 justify-center items-center'>
                            <Text className='text-sm font-bold text-white'>Morning</Text>
                            <Text className='text-sm font-bold text-white'>Noon</Text>
                            <Text className='text-sm font-bold text-white'>Night</Text>
                        </View>

                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        className='space-y-3 h-full'
                    >

                        <View className={`${StyleChange("bg-white", "bg-gray-900")} rounded-xl py-3 px-3 space-x-3 justify-around w-full flex-row items-center`}>

                            <View className='flex-row flex-1 space-x-3'>
                                <TextInput className='bg-neutral-100 flex-1 rounded-xl p-2 text-lg' placeholder='Medicine' />
                                <TextInput className='bg-neutral-100 flex-1 rounded-xl p-2 text-lg' placeholder='Power' />
                            </View>
                            <View className='flex-row space-x-8 justify-center items-center'>
                                <Checkbox className='rounded-full' color={"rgb(37 99 235)"} value={false} />
                                <Checkbox className='rounded-full' color={"rgb(37 99 235)"} value={false} />
                                <Checkbox className='rounded-full' color={"rgb(37 99 235)"} value={true} />
                            </View>

                        </View>

                    </ScrollView>

                </View>

            </View >
        </SafeAreaView >
    );
};

export default writePrescription;
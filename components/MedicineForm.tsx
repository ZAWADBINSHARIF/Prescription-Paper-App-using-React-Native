import { View, TextInput } from 'react-native';
import React, { memo, useState } from 'react';
import Checkbox from 'expo-checkbox';
import useStyleChange from '@/hooks/useStyleChange';
import { FontAwesome } from '@expo/vector-icons';
import Animated, { SlideInRight } from 'react-native-reanimated';
import { PrescribedMedicine } from '@/interfaces';


interface Props extends PrescribedMedicine {
    handleRemoveMedicineForm: (id: string) => void;
}


const MedicineForm = ({ id, name, power, note, medicineMealtime, handleRemoveMedicineForm }: Props) => {

    const { StyleChange } = useStyleChange();

    return (

        <Animated.View entering={SlideInRight} className={`${StyleChange("bg-white", "bg-gray-900")} rounded-xl py-3 px-3 space-y-3 mb-3`}>

            <View className='space-x-3 justify-around w-full flex-row'>
                <View className='flex-row flex-1 space-x-3'>
                    <TextInput className='bg-neutral-100 flex-1 rounded-xl p-2 text-sm' placeholder='Medicine' />
                    <TextInput className='bg-neutral-100 flex-1 rounded-xl p-2 text-sm' keyboardType='numeric' placeholder='Power' />
                </View>
                <View className='flex-row space-x-8 justify-center items-center'>
                    <Checkbox className='rounded-full' color={"rgb(37 99 235)"} value={false} />
                    <Checkbox className='rounded-full' color={"rgb(37 99 235)"} value={false} />
                    <Checkbox className='rounded-full' color={"rgb(37 99 235)"} value={true} />
                </View>
            </View>

            <View className='flex-row'>
                <View className='flex-1'>
                    <TextInput placeholder='Note' className='bg-neutral-100 flex-1 rounded-xl p-2 text-sm' />
                </View>
                <View className='justify-center px-4'>
                    <FontAwesome name="remove" size={24} color="rgb(239 68 68)" className='text-white' onPress={() => { handleRemoveMedicineForm(id); }} />
                </View>
            </View>

        </Animated.View>

    );
};

export default memo(MedicineForm);
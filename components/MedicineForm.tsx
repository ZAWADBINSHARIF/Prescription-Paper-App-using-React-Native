import { View, TextInput, Text } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import Checkbox from 'expo-checkbox';
import useStyleChange from '@/hooks/useStyleChange';
import { FontAwesome } from '@expo/vector-icons';
import Animated, { LinearTransition, SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { PrescribedMedicine } from '@/interfaces';
import useGlobalContext from '@/hooks/useGlobalContext';


const _layout = LinearTransition.springify().damping(15);

const MedicineForm = ({ id, name, power, days, note, medicineMealtime }: PrescribedMedicine) => {

    const { StyleChange } = useStyleChange();
    const { setPrescribedMedicineValue, handleRemoveMedicineForm, medicineFormErrorsIDs } = useGlobalContext();
    const [hasError, setHasError] = useState(false);


    useEffect(() => {
        const foundID = medicineFormErrorsIDs.find(item => id === item);
        if (foundID) {
            setHasError(true);
        } else {
            setHasError(false);
        }
    }, [medicineFormErrorsIDs]);

    return (
        <Animated.View
            entering={SlideInRight.springify().damping(15)}
            exiting={SlideOutLeft}
            layout={_layout}
            className={`${StyleChange("bg-white", "bg-gray-900")} rounded-xl py-3 px-3 space-y-3 mb-3`}>

            <View className='space-x-3 justify-around w-full flex-row'>
                <View className='flex-row flex-1 space-x-3'>
                    <TextInput value={name} onChangeText={(value) => setPrescribedMedicineValue(id, "name", value)}
                        className='bg-neutral-100 flex-1 rounded-xl p-2 text-sm' placeholder='Medicine' />
                    <TextInput value={power} onChangeText={(value) => setPrescribedMedicineValue(id, "power", value)}
                        className='bg-neutral-100 flex-1 rounded-xl p-2 text-sm' keyboardType='numeric' placeholder='Power' />
                </View>
                <View className='flex-row space-x-8 justify-center items-center'>
                    <Checkbox value={medicineMealtime.morning} onValueChange={(value) => setPrescribedMedicineValue(id, "medicineMealtime", { ...medicineMealtime, "morning": value })} className='rounded-full' color={"rgb(37 99 235)"} />
                    <Checkbox value={medicineMealtime.noon} onValueChange={(value) => setPrescribedMedicineValue(id, "medicineMealtime", { ...medicineMealtime, "noon": value })} className='rounded-full' color={"rgb(37 99 235)"} />
                    <Checkbox value={medicineMealtime.night} onValueChange={(value) => setPrescribedMedicineValue(id, "medicineMealtime", { ...medicineMealtime, "night": value })} className='rounded-full' color={"rgb(37 99 235)"} />
                </View>
            </View>

            <View className='flex-row'>
                <View className='flex-1 flex-row space-x-3'>
                    <TextInput value={days} onChangeText={(value) => setPrescribedMedicineValue(id, "days", value)}
                        placeholder='Days' className='bg-neutral-100 flex-1 rounded-xl p-2 text-sm' keyboardType='numeric' />
                    <TextInput value={note} onChangeText={(value) => setPrescribedMedicineValue(id, "note", value)}
                        placeholder='Note' className='bg-neutral-100 flex-1 rounded-xl p-2 text-sm'
                    />
                </View>
                <View className='justify-center px-4'>
                    <FontAwesome name="remove" size={24} color="rgb(239 68 68)" className='text-white'
                        onPress={() => handleRemoveMedicineForm(id)} />
                </View>
            </View>

            {hasError &&
                <View>
                    <Text className='text-red-500 font-semibold'>⚠ Fill the medicine name, mealtime and dayss</Text>
                </View>
            }

        </Animated.View>

    );
};

export default memo(MedicineForm);
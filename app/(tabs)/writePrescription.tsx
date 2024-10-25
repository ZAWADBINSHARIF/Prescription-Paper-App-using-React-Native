import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, NativeScrollEvent } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarColor from '@/components/Status/StatusBarColor';
import Header from '@/components/header/Header';
import useStyleChange from '@/hooks/useStyleChange';
import { AnimatedFAB } from 'react-native-paper';
import { PrescribedMedicine } from '@/interfaces';
import MedicineForm from '@/components/MedicineForm';
import { Fontisto } from '@expo/vector-icons';
import * as Crypto from 'expo-crypto';



const writePrescription = () => {

    const { StyleChange } = useStyleChange();

    const [prescribedMedicine, setPrescribedMedicine] = useState<PrescribedMedicine[]>([]);
    const [fabExtend, setFabExtend] = useState(true);
    const [fabVisiable, setFabVisiable] = useState(true);

    const handleAddMedicineForm = () => {

        const id = Crypto.randomUUID();
        const newMedicine: PrescribedMedicine = {
            id,
            name: "",
            power: "",
            medicineMealtime: {
                morning: false,
                noon: false,
                night: false
            },
        };

        setPrescribedMedicine([newMedicine, ...prescribedMedicine]);
    };

    const handleRemoveMedicineForm = (id: string) => {
        const newMedicineForms = prescribedMedicine.filter(item => id !== item.id);
        console.log("remove");
        setPrescribedMedicine(newMedicineForms);
    };

    const handleOnScroll = ({ nativeEvent }: { nativeEvent: NativeScrollEvent; }) => {
        const { contentOffset, contentSize, layoutMeasurement } = nativeEvent;

        const currentScrollPosition = Math.floor(contentOffset?.y) ?? 0;
        setFabExtend(currentScrollPosition <= 0);

        const isEndReached = contentOffset.y + layoutMeasurement.height >= contentSize.height - 20;

        if (currentScrollPosition <= 0 && isEndReached) {
            setFabVisiable(true);
        } else if (isEndReached && currentScrollPosition >= 0) {
            setFabVisiable(false);
        } else {
            setFabVisiable(true);
        }

    };

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


                {/* Prescription  */}
                <View className='rounded-xl py-1 space-y-3 mt-6 flex-1 flex-col w-full'>

                    <View className={`${StyleChange("bg-white", "bg-gray-900")} rounded-xl py-3 px-3 space-x-3 justify-around w-full flex-row items-center`}>

                        <View className='flex-row flex-1 space-x-5'>
                            <Text className={`text-base flex-1 ${StyleChange("text-neutral-700", "text-white")} font-bold`}>Medicine name</Text>
                            <Text className={`text-base flex-1 ${StyleChange("text-neutral-700", "text-white")} font-bold`}>Power</Text>
                        </View>

                        <View className='flex-row space-x-3 justify-center items-center'>
                            <Text className={`text-sm font-bold ${StyleChange("text-neutral-700", "text-white")}`}>Morning</Text>
                            <Text className={`text-sm font-bold ${StyleChange("text-neutral-700", "text-white")}`}>Noon</Text>
                            <Text className={`text-sm font-bold ${StyleChange("text-neutral-700", "text-white")}`}>Night</Text>
                        </View>

                    </View>

                    <KeyboardAvoidingView
                        className='flex-1'
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >

                        <ScrollView
                            className='flex-1'
                            showsVerticalScrollIndicator={false}
                            onScroll={handleOnScroll}
                        >


                            {prescribedMedicine.map(item => <MedicineForm
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                power={item.power}
                                note={item?.note ?? ""}
                                medicineMealtime={item.medicineMealtime}
                                handleRemoveMedicineForm={handleRemoveMedicineForm} />)}

                            {prescribedMedicine.length <= 0 &&
                                <View className='flex-1 items-center py-36 justify-center space-y-3'>
                                    <Fontisto name="pills" size={48} color={"gray"} />
                                    <Text className='text-center text-gray-400 text-sm'>No medicine added</Text>
                                </View>
                            }

                        </ScrollView>

                    </KeyboardAvoidingView>

                </View>

                <AnimatedFAB
                    icon="plus"
                    label='Add medicine'
                    extended={fabExtend}
                    className={`absolute bottom-8 right-5 bg-blue-600 rounded-full ${fabVisiable ? "" : "hidden"}`}
                    color='white'
                    onPress={handleAddMedicineForm}
                />

            </View >
        </SafeAreaView >
    );
};

export default writePrescription;
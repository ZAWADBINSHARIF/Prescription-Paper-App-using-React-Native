import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, NativeScrollEvent, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import StatusBarColor from '@/components/Status/StatusBarColor';
import useStyleChange from '@/hooks/useStyleChange';
import { AnimatedFAB, FAB } from 'react-native-paper';
import MedicineForm from '@/components/MedicineForm';
import { Entypo, FontAwesome, Fontisto } from '@expo/vector-icons';
import useGlobalContext from '@/hooks/useGlobalContext';


const writePrescription = () => {

    const { StyleChange } = useStyleChange();
    const {
        patientDetails,
        prescribedMedicines,
        patientDetailsError,
        handlePatientDetailsValue,
        handleAddMedicineForm,
        handleSaveAndCreatePDF } = useGlobalContext();

    const [fabExtend, setFabExtend] = useState(true);
    const [fabVisiable, setFabVisiable] = useState(true);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);


    const handleOnScroll = ({ nativeEvent }: { nativeEvent: NativeScrollEvent; }) => {
        const { contentOffset, contentSize, layoutMeasurement } = nativeEvent;

        const currentScrollPosition = Math.floor(contentOffset?.y) ?? 0;
        setFabExtend(currentScrollPosition <= 0);

        const isEndReached = contentOffset.y + layoutMeasurement.height >= contentSize.height - 20;

        if (isKeyboardVisible) {
            setFabVisiable(false);
        } else if (currentScrollPosition <= 0 && isEndReached) {
            setFabVisiable(true);
        } else if (isEndReached && currentScrollPosition >= 0) {
            setFabVisiable(false);
        } else {
            setFabVisiable(true);
        }

    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };

    }, []);

    return (
        <View className={`flex-1 ${StyleChange("bg-neutral-100", "bg-gray-800")}`}>
            <StatusBarColor />

            <View className='px-6 flex-1'>

                {/* Patient's Details  */}
                <View className={`${StyleChange("bg-white", "bg-gray-900")} rounded-xl px-3 py-1 w-full`}>
                    <Text className={`text-xl font-bold ${StyleChange("text-neutral-700", "text-white")}`}>Patient's Details</Text>

                    <View className='py-3 gap-1 justify-center space-y-3 w-full'>

                        <View className='flex-row space-x-3'>
                            <TextInput value={patientDetails.name} onChangeText={(value) => handlePatientDetailsValue("name", value)} className='bg-neutral-100 flex-1 rounded-xl p-2 text-lg' placeholder='Name' />
                            <TextInput value={patientDetails.age} onChangeText={(value) => handlePatientDetailsValue("age", value)} keyboardType="numeric" className='bg-neutral-100 flex-1 rounded-xl p-2 text-lg' placeholder='Age' />
                        </View>
                        {patientDetailsError &&
                            <View>
                                <Text className='text-red-500 font-semibold'>⚠ You have to write at least patient's name and age</Text>
                            </View>
                        }

                        <View className='flex-row space-x-3'>
                            <TextInput value={patientDetails.pressure} onChangeText={(value) => handlePatientDetailsValue("pressure", value)} className='bg-neutral-100 flex-1 rounded-xl p-2 text-lg' placeholder='Pressure' />
                            <TextInput value={patientDetails.diabetic} onChangeText={(value) => handlePatientDetailsValue("diabetic", value)} className='bg-neutral-100 flex-1 rounded-xl p-2 text-lg' placeholder='Diabetic' />
                            <TextInput value={patientDetails.blood} onChangeText={(value) => handlePatientDetailsValue("blood", value)} className='bg-neutral-100 flex-1 rounded-xl p-2 text-lg' placeholder='Blood' />
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


                            {prescribedMedicines.map(item => <MedicineForm
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                power={item.power}
                                day={item.day}
                                note={item?.note ?? ""}
                                medicineMealtime={item.medicineMealtime} />)}

                            {prescribedMedicines.length <= 0 &&
                                <View className='flex-1 items-center py-36 justify-center space-y-3'>
                                    <Fontisto name="pills" size={48} color={"gray"} />
                                    <Text className='text-center text-gray-400 text-sm'>No medicine added</Text>
                                </View>
                            }

                        </ScrollView>

                    </KeyboardAvoidingView>

                </View>

                <AnimatedFAB
                    icon={() => <Entypo name="plus" size={24} color="white" />}
                    label='Add medicine'
                    extended={fabExtend}
                    className={`absolute bottom-8 right-5 bg-blue-600 rounded-full ${isKeyboardVisible ? "hidden" : fabVisiable ? "" : "hidden"}`}
                    color='white'
                    onPress={handleAddMedicineForm}
                />

                {prescribedMedicines.length > 0 &&
                    < AnimatedFAB
                        label='Save'
                        className={`absolute bottom-8 left-5 bg-blue-600 rounded-full ${isKeyboardVisible ? "hidden" : fabVisiable ? "" : "hidden"}`}
                        color='white'
                        onPress={handleSaveAndCreatePDF}
                        icon={() => <FontAwesome name="file-pdf-o" size={24} color="white" />}
                        extended={fabExtend}
                        animateFrom='left'
                    />
                }

            </View >
        </View >
    );
};

export default writePrescription;
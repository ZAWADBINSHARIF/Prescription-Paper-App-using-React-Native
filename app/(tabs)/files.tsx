import { View, Text, ScrollView, RefreshControl, Pressable } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { generatePrescriptionPDF } from '@/utilities/pdfGenerator';

import StatusBarColor from '@/components/Status/StatusBarColor';
import useStyleChange from '@/hooks/useStyleChange';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { deletePatientById, getSinglePrescription } from '@/database/prescription';
import useGlobalContext from '@/hooks/useGlobalContext';

const files = () => {

    const { getPrescriptionsFromDatabase, allPrescriptions } = useGlobalContext();
    const { StyleChange } = useStyleChange();
    const [refreshing, setRefreshing] = useState(false);

    const handleRemovePrescription = async (patient_id: number) => {
        await deletePatientById(patient_id);
        onRefresh();
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getPrescriptionsFromDatabase();
        setRefreshing(false);
    }, []);


    // Adjust path as needed

    const doctorInfo = {
        name: "John Doe",
        education: "MBBS, MD",
        phone: "+1234567890",
        location: "123 Clinic Street, New York"
    };
    const prescriptionDetails = (patient_id: number) => getSinglePrescription(patient_id);

    const generatePDF = async (patient_id: number, openShareDialog: boolean = false) => {
        const singlePrescription = await prescriptionDetails(patient_id);

        if (singlePrescription) {
            const pdfUri = await generatePrescriptionPDF(doctorInfo, singlePrescription, openShareDialog);
            console.log("PDF Generated at:", pdfUri);
        }
    };

    useEffect(() => {
        getPrescriptionsFromDatabase();
    }, []);

    return (
        <View className={`flex-1 ${StyleChange("bg-neutral-100", "bg-gray-800")}`}>
            <StatusBarColor />

            <View className='flex-1'>

                <ScrollView
                    className='px-6 space-y-2 mb-[100px]'
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >

                    {allPrescriptions.map((item) => (
                        <Pressable key={item.patient_id}
                            className={`relative flex-row justify-between items-center w-full rounded-xl ${StyleChange()} p-3 space-y-2`}
                            onPress={() => generatePDF(item.patient_id)}
                        >
                            <View className='flex-row items-center space-x-4'>
                                <View>
                                    <FontAwesome name="file-pdf-o" size={28} color={StyleChange("black", "white")} />
                                </View>

                                <View>
                                    <Text className={`text-base font-bold ${StyleChange("text-gray-800", "text-white/90")}`} numberOfLines={1}>{item.name}</Text>
                                    <Text className='text-neutral-500'>12-Nov-2021</Text>
                                </View>
                            </View>

                            <View className='flex-row space-x-8'>
                                <Ionicons
                                    name="share-social-sharp"
                                    size={24}
                                    color={StyleChange("black", "white")}
                                    onPress={() => generatePDF(item.patient_id, true)}
                                />
                                <FontAwesome5
                                    name="trash"
                                    size={20}
                                    color={StyleChange("black", "white")}
                                    onPress={() => handleRemovePrescription(item.patient_id)} />
                            </View>

                        </Pressable>
                    ))}

                </ScrollView>

            </View>

        </View>
    );
};

export default files;
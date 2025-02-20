import { View, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';

import StatusBarColor from '@/components/Status/StatusBarColor';
import useStyleChange from '@/hooks/useStyleChange';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { deletePatientById, getAllPrescriptions } from '@/database/prescription';

const files = () => {

    const { StyleChange } = useStyleChange();
    const [refreshing, setRefreshing] = useState(false);
    const [allPrescriptions, setAllPrescriptions] = useState<any[]>([]);


    const getPrescriptions = async () => {

        const prescriptions = await getAllPrescriptions();

        if (prescriptions) {
            setAllPrescriptions(prescriptions);
        }
    };

    const handleRemovePrescription = async (patient_id: number) => {
        await deletePatientById(patient_id);
        onRefresh();
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getPrescriptions();
        setRefreshing(false);
    }, []);

    useEffect(() => {
        getPrescriptions();
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
                        <View key={item.patient_id} className={`relative flex-row justify-between items-center w-full rounded-xl ${StyleChange()} p-3 space-y-2`}>


                            <View className='flex-row items-center space-x-4'>
                                <View>
                                    <FontAwesome name="file-pdf-o" size={28} color={StyleChange("black", "white")} />
                                </View>

                                <View>
                                    <Text className={`text-base font-bold ${StyleChange("text-gray-800", "text-white/90")}`} numberOfLines={1}>{item.patient_name}</Text>
                                    <Text className='text-neutral-500'>12-Nov-2021</Text>
                                </View>
                            </View>

                            <View className='flex-row space-x-8'>
                                <Ionicons name="share-social-sharp" size={24} color={StyleChange("black", "white")} />
                                <FontAwesome5 name="trash" size={20} color={StyleChange("black", "white")} onPress={() => handleRemovePrescription(item.patient_id)} />
                            </View>

                        </View>
                    ))}

                </ScrollView>

            </View>

        </View>
    );
};

export default files;
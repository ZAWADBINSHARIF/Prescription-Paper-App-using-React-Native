import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import StatusBarColor from '@/components/Status/StatusBarColor';
import useStyleChange from '@/hooks/useStyleChange';
import { AntDesign, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { router } from 'expo-router';

const index = () => {

    const { StyleChange } = useStyleChange();

    return (
        <View className={`flex-1 ${StyleChange("bg-neutral-100", "bg-gray-800")}`}>
            <StatusBarColor />

            <View className='flex-1'>
                <View className='px-6 h-full'>

                    <View className='space-y-3'>

                        <View className='bg-neutral-200 self-start p-2 rounded-xl'>
                            <Text className='text-xl text-gray-800 font-normal'>PDF Edit</Text>
                        </View>

                        <View className={`relative w-full rounded-xl ${StyleChange()} p-3 space-y-2`}>
                            <View>
                                <Text className={`text-2xl font-bold ${StyleChange("text-gray-800", "text-white/90")}`}>Left header</Text>
                            </View>

                            <View className='w-4/6'>
                                <Text className='text-neutral-500' numberOfLines={1}>Syed Zawad Bin Sharif</Text>
                                <Text className='text-neutral-500' numberOfLines={1}>Lorem ipsum dolor sit amet.</Text>
                                <Text className='text-neutral-500' numberOfLines={1}>Lorem ipsum dolor sit amet.</Text>
                                <Text className='text-neutral-500' numberOfLines={1}>Lorem ipsum dolor sit amet.</Text>
                                <Text className='text-neutral-500' numberOfLines={1}>Lorem ipsum dolor sit amet.</Text>
                            </View>

                            <Button
                                icon={() => <FontAwesome6 name="edit" size={16} color={StyleChange("black", 'white')} />}
                                className={`absolute bottom-2 right-2 justify-center items-center rounded-xl`}
                                mode='outlined'
                                textColor={StyleChange("black", 'white')}
                                style={{
                                    borderColor: StyleChange("black", 'white')
                                }}
                            >
                                Edit
                            </Button>

                        </View>

                        <View className={`relative w-full rounded-xl ${StyleChange()} p-3 space-y-2`}>
                            <View className=''>
                                <Text className={`text-2xl font-bold ${StyleChange("text-gray-800", "text-white/90")}`}>Right header</Text>
                            </View>

                            <View className='w-4/6'>
                                <Text className='text-neutral-500' numberOfLines={1}>Syed Zawad Bin Sharif</Text>
                                <Text className='text-neutral-500' numberOfLines={1}>Lorem ipsum dolor sit amet.</Text>
                                <Text className='text-neutral-500' numberOfLines={1}>Lorem ipsum dolor sit amet.</Text>
                                <Text className='text-neutral-500' numberOfLines={1}>Lorem ipsum dolor sit amet.</Text>
                                <Text className='text-neutral-500' numberOfLines={1}>Lorem ipsum dolor sit amet.</Text>
                            </View>

                            <Button
                                icon={() => <FontAwesome6 name="edit" size={16} color={StyleChange("black", 'white')} />}
                                className={`absolute bottom-2 right-2 justify-center items-center rounded-xl`}
                                mode='outlined'
                                textColor={StyleChange("black", 'white')}
                                style={{
                                    borderColor: StyleChange("black", 'white')
                                }}
                            >
                                Edit
                            </Button>

                        </View>
                    </View>

                    <Animated.View entering={ZoomIn.springify()} className=' self-center flex-1 justify-around'>

                        <Button
                            mode='contained'
                            className='py-3 px-0 bg-blue-600'
                            onPress={() => { router.push("/(tabs)/writePrescription"); }}
                        >
                            <Text className='text-xl text-white'>Let's write prescription</Text>
                        </Button>

                    </Animated.View>

                </View>
            </View>

        </View>
    );
};

export default index;

const styles = StyleSheet.create({});
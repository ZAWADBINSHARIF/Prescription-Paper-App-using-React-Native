import { Link, router, Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  // const colorScheme = useColorScheme();
  const { colorScheme } = useColorScheme();

  return (

    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          'height': 72,
          paddingVertical: 0,
          paddingHorizontal: 32,
          paddingTop: 10,
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 16,
          borderRadius: 32,
          backgroundColor: colorScheme === 'light' ? 'white' : "#111827",
          borderTopWidth: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => {
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 3
                }}
              >
                <TabBarIcon name={focused ? 'home' : 'home-outline'} className={`${focused ? 'text-blue-600' : 'text-gray-500'}`} />
                <Text className={`text-xs font-normal ${focused ? 'text-blue-600' : 'text-gray-500'}`}>Home</Text>
              </View>
            );
          }
        }}
      />
      <Tabs.Screen
        name="writePrescription"
        options={{
          title: '',
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ color, focused }) => (
            <View className='absolute bottom-3 bg-blue-600 rounded-full'>
              <TabBarIcon name={focused ? 'add' : 'add'} className='text-white' size={64} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="files"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => {
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 3
                }}
              >
                <TabBarIcon name={focused ? 'document' : 'document-outline'} className={`${focused ? 'text-blue-600' : 'text-gray-500'}`} />
                <Text className={`text-xs font-normal ${focused ? 'text-blue-600' : 'text-gray-500'}`}>Files</Text>
              </View>
            );
          }
        }}
      />
    </Tabs>
  );
}

import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import React from 'react';

const StatusBarColor = () => {

    const { colorScheme } = useColorScheme();

    return (
        <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
    );
};

export default StatusBarColor;
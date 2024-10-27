import { useColorScheme } from 'nativewind';

const useStyleChange = () => {
    const { colorScheme } = useColorScheme();

    const StyleConfig = {
        StyleChange: (lightColor: string = "bg-white", darkColor: string = "bg-gray-900"): string => colorScheme === 'light' ? lightColor : darkColor
    };


    return StyleConfig;
};

export default useStyleChange;
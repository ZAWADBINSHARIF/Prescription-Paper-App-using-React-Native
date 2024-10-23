import { useColorScheme } from 'nativewind';

const useStyleChange = () => {
    const { colorScheme } = useColorScheme();

    const StyleConfig = {
        StyleChange: (lightColor: string, darkColor: string): string => colorScheme === 'light' ? lightColor : darkColor
    };


    return StyleConfig;
};

export default useStyleChange;
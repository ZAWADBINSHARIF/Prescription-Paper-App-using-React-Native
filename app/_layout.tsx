import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import GlobalValueProvider from '@/context/GlobalValueProvider';
import { PaperProvider } from 'react-native-paper';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useColorScheme } from 'nativewind';
import { ColorSchemeName } from 'nativewind/dist/style-sheet/color-scheme';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {


  const { setColorScheme } = useColorScheme();
  const { getItem } = useLocalStorage();
  const [isLoading, setIsLoading] = useState(true);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });


  useEffect(() => {
    const fetchThemeColor = async () => {
      const themeColor = await getItem("theme_color");

      if (themeColor) {
        setColorScheme(themeColor as ColorSchemeName);
      }
      setIsLoading(false);
    };

    fetchThemeColor();
  }, [getItem, setColorScheme]);

  useEffect(() => {
    if (loaded && !isLoading) {
      SplashScreen.hideAsync();
      // router.push("/(tabs)/writePrescription");
    }
  }, [loaded, isLoading]);

  if (!loaded || isLoading) {
    return null;
  }

  return (
    <PaperProvider>
      <GlobalValueProvider >
        <Stack
          screenOptions={{
            'headerShown': false
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>

      </GlobalValueProvider>
    </PaperProvider>
  );
}

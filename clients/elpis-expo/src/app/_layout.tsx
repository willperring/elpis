import { Stack } from "expo-router";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout()
{
  const colorScheme = useColorScheme()
  const colorTheme  = colorScheme === 'dark' ? DarkTheme : DefaultTheme

  return (
    <KeyboardProvider>
      <ThemeProvider value={ colorTheme }>
        <Stack>

          <Stack.Screen
            name="index"
            options={{
              headerShown: true,
              title: 'Elpis Home'
            }}
          />

          <Stack.Screen
            name="model"
            options={{
              headerShown: true,
              title: 'Model (Root Layout)'
            }}
          />
        </Stack>
      </ThemeProvider>
    </KeyboardProvider>

  )
}

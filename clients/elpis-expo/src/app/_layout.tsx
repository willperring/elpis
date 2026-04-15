import { Stack } from "expo-router";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

export default function RootLayout()
{
  const colorScheme = useColorScheme()
  const colorTheme  = colorScheme === 'dark' ? DarkTheme : DefaultTheme

  return (
    <ThemeProvider value={ colorTheme }>
      <Stack />
    </ThemeProvider>
  )
}

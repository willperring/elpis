import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { SafeAreaView } from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemeView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps)
{
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const allStyles       = [{ backgroundColor }, style ]

  return <View style={ allStyles } {...otherProps} />;
}

export function ThemeSafeView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps)
{
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const allStyles       = [{ backgroundColor, flex: 1 }, style ]

  return <SafeAreaView style={ allStyles } {...otherProps} />;
}

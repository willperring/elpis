import { KeyboardAvoidingView, Platform, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { SafeAreaView } from "react-native-safe-area-context";
import { PropsWithChildren } from "react";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemeView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps )
{
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const allStyles       = [{ backgroundColor }, style ]

  return <View style={ allStyles } { ...otherProps } />;
}

export function ThemeSafeView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps )
{
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const allStyles       = [{ backgroundColor, flex: 1 }, style ]

  return <SafeAreaView style={ allStyles } { ...otherProps } />;
}

export function ThemeViewRoot( props: PropsWithChildren )
{
  return (
    <ThemeView style={{ flexGrow: 1 }}>
      { props.children }
    </ThemeView>
  )
}

export const KeyboardSafeView = ( props: PropsWithChildren ) =>
{
  const { style={}, ...rest } = props;

  //const behaviour = Platform.OS === 'ios' ? 'padding' : 'height'
  const behaviour = 'padding'

  return (
    <KeyboardAvoidingView
      behaviour={ behaviour }
      style={[{ flexGrow: 1, backgroundColor: 'white' }, style ]}
      { ...rest }
    />
  )
}


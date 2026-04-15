import { PropsWithChildren } from "react";
import { ThemeView } from "@/components/theme-view";
import { StyleSheet } from "react-native";

export const VerticalSpacer = ({ children }: PropsWithChildren ) =>
{
  return (
    <ThemeView style={ styles.container }>
      { children }
    </ThemeView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  }
})

import { Text, View, StyleSheet } from "react-native";
import { VerticalSpacer } from "@/components/theme-layout";
import { ThemeLinkButton } from "@/components/theme-button";
import { ThemeSafeView, ThemeView } from "@/components/theme-view";
import { ThemeText } from "@/components/theme-text";
import { Stack } from "expo-router";

export default function Index() {
  return (
    <ThemeSafeView>
      <ThemeText>Edit src/app/index.tsx to edit this screen.</ThemeText>
      <ThemeText>Edit src/app/index.tsx to edit this screen.</ThemeText>
      <VerticalSpacer>

        <ThemeLinkButton
          href="/model"
          title="Model Index"
        />

        <ThemeLinkButton
          href="/model/motivate"
          title="Motivate Model"
        />

      </VerticalSpacer>
    </ThemeSafeView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

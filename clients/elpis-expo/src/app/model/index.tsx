import { ThemeView } from "@/components/theme-view";
import { ThemeText } from "@/components/theme-text";
import { ChatWidget } from "@/components/chat/chat-widget";
import { Stack } from "expo-router";
import { ThemeLinkButton } from "@/components/theme-button";

export default function ModelIndex()
{
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemeView>
        <ThemeText>Model Index</ThemeText>
        <ThemeLinkButton
          href="/model/motivate"
          title="Motivational model"
        />
      </ThemeView>
    </>
  )
}

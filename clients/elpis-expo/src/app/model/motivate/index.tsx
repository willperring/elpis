import { StyleSheet, TextInput } from "react-native";
import { KeyboardSafeView, ThemeSafeView, ThemeView, ThemeViewRoot } from "@/components/theme-view";
import { ThemeText } from "@/components/theme-text";
import { ChatWidget } from "@/components/chat/chat-widget";
import { ChatMessage } from "@/types/chat";
import { Stack } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const data: ChatMessage[] = Array.from( { length: 2 }, (_, i) => ({
  content: `Message ${i + 1}`,
  role: 'user'
})) as ChatMessage[];

export default function MotivateIndex()
{
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      {/*<KeyboardAwareScrollView*/}
      {/*  enableOnAndroid={ true }*/}
      {/*  contentContainerStyle={ style.root }*/}
      {/*  bottomOffset={ 50 }*/}
      {/*>*/}

        {/*<ThemeView style={ style.outer }>*/}

        {/*  <ThemeView style={ style.top }>*/}
        {/*    <ThemeText>Motivate</ThemeText>*/}
        {/*  </ThemeView>*/}

        {/*  <ThemeView style={ style.middle }>*/}
        {/*    <ThemeText>Motivate</ThemeText>*/}
        {/*  </ThemeView>*/}

        {/*  <ThemeView style={ style.bottom }>*/}
        {/*    <ThemeText>Motivate</ThemeText>*/}
        {/*    <TextInput*/}
        {/*      multiline={ true }*/}
        {/*      rows={ 4 }*/}
        {/*      placeholder="Say hello"*/}
        {/*    />*/}
        {/*  </ThemeView>*/}


        {/*</ThemeView>*/}

      <ThemeSafeView style={ style.root }>
        <ChatWidget
          conversation={ data }
        />
      </ThemeSafeView>


      {/*</KeyboardAwareScrollView>*/}

    </>
  )
}

const style = StyleSheet.create( {
  root: {
    flexGrow: 1,
    //flexDirection: 'column',
    //justifyContent: 'space-around',
    backgroundColor: 'darkred',
    padding: 10
  },
  outer: {
    flexGrow: 1,
    flexDirection: 'column',
    gap: 10,
    backgroundColor: 'darkgreen',
    padding: 10,
  },
  top: {
    backgroundColor: 'darkorange',
    padding: 20,
  },
  middle: {
    flexGrow: 1,
    backgroundColor: 'darkgray',
    padding: 20,
  },
  bottom: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: 'darkblue',
  }
})

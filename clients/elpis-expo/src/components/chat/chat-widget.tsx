import { StyleSheet } from "react-native";

import { ChatMessage } from "@/types/chat";
import { ChatItem } from "@/components/chat/chat-item";

import { ChatFooter } from "@/components/chat/chat-footer";

import { KeyboardChatScrollView } from "react-native-keyboard-controller";
import { ThemeView } from "@/components/theme-view";
import { ThemeText } from "@/components/theme-text";

export type ChatWidgetProps = {
  conversation: ChatMessage[],
};


export const ChatWidget = ( props: ChatWidgetProps ) =>
{
  const { conversation } = props;

  const rows = conversation.map( (message, index) => (
    <ChatItem message={ message} key={ index } />
  ))

  return (
    <ThemeView>

        <ThemeText>Hello?</ThemeText>


    </ThemeView>
  )
};

const styles = StyleSheet.create({
  keyboardView: {
    flexGrow: 1,
    backgroundColor: 'darkpink',
    padding: 10
  },
  safeView : {
    flexGrow: 1,
    backgroundColor: 'darkorange',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 10,
    gap: 10,
  }
})

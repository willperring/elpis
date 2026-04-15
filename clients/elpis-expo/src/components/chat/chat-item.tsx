import { ChatMessage } from "@/types/chat";
import { ThemeView } from "@/components/theme-view";
import { ThemeText } from "@/components/theme-text";
import { StyleSheet } from "react-native";

export type ChatItemProps = {
  message: ChatMessage
}

export const ChatItem = ( props: ChatItemProps ) =>
{
  const { message } = props;

  return (
    <ThemeView style={ styles.chatGlobal }>
      <ThemeText>Hello</ThemeText>
      <ThemeText>{ message.content }</ThemeText>
    </ThemeView>
  )
}

const styles = StyleSheet.create({
  chatGlobal: {
    padding: 10
  },
  chatAssistant: {

  },
  chatUser: {

  }
})

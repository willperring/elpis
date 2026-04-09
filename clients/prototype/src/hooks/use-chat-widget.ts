import { ChangeEvent, useState } from "react";
import type { ChatConversation, ChatMessage } from "@/types/llm.ts";

export const useChatWidget = () =>
{
  const [ textValue,    setTextValue    ] = useState('');
  const [ conversation, setConversation ] = useState<ChatConversation>([]);

  const onTextChange = ( e: ChangeEvent<HTMLTextAreaElement> ) => {
    setTextValue( e.target.value );
  }

  const pushMessage = ( message: ChatMessage ) => {
    setConversation( previous => [ ...previous, message ] )
  }

  return {
    conversation,
    textValue,
    onTextChange,
    pushMessage,
    setConversation,
    setTextValue,
  }
};

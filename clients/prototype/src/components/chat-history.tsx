import type { ChatConversation, ChatMessage } from "@/types/llm.ts";

export type ChatHistoryProps = {
  conversation : ChatConversation
  className    ?: string
}

export const ChatHistory = ({ conversation, className='' }: ChatHistoryProps ) =>
{
  return (
    <div className={ `flex flex-col gap-2 ${className}` }>
      { conversation.map( (message, index) => <ChatMessageComponent
        key={ index }
        message={ message }
      />) }
    </div>
  )
}

const ChatMessageComponent = ({ message }: { message: ChatMessage }) =>
{
  return (
    <div className="border-1 rounded-3 p-3">
      { message.content }
    </div>
  )
}

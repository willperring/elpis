import { Button } from "@/components/button.tsx";
import { useAppState, useDispatch } from "@/state/provider.tsx";
import { ChangeEvent, useState } from "react";
import type { AdvicePersona, ChatMessage } from "@/types/llm.ts";
import { useChatWidget } from "@/hooks/use-chat-widget.ts";
import { ChatHistory } from "@/components/chat-history.tsx";
import { obstacles } from "@/services/api.ts";
import { Actions } from "@/state/reducer.ts";

export const Obstacles = () =>
{
  const dispatch = useDispatch();

  const [ processing,   setProcessing ]   = useState( false );

  const { conversationId, introObstacles } = useAppState();
  const { textValue, setTextValue, conversation, pushMessage, onTextChange } = useChatWidget();

  const canSubmit = textValue.length > 10;

  const onSubmit = () =>
  {
    const message: ChatMessage = { role: 'user', content: textValue }

    pushMessage( message )
    setTextValue( '' )

    const fullConversation = [ ...conversation, message ]

    obstacles( conversationId, fullConversation ).then( response => {
      console.warn( 'response', response )
      if( response?.obstacles?.more_information ) {
        pushMessage({ role: 'assistant', content: response.obstacles.more_information })
      } else if( response?.result === 'confirmed' ) {
        dispatch({
          type        : Actions.OBSTACLES,
          intro       : response.obstacles.response_to_user,
          title       : response.obstacles.obstacles_summary,
          instruction : response.obstacles.obstacles_llm_instruction,
          personas    : response.obstacles.advice_personas,
        })
      }
    })
  }

  return (
    <>
      <div className="step-wrapper">

        <h2>Obstacles</h2>

        <p>{ introObstacles }</p>

        <ChatHistory
          conversation={ conversation }
          className="mt-5"
        />

        <textarea
          className="w-full h-40 my-5"
          value={ textValue }
          onChange={ onTextChange }
        />

        <Button
          className="mt-2"
          onPress={ onSubmit }
          disabled={ processing || ! canSubmit }
          title="Submit"
        />

      </div>
    </>
  )
}

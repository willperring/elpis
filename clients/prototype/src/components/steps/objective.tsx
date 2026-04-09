import { Button } from "@/components/button.tsx";
import { useAppState, useDispatch } from "@/state/provider.tsx";
import type { Choice } from "@/components/choices.tsx";
import { Choices } from "@/components/choices.tsx";
import { ChangeEvent, useState } from "react";
import type { ChatConversation, ChatMessage } from "@/types/llm.ts";
import { confirmObjective } from "@/services/api.ts";
import { ChatHistory } from "@/components/chat-history.tsx";
import { Actions } from "@/state/reducer.ts";
import { useChatWidget } from "@/hooks/use-chat-widget.ts";


const haveTaskChoices: Choice[] = [
  {
    value: 'have-task',
    title: 'Yes, I do',
    description: 'I have a task that I want to do in mind'
  },
  {
    value: 'no-task',
    title: 'No, I don\'t',
    description: 'I need some help thinking of something'
  }
]

export const Objective = () =>
{
  const [ hasTask, setHasTask ] = useState<boolean | null>( null );

  return (
    <>
      <div className="step-wrapper">
        <h2>Objective</h2>

        { hasTask === null && <ObjectivePathSelect
            onSelect={ setHasTask }
        /> }

        { hasTask === true  && <ObjectiveKnown />   }
        { hasTask === false && <ObjectiveUnknown /> }

      </div>
    </>
  )
}

const ObjectivePathSelect = ({ onSelect }) =>
{
  const { introObjective } = useAppState();

  const onSelectPath = ( choice: Choice ) => {
    onSelect( choice.value === 'have-task' )
  }

  return (
  <>
    <p>{ introObjective }</p>
      <Choices
        choices={ haveTaskChoices }
        onChoiceSelect={ onSelectPath }
        className="my-5"
      />
    </>
  )
}

const ObjectiveKnown = () =>
{
  const dispatch = useDispatch();

  const [ processing, setProcessing ] = useState( false );

  const { conversationId, objectiveKnown } = useAppState();
  const { textValue, setTextValue, conversation, pushMessage, onTextChange } = useChatWidget();

  const canSubmit = textValue.length > 10;

  const onSubmit = () =>
  {
    const message: ChatMessage = { role: 'user', content: textValue }
    console.warn( 'message', message )

    // Update the internal state
    pushMessage( message )
    setTextValue( '' )

    // Send to the API - need to recreate the whole conversation
    const fullConversation: ChatConversation = [ ...conversation, message ]

    confirmObjective( conversationId, fullConversation ).then( response => {
      console.warn( 'response', response )
      if( response?.objective?.more_information ) {
        pushMessage({ role: 'assistant', content: response.objective.more_information })

      } else if( response?.result === 'confirmed' ) {
        dispatch({
          type        : Actions.OBJECTIVE,
          intro       : response.objective.response_to_user,
          title       : response.objective.objective_title,
          instruction : response.objective.objective_llm_instruction
        })
      }
    })
  }

  return (
      <>
        <p>{ objectiveKnown }</p>

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
          title="Submit"
          onPress={ onSubmit }
          disabled={ processing || ! canSubmit }
        />

      </>
  )
}
const ObjectiveUnknown = () =>
{
  const { objectiveUnknown } = useAppState();

  return (
      <>
        <p>{ objectiveUnknown }</p>
      </>
  )
}

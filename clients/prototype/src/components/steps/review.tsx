import { useAppState, useDispatch } from "@/state/provider.tsx";
import { type Choice, Choices } from "@/components/choices.tsx";
import type { AdvicePersona } from "@/types/llm.ts";
import { advice } from "@/services/api.ts";
import { Actions } from "@/state/reducer.ts";

export const Review = () =>
{
  const {
    conversationId,
    introReview,
    reviewPersonas,
    objectiveTitle,
    obstaclesTitle
  } = useAppState();

  const dispatch = useDispatch();

  const onPersonaSelect = ( choice: Choice ) => {
    console.warn( 'choice', choice )
    const personaString = `${choice.title}\n\n${choice.description}\n${choice.llm_prompt}`
    console.warn( 'personaString', personaString )

    advice( conversationId, personaString ).then( response => {
      console.warn( 'response', response )
      dispatch({
        type        : Actions.ADVICE,
        title       : response.action_plan_title,
        description : response.action_plan_description,
        steps       : response.action_plan_steps
      })
    })
  }

  const personas: Choice[] = reviewPersonas.map( (persona: AdvicePersona) => {
    return {
      value       : persona.persona_name,
      title       : persona.persona_name,
      subtitle    : persona.persona_advice_style,
      description : persona.persona_description,
      llm_prompt  : persona.llm_instruction
    } as Choice
  });

  return (
    <>
      <div className="step-wrapper">

        <div className="flex flex-col gap-4 mb-2">
          <div>
            <h2>Review</h2>
            <p className="mb-5">{ introReview }</p>
          </div>
          <div>
            <h2 className="mt-4">Goal: { objectiveTitle }</h2>
            <p>{ obstaclesTitle }</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="mt-4">Who do you want help from?</h2>
          <Choices
            choices={ personas }
            onChoiceSelect={ onPersonaSelect }
          />
        </div>

      </div>
    </>
  )
}

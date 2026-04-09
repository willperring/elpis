import { useAppState, useDispatch } from "@/state/provider.tsx";
import { type Choice, Choices } from "@/components/choices.tsx";
import { mindset } from "@/services/api.ts";
import { Actions } from "@/state/reducer.ts";

const choices: Choice[] = [
  {
    value: 'great',
    title: 'Feeling Great',
    description: 'Fully energetic and ready to go',
    llm_prompt: 'I am feeling great, full or energy and excited to get started. You might even need to hold me back.'
  },
  {
    value: 'optimistic',
    title: 'Optimistic',
    description: 'Mentally willing, but lacking energy',
    llm_prompt: 'I want to do good things, but I need help in getting the momentum to do it. Energising techniques will help.',
  },
  {
    value: 'unfocused',
    title: 'Unfocused',
    description: 'Lots of energy, but not fully engaged',
    llm_prompt: 'I have the physical energy, but will need some mental techniques to help me focus.',
  },
  {
    value: 'anxious',
    title: 'Anxious',
    description: 'Feeling nervous or worried',
    llm_prompt: 'I will need a calming influence to help me steady my thoughts and stay away from procrastination.'
  },
  {
    value: 'overwhelmed',
    title: 'Overwhelmed',
    description: 'Everything is feeling a bit much',
    llm_prompt: 'I will need as much mental and physical guidance as you can provide me.'
  }
]

export const Mindset = () =>
{
  const dispatch = useDispatch();
  const { conversationId, name, introMindset } = useAppState();

  const onChoiceSelect = ( choice: Choice ) => {
    console.warn( 'choice', choice )
    const value = `${choice.title}: ${choice.description}\n\n${choice.llm_prompt}`
    mindset( conversationId, name, value ).then( response => {
      dispatch({
        type    : Actions.MINDSET,
        intro   : response.intro_objective,
        known   : response.response_has_task,
        unknown : response.response_no_task,
      })
    })
  }


  return (
    <>
      <div className="step-wrapper">
        <h2>Mindset</h2>
        <p>{ introMindset }</p>
        <Choices
          choices={ choices }
          onChoiceSelect={ onChoiceSelect }
          className="my-5"
        />
      </div>
    </>
  )
}

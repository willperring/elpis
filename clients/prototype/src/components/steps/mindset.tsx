import { useAppState, useDispatch } from "@/state/provider.tsx";
import { type Choice, Choices } from "@/components/choices.tsx";
import { mindset } from "@/services/api.ts";
import { Actions } from "@/state/reducer.ts";

const choices: Choice[] = [
  {
    value: 'great',
    title: 'Feeling Great',
    description: 'Fully energetic and ready to go'
  },
  {
    value: 'optimistic',
    title: 'Optimistic',
    description: 'Mentally willing, but lacking energy',
  },
  {
    value: 'unfocused',
    title: 'Unfocused',
    description: 'Lots of energy, but not fully engaged',
  },
  {
    value: 'anxious',
    title: 'Anxious',
    description: 'Feeling nervous or worried',
  },
  {
    value: 'overwhelmed',
    title: 'Overwhelmed',
    description: 'Everything is feeling a bit much'
  }
]

export const Mindset = () =>
{
  const dispatch = useDispatch();
  const { name, introMindset } = useAppState();

  const onChoiceSelect = ( choice: Choice ) => {
    console.warn( 'choice', choice )
    const value = `${choice.title}: ${choice.description}`
    mindset( name, value ).then( response => {
      dispatch({
        type  : Actions.MINDSET,
        intro : response.intro_objective
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
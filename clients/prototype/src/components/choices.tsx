export type Choice = {
  value        : string
  title        : string
  description ?: string
  llm_prompt  ?: string
}

type ChoiceSelectHandler<T=Choice> = (choice: T) => void

export type ChoicesProps<T> = {
  choices        : Choice[]
  onChoiceSelect : ChoiceSelectHandler<T>
  className      ?: string
}

export function Choices<T=Choice>({ choices, onChoiceSelect, className='' }: ChoicesProps<T> )
{
  return (
    <div className={ `flex flex-col gap-2 ${className}` }>
      { choices.map( choice => <ChoiceItem
        key={choice.value}
        choice={choice}
        onSelect={onChoiceSelect}
      /> )}
    </div>
  )
}

type ChoiceItemProps = {
  choice   : Choice
  onSelect : ChoiceSelectHandler
}

const ChoiceItem = ({ choice, onSelect }: ChoiceItemProps ) =>
{
  const onClick = () => onSelect( choice )

  return (
    <a className="flex flex-col gap-2 p-3 border-1 cursor-pointer" onClick={ onClick }>
      <p>{choice.title}</p>
      { choice.description &&
          <p>{choice.description}</p>
      }
    </a>
  )
}
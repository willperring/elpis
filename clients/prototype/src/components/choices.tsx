export type Choice = {
  value        : string
  title        : string
  subtitle    ?: string
  description ?: string
  llm_prompt  ?: string
}

type ChoiceSelectHandler = ( choice: Choice ) => void

export type ChoicesProps = {
  choices        : Choice[]
  onChoiceSelect : ChoiceSelectHandler
  className     ?: string
}

export function Choices({ choices, onChoiceSelect, className='' }: ChoicesProps )
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

const  ChoiceItem = ({ choice, onSelect }: ChoiceItemProps ) =>
{
  const onClick = () => onSelect( choice )

  return (
    <a className="flex flex-col gap-2 p-3 border-1 cursor-pointer" onClick={ onClick }>

      <p>{choice.title}</p>

      { choice.subtitle &&
        <p className="text-sm">{choice.subtitle}</p>
      }

      { choice.description &&
        <p className="text-xs">{choice.description}</p>
      }

    </a>
  )
}

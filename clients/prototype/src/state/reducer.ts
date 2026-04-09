export enum Stages {
  INTRODUCTION = 'introduction',
  MINDSET      = 'mindset',
  OBJECTIVE    = 'objective',
  OBSTACLES    = 'obstacles',
}

export enum Actions {
  INTRODUCED = 'introduced',
  MINDSET    = 'mindset',
  OBJECTIVE  = 'objective',
  OBSTACLES  = 'obstacles',
}

export type ApplicationState = {
  activeStage: Stages,

  name: string,

  introMindset   : string,

  introObjective       : string,
  objectiveKnown       : string,
  objectiveUnknown     : string,
  objectiveTitle       : string,
  objectiveInstruction : string,

  introObstacles : string,
}

export const defaultState: ApplicationState = {
  activeStage: Stages.INTRODUCTION,

  name : '',

  introMindset : '',

  introObjective       : '',
  objectiveKnown       : '',
  objectiveUnknown     : '',
  objectiveTitle       : '',
  objectiveInstruction : '',

  introObstacles : '',

}

export type ActionType =
  { type: Actions.INTRODUCED, name: string, intro: string } |
  { type: Actions.MINDSET,    intro: string, known: string, unknown: string } |
  { type: Actions.OBJECTIVE,  intro: string, title: string, instruction: string }

export const reducerFunction = (state: ApplicationState, action: ActionType): ApplicationState =>
{
  console.warn( 'reducer', action )

  switch( action.type )
  {
    case Actions.INTRODUCED:
      return { ...state,
        name         : action.name,
        introMindset : action.intro,
        activeStage  : Stages.MINDSET
      }

    case Actions.MINDSET:
      return { ...state,
        activeStage      : Stages.OBJECTIVE,
        introObjective   : action.intro,
        objectiveKnown   : action.known,
        objectiveUnknown : action.unknown,
      }

    case Actions.OBJECTIVE:
      return { ...state,
        activeStage          : Stages.OBSTACLES,
        introObstacles       : action.intro,
        objectiveTitle       : action.title,
        objectiveInstruction : action.instruction,
      }
  }

  return state;
}

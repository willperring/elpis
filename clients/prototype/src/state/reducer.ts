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
  introObjective : string,
  introObstacles : string,
}

export const defaultState: ApplicationState = {
  activeStage: Stages.INTRODUCTION,
  name: '',

  introMindset   : '',
  introObjective : '',
  introObstacles : '',

}

export type ActionType =
  { type: Actions.INTRODUCED, name: string, intro: string } |
  { type: Actions.MINDSET, intro: string }

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
        introObjective : action.intro,
        activeStage    : Stages.OBJECTIVE
      }
  }

  return state;
}

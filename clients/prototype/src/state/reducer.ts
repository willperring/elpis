import type { AdvicePersona, AdviceStep } from "@/types/llm.ts";

export enum Stages {
  INTRODUCTION = 'introduction',
  MINDSET      = 'mindset',
  OBJECTIVE    = 'objective',
  OBSTACLES    = 'obstacles',
  REVIEW       = 'review',
  ADVICE       = 'advice'
}

export enum Actions {
  INTRODUCED = 'introduced',
  MINDSET    = 'mindset',
  OBJECTIVE  = 'objective',
  OBSTACLES  = 'obstacles',
  ADVICE     = 'advice',
  RESET      = 'reset',
}

export type ApplicationState = {
  activeStage: Stages,

  conversationId: string,
  name: string,

  introMindset   : string,

  introObjective       : string,
  objectiveKnown       : string,
  objectiveUnknown     : string,
  objectiveTitle       : string,
  objectiveInstruction : string,

  introObstacles       : string,
  obstaclesTitle       : string,
  obstaclesInstruction : string,

  introReview       : string,
  reviewPersonas    : AdvicePersona[],

  adviceTitle       : string,
  adviceDescription : string,
  adviceSteps       : AdviceStep[],

  isError          : boolean,
  errorDescription : string,
}

export const defaultState: ApplicationState = {
  activeStage: Stages.INTRODUCTION,

  conversationId: '',
  name : '',

  introMindset : '',

  introObjective       : '',
  objectiveKnown       : '',
  objectiveUnknown     : '',
  objectiveTitle       : '',
  objectiveInstruction : '',

  introObstacles       : '',
  obstaclesTitle       : '',
  obstaclesInstruction : '',

  introReview       : '',
  reviewPersonas    : [],

  adviceTitle       : '',
  adviceDescription : '',
  adviceSteps       : [],

  isError          : false,
  errorDescription : '',

}

export type ActionType =
  { type: Actions.INTRODUCED, name: string,  intro: string, uuid: string } |
  { type: Actions.MINDSET,    intro: string, known: string, unknown: string } |
  { type: Actions.OBJECTIVE,  intro: string, title: string, instruction: string } |
  { type: Actions.OBSTACLES,  intro: string, title: string, instruction: string, personas: AdvicePersona[] } |
  { type: Actions.ADVICE,     title: string, description: string, steps: AdviceStep[] } |
  { type: Actions.RESET }

export const reducerFunction = (state: ApplicationState, action: ActionType): ApplicationState =>
{
  console.warn( 'reducer', action )

  switch( action.type )
  {
    case Actions.RESET:
      return defaultState;

    case Actions.INTRODUCED:
      return { ...state,
        activeStage    : Stages.MINDSET,
        name           : action.name,
        introMindset   : action.intro,
        conversationId : action.uuid,
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

    case Actions.OBSTACLES:
      return { ...state,
        activeStage          : Stages.REVIEW,
        introReview          : action.intro,
        reviewPersonas       : action.personas,
        obstaclesTitle       : action.title,
        obstaclesInstruction : action.instruction,
      }

    case Actions.ADVICE:
      return { ...state,
        activeStage       : Stages.ADVICE,
        adviceTitle       : action.title,
        adviceDescription : action.description,
        adviceSteps       : action.steps,
      }
  }

  return state;
}

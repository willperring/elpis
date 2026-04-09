import { useReducer } from "react";

export enum actions {
  INTRODUCED = 'introduced',
  MINDSET    = 'mindset',
  OBJECTIVE  = 'objective',
  OBSTACLES  = 'obstacles',
}

export type ApplicationState = {
  name: string
}

const defaultState: ApplicationState = {
  name: ''
}

type ActionType =
  { action: actions.INTRODUCED, name: string }

const reducerFunction = (state: ApplicationState, action: ActionType): ApplicationState =>
{
  switch( action.action )
  {
    case actions.INTRODUCED:
      return { ...state,
        name: action.name
      }
  }

  return state;
}

export const reducer = useReducer(
  reducerFunction,
  defaultState
)
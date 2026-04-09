import { createContext, useState, useEffect, useContext, useReducer } from 'react';
import {
  type ApplicationState,
  type ActionType,
  defaultState,
  reducerFunction
} from "@/state/reducer";

export type DispatchType = ( action: ActionType ) => void

const DispatchContext = createContext<DispatchType>(() => null);
const StateContext    = createContext<ApplicationState>(defaultState);

export const useDispatch = () => useContext(DispatchContext);
export const useAppState = () => useContext(StateContext);

export const AppStateProvider = ({ children }) =>
{
  const [ state, dispatch ] = useReducer(
    reducerFunction,
    defaultState
  )

  return (
    <DispatchContext.Provider value={ dispatch }>
      <StateContext.Provider value={ state }>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}


export enum ObjectivePath {
  UNKNOWN,
  PATH_HAS_TASK,
  PATH_TASK_UNKNOWN,
}

export type ObjectiveState = {
  path: ObjectivePath;
};

export const objectiveDefaultState: ObjectiveState = {
  path: ObjectivePath.UNKNOWN,
};

export enum ObjectiveActions {
  CHOOSE_PATH = 'choose_path'
}

export type ObjectiveAction =
  { type: ObjectiveActions; path: ObjectivePath }

export const objectiveReducer = ( state: ObjectiveState, action: any ) =>
{
  switch( action.type )
  {
    case ObjectiveActions.CHOOSE_PATH:
      return { ...state, path: action.path }
  }

  return state;
};

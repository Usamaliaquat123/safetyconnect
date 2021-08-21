import ActionTypes, {IAction} from '../ActionTypes';
import {AllSorDTO} from '@dtos';

export const initialState: AllSorDTO = {
  allProjects: [],
  loading: false,
  error: false,
};

const projectReducer = (state = initialState, actions: IAction<AllSorDTO>) => {
  switch (actions.type) {
    case ActionTypes.LOADING: {
      return {
        ...state,
        loading: actions.payload,
      };
    }
    case ActionTypes.ERROR: {
      return {
        ...state,
        error: false,
      };
    }
    case ActionTypes.ALL_SORS: {
      return {
        ...state,
        allProjects: actions.payload,
      };
    }
    case ActionTypes.CLEAN_SOR: {
      return {
        ...state,
        allProjects: [],
      };
    }

    default:
      return state;
  }
};

export default projectReducer;

import ActionTypes, {IAction} from '../ActionTypes';
import {AllSorDTO} from '@dtos';

export const initialState: AllSorDTO = {
  allSors: [],
  loading: false,
  error: false,
};

const allSorReducer = (state = initialState, actions: IAction<AllSorDTO>) => {
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
        allSors: actions.payload,
      };
    }
    case ActionTypes.CLEAN_SOR: {
      return {
        ...state,
        allSors: [],
      };
    }

    default:
      return state;
  }
};

export default allSorReducer;

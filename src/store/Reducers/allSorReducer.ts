import ActionTypes, {IAction} from '../ActionTypes';
import {AllSorDTO} from '@dtos';

export const initialState: AllSorDTO = {
  allSors: [],
};

const allSorReducer = (state = initialState, actions: IAction<AllSorDTO>) => {
  switch (actions.type) {
    case ActionTypes.START_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case ActionTypes.STOP_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    case ActionTypes.ALL_SORS: {
      return {
        ...state,
        allSors: actions.payload,
      };
    }
    default:
      return state;
  }
};

export default allSorReducer;

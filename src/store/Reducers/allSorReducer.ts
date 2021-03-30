import ActionTypes, {IAction} from '../ActionTypes';
import {AllSorDTO} from '@dtos';

export const initialState: AllSorDTO = {
  allSors: [],
  loading: false,
};

const allSorReducer = (state = initialState, actions: IAction<AllSorDTO>) => {
  switch (actions.type) {
    case ActionTypes.LOADING: {
      return {
        ...state,
        loading: actions.payload,
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

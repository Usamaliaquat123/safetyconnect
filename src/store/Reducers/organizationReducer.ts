import ActionTypes, {IAction} from '../ActionTypes';
import {AllSorDTO} from '@dtos';

export const initialState: AllSorDTO = {
  allOrganizations: [],
  loading: false,
  error: false,
};

const organizationReducer = (
  state = initialState,
  actions: IAction<AllSorDTO>,
) => {
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
        allOrganizations: actions.payload,
      };
    }
    case ActionTypes.CLEAN_SOR: {
      return {
        ...state,
        allOrganizations: [],
      };
    }

    default:
      return state;
  }
};

export default organizationReducer;

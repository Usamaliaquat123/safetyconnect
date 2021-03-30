import ActionTypes, {IAction} from '../ActionTypes';
import {ListStateDTO} from '@dtos';

export const initialState: ListStateDTO = {
  allSors: [],
};

const ListSorReducer = (
  state = initialState,
  actions: IAction<ListStateDTO>,
) => {
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

export default ListSorReducer;

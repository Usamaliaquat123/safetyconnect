import ActionTypes, {IAction} from '../ActionTypes';
import ListStateDTO from '../../dtos/listStateDTO';

export const initialState: ListStateDTO = {
  list: [],
};

const ListReducer = (state = initialState, actions: IAction<ListStateDTO>) => {
  switch (actions.type) {
    case ActionTypes.LIST_INIT: {
      return {
        ...initialState,
        ...actions.payload,
      };
    }
    case ActionTypes.LIST_CHANGE: {
      return {
        ...state,
        ...actions.payload,
      };
    }
    default:
      return state;
  }
};

export default ListReducer;

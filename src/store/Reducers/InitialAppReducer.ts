import ActionTypes, {IAction} from '../ActionTypes';
import InitialAppStateDTO from '../../dtos/InitialAppStateDTO';

export const initialState: InitialAppStateDTO = {
  isLoading: false,
};

const InitialAppReducer = (
  state = initialState,
  actions: IAction<InitialAppStateDTO>,
) => {
  switch (actions.type) {
    case ActionTypes.INITIAL_DATA: {
      return {
        ...state,
        ...actions.payload,
      };
    }
    default:
      return state;
  }
};

export default InitialAppReducer;

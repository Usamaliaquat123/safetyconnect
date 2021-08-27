import ActionTypes, {IAction} from '../ActionTypes';
import {userDTO} from '@dtos';

export const initialState: userDTO = {
  users: [],
  user: [],
  loading: false,
  error: false,
};

const userReducer = (state = initialState, actions: IAction<userDTO>) => {
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
    case ActionTypes.ALL_USERS: {
      return {
        ...state,
        allUsers: actions.payload,
      };
    }
    case ActionTypes.USER: {
      return {
        ...state,
        user: actions.payload,
      };
    }

    default:
      return state;
  }
};

export default userReducer;

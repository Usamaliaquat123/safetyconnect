import {createAction} from '@utils';
import ActionTypes from '../ActionTypes';
import {IThunkAction} from '../Store';

const init = createAction(ActionTypes.INITIAL_DATA);

export const initialApp = (): IThunkAction => {
  return async (dispatch, getState) => {
    dispatch(
      init({
        isLoading: true,
      }),
    );
  };
};

const initialAppAction = {
  initialApp,
};

export default initialAppAction;

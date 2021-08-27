import {createAction} from '@utils';
import ActionTypes from '../ActionTypes';
import {IThunkAction} from '../Store';
import {createApi} from '@service';
import {orgnaization} from '@typings';
import {savedCurrentProjectAndOrganizations} from '@utils';
import {CommonActions} from '@react-navigation/native';
/**
 *  Action Types
 */
export const updateList = createAction(ActionTypes.LIST_PROJECT);
export const loading = createAction(ActionTypes.LOADING);
export const error = createAction(ActionTypes.ERROR);
export const cleanSors = createAction(ActionTypes.CLEAN_PROJECT);

/* get all organization*/
export const getAllUsers = (): IThunkAction => {
  return async (dispatch, getState) => {};
};

/** Create Project */
export const updateUser = (
  data: any,
  organization: string,
  navigation: any,
): IThunkAction => {
  return async (dispatch, getState) => {
    // dispatch(loading({loading: true}));
  };
};

const listAction = {
  getAllUsers,
  updateUser,
};

export default listAction;

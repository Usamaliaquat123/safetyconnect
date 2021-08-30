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
export const allUsers = createAction(ActionTypes.ALL_USERS);
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
    dispatch(loading({loading: true}));
  };
};

/** Get User */
export const getUser = (email: string) => {
  return new Promise((resolve, reject) => {
    createApi.createApi().getUser(email).then(data => {
      resolve(data);
    }).catch(err => {
      reject(err)
    }) 
  })
};

/** Invite User */
export const inviteUser = (data: any, navigation: any): IThunkAction => {
  return async (dispatch, getState) => {
    dispatch(loading({loading: true}));

    createApi
      .createApi()
      .inviteBulk(data)
      .then((invited) => {
        dispatch(loading({loading: false}));
        if (invited.data == 'invited') {
          navigation.goBack();
        }
      })
      .catch((err) => {
        dispatch(error(true));
        dispatch(loading({loading: false}));
      });
  };
};

const listAction = {
  getAllUsers,
  updateUser,
  getUser,
  inviteUser,
};

export default listAction;

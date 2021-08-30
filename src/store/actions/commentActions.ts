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

/* get all organization*/
export const editComment = () => {
  return new Promise((resolve, reject) => {});
};

/** Create Project */
export const createComment = () => {
  return new Promise((resolve, reject) => {});
};

/** Get Project */

export const getAllComments = (projectId: string) => {
  return new Promise((resolve, reject) => {});
};
const listAction = {
  editComment,
  createComment,
  getAllComments,
};

export default listAction;

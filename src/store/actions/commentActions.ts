import {createAction} from '@utils';
import ActionTypes from '../ActionTypes';
import {IThunkAction} from '../Store';
import {createApi} from '@service';
import {orgnaization} from '@typings';
import {savedCurrentProjectAndOrganizations} from '@utils';
import {CommonActions} from '@react-navigation/native';

/* Edit comments*/
export const editComment = () => {
  return new Promise((resolve, reject) => {});
};

/** Create comments */
export const createComment = () => {
  return new Promise((resolve, reject) => {});
};

/** get All Comments */

export const getAllComments = (commentId: string, sorId: string) => {
  return new Promise((resolve, reject) => {});
};
/** Delete Comments */

export const deleteComments = (commentId: string) => {
  return new Promise((resolve, reject) => {});
};

const listAction = {
  editComment,
  createComment,
  deleteComments,
  getAllComments,
};

export default listAction;

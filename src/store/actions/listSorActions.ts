import {createAction} from '@utils';
import ActionTypes from '../ActionTypes';
import {IThunkAction} from '../Store';
import {createApi} from '@service';
import {report} from '@typings';

/**
 *  Action Types
 */
const initList = createAction(ActionTypes.LIST_INIT);
export const updateList = createAction(ActionTypes.LIST_CHANGE);
export const loading = createAction(ActionTypes.LOADING);
export const allSors = createAction(ActionTypes.ALL_SORS);
/** @typings Sor [types] */
export type SorType = {
  draft: Array<report>;
  submitted: Array<report>;
  exclated: Array<report>;
  inprogress: Array<report>;
  completed: Array<report>;
};
/** @typings project [types] */
export type project = {
  created_by: string;
  project_name: string;
  total_documents: number;
  reports: Array<report>;
  locations: string;
  involved_persons: Array<string>;
  pending_persons: Array<string>;
};
/** @typings Organization [types] */
export type orgnaization = {
  name: string;
  details: string;
  created_by: string;
  pending_members: Array<string>;
  members: Array<string>;
  projects: Array<string>;
  project_name: string;
};
/** ALL sor reducers */
export const getAllSors = (projectId: string): IThunkAction => {
  return async (dispatch, getState) => {
    dispatch(loading({loading: true}));
    createApi
      .createApi()
      .filterSors({
        project: projectId,
        limit: 100,
        page: 0,
        query: {status: [1, 2, 3, 4, 5]},
      })
      .then(async (res: any) => {
        dispatch(loading({loading: false}));
        dispatch(allSors({allSors: res.data.data.report}));
      })
      .catch((err) => {
        dispatch(loading({loading: false}));
      });
  };
};
/** Update sor */
export const updateSor = (data: any): IThunkAction => {
  return async (dispatch, getState) => {};
};
/** create sor  */
export const createSor = (data: any): IThunkAction => {
  return async (dispatch, getState) => {};
};

export const addList = (text: any): IThunkAction => {
  return async (dispatch, getState) => {
    const state = getState();
    const textObj = {
      id: Math.random().toString(36).substring(2, 15),
      text: text,
    };
    dispatch(
      updateList({
        list: [textObj, ...state.list.list],
      }),
    );
  };
};

export const editList = (id: string, text: string): IThunkAction => {
  return async (dispatch, getState) => {
    const state = getState();
    const list = state.list.list;

    const item = list.filter((e: any) => (e.id === id ? (e.text = text) : e));

    dispatch(
      updateList({
        list: [...state.list.list],
      }),
    );
  };
};

export const delList = (id: string): IThunkAction => {
  return async (dispatch, getState) => {
    const state = getState();
    const list = state.list.list;

    list.splice(
      list.findIndex((e: any) => e.id === id),
      1,
    );

    dispatch(
      updateList({
        list: [...state.list.list],
      }),
    );
  };
};

const listAction = {
  getAllSors,
  addList,
  editList,
  delList,
};

export default listAction;

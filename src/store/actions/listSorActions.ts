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
export const startLoading = createAction(ActionTypes.START_LOADING);
export const stopLoading = createAction(ActionTypes.STOP_LOADING);
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

export const getAllSors = (): IThunkAction => {
  return async (dispatch, getState) => {
    dispatch(startLoading());
    createApi
      .createApi()
      .filterSors({
        project: '6038cf8472762b29b1bed1f3',
        limit: 100,
        page: 0,
        query: {status: [1, 2, 3, 4, 5]},
      })
      .then(async (res: any) => {
        dispatch(stopLoading());

        var data: SorType;

        if (res.data.data.involved_persons !== undefined) {
          await AsyncStorage.setItem(
            'involved_persons',
            JSON.stringify(res.data.data.involved_persons),
          );
        } else {
          for (let i = 0; i < res.data.data.report.length; i++) {
            if (res.data.data.report[i].status == 1) {
              data['draft'] = res.data.data.report[i];
            } else if (res.data.data.report[i].status == 2) {
              data['submitted'] = res.data.data.report[i];
            } else if (res.data.data.report[i].status == 3) {
              data['exclated'] = res.data.data.report[i];
            } else if (res.data.data.report[i].status == 4) {
              data['inprogress'] = res.data.data.report[i];
            } else if (res.data.data.report[i].status == 5) {
              data['completed'] = res.data.data.report[i];
            }
          }

          dispatch(allSors({allSors: data}));
          // console.log(data);
        }
      })
      .catch((err) => {
        dispatch(stopLoading());
      });

    // dispatch(
    //   initList({
    //     list: ['sads', 'asd'],
    //   }),
    // );
  };
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

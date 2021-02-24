import {createAction} from '@utils';
import ActionTypes from '../ActionTypes';
import {IThunkAction} from '../Store';
import {createApi} from '@service';
const initList = createAction(ActionTypes.LIST_INIT);
const updateList = createAction(ActionTypes.LIST_CHANGE);

export const initialList = (): IThunkAction => {
  return async (dispatch, getState) => {
    console.log('sdasda');
    dispatch(
      initList({
        list: ['sads', 'asd'],
      }),
    );
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
    console.log('res', list);

    dispatch(
      updateList({
        list: [...state.list.list],
      }),
    );
  };
};

const listAction = {
  initialList,
  addList,
  editList,
  delList,
};

export default listAction;

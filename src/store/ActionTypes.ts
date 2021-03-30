/**
 * Action type
 */

enum ActionTypes {
  /** Initial  */
  INITIAL_DATA = 'INITIAL_DATA',

  /** NO_CHANGE */
  NO_CHANGE = 'NO_CHANGE',

  /** List */
  LIST_INIT = 'LIST_INIT',
  LIST_CHANGE = 'LIST_CHANGE',

  /* Loading */
  START_LOADING = 'START_LOADING',
  STOP_LOADING = 'STOP_LOADING',

  // Render AllSOR
  ALL_SORS = 'ALL_SORS',
}

export interface IAction<T> {
  type: ActionTypes;
  payload?: T;
}

export default ActionTypes;

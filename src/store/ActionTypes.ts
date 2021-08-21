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
  LOADING = 'LOADING',

  /* ERROR */
  ERROR = 'ERROR',
  // Render AllSOR
  ALL_SORS = 'ALL_SORS',
  CLEAN_SOR = 'CLEAN_SOR',

  // ORGANIZATION
  LIST_ORGANIZATION = 'LIST_ORGANIZATION',
  CLEAN_ORGANIZATION = 'CLEAN_ORGANIZATION',
  // PROJECT
  LIST_PROJECT = 'LIST_PROJECT',
  CLEAN_PROJECT = 'CLEAN_PROJECT',
}

export interface IAction<T> {
  type: ActionTypes;
  payload?: T;
}

export default ActionTypes;

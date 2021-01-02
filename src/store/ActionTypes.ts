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
}

export interface IAction<T> {
  type: ActionTypes;
  payload?: T;
}

export default ActionTypes;

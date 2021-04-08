import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk, {ThunkAction} from 'redux-thunk';
import {IAction} from './ActionTypes';
import InitialAppReducer, {
  initialState as initState,
} from './Reducers/InitialAppReducer';
// import {  } from "./Reducers/listSorReducers";
import allSorReducer, {
  initialState as listState,
} from './Reducers/allSorReducer';

export type RootState = {
  init: typeof initState;
  list: typeof listState;
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  IAction<any> | any
>;

export type IThunkAction = AppThunk<void>;

const devToolOption = {
  name: 'SafetyConnect',
  instanceId: 1,
};

function configureStore() {
  const composeDevToolsWithOption = composeWithDevTools(devToolOption);
  const composeEnhancers = (__DEV__ && composeDevToolsWithOption) || compose;
  let rootReducer = combineReducers({
    init: InitialAppReducer,
    allSors: allSorReducer,
    // auto-plugin
  });

  const logger = (store: any) => (next: any) => (action: any) => {
    const result = next(action);
    return result;
  };

  const middleware = [thunk, logger];

  const store = createStore(rootReducer, applyMiddleware(...middleware));

  return store;
}

export default configureStore();

import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk, {ThunkAction} from 'redux-thunk';
import {IAction} from './ActionTypes';
import InitialAppReducer, {
  initialState as initState,
} from './Reducers/InitialAppReducer';
import ListReducer, {initialState as listState} from './Reducers/listReducers';

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
    list: ListReducer,
    // auto-plugin
  });

  const logger = (store: any) => (next: any) => (action: any) => {
    console.group(action.type);
    console.log('current state', store.getState());
    console.log('dispatching', action);
    const result = next(action);
    console.log('next state', store.getState());
    return result;
  };

  const middleware = [thunk, logger];

  const store = createStore(rootReducer, applyMiddleware(...middleware));

  return store;
}

export default configureStore();

import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk, {ThunkAction} from 'redux-thunk';
import {IAction} from './ActionTypes';
import InitialAppReducer, {
  initialState as initState,
} from './Reducers/InitialAppReducer';
// import {  } from "./Reducers/listSorReducers";
import allSorReducer, {initialState as allSors} from './Reducers/allSorReducer';
import organizationReducer, {
  initialState as allOrg,
} from './Reducers/organizationReducer';
import projectReducer, {
  initialState as allProjects,
} from './Reducers/projectReducer';

export type RootState = {
  init: typeof initState;
  listsor: typeof allSors;
  organizations: typeof allOrg;
  projects: typeof allProjects;
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
    organizations: organizationReducer,
    projects: projectReducer,
    // auto-plugin
  });

  const logger = (store: any) => (next: any) => (action: any) => {
    const result = next(action);
    return result;
  };

  const middleware = [thunk, logger];

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware)),
    // composeEnhancers,
  );

  return store;
}

export default configureStore();

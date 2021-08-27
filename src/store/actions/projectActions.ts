import {createAction} from '@utils';
import ActionTypes from '../ActionTypes';
import {IThunkAction} from '../Store';
import {createApi} from '@service';
import {orgnaization} from '@typings';
import {savedCurrentProjectAndOrganizations} from '@utils';
import {CommonActions} from '@react-navigation/native';
/**
 *  Action Types
 */
export const updateList = createAction(ActionTypes.LIST_PROJECT);
export const loading = createAction(ActionTypes.LOADING);
export const error = createAction(ActionTypes.ERROR);
export const cleanSors = createAction(ActionTypes.CLEAN_PROJECT);

/* get all organization*/
export const getAllProjects = (): IThunkAction => {
  return async (dispatch, getState) => {};
};

/** Create Project */
export const createProject = (
  data: any,
  organization: string,
  navigation: any,
): IThunkAction => {
  return async (dispatch, getState) => {
    console.log(['project']);
    dispatch(loading(true));
    await createApi
      .createApi()
      .Postproject(data)
      .then(async (res: any) => {
        if (res.status == 200) {
          dispatch(loading(false));
          savedCurrentProjectAndOrganizations(
            res.data.data.project_id,
            organization,
          );
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: 'Main',
                },
              ],
            }),
          );
        } else {
          dispatch(error(true));
          dispatch(loading(false));
          // this.setState({loading: false, errorModal: false});
        }
      });

    // dispatch(loading({loading: true}));
  };
};

const listAction = {
  createProject,
  getAllProjects,
};

export default listAction;

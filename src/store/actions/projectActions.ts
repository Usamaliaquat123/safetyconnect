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
  emails?: any,
  organizationName: string,
): IThunkAction => {
  return async (dispatch, getState) => {
    console.log(['project']);
    dispatch(loading(true));
    await createApi
      .createApi()
      .Postproject(data)
      .then(async (res: any) => {
        if (res.status == 200) {
          var bulkData = {
            emails: emails,
            organization: organization,
            invitedBy: data.created_by,
            organizationName: organizationName,
            projectName: data.project_name,
          };

          // console.log(data);

          createApi
            .createApi()
            .inviteBulk(bulkData)
            .then((res) => {
              // console.log(res);
            });
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

/** Get Project */

export const getProject = (projectId: string) => {
  return new Promise((resolve, reject) => {
    createApi
      .createApi()
      .getProject(projectId)
      .then((res: any) => {
        if (res.status == 200) {
          // console.log(res);
          resolve(res.data.data);
        } else {
          reject(res.data.message);
        }
      });
  });
};
const listAction = {
  getProject,
  createProject,
  getAllProjects,
};

export default listAction;

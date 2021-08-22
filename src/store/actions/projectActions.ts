import {createAction} from '@utils';
import ActionTypes from '../ActionTypes';
import {IThunkAction} from '../Store';
import {createApi} from '@service';
import {orgnaization} from '@typings';
import {savedCurrentOrganization} from '@utils';

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

/** Create Organization */
export const createProjects = (
  project: orgnaization,
  users: Array<string>,
  navigation: any,
): IThunkAction => {
  return async (dispatch, getState) => {
    console.log(['orgnaization']);
    dispatch(loading(true));
    await createApi
      .createApi()
      .organization({
        created_by: organization.created_by,
        name: organization.name,
        details: organization.details,
        members: organization.members,
        img_url: organization.img_url,
        projects: organization.projects,
      })
      .then(async (res: any) => {
        if (res.status == 200) {
          if (users.length != 0) {
            await createApi
              .createApi()
              .inviteBulk({
                emails: users,
                organization: res.data.data.organization_id,
                invitedBy: organization.created_by,
                organizationName: organization.name,
              })
              .then((invite) => {
                savedCurrentOrganization(res.data.data.organization_id);
                dispatch(loading(false));
                dispatch(error(false));
                navigation.navigate('createProject');
              });
          }

          dispatch(loading(false));
          console.log(res);

          // this.props.navigation.navigate('CreateProj', {
          //   organization: res.data.data.organization_id,
          // });
        } else {
          dispatch(error(true));
          // this.setState({loading: false, errorModal: false});
        }
      });

    // dispatch(loading({loading: true}));
  };
};

const listAction = {
  createOrganization,
};

export default listAction;

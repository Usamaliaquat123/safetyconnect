import {createAction} from '@utils';
import ActionTypes from '../ActionTypes';
import {IThunkAction} from '../Store';
import {createApi} from '@service';
import {report} from '@typings';

/**
 *  Action Types
 */
// const initList = createAction(ActionTypes.LIST_INIT);
export const updateList = createAction(ActionTypes.LIST_ORGANIZATION);
export const loading = createAction(ActionTypes.LOADING);
export const error = createAction(ActionTypes.ERROR);
export const cleanSors = createAction(ActionTypes.CLEAN_ORGANIZATION);

/** @typings Organization [types] */
export type orgnaization = {
  name?: string;
  details?: string;
  email?: string;
  created_by?: string;
  pending_members?: Array<string>;
  members?: Array<string>;
  projects?: Array<string>;
  project_name?: string;
};

/* get all organization*/
export const getAllOrganizations = (): IThunkAction => {
  return async (dispatch, getState) => {};
};

/** Create Organization */
export const createOrganization = (
  orgnaization: orgnaization,
): IThunkAction => {
  return async (dispatch, getState) => {
    dispatch(loading(true));
    await createApi
      .createApi()
      .organization({
        created_by: orgnaization.email,
        name: orgnaization.name,
        details: orgnaization.details,
        members: orgnaization.members,
        projects: orgnaization.projects,
      })
      .then((res) => {
        dispatch(loading(false));
        if (res.status == 200) {
          dispatch(error(false));

          // this.props.navigation.navigate('CreateProj', {
          //   organization: res.data.data.organization_id,
          // });
        } else {
          dispatch(error(true));
          // this.setState({loading: false, errorModal: false});
        }
      });

    dispatch(loading({loading: true}));
  };
};

const listAction = {
  createOrganization,
};

export default listAction;

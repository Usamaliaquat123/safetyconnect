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

/** @typings Sor [types] */
export type SorType = {
  draft: Array<report>;
  submitted: Array<report>;
  exclated: Array<report>;
  inprogress: Array<report>;
  completed: Array<report>;
};
/** @typings project [types] */
export type project = {
  _id: string;
  project_id: {
    created_by: string;
    updatedAt: string;
    project_name: string;
    total_documents: number;
    reports: Array<report>;
    locations: Array<string>;
    involved_persons: Array<string>;
    pending_persons: Array<string>;
  };
  project_name: string;
};
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

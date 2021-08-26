import {createAction} from '@utils';
import ActionTypes from '../ActionTypes';
import {IThunkAction} from '../Store';
import {createApi} from '@service';
import {report} from '@typings';

/**
 *  Action Types
 */
export const loading = createAction(ActionTypes.LOADING);
export const error = createAction(ActionTypes.ERROR);
export const allSors = createAction(ActionTypes.ALL_SORS);
export const cleanSors = createAction(ActionTypes.CLEAN_SOR);

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

/*Loading state */
export const setLoading = (load: boolean): IThunkAction => {
  return (dispatch, getState) => {
    console.log(load);
    dispatch(loading(load));
  };
};

/** ALL sor reducers */
export const getAllSors = (
  projectId?: string,
  sorType?: Array<number>,
): IThunkAction => {
  return (dispatch, getState) => {
    dispatch(loading(true));
    // console.log('yAHOOAD AODAS DOAD OASD');
    // dispatch(cleanSors([]));
    createApi
      .createApi()
      .filterSors({
        project: projectId,
        limit: 1000,
        page: 0,
        query: {status: sorType},
      })
      .then((res: any) => {
        if (res.data.message == 'successful') {
          // console.log(res.data.data.report);
          dispatch(loading(false));
          dispatch(allSors(res.data.data.report));
        }
        // dispatch(error(false));
      })
      .catch((err) => {
        dispatch(loading(false));
        dispatch(error(true));
      });
  };
};

/* Repeated sors*/
export const getRepeatedSors = (): IThunkAction => {
  return (dispatch, getState) => {};
};
/* Filter sors */
export const filterSors = (
  projectId: string,
  filterobj: Object,
): IThunkAction => {
  return (dispatch, getState) => {};
};

/* Involved Persons*/
export const involvedPersons = (organizationId: any): IThunkAction => {
  return (dispatch, getState) => {};
};

/** Update sor */
export const updateSor = (data: report, nav: any): IThunkAction => {
  return async (dispatch, getState) => {
    dispatch(loading({loading: true}));

    console.log();
    createApi
      .createApi()
      .updateSor(data)
      .then((res) => {
        dispatch(loading(false));
        dispatch(error(false));
        nav.navigate('Main');
        // this.setState({loading: false});
        // this.props.reduxActions.getAllSors('6038cf8472762b29b1bed1f3', [
        //   1,
        //   2,
        //   3,
        //   4,
        //   5,
        // ]);
        // this.props.navigation.navigate('ViewAllSOr');
      })
      .catch((err) => {
        dispatch(loading(false));
        dispatch(error(true));
        console.log(err);
      });
  };
};
/** create sor  */
export const createSor = (
  data: any,
  projectId: string,
  createdBy: string,
  nav: any,
): IThunkAction => {
  return async (dispatch, getState) => {
    dispatch(loading({loading: true}));
    createApi
      .createApi()
      .createSorInit({
        report: {
          created_by: createdBy,
          comments: '',
          status: 1,
        },
        project: projectId,
      })
      .then((ini: any) => {
        if (ini.status == 200) {
          console.log(data);
          data.report._id = ini.data.data.report_id;
          data.project = projectId;
          data.report.created_by = createdBy;
          createApi
            .createApi()
            .createSor(data)
            .then((res) => {
              console.log(res);
              if (res.status == 200) {
                console.log(data);
                dispatch(loading(false));
                dispatch(error(false));
                nav.navigate('Main');
              } else {
                dispatch(loading(false));
                dispatch(error(true));
              }
            })
            .catch(
              (err) => {
                dispatch(loading(false));
                dispatch(error(true));
              },
              // this.setState({loading: false, errorModal: false}),
            );
        } else {
          dispatch(loading(false));
          dispatch(error(true));
        }
      })
      .catch((err) => {
        dispatch(loading(false));
        dispatch(error(true));
      });
  };
};
/* Clear all sors */

export const clearAllSor = (): IThunkAction => {
  return (dispatch, getState) => {
    dispatch(cleanSors([]));
  };
};

// export const addList = (text: any): IThunkAction => {
//   return async (dispatch, getState) => {
//     const state = getState();
//     const textObj = {
//       id: Math.random().toString(36).substring(2, 15),
//       text: text,
//     };
//     dispatch(
//       updateList({
//         list: [textObj, ...state.list.list],
//       }),
//     );
//   };
// };

const listAction = {
  getAllSors,
  getRepeatedSors,
  filterSors,
  setLoading,
};

export default listAction;

import apisauce from 'apisauce';
import {project, user, orgnaization, sor} from '@typings';
import {string} from 'prop-types';
// our "constructor"
const createApi = (
  baseURL: string = 'http://hns-lb-1607158382.us-east-2.elb.amazonaws.com:12222/',
  baseAi: string = 'http://hns-lb-1607158382.us-east-2.elb.amazonaws.com:5001/',
) => {
  const baseapi = apisauce.create({
    baseURL,
    timeout: 10000,
  });

  const aiBaseApi = () =>
    apisauce.create({
      baseURL: baseAi,
      // headers,
      timeout: 10000,
    });

  /*
   *  @apis
   */

  const suggestiosns = (keyword: string) => baseapi.post('');
  const repeatedsorsugg = (keyword: string) => baseapi.get('');
  const observationSuggestions = (keyword: string) => baseapi.get('');
  // sor api
  const createSor = (data: object) => baseapi.post('');
  // const viewSor = (data : )

  /*
   * @user
   */
  const createUser = (data: user) => baseapi.post('users', data);
  const getUser = (data: user) => {
    baseapi.get('users', data);
  };
  const setUserInfo = (data: user) => {
    baseapi.put('users', data);
  };

  /*
   * @organization
   */
  const organization = (data: orgnaization) =>
    baseapi.post('organization', data);
  const getOrganization = (data: orgnaization) =>
    baseapi.get('organization', data);
  const updateOrganization = (data: orgnaization) =>
    baseapi.put('organization', data);

  /*
   * @project
   */
  const getProject = (data: project) => baseapi.get('project', data);
  const project = (data: project) => baseapi.put('project', data);
  // const updateProject = (data: project) => baseapi.put('project', data);
  /*
   * @sors
   */
  const getSors = (data: sor) => baseapi.post('project/newreport', data);
  const filterSors = (data: sor) =>
    baseapi.post('project/getReports', {
      project: data.project,
      limit: data.limit,
      page: data.page,
      query: {'reports._id ': data.query?.reportId},
    });
  const updateSor = (data: sor) => baseapi.put('project/report', {data});

  return {
    suggestiosns,
    repeatedsorsugg,
    observationSuggestions,
    createSor,
    viewProject,
  };
};

export default {
  createApi,
};

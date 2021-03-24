import apisauce from 'apisauce';
import {
  project,
  user,
  orgnaization,
  sor,
  observationsSug,
  country,
} from '@typings';
import {string} from 'prop-types';
// our "constructor"
const createApi = (
  baseURL: string = 'http://hns-lb-1607158382.us-east-2.elb.amazonaws.com:12222/',
  repBaseAi: string = 'http://hns-lb-1607158382.us-east-2.elb.amazonaws.com:5002/',
  baseAi: string = 'http://hns-lb-1607158382.us-east-2.elb.amazonaws.com:5001/',
  // External Countries api
  countries: string = 'https://restcountries.eu/rest/v2/',
) => {
  const baseapi = apisauce.create({
    baseURL,
    timeout: 10000,
  });

  const aiRepBaseApi = apisauce.create({
    baseURL: repBaseAi,
    // headers,
    timeout: 10000,
  });
  const aiBaseAi = apisauce.create({
    baseURL: baseAi,
    // headers,
    timeout: 10000,
  });

  const contries = apisauce.create({
    baseURL: countries,
    timeout: 10000,
  });
  /*
   *  @apis
   */

  // Exteral apis

  const contriesAll = (data: country) => contries.get(`name/${data.name}`);

  const suggestiosns = (data: any) => aiBaseAi.post('act', data);
  const repeatedsorsugg = (keyword: any) =>
    aiRepBaseApi.post(`repeatedsor`, keyword);
  const observationSuggestions = (data: any) => aiBaseAi.post('obs', data);
  // sor api

  /*
   * @user
   */
  const createUser = (data: user) => baseapi.post('users', data);
  const getUser = (data: user) => baseapi.get('users', data);
  const setUserInfo = (data: user) => baseapi.put('users', data);

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
  const Postproject = (data: project) => baseapi.post('project', data);

  /*
   * @sors
   */
  const getSors = (data: sor) => baseapi.post('project/newreport', data);
  const filterSors = (data: sor) =>
    baseapi.get('project/getReports', {
      project: data.project,
      limit: data.limit,
      page: data.page,
      query: data.query,
    });
  const updateSor = (data: any) => baseapi.put('project/report', {data});
  // Create initial to get the reportId
  const createSorInit = (data: any) => baseapi.post('project/newreport', data);
  const createSor = (data: any) => baseapi.post('project/publish', data);

  return {
    suggestiosns,
    repeatedsorsugg,
    observationSuggestions,
    createSor,
    updateSor,
    filterSors,
    getSors,
    getProject,
    project,
    Postproject,
    createSorInit,
    updateOrganization,
    getOrganization,
    contriesAll,
    organization,
    setUserInfo,
    createUser,
    getUser,
  };
};

export default {
  createApi,
};

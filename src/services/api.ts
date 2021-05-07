import apisauce from 'apisauce';
import {
  project,
  user,
  orgnaization,
  sor,
  observationsSug,
  country,
} from '@typings';
// our "constructor"
const base_uri = `https://dev.safetyconnect.ai`;
const createApi = (
  baseURL: string = `${base_uri}:12222/`,
  obsbaseUrl: string = `${base_uri}:5003`,
  repBaseAi: string = `${base_uri}:5002/`,
  baseAi: string = `${base_uri}:5004/`,
  // External Countries api
  countries: string = `https://restcountries.eu/rest/v2/`,
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
  const obsRepApi = apisauce.create({
    baseURL: obsbaseUrl,
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

  const suggestiosns = (data: any) => aiBaseAi.post(`act`, data);
  const repeatedsorsugg = (keyword: any) =>
    aiRepBaseApi.post(`repeatedsor`, keyword);
  const observationSuggestions = (data: any) => obsRepApi.get(`obs?q=${data}`);
  // sor api

  /*
   * @user
   */
  const createUser = (data: user) => baseapi.post('users', data);
  const getUser = (data: user) => baseapi.get(`users/?email=${data}`);
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
  const getSors = (projectId: string, report: string) =>
    baseapi.get(
      `project/getReports?project=${projectId}&limit=${330}&page=${0}&query={"_id":"${report}"}`,
    );
  const filterSors = (data: sor) =>
    baseapi.get('project/getReports', {
      project: data.project,
      limit: data.limit,
      page: data.page,
      query: data.query,
    });
  const updateSor = (data: any) => baseapi.put('project/report', data);
  // Create initial to get the reportId
  const createSorInit = (data: any) => baseapi.post('project/newreport', data);
  const createSor = (data: any) => baseapi.post('project/publish', data);

  /*
   * @comments
   */
  const getAllComents = (commentId: string, reportId: string) =>
    baseapi.get(
      `comment/?comment_document_id=${commentId}&reportId=${reportId}`,
    );
  const delComment = (commentId: any, documentId: any) =>
    baseapi.delete(
      `comment`,
      {},
      {data: {comment_id: commentId, comment_document_id: documentId}},
    );
  const editComment = (data: any) => baseapi.put(`comment`, data);
  const createComment = (data: any) => baseapi.post(`comment`, data);

  /*
   * @Five why
   */
  const createFiveWhy = (data: any) => baseapi.post('justification', data);
  const editFiveWhy = (data: any) => baseapi.put('justification', data);
  const getFiveWhy = (data: any) => baseapi.get(`justification?id=${data}`);

  /*
   * @Notifications
   */
  const getAllNotifications = (email: string) =>
    baseapi.get(`notification/?email=${email}`);
  /*
   * @Invite Users
   */
  const inviteBulk = (data: any) => {
    baseapi.post(`admin/bulk`, data);
  };

  return {
    createFiveWhy,
    editFiveWhy,
    inviteBulk,
    getFiveWhy,
    getAllNotifications,
    getAllComents,
    createComment,
    delComment,
    editComment,
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

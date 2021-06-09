import apisauce from 'apisauce';
import {
  project,
  user,
  orgnaization,
  sor,
  invite,
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
  // upload files
  getFile: string = `https://v7qm45ginh.execute-api.us-west-1.amazonaws.com/`,
  getFileUri: string = `https://64g95tsm4b.execute-api.us-west-1.amazonaws.com/`,
  uploadFilesUri?: string,
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
  const getfiles = apisauce.create({
    baseURL: getFile,
    timeout: 10000,
  });

  const getFilesUri = apisauce.create({
    baseURL: getFileUri,
    timeout: 10000,
  });

  const uploadFiles = apisauce.create({
    baseURL: uploadFilesUri,
    timeout: 10000,
  });

  /*
   *  @apis
   */

  const suggestiosns = (data: any) => aiBaseAi.post(`act`, data);
  const repeatedsorsugg = (keyword: any) =>
    aiRepBaseApi.post(`repeatedsor`, keyword);
  const observationSuggestions = (data: any) => obsRepApi.get(`obs?q=${data}`);
  // sor api

  /*
   * @user
   */
  const createUser = (data: user) => baseapi.post('users', data);
  const getUser = (data: string) => baseapi.get(`users/?email=${data}`);
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
  const getAllNotifications = (email: string, status: string) =>
    baseapi.get(`notification/?email=${email}&status=${status}`);
  const readSpecificNotification = (email: string, notificationId: string) =>
    baseapi.get(`notification/?email=${email}&notification=${notificationId}`);

  /*
   * @Invite Users
   */
  const inviteBulk = (data: invite) => baseapi.post(`admin/bulk`, data);
  const logs = (reportId: string) =>
    baseapi.get(`admin/logs?reportId=${reportId}`);

  /*
   * @File Uploading
   */
  const getFilesUrl = (data: any) =>
    getFilesUri.post(`default/getPresingedUrl`, data);
  const uploadFile = (file: any) => uploadFiles.put('', file);

  const getFileApi = (data: any) => getfiles.post('default/getFilesUrl', data);

  return {
    createFiveWhy,
    logs,
    getFileApi,
    getFilesUrl,
    uploadFile,
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
    readSpecificNotification,
    getSors,
    getProject,
    project,
    Postproject,
    createSorInit,
    updateOrganization,
    getOrganization,
    organization,
    setUserInfo,
    createUser,
    getUser,
  };
};

export default {
  createApi,
};

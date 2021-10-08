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
import AsyncStorage from '@react-native-async-storage/async-storage';

// our "constructor"
const base_uri = `https://backend_app.safetyconnect.ai`;
const createApi = (
  baseURL: string = `${base_uri}:12222/`,
  obsbaseUrl: string = `${base_uri}:5003`,
  repBaseAi: string = `${'https://backend_app.safetyconnect.ai'}:5002/`,
  baseAi: string = `${base_uri}:5004/`,
  // External aws api
  // upload files
  getFile: string = `https://v7qm45ginh.execute-api.us-west-1.amazonaws.com/`,
  getFileUri: string = `https://eg6gj04g91.execute-api.us-west-1.amazonaws.com/`,
  uploadFilesUri?: string,
  getPublicFiles: string = 'https://3i07qolh6j.execute-api.us-west-1.amazonaws.com',
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
  const getPublicFiless = apisauce.create({
    baseURL: getPublicFiles,
    timeout: 10000,
  });

  /*
   *  @apis
   */

  const suggestiosns = (data: any) => aiBaseAi.post(`act`, data);
  const repeatedsorsugg = (keyword: any) =>
    aiRepBaseApi.post(`repeatedsor`, keyword);
  const observationSuggestions = (data: any, project: any) =>
    obsRepApi.get(`obs?q=${data}&pid=${project}`);
  const getAllRepeatedSugg = (
    keyword: string,
    projectId: string,
    sor: string,
  ) => aiRepBaseApi.get(`rep?q=${keyword}&id=${projectId}&sor=${sor}`);
  const linkRepeatedSugg = (data: any) =>
    baseapi.post(`project/repeated`, data);
  const dashboardApi = (project: string, orgnaization: string) =>
    baseapi.get(`dashboard?project=${project}&organization=${orgnaization}`);
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
  const getOrganization = (data: string) =>
    baseapi.get(`organization?organization_id=${data}`);
  const updateOrganization = (data: orgnaization) =>
    baseapi.put('organization', data);

  /*
   * @project
   */
  const getProject = async (projectId: string, userid: any) => {
    return baseapi.get(`project?projectid=${projectId}&userid=${userid}`);
  };
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
    baseapi.post(
      'project/getReports',
      JSON.stringify({
        project: data.project,
        limit: data.limit,
        email: data.email,
        page: data.page,
        query: data.query,
      }),
    );
  const updateSor = (data: any) => baseapi.put('project/report', data);
  // Create initial to get the reportId
  const createSorInit = (data: any) => baseapi.post('project/newreport', data);
  const createSor = (data: any) => baseapi.post('project/publish', data);
  const createSorDraft = (data: any) => baseapi.put('project/publish', data);

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
    baseapi.put(`notification/?email=${email}&notification=${notificationId}`);

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
    getFilesUri.post(`default/getPublicUrl`, data);
  const uploadFile = (file: any, type: any) =>
    uploadFiles.put('', file, {headers: {'Content-Type': type}});

  const getFileApi = (data: any) => getfiles.post('default/getFilesUrl', data);
  const getPublicPhotos = (data: any) =>
    getPublicFiless.post('default/getFilePublic', data);

  /*
   * @Search
   */

  const searchApi = (data: any) =>
    baseapi.get('project/getReports', {
      project: data.project,
      limit: data.limit,
      page: data.page,
      query: data.query,
    });

  /*
   * @Dashboard
   */

  // if (actions.selectedProject !== 'All') {
  //   observationDataUrl += `&project=${actions.selectedProject}`;
  //   tableDataUrl += `&project=${actions.selectedProject}`;
  //   assignedToUrl += `&project=${actions.selectedProject}`;
  //   assignedByUrl += `&project=${actions.selectedProject}`;
  //   console.log(actions.selectedProject);
  // }
  // if (actions.selectedProject === 'All') {
  //   observationDataUrl = `${process.env.REACT_APP_BACKEND_API}/dashboard/?organization=${organization}`;
  //   tableDataUrl = `${process.env.REACT_APP_BACKEND_API}/dashboard/taskAssigned/?organization=${organization}&email=${userEmail}`;
  //   assignedToUrl = `${process.env.REACT_APP_BACKEND_API}/dashboard/taskAssignedTo/?organization=${organization}&email=${userEmail}`;
  //   assignedByUrl = `${process.env.REACT_APP_BACKEND_API}/dashboard/taskAssignedBy/?organization=${organization}&email=${userEmail}`;
  // }

  const taskAssignedTo = (orgnaization: any, email: any, projectId: string) =>
    baseapi.get(
      `/dashboard/taskAssignedTo/?organization=${orgnaization}&email=${email}&page=0&limit=20&project=${projectId}`,
    );
  const taskAssignedBy = (orgnaization: any, email: any, projectId: string) =>
    baseapi.get(
      `/dashboard/taskAssignedBy/?organization=${orgnaization}&email=${email}&page=0&limit=20&project=${projectId}`,
    );
  const tableData = (orgnaization: any, email: any, projectId: string) =>
    baseapi.get(
      `/dashboard/taskAssigned/?organization=${orgnaization}&email=${email}&page=0&limit=20&project=${projectId}`,
    );

  const actionTableUrl = (organization: any, projectId: string) =>
    baseapi.get(
      `/dashboard/actions/?organization=${organization}&project=${projectId}`,
    );

  /*
   * @Locations
   */

  const getLocations = (data: any) =>
    baseapi.get(`/project/location?projectid=${data}`);

  return {
    searchApi,
    getLocations,
    taskAssignedTo,
    taskAssignedBy,
    tableData,
    createFiveWhy,
    logs,
    getFileApi,
    getFilesUrl,
    uploadFile,
    actionTableUrl,

    editFiveWhy,
    inviteBulk,
    getFiveWhy,
    getAllNotifications,
    getAllComents,
    linkRepeatedSugg,
    createComment,
    delComment,
    editComment,
    suggestiosns,
    repeatedsorsugg,
    createSorDraft,
    observationSuggestions,
    createSor,
    updateSor,
    filterSors,
    readSpecificNotification,
    getSors,
    getProject,
    project,
    Postproject,
    getPublicPhotos,
    createSorInit,
    dashboardApi,
    updateOrganization,
    getOrganization,
    organization,
    setUserInfo,
    createUser,
    getAllRepeatedSugg,
    getUser,
  };
};

export default {
  createApi,
};

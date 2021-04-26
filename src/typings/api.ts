/*
 *
 * @apis typings definations | Developer @Usamaliaquat123
 */
/*
 * User
 */
export interface user {
  organization?: Array<any>;
  name?: string;
  email?: string;
  role?: string;
  img_url?: string;
  department?: string;
  industry?: string;
}
/*
 *   @Observations
 *
 */
export interface observationsSug {
  obs1?: string;
}
/*
 *   @Countries
 *
 */
export interface country {
  name: string;
}

/*
 * @Organizations
 */

export interface orgnaization {
  created_by?: string;
  name?: string;
  details?: string;
  createdAt?: string;
  updatedAt: string;
  members?: Array<string>;
  pending_members?: Array<any>;
  projects?: Array<project>;
  username?: string;
  organization?: string;
  _id?: string;
  __v?: number;
}
/*
 * Project
 */
export interface project {
  _id?: string;
  email?: string;
  project_id?: string;
  created_by?: string;
  project_name?: string;
  locations?: Array<string>;
  involved_persons?: Array<string>;
  organization?: string;
  project?: string;
  projectid?: string;
}
/*
 * SOR's
 */
export interface sor {
  report?: report;
  project?: string;
  limit?: number;
  page?: number;
  query?: Object;
}
export interface user_location {
  latitude: string;
  longitude: string;
}
export interface report {
  status?: number;
  _id?: string;
  created_by?: string;
  updatedAt?: string;
  details?: string;
  user_location: user_location;
  occured_at?: string;
  pending_persons?: Array<string>;
  involved_persons?: Array<string> | Array<any>;
  risk?: risk;
  sor_type: string;
  action_required?: Array<actionRequired>;
  location?: location;
  submit_to?: Array<string> | Array<any>;
  esclate_to?: Array<string> | Array<any>;
  attachments?: Array<string>;
  comments?: Array<comments>;
}
export interface actionRequired {
  _id?: string;
  content?: string;
  assigned_to?: string;
  category?: string;
  date?: string;
  is_complete?: boolean;
  is_selected?: boolean;
}
export interface risk {
  severity?: number;
  likelihood?: number;
}
export interface location {
  latitude?: string;
  longitude?: string;
}
export interface comments {
  email?: string;
  comment?: string;
  date?: string;
  files?: string;
  is_comment?: boolean;
}

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
  department?: string;
  industry?: string;
}
/*
 * @Organizations
 */
export interface orgnaization {
  created_by?: string;
  name?: string;
  details?: string;
  members?: Array<any>;
  projects?: Array<any>;
  username?: string;
  organization?: string;
}
/*
 * Project
 */
export interface project {
  email?: string;
  created_by?: string;
  project_name?: string;
  involved_persons?: Array<string>;
  organization?: string;
  project?: string;
}
/*
 * SOR's
 */
export interface sor {
  report?: report;
  project?: string;
  limit?: number;
  page?: number;
  query?: {
    reportId: string;
  };
}
export interface report {
  status?: number;
  _id?: string;
  created_by?: string;
  details?: string;
  occured_at?: string;
  involved_persons?: Array<string>;
  risk?: risk;
  action_required?: Array<actionRequired>;
  location?: location;
  submit_to?: Array<string>;
  esclate_to?: Array<string>;
  attachments?: Array<string>;
  comments?: Array<comments>;
}
export interface actionRequired {
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

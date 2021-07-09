import {
  user,
  orgnaization,
  project,
  sor,
  invite,
  report,
  observationsSug,
  country,
} from './api';
import {involved_persons, actions} from './createSor.d';
// View sor data interface
export interface Isor {
  _id?: string;
  occured_at: number;
  details: string;
  risk: {
    likelihood: number;
    severity: number;
  };
  sor_type: string;
  repeatedSor: Array<any>;
  color: string;
  type: string;
  esclate_to: Array<string>;
  submit_to: Array<string>;
  involved_persons: [];
  location: string;
  user1: string;
  user2: string;
  action_required: Array<object>;
  attachments: Array<string>;
  created_by: string;
  comments?: string;
  status?: number;
  potential_risk?: {likelihood: number; severity: number};
}

/*
 * @comments
 */
export interface comments {
  comment: string;
  date: string;
  email: string;
  files: Array<any>;
  is_comment: boolean;
  _id: string;
}

/*
 * @Imessage
 */
export interface Imessage {
  name: string;
  image: string;
  notseen: number;
  isonline: boolean;
  userId: number;
}

/*
 * @classifySorBtn
 */
export interface classifySorBtn {
  icon: string;
  type: string;
  title: string;
  selected: boolean;
  color: string;
}
// Messages
type renderFunction = (x: any) => JSX.Element;
export interface IChat {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: IUser;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  quickReplies?: QuickReplies;
}
export interface QuickReplies {
  type: 'radio' | 'checkbox';
  values: Reply[];
  keepIt?: boolean;
}
export interface Reply {
  title: string;
  value: string;
  messageId?: any;
}
export interface IUser {
  _id: string | number;
  name?: string;
  avatar?: string | number | renderFunction;
}

export {
  actions,
  user,
  orgnaization,
  project,
  invite,
  report,
  sor,
  involved_persons,
  observationsSug,
  country,
};

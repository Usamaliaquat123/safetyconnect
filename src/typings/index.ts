import {
  user,
  orgnaization,
  project,
  sor,
  observationsSug,
  country,
} from './api';
import {involved_persons} from './createSor.d';
// View sor data interface
export interface Isor {
  occured_at: number;
  details: string;
  risk: {
    likelihood: number;
    severity: number;
  };
  sor_type: string;
  color: string;
  type: string;
  location: string;
  user1: string;
  user2: string;
  action_required: Array<object>;
  attachments: Array<string>;
  created_by: string;
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
  user,
  orgnaization,
  project,
  sor,
  involved_persons,
  observationsSug,
  country,
};

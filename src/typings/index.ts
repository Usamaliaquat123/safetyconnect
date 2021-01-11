// View sor data interface
export interface Isor {
  date: number;
  observation: string;
  risk: number;
  classify: string;
  color: string;
  type: string;
  location: string;
}
export interface chartTy {

},
export interface Imessage {
  name: string;
  image: string;
  notseen: number;
  isonline: boolean;
  userId: number;
}
// classify sor typings
export interface classifySorBtn {
  icon: string,
  type: string,
  title: string,
  selected: boolean,
  color: string,
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

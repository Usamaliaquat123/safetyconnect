import {Isor, Imessage} from '@typings';
export type StackNavigatorProps = {
  Login: undefined;
  Signup: undefined;
  TellAboutYou: {username: string};
  CreatePass: {email: string; code: any; type?: string};
  CreateOrg: undefined;
  Forgot: undefined;
  CreateProj: {organization: string};
  Home: undefined;
  ForgotEmailSend: {email: string};
  Verify: {email: string};
  MeetBefore: {email: string};
  CreateSOR: undefined;
  ViewAllSOr: undefined;
  ViewSOR: {data: Isor};
  Messaging: undefined;
  Chat: {data: Imessage};
  MyTasks: undefined;
  ViewAll: {data: number; title: string};
  createProject: {organization: string};
  CreateOrganization: undefined;
  Menu: undefined;
  NothingFound: undefined;
  NoInternet: undefined;
  Main: undefined;
  InvitePeople: undefined;
  Notification: undefined;
  WelcomeHome: undefined;
  AddLocation: undefined;
  ChangePassword: {email: string; code: any};
};
export type BottomTabNavigatorProp = {
  home: {user?: any};
  sor: {user?: any};
  addNew: {user?: any};
  create: {user?: any};
  Inbox: {user?: any};
  MyTasks: {user?: any};
  More: {user?: any};
  Notification: {user?: any};
};
export type route =
  | 'Signup'
  | 'Login'
  | 'CreatePass'
  | 'tellAboutYou'
  | 'CreateProj'
  | 'Main'
  | 'ChangePassword'
  | 'Verify'
  | 'Forgot'
  | 'MeetBefore'
  | 'ForgotEmailSend'
  | 'Home'
  | 'CreateSOR'
  | 'ViewAllSOr'
  | 'ViewSOR'
  | 'Messaging'
  | 'Verify'
  | 'Chat'
  | 'MyTasks'
  | 'createProject'
  | 'NothingFound'
  | 'CreateOrganization'
  | 'ViewAll'
  | 'Menu'
  | 'Notification'
  | 'NoInternet'
  | undefined;

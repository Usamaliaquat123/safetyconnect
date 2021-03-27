import {Isor, Imessage} from '@typings';
export type StackNavigatorProps = {
  Home: undefined;
  CreateSOR: undefined;
  ViewAllSOr: undefined;
  ViewSOR: {data: Isor};
  Messaging: undefined;
  Verify: undefined;
  Chat: {data: Imessage};
  Login: undefined;
  Signup: undefined;
  CreatePass: undefined;
  MyTasks: undefined;
  tellAboutYou: undefined;
  ViewAll: {data: number; title: string};
  createProject: undefined;
  CreateOrganization: undefined;
  Menu: undefined;
  NothingFound: undefined;
  ForgotEmailSend: undefined;
  NoInternet: undefined;
};

export type route =
  | 'Home'
  | 'CreateSOR'
  | 'ViewAllSOr'
  | 'ViewSOR'
  | 'Messaging'
  | 'Verify'
  | 'Chat'
  | 'Login'
  | 'Signup'
  | 'CreatePass'
  | 'MyTasks'
  | 'tellAboutYou'
  | 'createProject'
  | 'NothingFound'
  | 'CreateOrganization'
  | 'ViewAll'
  | 'Menu'
  | 'NoInternet'
  | undefined;

import {Isor, Imessage} from '@typings';
export type StackNavigatorProps = {
  Login: undefined;
  Signup: undefined;
  TellAboutYou: {username: string; isgoogle?: boolean};
  CreatePass: {
    email: string;
    code: any;
    type?: string;
    invited?: {
      invitedBy: string;
      organization: string;
      project: string;
    };
  };
  CreateOrg: undefined;
  Forgot: undefined;
  CreateProj: {organization?: string; users?: []};
  Home: undefined;
  ForgotEmailSend: {email: string};
  ChatGroup: undefined;
  Verify: {email: string};
  MeetBefore: {email: string};
  CreateSOR: undefined;
  ViewAllSOr: undefined;
  ViewSOR: {data: Isor};
  Messaging: undefined;
  Chat: {data: Imessage};
  MyTasks: undefined;
  GoogleSigninOptn: {data: string};
  Preview: {data: Isor};
  ViewAll: {data: number | any; title: string};
  createProject: undefined;
  CreateOrganization: undefined;
  Menu: undefined;
  NothingFound: undefined;
  NoInternet: undefined;
  Main: undefined;
  Filters: undefined;
  InvitePeople: {data: string};
  Settings: {data: any};
  MainSettings: undefined;
  Notification: {data: any};
  WelcomeHome: undefined;
  Splash: undefined;
  AddLocation: undefined;
  ChangePassword: {email: string; code: any};
};
export type BottomTabNavigatorProp = {
  Home: {user?: any};
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
  | 'ChatGroup'
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

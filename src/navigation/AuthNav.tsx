import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import {
  Login,
  TellAboutYou,
  Signup,
  Verify,
  CreatePass,
  CreateOrg,
  Forgot,
  CreateProject,
  Menu,
  ForgotEmailSend,
  MeetBefore,
  Home,
  NoInternet,
  NothingFound,
  Messaging,
  MyTasks,
  Chat,
  ViewAll,
  ViewSOR,
  CreateSOR,
  ViewAllSOr,
} from '@containers';
import {Isor, Imessage} from '@typings';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BottomTabNavigator} from './TabBar';

export type StackNavigatorProps = {
  Login: undefined;
  Signup: undefined;
  tellAboutYou: {username: string};
  CreatePass: {email: string; code: any; type?: string};
  CreateOrg: undefined;
  Forgot: undefined;
  CreateProj: {organization: string};
  Home: undefined;
  ForgotEmailSend: {email: string};
  Verify: {email: string};
  MeetBefore: {email: string};
  // Home
  CreateSOR: undefined;
  ViewAllSOr: undefined;
  ViewSOR: {data: Isor};
  Messaging: undefined;
  Chat: {data: Imessage};
  MyTasks: undefined;
  ViewAll: {data: number; title: string};
  createProject: undefined;
  CreateOrganization: undefined;
  Menu: undefined;
  NothingFound: undefined;
  NoInternet: undefined;
  Main: undefined;
};

const Stack = createStackNavigator<StackNavigatorProps>();
export type route =
  | 'Signup'
  | 'Login'
  | 'CreatePass'
  | 'tellAboutYou'
  | 'CreateProj'
  | 'Main'
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
  | 'NoInternet'
  | undefined;
export const MainStackNavigator = () => {
  // console.log(route);
  return (
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName={'Login'}>
        <Stack.Screen
          name="MeetBefore"
          component={MeetBefore}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Verify"
          component={Verify}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ForgotEmailSend"
          component={ForgotEmailSend}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Forgot"
          component={Forgot}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="tellAboutYou"
          component={TellAboutYou}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CreatePass"
          component={CreatePass}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />

        {/* ================== */}
        {/* Home screen === */}
        {/* ================== */}

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NoInternet"
          component={NoInternet}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NothingFound"
          component={NothingFound}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ViewAll"
          component={ViewAll}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ViewAllSOr"
          component={ViewAllSOr}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MyTasks"
          component={MyTasks}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ViewSOR"
          component={ViewSOR}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CreateSOR"
          component={CreateSOR}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="createProject"
          component={CreateProject}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CreateOrganization"
          component={CreateOrg}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Messaging"
          component={Messaging}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

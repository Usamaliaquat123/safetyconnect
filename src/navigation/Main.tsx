import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
export interface MainProps {}
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Isor, Imessage} from '@typings';
import {
  ViewSOR,
  Signup,
  Login,
  MyTasks,
  CreateSOR,
  ViewAll,
  CreateProject,
  Messaging,
  TellAboutYou,
  CreatePass,
  Chat,
  Verify,
  Menu,
  Home,
  CreateOrg,
} from '@containers';

const Stack = createStackNavigator<StackNavigatorProps>();
export type StackNavigatorProps = {
  Home: undefined;
  CreateSOR: undefined;
  ViewAll: undefined;
  ViewSOR: {data: Isor};
  Messaging: undefined;
  Verify: undefined;
  Chat: {data: Imessage};
  Login: undefined;
  Signup: undefined;
  CreatePass: undefined;
  MyTasks: undefined;
  tellAboutYou: undefined;
  createProject: undefined;
  CreateOrganization: undefined;
  Menu: undefined;
};
export type route =
  | 'Home'
  | 'CreateSOR'
  | 'ViewAll'
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
  | 'CreateOrganization'
  | 'Menu'
  | undefined;
export const MainStackNavigator = (route?: route) => {
  return (
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName={route}>
        <Stack.Screen
          name="ViewAll"
          component={ViewAll}
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
          name="Home"
          component={Home}
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
          name="ViewSOR"
          component={ViewSOR}
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
          name="CreateSOR"
          component={CreateSOR}
          options={{
            headerShown: false,
          }}
        />

        {/* <Stack.Screen
          name="ViewAll"
          component={ViewAll}
          options={{
            headerShown: false,
          }}
        /> */}
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

        <Stack.Screen
          name="Verify"
          component={Verify}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

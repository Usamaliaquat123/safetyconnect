import * as React from 'react';
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
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomTabNavigator} from './TabBar';
import {StackNavigatorProps} from './typings';

const Stack = createStackNavigator<StackNavigatorProps>();

export const MainStackNavigator = () => {
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

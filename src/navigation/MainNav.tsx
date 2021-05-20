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
  InvitePeople,
  ViewSOR,
  CreateSOR,
  Notification,
  AddLocation,
  ViewAllSOr,
  ChangePassword,
} from '@containers';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomTabNavigator} from './TabBar';
import {StackNavigatorProps, route} from './typings';

const Stack = createStackNavigator<StackNavigatorProps>();

export const MainStackNavigator = (screen: route) => {
  return (
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName={screen.screen}>
        <Stack.Screen
          name="AddLocation"
          component={AddLocation}
          options={{
            animationEnabled: true,
            cardStyle: {backgroundColor: 'rgba(0, 0, 0, 0.15)'},
            cardOverlayEnabled: true,

            cardStyleInterpolator: ({current: {progress}}) => {
              return {
                cardStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 0.5, 0.9, 1],
                    outputRange: [0, 0.25, 0.7, 1],
                  }),
                },
                overlayStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                    extrapolate: 'clamp',
                  }),
                },
              };
            },
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="InvitePeople"
          component={InvitePeople}
          options={{
            animationEnabled: true,
            cardStyle: {backgroundColor: 'rgba(0, 0, 0, 0.15)'},
            cardOverlayEnabled: true,

            cardStyleInterpolator: ({current: {progress}}) => {
              return {
                cardStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 0.5, 0.9, 1],
                    outputRange: [0, 0.25, 0.7, 1],
                  }),
                },
                overlayStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                    extrapolate: 'clamp',
                  }),
                },
              };
            },
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            headerShown: false,
          }}
        />
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
          name="TellAboutYou"
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
            animationEnabled: true,
            cardStyle: {backgroundColor: 'rgba(0, 0, 0, 0.15)'},
            cardOverlayEnabled: true,

            cardStyleInterpolator: ({current: {progress}}) => {
              return {
                cardStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 0.5, 0.9, 1],
                    outputRange: [0, 0.25, 0.7, 1],
                  }),
                },
                overlayStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                    extrapolate: 'clamp',
                  }),
                },
              };
            },
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CreateOrganization"
          component={CreateOrg}
          options={{
            animationEnabled: true,
            cardStyle: {backgroundColor: 'rgba(0, 0, 0, 0.15)'},
            cardOverlayEnabled: true,

            cardStyleInterpolator: ({current: {progress}}) => {
              return {
                cardStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 0.5, 0.9, 1],
                    outputRange: [0, 0.25, 0.7, 1],
                  }),
                },
                overlayStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                    extrapolate: 'clamp',
                  }),
                },
              };
            },
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

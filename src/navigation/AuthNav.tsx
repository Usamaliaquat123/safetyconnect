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
  ForgotEmailSend,
} from '@containers';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BottomTabNavigator} from './TabBar';
export interface AuthNavProps {}

export type AuthNavigatorProp = {
  Login: undefined;
  Signup: undefined;
  tellAboutYou: {username: string};
  CreatePass: {username: string};
  CreateOrg: undefined;
  Forgot: undefined;
  CreateProj: {organization: string};
  Home: undefined;
  ForgotEmailSend: undefined;
  Verify: undefined;
};

const Auth = createStackNavigator<AuthNavigatorProp>();
export type route =
  | 'Signup'
  | 'Login'
  | 'CreatePass'
  | 'tellAboutYou'
  | 'CreateOrg'
  | 'CreateProj'
  | 'Home'
  | 'Verify'
  | 'Forgot'
  | 'ForgotEmailSend'
  | undefined;
export const AuthStackNavigator = () => {
  // console.log(route);
  return (
    // <SafeAreaProvider>
    <NavigationContainer>
      <Auth.Navigator initialRouteName={'Verify'}>
        <Auth.Screen
          name="Verify"
          component={Verify}
          options={{
            headerShown: false,
          }}
        />
        <Auth.Screen
          name="ForgotEmailSend"
          component={ForgotEmailSend}
          options={{
            headerShown: false,
          }}
        />
        <Auth.Screen
          name="Forgot"
          component={Forgot}
          options={{
            headerShown: false,
          }}
        />
        <Auth.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Auth.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />

        <Auth.Screen
          name="tellAboutYou"
          component={TellAboutYou}
          options={{
            headerShown: false,
          }}
        />

        <Auth.Screen
          name="CreatePass"
          component={CreatePass}
          options={{
            headerShown: false,
          }}
        />
        <Auth.Screen
          name="CreateOrg"
          component={CreateOrg}
          options={{
            headerShown: false,
          }}
        />
        <Auth.Screen
          name="CreateProj"
          component={CreateProject}
          options={{
            headerShown: false,
          }}
        />
        <Auth.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Auth.Navigator>
    </NavigationContainer>
    // </SafeAreaProvider>
  );
};

import TabBar, {
  TabBarProps,
  BottomTabNavigator,
  BottomTabNavigatorProp,
} from './TabBar';
import React, {useState} from 'react';
import {MainStackNavigator, StackNavigatorProps, route} from './Main';
import {AuthStackNavigator, AuthNavigatorProp} from './AuthNav';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import jwtDecode from 'jwt-decode';

import {Auth} from 'aws-amplify';

export const Navigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean);
  const [isAuthenticating, setIsAuthenticating] = useState(Boolean);
  const [user, setUser] = useState('');
  const checkUser = async () => {
    try {
      const session: any = await Auth.currentSession(); // checks if there is any valid session of authenticated user

      const tempUser = await Auth.currentAuthenticatedUser(); // returns a promise if user then object else error
      if ((await session) && tempUser.attributes) {
        await setIsAuthenticated(true);
      }
      if (await !tempUser.attributes) {
        if (await session.idToken) {
          const token = await session.idToken.jwtToken;
          const decoded: any = await jwtDecode(token);
          tempUser.attributes = await {email: decoded.email};
        }
      }
      await setUser(tempUser);
    } catch (err) {
      if (err === 'No current user') {
        setIsAuthenticating(() => false);
        setIsAuthenticated(() => false);
      }
    }
  };
  checkUser();
  console.log(isAuthenticated);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuthenticated == true && <BottomTabNavigator />}
        {isAuthenticated == false && <AuthStackNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export {
  MainStackNavigator,
  AuthStackNavigator,
  StackNavigatorProps,
  route,
  BottomTabNavigator,
  BottomTabNavigatorProp,
  AuthNavigatorProp,
  TabBarProps,
  TabBar,
};

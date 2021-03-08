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

const checkuser = async () => {
  try {
    const session: any = await Auth.currentSession();
    const tempUser = await Auth.currentAuthenticatedUser(); // returns a promise if user then object else error

    if (await session.idToken) {
      const token = await session.idToken.jwtToken;
      const decoded: any = await jwtDecode(token);
      tempUser.attributes = await {email: decoded.email};
    }

    if ((await session) && tempUser.attributes) {
      // await setIsAuth(true);
      return true;
    }
  } catch (error) {
    return false;
  }

  // return tempUser
  // if (await !tempUser.attributes) {
};

export const Navigator = () => {
  // Check user if authenticated
  const [isAuth, setIsAuth] = useState(false);
  console.log('=======');
  checkuser().then((res) => console.log((res: boolean) => setIsAuth(res)));
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuth ? <BottomTabNavigator /> : <AuthStackNavigator />}
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

import TabBar, {TabBarProps, BottomTabNavigator} from './TabBar';
import React, {useState} from 'react';
import {StackNavigatorProps, route, BottomTabNavigatorProp} from './typings';
import {MainStackNavigator} from './MainNav';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Auth} from 'aws-amplify';
import jwtDecode from 'jwt-decode';
import {WelcomeHome} from '@containers';
import {createApi} from '@service';
// import { resolvePreset } from '@babel/core';
export const Navigator = (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean);
  const [isAuthenticating, setIsAuthenticating] = useState(Boolean);
  const [user, setUser] = useState('');
  // const checkUser = async () => {
  //   try {
  //     const session: any = await Auth.currentSession(); // checks if there is any valid session of authenticated user

  //     const tempUser = await Auth.currentAuthenticatedUser(); // returns a promise if user then object else error
  //     if ((await session) && tempUser.attributes) {
  //       await setIsAuthenticated(true);
  //     }
  //     if (await !tempUser.attributes) {
  //       if (await session.idToken) {
  //         const token = await session.idToken.jwtToken;
  //         const decoded: any = await jwtDecode(token);
  //         tempUser.attributes = await {email: decoded.email};
  //       }
  //     }
  //     await setUser(tempUser);
  //   } catch (err) {
  //     if (err === 'No current user') {
  //       setIsAuthenticating(() => false);
  //       setIsAuthenticated(() => false);
  //     }
  //   }
  // };
  // checkUser();
  AsyncStorage.getItem('email').then((res: any) => {
    setUser(res);
    createApi
      .createApi()
      .getUser(res)
      .then((res: any) => {
        // console.log(res);
        AsyncStorage.setItem('user', JSON.stringify(res.data.data));
      });
  });

  return (
    // <SafeAreaProvider>
    <NavigationContainer>
      {/* <WelcomeHome /> */}
      <MainStackNavigator screen={'Splash'} />
    </NavigationContainer>
    // </SafeAreaProvider>
  );
};

export {
  MainStackNavigator,
  StackNavigatorProps,
  route,
  BottomTabNavigator,
  BottomTabNavigatorProp,
  TabBarProps,
  TabBar,
};

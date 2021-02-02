import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
export interface AuthNavProps {}

export type AuthNavigatorProp = {
  // Login: undefined;
};

const Auth = createStackNavigator<AuthNavigatorProp>();
export const AuthStackNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Auth.Navigator>
          {/* <Auth.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            /> */}
        </Auth.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

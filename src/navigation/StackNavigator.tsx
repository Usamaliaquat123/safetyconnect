import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, StyleSheet, Text} from 'react-native';
import {AnyIfEmpty, connect} from 'react-redux';
import {Isor, Imessage} from '@typings';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  CreateSOR,
  Login,
  Signup,
  Verify,
  Forgot,
  Splash,
  Messaging,
  Home,
  ViewAll,
  Settings,
  Chat,
  ViewSOR,
} from '@containers';

export type StackNavigatorProps = {
  Home: undefined;
  CreateSOR: undefined;
  ViewAll: undefined;
  ViewSOR: {data: Isor};
  Messaging: undefined;
  Chat: {data: Imessage};
};
export type AuthNavigatorProp = {
  Login: undefined;
};

const Stack = createStackNavigator<StackNavigatorProps>();
const Auth = createStackNavigator<AuthNavigatorProp>();

export const AuthStackNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Auth.Navigator>
          <Auth.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        </Auth.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export const MainStackNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
            name="ViewAll"
            component={ViewAll}
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
            name="CreateSOR"
            component={CreateSOR}
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
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
// const mapStateToProps = state => {
//   return {
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(StackNavigator);

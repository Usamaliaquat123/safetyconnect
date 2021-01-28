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
  CreatePass,
  ViewAll,
  Settings,
  Chat,
  ViewSOR,
  CreateOrg,
  CreateProject,
  TellAboutYou,
} from '@containers';

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
  tellAboutYou: undefined;
  createProject: undefined;
  CreateOrganization: undefined;
};
export type AuthNavigatorProp = {
  // Login: undefined;
};

const Stack = createStackNavigator<StackNavigatorProps>();
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

export const MainStackNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
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
            name="ViewAll"
            component={ViewAll}
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
            name="Verify"
            component={Verify}
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

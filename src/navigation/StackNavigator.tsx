import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
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
  Settings,
} from '@containers';
export interface StackNavigatorProps {}

const Stack = createStackNavigator();
export default class StackNavigator extends React.Component<
  StackNavigatorProps,
  any
> {
  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="CreateSOR"
              component={CreateSOR}
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
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(StackNavigator);

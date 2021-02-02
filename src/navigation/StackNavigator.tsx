import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {AnyIfEmpty, connect} from 'react-redux';
import {Isor, Imessage} from '@typings';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabBar} from '@nav';
import {colors} from '@theme';

// const mapStateToProps = state => {
//   return {
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(StackNavigator);

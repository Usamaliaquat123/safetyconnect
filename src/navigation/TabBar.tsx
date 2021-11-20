import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  Home,
  ViewAll,
  Messaging,
  ViewSOR,
  CreateSOR,
  Login,
  More,
  Signup,
  Menu,
  ViewAllSOr,
  Notification,
  Chat,
} from '@containers';

import {bindActionCreators} from 'redux';
import {Icon} from 'react-native-elements';
import {colors, images, GlStyles, fonts} from '@theme';
import {AllSorDTO} from '@dtos';
import * as reduxActions from '../store/actions/listSorActions';
import {connect} from 'react-redux';
import {default as Model} from 'react-native-modal';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import styles from './styles';
import {BottomTabNavigatorProp} from './typings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator<BottomTabNavigatorProp>();

export const BottomTabNavigator = () => {
  return (
    <SafeAreaProvider>
      {/* <NavigationContainer> */}
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        initialRouteName={'Home'}>
        <Tab.Screen
          name="Home"
          // initialParams={}
          component={Home}
          options={{}}
        />
        <Tab.Screen name="MyTasks" component={ViewAllSOr} />
        <Tab.Screen name="addNew" component={Menu} />
        <Tab.Screen name="Inbox" component={Messaging} options={{}} />
        <Tab.Screen name="More" component={More} options={{}} />
      </Tab.Navigator>
      {/* </NavigationContainer> */}
    </SafeAreaProvider>
  );
};

export interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  reduxActions: any;
  reduxState: AllSorDTO;
}

const TabBar = (props: TabBarProps) => {
  console.log('propsjahdjsahdjsahdjashdjsa s');
  console.log(props);
  const [createModal, setCreateModal] = useState(false);
  const [icons, setIcons] = useState([]);

  const [routes, setroutes] = useState(props.state.routes);

  props.state.routes.map((d: any, i: number) => {
    if (d.name == 'Home') {
      d['icon'] = images.bottomTab.home;
    } else if (d.name == 'MyTasks') {
      d['icon'] = images.bottomTab.sors;
    } else if (d.name == 'addNew') {
      d['icon'] = images.bottomTab.addnew;
    } else if (d.name == 'Inbox') {
      d['icon'] = images.bottomTab.message;
    } else if (d.name == 'More') {
      d['icon'] = images.bottomTab.menu;
    }
  });
  useEffect(() => {
    const focusedOptions =
      props.descriptors[props.state.routes[props.state.index].key].options;
    if (focusedOptions.tabBarVisible === false) {
      return null;
      ``;
    }
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        //   borderTopWidth: wp(0.1),
        borderWidth: wp(0.1),
        borderColor: colors.textOpa,
        //   borderColor: ""
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 30,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2.22,
      }}>
      {routes.map((route: any, index: number) => {
        const {options} = props.descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = props.state.index === index;

        const onPress = () => {
          const event = props.navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            props.navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          props.navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <View key={index} style={{flex: 1, height: wp(15)}}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={() => {
                onPress();
              }}
              onLongPress={onLongPress}
              style={[
                {
                  alignItems: 'center',
                },

                {
                  paddingTop: wp(3),
                  marginLeft: wp(3),
                  paddingBottom: wp(3),
                },
                route.name === 'addNew' && {paddingTop: wp(1.5)},
              ]}>
              <View
                style={[
                  route.name === 'Inbox'
                    ? {width: wp(5.5), height: wp(5)}
                    : route.name === 'addNew'
                    ? {width: wp(6.5), height: wp(6.5)}
                    : {width: wp(5), height: wp(5)},
                ]}>
                <Image
                  source={route.icon}
                  style={[
                    GlStyles.images,
                    isFocused
                      ? route.name != 'addNew'
                        ? {tintColor: '#4BA735'}
                        : null
                      : route.name != 'addNew'
                      ? {tintColor: colors.text}
                      : null,
                  ]}
                  resizeMode={'cover'}
                />
              </View>

              <Text
                style={{
                  color: isFocused ? '#4BA735' : '#6C6C6C',
                  fontSize: wp(3),
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

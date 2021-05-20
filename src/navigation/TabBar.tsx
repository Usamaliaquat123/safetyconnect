import * as React from 'react';
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
        initialRouteName={'home'}>
        <Tab.Screen
          name="home"
          // initialParams={}
          component={Home}
          options={{}}
        />
        <Tab.Screen name="My Tasks" component={ViewAllSOr} />
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
export default class TabBar extends React.Component<TabBarProps, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      createModal: false,
      icons: [],
    };
  }

  componentDidMount = () => {
    // console.log(this.props.reduxActions);
    // this.props.reduxActions.getAllSors('6038cf8472762b29b1bed1f3', [
    //   1,
    //   2,
    //   3,
    //   4,
    //   5,
    // ]);
    const focusedOptions = this.props.descriptors[
      this.props.state.routes[this.props.state.index].key
    ].options;
    if (focusedOptions.tabBarVisible === false) {
      return null;
      ``;
    }

    this.props.state.routes.map((d: any, i: number) => {
      if (d.name == 'home') {
        d['icon'] = images.bottomTab.home;
      } else if (d.name == 'My Tasks') {
        d['icon'] = images.bottomTab.sors;
      } else if (d.name == 'Inbox') {
        d['icon'] = images.bottomTab.message;
      } else if (d.name == 'More') {
        d['icon'] = images.bottomTab.menu;
      }
    });
  };

  render() {
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
        {this.props.state.routes.map((route: any, index: number) => {
          const {options} = this.props.descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = this.props.state.index === index;

          const onPress = () => {
            const event = this.props.navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              this.props.navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            this.props.navigation.emit({
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
                  // if (route.name == 'addNew') {
                  //   console.log('if match');
                  //   // return this.setState({
                  //   //   createModal: !this.state.createModal,
                  //   // });
                  // } else {
                  //   return onPress();
                  // }

                  onPress();
                }}
                onLongPress={onLongPress}
                style={[
                  {
                    alignItems: 'center',
                  },
                  route.name != 'addNew'
                    ? {
                        paddingTop: wp(3),
                        marginLeft: wp(3),
                        paddingBottom: wp(3),
                      }
                    : null,
                ]}>
                {route.name != 'addNew' && (
                  <View
                    style={[
                      route.name === 'Inbox'
                        ? {width: wp(5.5), height: wp(5)}
                        : {width: wp(5), height: wp(5)},
                    ]}>
                    <Image
                      source={route.icon}
                      style={[
                        GlStyles.images,
                        isFocused
                          ? {tintColor: '#4BA735'}
                          : {tintColor: colors.text},
                      ]}
                      resizeMode={'cover'}
                    />
                  </View>
                )}
                {route.name == 'addNew' ? (
                  <View>
                    <View
                      // onPress={() => this.setState({createModal: true})}
                      style={styles.addNewContainer}>
                      <Icon
                        size={30}
                        name="pluscircleo"
                        type="antdesign"
                        color={colors.secondary}
                      />
                    </View>

                    <Text
                      style={[
                        {
                          color: isFocused ? '#4BA735' : '#6C6C6C',
                        },
                        styles.addNewText,
                      ]}>
                      Add New
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={{
                      color: isFocused ? '#4BA735' : '#6C6C6C',
                      fontSize: wp(3),
                    }}>
                    {label}
                  </Text>
                )}
              </TouchableOpacity>
              {/* Create Modal  */}

              <Model
                isVisible={this.state.createModal}
                onBackdropPress={() => {
                  this.setState({createModal: false, loading: false});
                }}></Model>
            </View>
          );
        })}
      </View>
    );
  }
}

// const mapStateToProps = (state: AllSorDTO) => ({
//   reduxState: state.allSors,
// });

// const mapDispatchToProps = (dispatch: any) => ({
//   reduxActions: bindActionCreators(reduxActions, dispatch),
// });
// export default connect(mapStateToProps, mapDispatchToProps)(TabBar);

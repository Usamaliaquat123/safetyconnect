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
  Signup,
} from '@containers';
import {Icon} from 'react-native-elements';
import {BottomPop} from '@components';
import {colors, images, GlStyles, fonts} from '@theme';
import {default as Model} from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStackNavigator} from './AuthNav';
import {MainStackNavigator} from './Main';
import Modal from 'react-native-modal';
import styles from './styles';
export interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}
const Tab = createBottomTabNavigator<BottomTabNavigatorProp>();
export type BottomTabNavigatorProp = {
  home: {user?: any};
  sor: {user?: any};
  addNew: {user?: any};
  create: {user?: any};
  more: {user?: any};
};

export const BottomTabNavigator = () => {
  return (
    <SafeAreaProvider>
      {/* <NavigationContainer> */}
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        sceneContainerStyle={{backgroundColor: colors.error}}
        initialRouteName={'home'}>
        <Tab.Screen
          name="home"
          component={() => MainStackNavigator('ViewAllSOr')}
          options={{}}
        />
        <Tab.Screen
          name="sor"
          component={() => MainStackNavigator('CreateSOR')}
          options={{}}
        />
        <Tab.Screen name="addNew" component={BottomPop} />
        <Tab.Screen
          name="create"
          component={() => MainStackNavigator('CreateSOR')}
          options={{}}
        />
        <Tab.Screen
          name="more"
          component={() => MainStackNavigator('Menu')}
          options={{}}
        />
      </Tab.Navigator>
      {/* </NavigationContainer> */}
    </SafeAreaProvider>
  );
};

export default class TabBar extends React.Component<TabBarProps, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      createModal: true,
      icons: [],
    };
  }

  componentDidMount = () => {
    const focusedOptions = this.props.descriptors[
      this.props.state.routes[this.props.state.index].key
    ].options;
    if (focusedOptions.tabBarVisible === false) {
      return null;
    }

    this.props.state.routes.map((d: any, i: number) => {
      if (d.name == 'home') {
        d['icon'] = images.bottomTab.home;
      } else if (d.name == 'sors') {
        d['icon'] = images.bottomTab.sors;
      } else if (d.name == 'inbox') {
        d['icon'] = images.bottomTab.message;
      } else if (d.name == 'more') {
        d['icon'] = images.bottomTab.menu;
      }
    });
    console.log(this.props.state.routes);
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

          //   elevation: 10,

          //   elevation: 1,
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
                  if (route.name == 'addNew') {
                    return this.setState({
                      createModal: !this.state.createModal,
                    });
                  } else {
                    return onPress();
                  }
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
                  <View style={{width: wp(5), height: wp(5)}}>
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
                    <TouchableOpacity style={styles.addNewContainer}>
                      <Icon
                        size={30}
                        name="pluscircleo"
                        type="antdesign"
                        color={colors.secondary}
                      />
                    </TouchableOpacity>

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
            </View>
          );
        })}
      </View>
    );
  }
}

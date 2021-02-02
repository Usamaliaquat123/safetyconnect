import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Home, ViewAll, Messaging} from '@containers';
import {Icon} from 'react-native-elements';
import {colors, images, GlStyles} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
export interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}
const Tab = createBottomTabNavigator<BottomTabNavigatorProp>();
export type BottomTabNavigatorProp = {
  home: undefined;
  sors: undefined;
  addNew: undefined;
  inbox: undefined;
  more: undefined;
};
export const BottomTabNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          tabBar={(props) => <TabBar {...props} />}
          sceneContainerStyle={{backgroundColor: colors.error}}
          initialRouteName={'sors'}>
          <Tab.Screen name="home" component={Home} options={{}} />
          <Tab.Screen name="sors" component={ViewAll} options={{}} />
          <Tab.Screen name="addNew" component={Home} options={{}} />
          <Tab.Screen name="inbox" component={Messaging} options={{}} />
          <Tab.Screen name="more" component={Home} options={{}} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default class TabBar extends React.Component<TabBarProps, any> {
  constructor(props: any) {
    super(props);

    this.state = {
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

    this.props.state.routes.map((d, i) => {
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
      <View style={{flexDirection: 'row'}}>
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
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                {
                  flex: 1,
                  height: wp(15),

                  alignItems: 'center',
                  shadowColor: '#000',
                },
                route.name != 'addNew'
                  ? {paddingTop: wp(3), paddingBottom: wp(3)}
                  : null,
              ]}>
              {route.name != 'addNew' && (
                <View style={{width: wp(5), height: wp(5)}}>
                  <Image
                    source={route.icon}
                    style={[GlStyles.images, {overlayColor: colors.error}]}
                    resizeMode={'cover'}
                  />
                </View>
              )}
              {route.name == 'addNew' ? (
                <View>
                  <TouchableOpacity
                    style={{
                      // flex: 1,
                      // height: wp(15),
                      //   margin: wp(3),
                      position: 'absolute',
                      top: wp(-7),
                      backgroundColor: colors.primary,
                      borderRadius: wp(10),
                      padding: wp(4),
                    }}>
                    <Icon
                      onPress={() => this.props.navigation.goBack()}
                      size={30}
                      name="pluscircleo"
                      type="antdesign"
                      color={colors.secondary}
                    />
                  </TouchableOpacity>

                  <Text
                    style={{
                      color: isFocused ? '#4BA735' : '#6C6C6C',
                      //   textAlign: 'center',
                      marginLeft: wp(2.2),
                      marginTop: wp(10),
                      fontSize: wp(3),
                    }}>
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
          );
        })}
      </View>
    );
  }
}

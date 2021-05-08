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
  Menu,
  ViewAllSOr,
  Notification,
} from '@containers';

import {bindActionCreators} from 'redux';
import {Icon} from 'react-native-elements';
import {BottomPop} from '@components';
import {colors, images, GlStyles, fonts} from '@theme';
import {AllSorDTO} from '@dtos';
import * as reduxActions from '../store/actions/listSorActions';
import {connect} from 'react-redux';
import {default as Model} from 'react-native-modal';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import styles from './styles';
import {BottomTabNavigatorProp} from './typings';

const Tab = createBottomTabNavigator<BottomTabNavigatorProp>();
export const BottomTabNavigator = () => {
  return (
    <SafeAreaProvider>
      {/* <NavigationContainer> */}
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        sceneContainerStyle={{backgroundColor: colors.error}}
        initialRouteName={'home'}>
        <Tab.Screen name="home" component={ViewAllSOr} options={{}} />
        <Tab.Screen name="create" component={CreateSOR} options={{}} />
        <Tab.Screen name="addNew" component={BottomPop} />
        <Tab.Screen name="Notification" component={Notification} options={{}} />
        <Tab.Screen name="more" component={Menu} options={{}} />
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
      createModal: true,
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
        d['icon'] = images.bottomTab.sors;
      } else if (d.name == 'create') {
        d['icon'] = images.bottomTab.folder;
      } else if (d.name == 'Notification') {
        d['icon'] = images.bottomTab.message;
      } else if (d.name == 'more') {
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
                  if (route.name == 'addNew') {
                    console.log('if match');
                    // return this.setState({
                    //   createModal: !this.state.createModal,
                    // });
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
                    <TouchableOpacity
                      onPress={() => console.log('tab press')}
                      style={styles.addNewContainer}>
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

              <Model
                isVisible={this.state.createModal}
                onBackdropPress={
                  () => {
                    this.setState({createModal: false, loading: false});
                  }
                  // this.setState({createModal: false, loading: false})
                }>
                <View
                  style={{
                    backgroundColor: colors.secondary,
                    borderRadius: wp(3),
                    padding: wp(5),
                  }}>
                  {/* Create New sor */}
                  <View style={styles.containerOfIcon}>
                    <View
                      style={{
                        padding: wp(3),
                        backgroundColor: colors.lightGreen,
                        width: wp(12),
                        height: wp(12),
                        borderRadius: wp(3),
                      }}>
                      <Image
                        source={images.bottomTab.note}
                        style={GlStyles.images}
                      />
                    </View>

                    <Text
                      style={{
                        paddingLeft: wp(2),
                        fontSize: wp(3),
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      New SOR
                    </Text>
                  </View>
                  {/* Audit and Inspection */}
                  <View style={styles.containerOfIcon}>
                    <View
                      style={{
                        padding: wp(3),
                        backgroundColor: colors.lightGreen,
                        width: wp(12),
                        height: wp(12),
                        borderRadius: wp(3),
                      }}>
                      <Image
                        source={images.homeIcon.auditAndReporting}
                        style={GlStyles.images}
                      />
                    </View>
                    <Text style={styles.auditReportText}>
                      Audit and Inspection Report
                    </Text>
                  </View>
                  {/* Incident and Accident Report */}
                  <View style={styles.containerOfIcon}>
                    <View
                      style={{
                        padding: wp(3),
                        backgroundColor: colors.lightGreen,
                        width: wp(12),
                        height: wp(12),
                        borderRadius: wp(3),
                      }}>
                      <Image
                        source={images.homeIcon.incidentreporting}
                        style={GlStyles.images}
                      />
                    </View>
                    <Text style={styles.auditReportText}>
                      Incident & Accident Report
                    </Text>
                  </View>
                </View>
              </Model>
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

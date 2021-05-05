import * as React from 'react';
import {View, StyleSheet, Text, ScrollView, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {Icon, Avatar} from 'react-native-elements';
import {RouteProp} from '@react-navigation/native';
import {colors} from '@theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
export interface NotificationsProps {
  route: MyTasksRouteProp;
  navigation: MyTasksScreenNavigationProp;
  reduxActions: any;
  reduxState: any;
}

// import {connect} from '../../decorators/index';
type MyTasksScreenNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'Notification'
>;
type MyTasksRouteProp = RouteProp<StackNavigatorProps, 'Notification'>;

class Notifications extends React.Component<NotificationsProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('user').then((user: any) => {
      this.setState({user: JSON.parse(user)});
    });
  }

  //   Refreshing Scrollview
  _onRefresh = () => {
    this.componentDidMount();
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={() => this._onRefresh()}
              refreshing={this.state.refreshing}
            />
          }>
          {/* header */}
          <View style={styles.header}>
            <View style={styles.headertle}>
              <View style={styles.arrowTtleContainer}>
                <Icon
                  size={25}
                  name="arrow-back-outline"
                  type="ionicon"
                  color={colors.secondary}
                />
                <View>
                  <Text style={styles.title}>Notifications </Text>
                </View>
              </View>
              <View style={styles.notificationIconAvatar}>
                <View style={{marginRight: wp(3)}}>
                  <View
                    style={{
                      borderRadius: wp(10),
                      alignItems: 'center',
                      width: wp(2),
                      position: 'absolute',
                      top: wp(-2),
                      right: wp(1),
                      padding: wp(2),
                      justifyContent: 'center',
                      backgroundColor: colors.error,
                    }}>
                    <Text
                      style={{
                        position: 'absolute',
                        fontSize: wp(2),
                        color: colors.secondary,
                      }}>
                      2
                    </Text>
                  </View>
                  <Icon
                    containerStyle={{marginRight: wp(3)}}
                    size={wp(6)}
                    name="notifications-outline"
                    type="ionicon"
                    color={colors.secondary}
                  />
                </View>

                <Avatar
                  size={wp(8)}
                  rounded
                  source={{
                    uri: this.state.user.img_url,
                  }}
                />
              </View>
            </View>
          </View>
          {/* Content */}
          <View style={styles.content}></View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);

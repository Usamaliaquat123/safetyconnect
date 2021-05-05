import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {Icon, Avatar} from 'react-native-elements';
import {RouteProp} from '@react-navigation/native';
import {createApi} from '@service';
import {colors} from '@theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
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
      newNotify: [],
      oldNotify: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('user').then((user: any) => {
      this.setState({user: JSON.parse(user)});
    });
  }

  //   All Notificatiosn
  getAllNotifications = async () => {
    createApi
      .createApi()
      .getAllNotifications(this.state.user.email)
      .then((res: any) => {
        this.setState({
          newNotify: res.data.data.notifications.filter(
            (n: any) => n.status == 1,
          ),
          oldNotify: res.data.data.notifications.filter(
            (n: any) => n.status == 0,
          ),
        });
      });
  };

  //   Refreshing Scrollview
  _onRefresh = () => {
    this.componentDidMount();
    this.setState({refreshing: false});
  };

  render() {
    this.getAllNotifications();
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
                  size={wp(7)}
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
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>2</Text>
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
          <View style={styles.content}>
            {/* New Notifications */}

            {this.state.newNotify.length == 0 ? null : (
              <>
                <Text style={styles.allNotificationsText}>New </Text>
                {this.state.newNotify.map((d: any, i: any) => (
                  <TouchableOpacity>
                    <View style={styles.lineheight} />
                    <View style={styles.notificationContainer}>
                      <Avatar
                        size={wp(7)}
                        rounded
                        source={{
                          uri: 'https://via.placeholder.com/150',
                        }}
                      />
                      {/* Content */}
                      <View style={styles.notificationContent}>
                        {/* description */}
                        <Text style={styles.notificationDes}>{d.message}</Text>
                        {/* Date */}
                        <Text style={styles.notifyDate}>
                          {moment(d.date).format('dddd,  DD MMM ')}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            )}
            {/* Old Notifications */}
            <View>
              {this.state.oldNotify.length == 0 ? null : (
                <>
                  <Text style={styles.allNotificationsText}>
                    All Notifications
                  </Text>
                  {this.state.oldNotify.map((d: any, i: any) => (
                    <TouchableOpacity>
                      <View style={styles.lineheight} />
                      <View style={styles.notificationContainer}>
                        <Avatar
                          size={wp(7)}
                          rounded
                          source={{
                            uri: 'https://via.placeholder.com/150',
                          }}
                        />
                        {/* Content */}
                        <View style={styles.notificationContent}>
                          {/* description */}
                          <Text style={styles.notificationDes}>
                            {d.message}
                          </Text>
                          {/* Date */}
                          <Text style={styles.notifyDate}>
                            {moment(d.date).format('dddd,  DD MMM ')}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </>
              )}
            </View>
          </View>
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

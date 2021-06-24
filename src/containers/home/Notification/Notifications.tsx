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
import {colors, animation} from '@theme';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {createApi as api} from '@service';
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
      loading: false,
      count: 0,
    };
  }

  componentDidMount() {
    // this.props.route.params

    console.log('sdsd');
    this.setState({loading: true});
    AsyncStorage.getItem('email').then((email: any) => {
      this.getAllNotifications(email);
      console.log(email);
      // api
      //   .createApi()
      //   .getUser(email)
      //   .then((user: any) => {
      //     console.log(user.data.data);
      //     this.setState({user: user.data.data});
      //   });
    });
  }

  //   All Notificatiosn
  getAllNotifications = (email: string) => {
    console.log(email);
    api
      .createApi()
      .getAllNotifications(email, [0, 1])
      .then((res: any) => {
        console.log('data from notifications');
        console.log(res);
        this.setState({loading: false});
        this.setState({
          count: res.data.data[0].notifications.filter(
            (n: any) => n.status == 0,
          ),
          newNotify: res.data.data[0].notifications.filter(
            (n: any) => n.status == 0,
          ),
          oldNotify: res.data.data[0].notifications.filter(
            (n: any) => n.status == 1,
          ),
        });
      })
      .catch((err) => console.log(err));
  };

  //   Refreshing Scrollview
  _onRefresh = () => {
    this.componentDidMount();
    this.setState({refreshing: false});
  };

  // redirecting to view sor
  onViewSor = async (
    projectId: string,
    reportId: string,
    notificationId: any,
  ) => {
    this.setState({loading: true});
    await api
      .createApi()
      .getSors(projectId, reportId)
      .then((userD: any) => {
        api
          .createApi()
          .readSpecificNotification(this.state.user.email, notificationId)
          .then((res: any) => {
            this.setState({loading: false});
            if (userD.status == 200) {
              this.props.navigation.navigate('ViewSOR', {
                data: userD.data.data.report[0],
              });
            }
          });
      })
      .catch((err) => console.log(err));
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
                    <Text style={styles.badgeText}>{this.state.count}</Text>
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

                      <Icon
                        containerStyle={{position: 'absolute', right: wp(5)}}
                        name={'right'}
                        type={'antdesign'}
                        size={wp(3)}
                        color={colors.text}
                      />
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
                    <TouchableOpacity
                      onPress={() => this.onViewSor(d.project_id, d.sor_id)}>
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
                        <Icon
                          containerStyle={{position: 'absolute', right: wp(5)}}
                          name={'right'}
                          type={'antdesign'}
                          size={wp(3)}
                          color={colors.text}
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
                </>
              )}
            </View>
          </View>
          {/* validations error */}
          {/* Modal Container */}
          <Modal isVisible={this.state.loading}>
            {this.state.loading == true ? (
              <View>
                <View style={{alignSelf: 'center'}}>
                  {/* <Bars size={wp(5)} color={colors.primary} /> */}
                  {/* <Bars size={wp(5)} color={colors.primary} /> */}
                  <LottieView
                    autoPlay={true}
                    style={{width: wp(90)}}
                    source={animation.loading}
                    loop={true}
                  />
                </View>
              </View>
            ) : null}
          </Modal>
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

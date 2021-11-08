import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Icon, Avatar} from 'react-native-elements';
import {colors} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import {View_sor, messagingUsers, groupConversation} from '@service';
import {connect} from 'react-redux';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import io from 'socket.io-client';
import {fetchAuthToken, getCurrentOrganization, searchInObjects} from '@utils';
import {Imessage, orgnaization} from '@typings';
import {Search, Header, User} from '@components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {allRecentActivity, createApi} from '@service';

import styles from './styles';

import {AnalyticsClass} from '@aws-amplify/analytics/lib-esm/Analytics';

var CustomIcon: any = Icon;
type MessagingNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'Messaging'
>;
type MessagingRouteProp = RouteProp<StackNavigatorProps, 'Messaging'>;

export interface MessagingProps {
  route: MessagingRouteProp;
  navigation: MessagingNavigationProp;
  reduxActions: any;
  reduxState: any;
}
class Messaging extends React.Component<MessagingProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      users: messagingUsers,
      group: groupConversation,
      currentUser: {},
      tokens: '',
      orgnaizationId: '',
      socket: null,
    };
  }

  // Setup Socket implementation
  setupSocket = (token: any) => {
    return new Promise((resolve, reject) => {
      console.log(token);

      const newSocket = io.connect('https://backend.safetyconnect.ai:5007', {
        transports: ['websocket'],
        withCredentials: true,
        jsonp: false,

        // origins: '*',
        query: {
          token: token,
        },
      });

      // console.log('in socket');
      // console.log(newSocket);
      newSocket.on('error', (data: any) => {
        reject(data);
        console.log(data || 'Chat: socket error');
      });

      newSocket.on('testEmit', (data: any) => {
        resolve(data);
        console.log('Chat: testEmit', data);
      });

      newSocket.on('disconnect', (e: any) => {
        // setSocket(null);
        reject(e);
        this.setState({socket: null});
        // setTimeout(this.setupSocket(token), 3000);
        console.log('Chat:', 'error', 'Socket Disconnected!', e);
      });

      newSocket.on('connect', () => {
        resolve('connect');
        console.log('Chat:', 'success', 'Socket Connected!');
      });

      this.setState({socket: newSocket});
    });
  };

  componentDidMount = () => {
    AsyncStorage.getItem('email').then((email: any) => {
      fetchAuthToken().then((token) => {
        this.setupSocket(token).then((res) => {
          console.log('res yahan h');
          console.log(res);
        });
      });

      createApi
        .createApi()
        .getUser(email)
        .then((res: any) => {
          getCurrentOrganization().then((orgId: any) => {
            console.log(orgId);

            this.setState({orgnaizationId: orgId});
            // this.
            console.log(res.data.data._id);
            createApi
              .createApi()
              .getAllChats(res.data.data._id, orgId)
              .then((res: any) => {
                console.log('asdsads');
                console.log(res.data);
                // console.log(res.data.allChats);
                var usr = [];
                var groups = [];
                for (let i = 0; i < res.data.allChats.length; i++) {
                  // console.log(res.data.allChats[i]);
                  if (res.data.allChats[i]?.roomType != undefined) {
                    // console.log('room type');
                    // console.log(res.data.allChats[i]);
                    var user = {
                      data: res.data.allChats[i],
                      name: res.data.allChats[i].name,
                      image: res.data.allChats[i].img_url,
                      isonline: true,
                      userId: res.data.allChats[i]._id,
                    };
                    groups.push(user);
                  } else {
                    if (res.data.allChats[i]?.userA != undefined) {
                      // console.log('user type');

                      var ur = {
                        data: res.data.allChats[i],
                        name: res.data.allChats[i].userA.name,
                        image: res.data.allChats[i].userA.img_url,
                        isonline: true,
                        userId: res.data.allChats[i].userA._id,
                      };
                      usr.push(ur);
                    }
                  }

                  // usr.push(user);
                }

                console.log(usr);

                // console.log(usr);
                this.setState({users: usr, group: groups});
              })
              .catch((err: any) => console.log(err));
          });
          this.setState({currentUser: res.data.data});
        });
    });
  };

  createGroup = () => {
    this.props.navigation.navigate('ChatGroup');
  };

  render() {
    return (
      <View style={{backgroundColor: colors.secondary}}>
        <View style={{backgroundColor: colors.primary}}>
          <ScrollView>
            <Header
              title="Messaging"
              onBackPress={() => this.props.navigation.goBack()}
              profile={this.state.currentUser.img_url}
            />
            <View style={styles.content}>
              <Search
                onChange={(e: string) => {}}
                value={'Search messages'}
                iconName={'search'}
                placeHolder={'Searh messages'}
                iconType={'evilicon'}
              />
              <View style={styles.conversationContainer}>
                <Text style={styles.ttleConversation}>Conversations</Text>
                <View style={styles.line} />
                {this.state.users.map((d: Imessage | any) => (
                  <User
                    id={d.userId}
                    name={d.name}
                    pendingsms={d.notseen}
                    image={d.image}
                    isOnline={d.isonline}
                    onPress={() => {
                      console.log('current data uahdsajhdjh');
                      console.log(d);

                      console.log(this.state.currentUser._id);
                      console.log(this.state.orgnaizationId);
                      console.log(d.data._id);

                      createApi
                        .createApi()
                        .openPrivateChat(
                          this.state.currentUser._id,
                          this.state.orgnaizationId,
                          d.userId,
                        )
                        .then((res: any) => {
                          // console.log('res tel');
                          // console.log(res);

                          this.props.navigation.navigate('Chat', {
                            data: res.data,
                            type: 'private',
                            socket: this.state.socket,
                          });
                        });
                    }}
                  />
                ))}
              </View>
              {/* Group Conversation */}
              <View style={styles.conversationContainer}>
                <Text style={styles.ttleConversation}>Group Conversations</Text>
                <CustomIcon
                  onPress={() => this.createGroup()}
                  // containerStyle={{position: 'absolute', bottom: 0, right: 0}}
                  name="add-circle"
                  size={wp(15)}
                  type="Ionicons"
                  color={colors.green}
                />

                {/* <TouchableOpacity
                style={{
                  backgroundColor: colors.green,
                  padding: wp(3),
                  borderRadius: wp(2),
                }}
                onPress={() => {}}>
                </TouchableOpacity> */}
                {/* <View style={styles.line} /> */}
                {this.state.group.map((d: any) => (
                  <User
                    id={d.userId}
                    name={d.name}
                    // pendingsms={d.notseen}
                    image={d.image}
                    isOnline={d.isonline}
                    onPress={() => {
                      console.log(d);
                      createApi
                        .createApi()
                        .openGroupChat(d.data._id)
                        .then((res: any) => {
                          // console.log(res.data.data[0]);

                          this.props.navigation.navigate('Chat', {
                            data: res.data.data[0],
                            type: 'group',
                            socket: this.state.socket,
                          });
                        });
                    }}
                  />
                ))}
              </View>
              {/* <View style={styles.line} /> */}
            </View>
          </ScrollView>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Messaging);

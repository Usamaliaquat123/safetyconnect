import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, BackHandler} from 'react-native';
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

export type MessagingPropsT = {
  route: MessagingRouteProp;
  navigation: MessagingNavigationProp;
  reduxActions: any;
  reduxState: any;
};

const Messaging = (props: MessagingProps) => {
  const [Loading, setLoading] = useState<Boolean>(false);
  const [users, setUsers] = useState<Array<any>>([]);
  const [groupUsers, setGroupUsers] = useState<Array<any>>([]);
  const [currentUser, setcurrentUser] = useState<any>({});
  const [token, setToken] = useState<string>();
  const [orgnaizationId, setOrgnaizationId] = useState<string>('');
  const [socket, setSocket] = useState<null>();

  // Setup Socket implementation
  const setupSocket = (token: any) => {
    return new Promise((resolve, reject) => {
      console.log(token);

      const newSocket = io.connect(`${createApi.createApi().base_uri}:5007`, {
        transports: ['websocket'],
        withCredentials: true,
        jsonp: false,

        // origins: '*',
        query: {
          token: token,
        },
      });

      // console.log('in socket');d
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
        setSocket(null);
        // setTimeout(this.setupSocket(token), 3000);
        console.log('Chat:', 'error', 'Socket Disconnected!', e);
      });

      newSocket.on('connect', () => {
        resolve('connect');
        setSocket(newSocket);
        console.log('Chat:', 'success', 'Socket Connected!');
      });
    });
  };

  const createGroup = () => {
    // this.props.navigation.navigate('ChatGroup');
  };

  useEffect(() => {
    AsyncStorage.getItem('email').then((email: any) => {
      fetchAuthToken().then((token) => {
        setupSocket(token).then((res) => {
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

            setOrgnaizationId(orgId);
            // this.
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
                setUsers(usr);
                setGroupUsers(groups);
                // console.log(usr);
                // this.setState({users: usr, group: groups});
              })
              .catch((err: any) => console.log(err));
          });

          setcurrentUser(res.data.data);
        });
    });
  }, []);

  return (
    <View style={{backgroundColor: colors.secondary}}>
      <View style={{backgroundColor: colors.primary}}>
        <ScrollView>
          <Header
            title="Messaging"
            onBackPress={() => props.navigation.goBack()}
            profile={currentUser.img_url}
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
              {users.map((d: Imessage | any) => (
                <User
                  id={d.userId}
                  name={d.name}
                  pendingsms={d.notseen}
                  image={d.image}
                  isOnline={d.isonline}
                  onPress={() => {
                    console.log('current data uahdsajhdjh');
                    console.log(d);

                    console.log(currentUser._id);
                    console.log(orgnaizationId);
                    console.log(d.data._id);

                    createApi
                      .createApi()
                      .openPrivateChat(
                        currentUser._id,
                        orgnaizationId,
                        d.userId,
                      )
                      .then((res: any) => {
                        // console.log(res);

                        props.navigation.navigate('Chat', {
                          data: res.data,
                          type: 'private',
                          socket: socket,
                        });
                      });
                  }}
                />
              ))}
            </View>
            {/* Group Conversation */}
            <View style={styles.conversationContainer}>
              <Text style={styles.ttleConversation}>Group Conversations</Text>

              <TouchableOpacity
                style={{}}
                onPress={() => {
                  createGroup();
                }}>
                <CustomIcon
                  name="add-circle"
                  size={wp(15)}
                  type="Ionicons"
                  color={colors.green}
                />
              </TouchableOpacity>

              {/* <TouchableOpacity
                style={{
                  backgroundColor: colors.green,
                  padding: wp(3),
                  borderRadius: wp(2),
                }}
                onPress={() => {}}>
                </TouchableOpacity> */}
              {/* <View style={styles.line} /> */}
              {groupUsers.map((d: any) => (
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
                        // console.log(res);
                        // console.log(this.state.socket);

                        props.navigation.navigate('Chat', {
                          data: res.data.data[0],
                          type: 'group',
                          socket: socket,
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

  // await AsyncStorage.getItem("")
};

export default Messaging;

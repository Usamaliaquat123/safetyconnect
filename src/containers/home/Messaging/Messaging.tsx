import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  BackHandler,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Icon, Avatar} from 'react-native-elements';
import {colors, fonts} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import {ChatGroup, SingleChat} from '@containers';
import {View_sor, messagingUsers, groupConversation} from '@service';
import {connect} from 'react-redux';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import io from 'socket.io-client';
import Modal from 'react-native-modal';
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
  const [allUsers, setallUsers] = useState([]);
  const [groupUsers, setGroupUsers] = useState<Array<any>>([]);
  const [currentUser, setcurrentUser] = useState<any>({});
  const [token, setToken] = useState<string>();
  const [orgnaizationId, setOrgnaizationId] = useState<string>('');
  const [socket, setSocket] = useState<null>();
  const [addNewModal, setAddNewModal] = useState(false);
  //  Group popup
  const [isGroupModal, setisGroupModal] = useState(false);
  // Single popup
  const [isChatModal, setisChatModal] = useState(false);

  const [refreshing, setrefreshing] = useState(false);

  // Setup Socket implementation

  const setupSocket = (userToken: any) => {
    console.log('Chat: socket', socket);

    if (userToken && !socket) {
      const newSocket = io.connect(`${createApi.createApi().base_uri}:5007`, {
        query: {
          token: userToken,
        },
      });
      console.log('Chat: New Socket Created');

      newSocket.on('error', (data: any) => {
        console.log(data || 'Chat: socket error');
      });

      newSocket.on('testEmit', (data: any) =>
        console.log('Chat: testEmit', data),
      );

      newSocket.on('disconnect', () => {
        setSocket(null);
        setTimeout(setupSocket(userToken), 3000);
        console.log('Chat:', 'error', 'Socket Disconnected!');
      });

      newSocket.on('connect', () => {
        console.log('Chat:', 'success', 'Socket Connected!');
      });

      setSocket(newSocket);
    }
  };

  // const setupSocket = (token: any) => {
  //   return new Promise((resolve, reject) => {
  //     console.log(token);

  //     const newSocket = io.connect(`${createApi.createApi().base_uri}:5007`, {
  //       transports: ['websocket'],
  //       withCredentials: true,
  //       jsonp: false,

  //       // origins: '*',
  //       query: {
  //         token: token,
  //       },
  //     });

  //     // console.log('in socket');d
  //     // console.log(newSocket);
  //     newSocket.on('error', (data: any) => {
  //       reject(data);
  //       console.log(data || 'Chat: socket error');
  //     });

  //     newSocket.on('testEmit', (data: any) => {
  //       resolve(data);
  //       console.log('Chat: testEmit', data);
  //     });

  //     newSocket.on('disconnect', (e: any) => {
  //       // setSocket(null);
  //       reject(e);
  //       setSocket(null);
  //       // setTimeout(this.setupSocket(token), 3000);
  //       console.log('Chat:', 'error', 'Socket Disconnected!', e);
  //     });

  //     newSocket.on('connect', () => {
  //       resolve('connect');
  //       setSocket(newSocket);
  //       console.log('Chat:', 'success', 'Socket Connected!');
  //     });
  //   });
  // };

  const onCreateGroup = (groupName: any, users: any) => {
    console.log(users);
    var dta = {
      name: groupName,
      organization: orgnaizationId,
      involved_persons: users.map((f: any) => f._id),
      roomType: 'private',
      createdBy: currentUser._id,
      img_url: `https://dummyimage.com/35x35/E4FFDE/8DCD7E.jpg&text=${groupName[0].toUpperCase()}`,
    };

    console.log(dta);
    createApi
      .createApi()
      .createGroupApi(dta)
      .then((res) => {
        console.log('res');
        console.log(res);
        if (res.status == 200) {
          // getAllUsers(currentUser._id);
          setisGroupModal(false);

          createApi
            .createApi()
            .getAllChats(currentUser._id, orgnaizationId)
            .then((res: any) => {
              console.log('asdsads');
              console.log(res.data);
              // console.log(res.data.allChats);
              var usr = [];
              var groups = [];
              for (let i = 0; i < res.data.allChats.length; i++) {
                console.log('all data up here');
                console.log(res.data.allChats[i]);
                if (res.data.allChats[i]?.roomType != undefined) {
                  console.log('room type');

                  console.log(res.data.allChats[i]);
                  var user = {
                    isSelected: false,
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
                      isSelected: false,
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
              setallUsers(usr);
              setGroupUsers(groups);
              // console.log(usr);
              // this.setState({users: usr, group: groups});
            })
            .catch((err: any) => console.log(err));
        }
      });
  };

  // on create single chat
  const onCreateChat = (user: any) => {
    createApi
      .createApi()
      .openPrivateChat(currentUser._id, orgnaizationId, user._id)
      .then((res: any) => {
        setisChatModal(false);

        props.navigation.navigate('Chat', {
          data: res.data,
          type: 'private',
          socket: socket,
        });
      });
  };

  const _onRefresh = () => {
    setallUsers([]);
    setGroupUsers([]);
    setcurrentUser({});
    // setrefreshing(true);

    AsyncStorage.getItem('email').then((email: any) => {
      fetchAuthToken().then((token) => {
        setupSocket(token);
      });

      getAllUsers(email);
    });
    setrefreshing(false);
  };

  const getAllUsers = (email: any) => {
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
              console.log('line 265');
              console.log(res.data);

              // setallUsers(res.data.allChats);
              // console.log(res.data.allChats);

              var usr = [];
              var groups = [];
              for (let i = 0; i < res.data.allChats.length; i++) {
                if (res.data.allChats[i]?.roomType != undefined) {
                  console.log('room type');

                  console.log(res.data.allChats[i]);
                  var user = {
                    isSelected: false,
                    data: res.data.allChats[i],
                    name: res.data.allChats[i].name,
                    img_url: res.data.allChats[i].img_url,
                    isonline: true,
                    _id: res.data.allChats[i]._id,
                  };
                  groups.push(user);
                } else {
                  if (res.data.allChats[i]?.userA != undefined) {
                    // console.log('user type');

                    var ur = {
                      isSelected: false,
                      data: res.data.allChats[i],
                      name: res.data.allChats[i].userA.name,
                      img_url: res.data.allChats[i].userA.img_url,
                      isonline: true,
                      _id: res.data.allChats[i].userA._id,
                    };
                    usr.push(ur);
                  }
                }

                //   // usr.push(user);
              }

              setUsers(usr);
              setallUsers(usr);
              setGroupUsers(groups);
              console.log('usr');
              console.log(usr);
              // this.setState({users: usr, group: groups});
            })
            .catch((err: any) => console.log(err));
        });

        setcurrentUser(res.data.data);
      });
  };
  useEffect(() => {
    AsyncStorage.getItem('email').then((email: any) => {
      fetchAuthToken().then((token) => {
        setupSocket(token);
      });

      getAllUsers(email);
    });
  }, []);

  return (
    <View style={{backgroundColor: colors.secondary, flex: 1}}>
      <View style={{backgroundColor: colors.secondary}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={() => _onRefresh()}
              refreshing={refreshing}
            />
          }
          showsVerticalScrollIndicator={false}>
          <Header
            onCreate={() => setAddNewModal(true)}
            title="Messages"
            onBackPress={() => props.navigation.goBack()}
            profile={currentUser?.img_url}
          />
          <View style={styles.content}>
            <Search
              onChange={(e: string) => {}}
              value={'Search messages'}
              iconName={'search'}
              placeHolder={'Search messages...'}
              iconType={'evilicon'}
            />
            <View style={{marginTop: wp(4)}}>
              {/* <Text style={styles.ttleConversation}>Conversations</Text> */}
              {/* <View style={styles.line} /> */}
              {users.map((d: Imessage | any) => (
                <User
                  id={d.userId}
                  name={d.name}
                  type={'user'}
                  date={Date.now()}
                  pendingsms={d.notseen}
                  latestMsgs={[
                    'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing... ',
                    'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing... ',
                    'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing... ',
                  ]}
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
                          data: d.userId,
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
              {/* <Text style={styles.ttleConversation}>Group Conversations</Text> */}

              {groupUsers.map((d: any) => (
                <User
                  type={'group'}
                  id={d.userId}
                  name={d.name}
                  userImages={[
                    'https://negocio24horas.com.br/plugins/images/users/4.jpg',
                    'https://pbs.twimg.com/profile_images/1001332003474567169/vDCiE04W_400x400.jpg',
                    'data:image/jpeg;base64,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',
                  ]}
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
                          data: d.data._id,
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

      {/* Modal Opener */}
      <Modal
        isVisible={addNewModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={500}
        animationOutTiming={500}
        backdropOpacity={0.25}
        backdropTransitionOutTiming={0}
        useNativeDriver
        avoidKeyboard
        onBackdropPress={() => setAddNewModal(false)}
        style={{padding: 0, margin: 0}}>
        {/* <Provider> */}
        <View
          // {...props.scrollViewProps}
          style={{
            flex: 1,
            backgroundColor: 'white',
            position: 'absolute',
            bottom: wp(18),
            left: wp(4),
            right: wp(4),
            // margin: wp(10),
            // width: wp(99),
            paddingHorizontal: 22,
            paddingVertical: wp(5),
            borderRadius: 10,
          }}>
          {/* {props.children} */}

          <View
            style={{
              padding: wp(3),
              backgroundColor: colors.lightBlue,
              borderRadius: wp(3),
              marginBottom: wp(3),
            }}>
            <TouchableOpacity
              onPress={() => {
                setAddNewModal(false);
                setisChatModal(true);
              }}
              style={{
                margin: wp(3),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: wp(3),
                  fontFamily: fonts.SFuiDisplayMedium,
                  color: colors.text,
                  opacity: 0.7,
                }}>
                Single Chat
              </Text>
              <CustomIcon
                name="user"
                size={wp(5)}
                type="antdesign"
                color={colors.text}
              />
            </TouchableOpacity>

            <View style={{borderWidth: wp(0.1), opacity: 0.1}} />

            <TouchableOpacity
              onPress={() => {
                setAddNewModal(false);
                setisGroupModal(true);
              }}
              style={{
                margin: wp(3),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: fonts.SFuiDisplayMedium,
                  fontSize: wp(3),
                  color: colors.text,
                  opacity: 0.7,
                }}>
                Create Group
              </Text>
              <CustomIcon
                name="users"
                size={wp(5)}
                type="feather"
                color={colors.text}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setAddNewModal(false)}>
            <Text
              onPress={() => setAddNewModal(false)}
              style={{
                textAlign: 'center',
                fontFamily: fonts.SFuiDisplayMedium,
                color: colors.text,
                // opacity: 0.7,
                fontSize: wp(3),
                marginTop: wp(2),
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
        {/* {props.flashMessageInstance || null} */}
        {/* </Provider> */}
      </Modal>

      {/* Create GroupChat Modal */}
      <ChatGroup
        updateUsers={(d) => setUsers(d)}
        isGroupModal={isGroupModal}
        setisGroupModal={() => setisGroupModal(false)}
        createGroup={onCreateGroup}
        users={allUsers}
      />
      {/* Create single chat Modal */}
      <SingleChat
        updateUsers={(d: any) => setUsers(d)}
        isChatModal={isChatModal}
        setisChatModal={() => setisChatModal(false)}
        createChat={onCreateChat}
        users={allUsers}
      />
    </View>
  );

  // await AsyncStorage.getItem("")
};

export default Messaging;

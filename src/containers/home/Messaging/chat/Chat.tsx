import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import {createApi, Create_sor} from '@service';
import {
  GiftedChat,
  InputToolbar,
  Composer,
  Send,
  SendProps,
  Bubble,
  BubbleProps,
  ComposerProps,
  Time,
  InputToolbarProps,
  TimeProps,
  IMessage,
} from 'react-native-gifted-chat';
import {StackNavigationProp} from '@react-navigation/stack';
import Video from 'react-native-video';

import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import {Icon, Avatar} from 'react-native-elements';
import styles from './styles';
import {colors, images} from '@theme';
import moment from 'moment';

import ImageViewer from 'react-native-image-zoom-viewer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {clockRunning, color} from 'react-native-reanimated';
import {AsyncStorage} from '@aws-amplify/core';
import {
  getCurrentOrganization,
  localToUtc,
  generateItems,
  fetchAuthToken,
} from '@utils/utils';

var CustomIcon: any = Icon;
type ChatNavigationProp = StackNavigationProp<StackNavigatorProps, 'Chat'>;
type ChatRouteProp = RouteProp<StackNavigatorProps, 'Chat'>;

export interface ChatProps {
  route: ChatRouteProp;
  navigation: ChatNavigationProp;
  reduxActions: any;
  reduxState: any;
}

const Chat = (props: ChatProps) => {
  const [imageViewer, setimageViewer] = useState<Boolean>(false);

  const [image, setimages] = useState<Array<any>>([]);
  const [isVideoFullscreen, setisVideoFullscreen] = useState<Boolean>(false);
  const [reciever, setreciever] = useState<string>('');
  const [organizationId, setorganizationId] = useState<string>('');
  const [messages, setMessages] = useState<Array<any>>([]);
  const [chatMessagesLoaded, setChatMessagesLoaded] = useState(false);
  const [orgMembers, setorgMembers] = useState([]);
  const [socket, setSocket] = useState(props.route.params.socket);

  // join group or private chat
  const [joinGroup, setjoinGroup] = useState<Boolean>(false);
  const [singleChat, setsingleChat] = useState<Boolean>(false);

  // current user
  const [currentUser, setcurrentUser] = useState({});

  // receiving single messages
  useEffect(() => {
    // console.log('on line 73');
  }, [messages, reciever, singleChat]);

  // receiving new group messages
  useEffect(() => {
    // console.log('');

    if (socket && reciever && joinGroup) {
      socket.on(`newMessage/${reciever}`, (message: any) => {
        console.log(
          'Chat: receiving new group message',
          message,
          'state id',
          reciever,
        );

        console.log('data aaya hai on 93 crea');
      });
    }
  }, [joinGroup, reciever, messages]);

  useEffect(() => {
    console.log('data');
    // console.log(props.route.params.data);
    setSocket(props.route.params.socket);
    // console.log()

    AsyncStorage.getItem('email')
      .then((user: any) => {
        createApi
          .createApi()
          .getUser(user)
          .then((usr: any) => setcurrentUser(usr.data.data));
        if (joinGroup == false || singleChat == false) {
          if (props.route.params.type == 'private') {
            setsingleChat(true);
          } else if (props.route.params.type == 'group') {
            setjoinGroup(true);
          }
        }
        setreciever(props.route.params.data._id);
        getCurrentOrganization().then((orgId: any) => {
          console.log('orgId');
          setorganizationId(orgId);
        });
      })
      .catch((err) => {});

    return () => {
      if (props.route.params.type === 'group') {
        props.route.params.socket.emit('leaveRoom', {
          chatroomId: reciever,
        });
      } else {
        props.route.params.socket.emit('leaveRoom', {
          chatroomId: reciever,
        });
      }
    };
  }, []);

  // renderbubble component
  const renderBubble = (props: BubbleProps<IMessage>) => {
    var sameUserInPrevMessage = false;
    if (
      props.previousMessage?.user !== undefined &&
      props.previousMessage?.user
    ) {
      props.previousMessage?.user._id === props.currentMessage?.user._id
        ? (sameUserInPrevMessage = true)
        : (sameUserInPrevMessage = false);
    }

    var messageBelongsToCurrentUser = 2 == props.currentMessage?.user._id;

    return (
      <View>
        {messageBelongsToCurrentUser == true ? (
          <View>
            <View style={styles.containerOfText}>
              <View style={styles.containerOfArrow}></View>
              <Text>{props.currentMessage?.text}</Text>
            </View>
            <Text style={styles.containerOfDate}>
              {moment(props.currentMessage?.createdAt).format('LT')}
            </Text>
            <View style={styles.containerOfImage}>
              {props.currentMessage?.image != undefined ? (
                <View style={{flexDirection: 'row'}}>
                  {props.currentMessage.image.map((d: any, i: number) => (
                    <TouchableOpacity
                      onPress={() => {
                        image.push({url: d});
                        setimageViewer(true);
                      }}>
                      <Image style={styles.imageTag} source={{uri: d}} />
                    </TouchableOpacity>
                  ))}
                </View>
              ) : null}
            </View>
          </View>
        ) : (
          <View style={{marginBottom: wp(5)}}>
            <View style={styles.leftContainer}>
              <View style={styles.LeftcontainerOfArrow}></View>
              <Text>{props.currentMessage?.text}</Text>
            </View>
            <Text style={styles.LeftContainerOfDate}>
              {moment(props.currentMessage?.createdAt).format('LT')}
            </Text>
          </View>
        )}
      </View>
    );
  };
  // Render composer
  const renderComposer = (props: ComposerProps) => (
    <Composer
      {...props}
      textInputStyle={{fontSize: wp(3.5), fontWeight: 'bold'}}
      placeholder={'Write a message...'}
    />
  );
  // Render input component
  const renderInput = (props: InputToolbarProps) => (
    <InputToolbar
      {...props}
      containerStyle={{
        borderTopColor: colors.textOpa,
        borderTopWidth: wp(0.2),
        padding: wp(2),
        // marginRight: wp(10),
      }}
    />
  );

  const getGroupMessages = () => {};
  // Render send component
  const renderSend = (prop: SendProps<IMessage>) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <CustomIcon
          onPress={() => {}}
          containerStyle={{marginRight: wp(3)}}
          size={wp(4)}
          name="attachment"
          type="entypo"
          color={colors.primary}
        />
        <TouchableOpacity
          onPress={() => {
            if (prop.text && prop.onSend) {
              console.log(prop.text?.trim());

              // var message = {
              //   receiver: this.state.reciever,
              //   organization: this.state.organizationId,
              //   message: props.text?.trim(),
              //   files: [],
              //   // this will need to converted in utc
              //   createdAt: new Date(),
              // };

              console.log('message');
              // console.log(message);

              if (props.route.params.type == 'group') {
                const message = {
                  chatroomId: reciever,
                  message: prop.text?.trim(),
                  createdAt: Date.now(),
                  files: [],
                };
                console.log('group message');
                console.log(message);
                socket.emit('chatroomMessage', message);

                // getGroupMessages();
              } else {
                var message = {
                  receiver: reciever,
                  organization: organizationId,
                  message: prop.text?.trim(),
                  files: [],
                  // this will need to converted in utc
                  createdAt: Date.now(),
                };

                // console.log('message');
                // console.log(message);
                socket.emit('privateMessage', message);
              }
            }
          }}>
          <View style={{width: wp(5), height: wp(5), marginBottom: wp(2.5)}}>
            <Image
              source={images.send}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // Fecting group chat
  const fetchGroupChat = (
    id: any,
    orgnaizationId: string,
    currentUser: string,
  ) => {
    createApi
      .createApi()
      .openGroupChat(id)
      .then((res: any) => {
        createApi
          .createApi()
          .getOrganization(orgnaizationId)
          .then((org: any) => {
            setorgMembers(org.data.data.members);
            var dta = [];
            var chati = res.data.data[0];
            console.log(chati);
            for (let i = 0; i < chati.chat.length; i++) {
              if (
                org.data.data.members.filter(
                  (d: any) => d.email == chati.chat[i].user,
                )[0].email == currentUser
              ) {
                dta.push({
                  _id: chati.chat[i]._id,
                  // You can also add a video prop:
                  text: chati.chat[i].message,
                  createdAt: chati.chat[i].createdAt,
                  user: {
                    _id: 1,
                    name: org.data.data.members.filter(
                      (d: any) => d.email == chati.chat[i].user,
                    )[0].name,
                    avatar: org.data.data.members.filter(
                      (d: any) => d.email == res.data.chat[i].user,
                    )[0].img_url,
                  },
                });
              } else {
                dta.push({
                  _id: chati.chat[i]._id,
                  // You can also add a video prop:
                  text: chati.chat[i].message,
                  createdAt: chati.chat[i].createdAt,
                  user: {
                    _id: org.data.data.members.filter(
                      (d: any) => d.email == res.data.chat[i].user,
                    )[0]._id,
                    name: org.data.data.members.filter(
                      (d: any) => d.email == res.data.chat[i].user,
                    )[0].name,
                    avatar: org.data.data.members.filter(
                      (d: any) => d.email == res.data.chat[i].user,
                    )[0].img_url,
                  },
                });
              }

              console.log('dta');
              console.log(dta);
            }

            var dd = generateItems(dta);
            setMessages(dd);
          });
      });
  };

  // Fetching direct chat
  const fetchDirectChat = (
    id: any,
    organizationId: string,
    currentUser: string,
  ) => {
    createApi
      .createApi()
      .openPrivateChat(currentUser, organizationId, id)
      .then((res: any) => {
        createApi
          .createApi()
          .getOrganization(organizationId)
          .then((org: any) => {
            setorgMembers(org.data.data.members);
            var dta = [];

            for (let i = 0; i < res.data.chat.length; i++) {
              if (
                org.data.data.members.filter(
                  (d: any) => d.email == res.data.chat[i].user,
                )[0].email == currentUser
              ) {
                dta.push({
                  _id: res.data.chat[i]._id,
                  // You can also add a video prop:
                  text: res.data.chat[i].message,
                  createdAt: res.data.chat[i].createdAt,
                  user: {
                    _id: 1,
                    name: org.data.data.members.filter(
                      (d: any) => d.email == chati.chat[i].user,
                    )[0].name,
                    avatar: org.data.data.members.filter(
                      (d: any) => d.email == res.data.chat[i].user,
                    )[0].img_url,
                  },
                });
              } else {
                dta.push({
                  _id: res.data.chat[i]._id,
                  // You can also add a video prop:
                  text: res.data.chat[i].message,
                  createdAt: res.data.chat[i].createdAt,
                  user: {
                    _id: org.data.data.members.filter(
                      (d: any) => d.email == res.data.chat[i].user,
                    )[0]._id,
                    name: org.data.data.members.filter(
                      (d: any) => d.email == res.data.chat[i].user,
                    )[0].name,
                    avatar: org.data.data.members.filter(
                      (d: any) => d.email == res.data.chat[i].user,
                    )[0].img_url,
                  },
                });
              }

              console.log('dta');
              console.log(dta);
            }

            var dd = generateItems(dta);
            setMessages(dd);
          });
      });
  };

  // fetching direct chat

  // decider for fetchng group and direct messages
  useEffect(() => {
    AsyncStorage.getItem('email').then((currentUser: any) => {
      createApi
        .createApi()
        .getUser(currentUser)
        .then((usr: any) => setcurrentUser(usr.data.data));
      getCurrentOrganization().then((orgId: any) => {
        setChatMessagesLoaded(false);
        console.log('Chat: message type', props.route.params.type);
        props.route.params.type === 'group'
          ? fetchGroupChat(props.route.params.data, orgId)
          : fetchDirectChat(props.route.params.data, orgId, currentUser);
      });
    });
  }, [props.route.params.data]);

  // Join Group Chat
  useEffect(() => {
    if (reciever && joinGroup && socket) {
      console.log('Chat: join room', joinGroup, 'room id', reciever);
      socket.emit('joinRoom', {
        chatroomId: reciever,
      });
    }

    return () => {
      if (socket) {
        socket.emit('leaveRoom', {
          chatroomId: reciever,
        });
      }
    };
  }, [joinGroup]);

  return (
    <View style={{flex: 1, backgroundColor: colors.secondary}}>
      <View style={styles.header}>
        <View>
          <Avatar
            rounded
            containerStyle={styles.containerAvatar}
            source={{
              uri:
                props.route.params.type == 'private'
                  ? props.route.params.data.userB.img_url
                  : null,
            }}
          />
          <View
            style={[
              styles.isonline,
              // this.props.route.params.data.isonline == false
              //   ? {opacity: 0.7, backgroundColor: colors.riskIcons.orrange}
              //   : null,
            ]}
          />
        </View>
        <Text style={styles.userNameText}>
          {props.route.params.type == 'private'
            ? props.route.params.data.userB.name
            : null}
        </Text>
        <View style={styles.headRightIcon}>
          <CustomIcon
            size={wp(6)}
            name="adduser"
            type="antdesign"
            color={colors.primary}
          />
          <CustomIcon
            onPress={() => {
              if (props.route.params.type === 'group') {
                props.route.params.socket.emit('leaveRoom', {
                  chatroomId: reciever,
                });
              } else {
                props.route.params.socket.emit('leaveRoom', {
                  chatroomId: reciever,
                });
              }

              props.navigation.goBack();
            }}
            size={wp(6)}
            name="cross"
            type="entypo"
            color={colors.text}
          />
        </View>
      </View>
      {/* content */}
      <GiftedChat
        renderBubble={(container: BubbleProps<IMessage>) =>
          renderBubble(container)
        }
        renderSend={(sendIcon: SendProps<IMessage>) => renderSend(sendIcon)}
        messages={messages}
        renderInputToolbar={(Input: InputToolbarProps) => renderInput(Input)}
        renderComposer={(composer: ComposerProps) => renderComposer(composer)}
        user={{
          _id: 1,
        }}
      />

      <Modal
        visible={imageViewer}
        transparent={true}
        style={{backgroundColor: colors.secondary}}>
        <TouchableOpacity
          onPress={() => setimageViewer(false)}
          style={{backgroundColor: colors.secondary, alignItems: 'flex-end'}}>
          <CustomIcon
            containerStyle={{marginTop: wp(3), marginRight: wp(3)}}
            name={'cross'}
            type={'entypo'}
            color={colors.lightGrey}
            size={wp(5)}
          />
        </TouchableOpacity>
        <ImageViewer
          style={{backgroundColor: colors.secondary}}
          flipThreshold={100}
          onCancel={() => {}}
          imageUrls={image}
        />
      </Modal>
    </View>
  );
};
export default Chat;

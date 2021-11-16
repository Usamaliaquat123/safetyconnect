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
import {getCurrentOrganization, localToUtc} from '@utils/utils';

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

  const [orgMembers, setorgMembers] = useState([]);
  const [socket, setSocket] = useState(props.route.params.socket);

  // current user
  const [currentUser, setcurrentUser] = useState({});

  // useEffect(() => {

  //   return () => {

  //   };
  // }, [messages, reciever]);

  useEffect(() => {
    console.log('data');
    console.log(props.route.params.data);
    setSocket(props.route.params.socket);
    // console.log()

    // BackHandler.addEventListener('hardwareBackPress', () => {
    //   // console.log('asds');

    //   if (props.route.params.type === 'group') {
    //     socket.emit('leaveRoom', {
    //       chatroomId: reciever,
    //     });
    //   } else {
    //     socket.emit('leavePrivate', {
    //       email: reciever,
    //     });
    //   }
    // });

    AsyncStorage.getItem('email')
      .then((user: any) => {
        createApi
          .createApi()
          .getUser(user)
          .then((usr: any) => setcurrentUser(usr.data.data));
        setreciever(props.route.params.data._id);
        // console.log('this.props.route.params.data on line 179');
        // console.log('this.props.route.params.socket');

        if (props.route.params.type == 'private') {
          // console.log('get in line 183');
          // console.log(props.route.params.socket);
          // console.log();
          // this.props.route.params.socket.emit('joinPrivate', {
          //   // email: this.props.rout,
          // });
        } else if (props.route.params.type == 'group') {
          socket.emit('joinRoom', {
            chatroomId: reciever,
          });
        }
        getCurrentOrganization().then((orgId: any) => {
          console.log('orgId');
          setorganizationId(orgId);

          createApi
            .createApi()
            .getOrganization(orgId)
            .then((org: any) => {
              setorgMembers(org.data.data.members);
              console.log('members');
              console.log(org.data.data.members);
              var dta = [];
              for (let i = 0; i < props.route.params.data.chat.length; i++) {
                if (
                  org.data.data.members.filter(
                    (d: any) => d.email == props.route.params.data.chat[i].user,
                  )[0].email == user
                ) {
                  dta.push({
                    _id: props.route.params.data.chat[i]._id,
                    // You can also add a video prop:
                    text: props.route.params.data.chat[i].message,
                    createdAt: props.route.params.data.chat[i].createdAt,
                    user: {
                      _id: 1,
                      name: org.data.data.members.filter(
                        (d: any) =>
                          d.email == props.route.params.data.chat[i].user,
                      )[0].name,
                      avatar: org.data.data.members.filter(
                        (d: any) =>
                          d.email == props.route.params.data.chat[i].user,
                      )[0].img_url,
                    },
                  });
                } else {
                  props.route.params.data.chat[i].createdAt;
                  dta.push({
                    _id: props.route.params.data.chat[i]._id,
                    // You can also add a video prop:
                    text: props.route.params.data.chat[i].message,
                    createdAt: props.route.params.data.chat[i].createdAt,
                    user: {
                      _id: org.data.data.members.filter(
                        (d: any) =>
                          d.email == props.route.params.data.chat[i].user,
                      )[0]._id,
                      name: org.data.data.members.filter(
                        (d: any) =>
                          d.email == props.route.params.data.chat[i].user,
                      )[0].name,
                      avatar: org.data.data.members.filter(
                        (d: any) =>
                          d.email == props.route.params.data.chat[i].user,
                      )[0].img_url,
                    },
                  });
                }
              }

              setMessages(dta);
            });
        });
      })
      .catch((err) => {});

    console.log('this.props.route.params.data yahann ai');
    console.log(props.route.params.data);
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
              {props.currentMessage?.video != undefined ? (
                <View style={{flexDirection: 'row'}}>
                  {props.currentMessage.video.map((d: any, i: number) => (
                    <TouchableOpacity
                      style={{backgroundColor: 'black', borderRadius: wp(3)}}
                      onPress={() => {
                        // this.state.images.push({url: d});
                        // this.setState({
                        //   imageViewer: true,
                        // });
                      }}>
                      <View>
                        <Text>{d}</Text>
                        <Video
                          source={{uri: d}} // Can be a URL or a local file.
                          ref={(ref) => {
                            this.player = ref;
                          }} // Store reference
                          // onBuffer={this.onBuffer} // Callback when remote video is buffering
                          // onError={this.videoError} // Callback when video cannot be loaded
                          // onVideoLoad={this.onVideoLoad} //callback when video loaded
                          // onVideoProgress={this.onVideoProcess} //Callback on video progress
                          // onVideoLoadStart={this.onVideoLoadStart} // Callback when video is loading start
                          // fullscreen={true} // Boolean | is video is full screen
                        />
                      </View>
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

                socket.on(`newMessage/${reciever}`, (message: any) => {
                  console.log(
                    'Chat: receiving new group message',
                    message,
                    'state id',
                    props.route.params.data._id,
                  );

                  // console.log('messageasdsad');
                  console.log(message);

                  // console.log(
                  //   org.data.data.members.filter(
                  //     (d: any) => user == message.user,
                  //   ).length == 0
                  //     ? Date.now()
                  //     : 1,
                  // );

                  var dta = {
                    _id: orgMembers.filter(
                      (d: any) => d.email == message.user,
                    )[0]._id,

                    // You can also add a video prop:
                    text: message.message,
                    createdAt: message.createdAt,
                    user: {
                      _id:
                        orgMembers.filter(
                          (d: any) => d.email == message.user,
                        )[0].email == currentUser.email
                          ? 1
                          : orgMembers.filter(
                              (d: any) => d.email == message.user,
                            )[0].email,
                      name: orgMembers.filter(
                        (d: any) => d.email == message.user,
                      )[0].name,
                      avatar: orgMembers.filter(
                        (d: any) => d.email == message.user,
                      )[0].img_url,
                    },
                  };

                  console.log(dta);

                  // _id: props.route.params.data.chat[i]._id,
                  //   // You can also add a video prop:
                  //   text: props.route.params.data.chat[i].message,
                  //   createdAt: props.route.params.data.chat[i].createdAt,
                  //   user: {
                  //     _id: 1,
                  //     name: org.data.data.members.filter(
                  //       (d: any) =>
                  //         d.email == props.route.params.data.chat[i].user,
                  //     )[0].name,
                  //     avatar: org.data.data.members.filter(
                  //       (d: any) =>
                  //         d.email == props.route.params.data.chat[i].user,
                  //     )[0].img_url,
                  //   },
                  console.log('data aaya hai on 297');
                  // console.log(dta);
                  // messages.push(dta);

                  var msgs = [...messages];
                  msgs.push(dta);

                  setMessages(msgs);

                  // this.setState({});
                  // const newMessages = [...chatMessages, message];
                });

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

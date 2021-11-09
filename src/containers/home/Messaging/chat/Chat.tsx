import * as React from 'react';
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

class Chat extends React.Component<ChatProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      imageViewer: false,
      images: [],
      isVideoFullscreen: false,
      reciever: '',
      organizationId: '',
      messages: [],
      socket: props.route.params.socket,
    };
  }
  renderBubble = (props: BubbleProps<IMessage>) => {
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
                        this.state.images.push({url: d});
                        this.setState({
                          imageViewer: true,
                        });
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
  // filter out user from data array
  // filterUsers = (users: any) => {
  //   return new Promise((resolve , reject) => {

  //   })
  // };

  componentDidMount = () => {
    console.log('data');
    console.log(this.props.route.params.data);

    BackHandler.addEventListener('hardwareBackPress', () => {
      // console.log('asds');

      if (this.props.route.params.type === 'group') {
        this.state.socket.emit('leaveRoom', {
          chatroomId: this.state.reciever,
        });
      } else {
        console.log('this.state.reciever');
        console.log(this.state.reciever);
        this.state.socket.emit('leavePrivate', {
          email: this.state.reciever,
        });
      }
    });

    AsyncStorage.getItem('email')
      .then((user: any) => {
        console.log('this.props.route.params.data on line 179');
        console.log(this.props.route.params.data);
        console.log('this.props.route.params.socket');

        if (this.props.route.params.type == 'private') {
          console.log('get in line 183');
          console.log(this.props.route.params.socket);
          // console.log();
          // this.props.route.params.socket.emit('joinPrivate', {
          //   // email: this.props.rout,
          // });
        } else if (this.props.route.params.type == 'group') {
          // this.props.route.params.socket.emit('joinRoom', {
          //   chatroomId: chatId,
          // });
        }
        getCurrentOrganization().then((orgId: any) => {
          console.log('orgId');
          console.log(orgId);
          this.setState({
            organizationId: orgId,
            reciever: this.props.route.params.data._id,
          });
          createApi
            .createApi()
            .getOrganization(orgId)
            .then((org: any) => {
              console.log('members');
              console.log(org.data.data.members);
              console.log(this.props.route.params.data);
              var dta = [];
              for (
                let i = 0;
                i < this.props.route.params.data.chat.length;
                i++
              ) {
                if (
                  org.data.data.members.filter(
                    (d: any) =>
                      d.email == this.props.route.params.data.chat[i].user,
                  )[0].email == user
                ) {
                  dta.push({
                    _id: this.props.route.params.data.chat[i]._id,
                    // You can also add a video prop:
                    text: this.props.route.params.data.chat[i].message,
                    createdAt: this.props.route.params.data.chat[i].createdAt,
                    user: {
                      _id: 1,
                      name: org.data.data.members.filter(
                        (d: any) =>
                          d.email == this.props.route.params.data.chat[i].user,
                      )[0].name,
                      avatar: org.data.data.members.filter(
                        (d: any) =>
                          d.email == this.props.route.params.data.chat[i].user,
                      )[0].img_url,
                    },
                  });
                } else {
                  this.props.route.params.data.chat[i].createdAt;
                  dta.push({
                    _id: this.props.route.params.data.chat[i]._id,
                    // You can also add a video prop:
                    text: this.props.route.params.data.chat[i].message,
                    createdAt: this.props.route.params.data.chat[i].createdAt,
                    user: {
                      _id: org.data.data.members.filter(
                        (d: any) =>
                          d.email == this.props.route.params.data.chat[i].user,
                      )[0]._id,
                      name: org.data.data.members.filter(
                        (d: any) =>
                          d.email == this.props.route.params.data.chat[i].user,
                      )[0].name,
                      avatar: org.data.data.members.filter(
                        (d: any) =>
                          d.email == this.props.route.params.data.chat[i].user,
                      )[0].img_url,
                    },
                  });
                }
              }
              this.setState({messages: dta});
            });
        });
      })
      .catch((err) => {});

    console.log('this.props.route.params.data yahann ai');
    console.log(this.props.route.params.data);

    this.state.socket.on(
      `newMessage/${this.props.route.params.data._id}`,
      (message: any) => {
        console.log(
          'Chat: receiving new group message',
          message,
          'state id',
          this.props.route.params.data._id,
        );

        console.log('messageasdsad');
        console.log(message);

        // console.log(
        //   org.data.data.members.filter(
        //     (d: any) => user == message.user,
        //   ).length == 0
        //     ? Date.now()
        //     : 1,
        // );
        // var dta = {
        //   // _id:
        //   //   org.data.data.members.filter(
        //   //     (d: any) => user == message.user,
        //   //   ).length == 0,
        //   // You can also add a video prop:
        //   text: message.message,
        //   createdAt: message.createdAt,
        //   user: {
        //     _id: org.data.data.members.filter(
        //       (d: any) => d.email == message.user,
        //     )[0]._id,
        //     name: org.data.data.members.filter(
        //       (d: any) => d.email == message.user,
        //     )[0].name,
        //     avatar: org.data.data.members.filter(
        //       (d: any) => d.email == message.user,
        //     )[0].img_url,
        //   },
        // };
        console.log('data aaya hai on 297');
        console.log(dta);
        // this.state.messages.push(dta);

        // this.setState({});
        // const newMessages = [...chatMessages, message];
      },
    );

    // console.log(dta);
  };
  renderInput = (props: InputToolbarProps) => (
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
  renderComposer = (props: ComposerProps) => (
    <Composer
      {...props}
      textInputStyle={{fontSize: wp(3.5), fontWeight: 'bold'}}
      placeholder={'Write a message...'}
    />
  );
  renderSend = (props: SendProps<IMessage>) => {
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
            if (props.text && props.onSend) {
              console.log(props.text?.trim());

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

              if (this.props.route.params.type == 'group') {
                const message = {
                  chatroomId: this.state.reciever,
                  createdAt: Date.now(),
                  message: props.text?.trim(),
                  files: [],
                };
                console.log('group message');
                console.log(message);
                this.props.route.params.socket.emit('chatroomMessage', message);
              } else {
                var message = {
                  receiver: this.state.reciever,
                  organization: this.state.organizationId,
                  message: props.text?.trim(),
                  files: [],
                  // this will need to converted in utc
                  createdAt: Date.now(),
                };

                console.log('message');
                console.log(message);
                this.props.route.params.socket.emit('privateMessage', message);
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

  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.secondary}}>
        <View style={styles.header}>
          <View>
            <Avatar
              rounded
              containerStyle={styles.containerAvatar}
              source={{
                uri:
                  this.props.route.params.type == 'private'
                    ? this.props.route.params.data.userB.img_url
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
            {this.props.route.params.type == 'private'
              ? this.props.route.params.data.userB.name
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
                if (this.props.route.params.type === 'group') {
                  this.props.route.params.socket.emit('leaveRoom', {
                    chatroomId: this.state.reciever,
                  });
                } else {
                  this.props.route.params.socket.emit('leaveRoom', {
                    chatroomId: this.state.reciever,
                  });
                }

                this.props.navigation.goBack();
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
            this.renderBubble(container)
          }
          renderSend={(sendIcon: SendProps<IMessage>) =>
            this.renderSend(sendIcon)
          }
          messages={this.state.messages}
          renderInputToolbar={(Input: InputToolbarProps) =>
            this.renderInput(Input)
          }
          renderComposer={(composer: ComposerProps) =>
            this.renderComposer(composer)
          }
          user={{
            _id: 1,
          }}
        />

        <Modal
          visible={this.state.imageViewer}
          transparent={true}
          style={{backgroundColor: colors.secondary}}>
          <TouchableOpacity
            onPress={() => this.setState({imageViewer: false})}
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
            imageUrls={this.state.images}
          />
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

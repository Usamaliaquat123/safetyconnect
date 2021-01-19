import * as React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Create_sor} from '@service';
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
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import {Icon, Avatar} from 'react-native-elements';
import styles from './styles';
import {colors, images} from '@theme';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {clockRunning, color} from 'react-native-reanimated';
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
      messages: [
        {
          _id: 2,
          // You can also add a video prop:
          text: 'Hello usama',
          createdAt: 1611039685053,

          user: {
            _id: 1,
            name: 'Usaam',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 1,
          text: 'Hello raazia',
          // Image props.
          image: [
            'https://user-images.githubusercontent.com/33973828/104999836-62342e80-59e2-11eb-8224-a2869128c350.png',
            'https://user-images.githubusercontent.com/33973828/104999836-62342e80-59e2-11eb-8224-a2869128c350.png',
            'https://user-images.githubusercontent.com/33973828/104999836-62342e80-59e2-11eb-8224-a2869128c350.png',
          ],
          // You can also add a video prop:
          video: [
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          ],
          createdAt: 1611039702641,
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 1,
          // You can also add a video prop:
          text: 'Hello raazias',
          createdAt: 1611039703308,
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
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

    console.log(props.currentMessage?.image);
    return (
      <View>
        {messageBelongsToCurrentUser == true ? (
          <View>
            <View
              style={{
                position: 'relative',
                backgroundColor: colors.lightBlue,
                borderTopLeftRadius: wp(3),
                borderBottomLeftRadius: wp(3),
                padding: wp(3),
                // width: wp(50),
                borderTopRightRadius: wp(2),
                borderBottomRightRadius: wp(2),
                alignContent: 'center',
              }}>
              <View
                style={{
                  width: 0,
                  position: 'absolute',
                  left: wp(-2),
                  top: wp(2),
                  borderTopWidth: wp(3),
                  borderTopColor: 'transparent',
                  borderRightColor: colors.lightBlue,
                  borderRightWidth: wp(3),
                  borderBottomWidth: wp(3),
                  borderBottomColor: 'transparent',
                }}></View>
              <Text>{props.currentMessage?.text}</Text>
            </View>
            <Text style={{fontSize: wp(2.5), marginLeft: wp(2), opacity: 0.5}}>
              {moment(props.currentMessage?.createdAt).format('LT')}
            </Text>
            <View
              style={{
                position: 'relative',
                flexWrap: 'wrap',
                width: wp(50),
                flexDirection: 'row',
              }}>
              {props.currentMessage?.image != undefined ? (
                <View style={{}}>
                  {props.currentMessage.image.map((d, i) => (
                    <TouchableOpacity
                      style={{flexDirection: 'row'}}
                      onPress={() => console.log('s')}>
                      <Image
                        style={{
                          width: wp(20),
                          height: wp(20),
                          borderRadius: wp(3),
                          marginRight: wp(2),
                        }}
                        source={{uri: d}}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              ) : null}
            </View>
          </View>
        ) : (
          <View style={{marginBottom: wp(5)}}>
            <View
              style={{
                backgroundColor: colors.lightBlue,
                borderTopRightRadius: wp(3),
                borderBottomRightRadius: wp(3),
                padding: wp(3),
                alignContent: 'center',
                borderBottomLeftRadius: wp(2),
                borderTopLeftRadius: wp(2),
              }}>
              <View
                style={{
                  width: 0,
                  position: 'absolute',
                  right: wp(-2),
                  top: wp(2),
                  borderTopWidth: wp(3),
                  borderTopColor: 'transparent',
                  borderLeftColor: colors.lightBlue,
                  borderLeftWidth: wp(3),
                  borderBottomWidth: wp(3),
                  borderBottomColor: 'transparent',
                }}></View>
              <Text>{props.currentMessage?.text}</Text>
            </View>
            <Text
              style={{
                fontSize: wp(2.5),
                position: 'absolute',
                bottom: wp(-3.5),
                right: 0,
                marginRight: wp(2),
                opacity: 0.5,
              }}>
              {moment(props.currentMessage?.createdAt).format('LT')}
            </Text>
          </View>
        )}
      </View>
    );
  };
  // renderTime = (props: TimeProps<IMessage>) => (
  //   <View>
  //     <Time
  //       {...props}
  //       timeTextStyle={{
  //         left: {color: colors.text},
  //         right: {color: colors.text},
  //       }}
  //       containerStyle={{
  //         left: {backgroundColor: colors.secondary},
  //         right: {backgroundColor: colors.secondary},
  //       }}
  //     />
  //   </View>
  // );

  componentDidMount = () => {};
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
    // console.log(props.text.)
    return (
      <View style={{flexDirection: 'row'}}>
        <Icon
          onPress={() => console.log('sds')}
          containerStyle={{marginRight: wp(3)}}
          size={wp(4)}
          name="attachment"
          type="entypo"
          color={colors.primary}
        />
        <TouchableOpacity
          onPress={() => {
            if (props.text && props.onSend) {
              props.onSend(
                {
                  text: props.text?.trim(),
                  // user: props,
                  // _id: props.(),
                },
                true,
              );
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
  renderFooter = () => (
    <View>
      <Text>sdsd</Text>
    </View>
  );
  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.secondary}}>
        <View style={styles.header}>
          <View>
            <Avatar
              rounded
              containerStyle={styles.containerAvatar}
              source={{
                uri: this.props.route.params.data.image,
              }}
            />
            <View
              style={[
                styles.isonline,
                this.props.route.params.data.isonline == false
                  ? {opacity: 0.7, backgroundColor: colors.riskIcons.orrange}
                  : null,
              ]}
            />
          </View>
          <Text style={styles.userNameText}>
            {this.props.route.params.data.name}
          </Text>
          <View style={styles.headRightIcon}>
            <Icon
              size={wp(6)}
              name="adduser"
              type="antdesign"
              color={colors.primary}
            />
            <Icon
              onPress={() => this.props.navigation.goBack()}
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

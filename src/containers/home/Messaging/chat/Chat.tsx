import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
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

    console.log(typeof props.currentMessage?.video);
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
                  {props.currentMessage.image.map((d, i) => (
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
                  {props.currentMessage.video.map((d, i) => (
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

        <Modal
          visible={this.state.imageViewer}
          transparent={true}
          style={{backgroundColor: colors.secondary}}>
          <TouchableOpacity
            onPress={() => this.setState({imageViewer: false})}
            style={{backgroundColor: colors.secondary, alignItems: 'flex-end'}}>
            <Icon
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
            onCancel={() => console.log('sdsd')}
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

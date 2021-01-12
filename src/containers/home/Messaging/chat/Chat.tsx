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
import {Icon, Avatar, } from 'react-native-elements';
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
          text: 'Hello usama',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'Usaam',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 1,
          text: 'Hello raazia',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 1,
          text: 'Hello raazias',
          createdAt: new Date(),
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
    return (
      <View>
        {!sameUserInPrevMessage && (
          <View
            style={
              messageBelongsToCurrentUser
                ? styles.messageTimeAndNameContainerRight
                : styles.messageTimeAndNameContainerLeft
            }>
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: colors.text,
                  fontSize: wp(3.5),
                },
                left: {
                  color: colors.text,
                  fontSize: wp(3.5),
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: colors.chatTextbg,
                },
                right: {
                  backgroundColor: colors.chatTextbg,
                },
              }}
            />
          </View>
        )}
      </View>
    );
  };
  renderTime = (props: TimeProps<IMessage>) => (
    <View>
         <Time
          {...props}
          timeTextStyle={{left: {color: colors.text}, right: {color: colors.text}}}
          containerStyle={{left: {backgroundColor: colors.secondary}, right: {backgroundColor : colors.secondary}}}
         />
    
      </View>
    );
  
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
  renderSend = (props: SendProps<IMessage>) => (
    <TouchableOpacity
      onPress={() => {
        if (props.text && props.onSend) {
          props.onSend(
            {
              text: props.text?.trim(),
              // user: props,
              // _id: props.messageIdGenerator(),
            },
            true,
          );
        }
      }}>
      <View style={{width: wp(6), height: wp(6), marginBottom: wp(2.5)}}>
        <Image
          source={images.send}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
    </TouchableOpacity>
  );
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
          <Text style={styles.userNameText}>{this.props.route.params.data.name}</Text>
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
          renderBubble={(container: BubbleProps<IMessage>) => this.renderBubble(container)}
          renderSend={(sendIcon: SendProps<IMessage>) => this.renderSend(sendIcon)}
          messages={this.state.messages}
          renderInputToolbar={(Input: InputToolbarProps) => this.renderInput(Input)}
          renderComposer={(composer: ComposerProps) => this.renderComposer(composer)}
          renderTime={(time: TimeProps<IMessage>) => this.renderTime(time)}
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

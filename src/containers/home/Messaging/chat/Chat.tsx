import * as React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Create_sor} from '@service';
import {
  GiftedChat,
  InputToolbar,
  Composer,
  Send,
} from 'react-native-gifted-chat';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import {Icon, Avatar} from 'react-native-elements';
import styles from './styles';
import {colors, images} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {clockRunning} from 'react-native-reanimated';
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
          _id: 1,
          text: 'Hello developer',
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

  componentDidMount = () => {};
  renderInput = (props: any) => (
    <InputToolbar
      {...props}
      containerStyle={{
        borderTopColor: colors.textOpa,
        borderTopWidth: wp(0.2),
        fontSize: wp(3),
        padding: wp(2),
        // marginRight: wp(10),
      }}
    />
  );
  renderComposer = (props: any) => (
    <Composer
      {...props}
      textInputStyle={{fontSize: wp(3.5), fontWeight: 'bold'}}
      placeholder={'Write a message...'}
    />
  );
  renderSend = (props: any) => (
    <TouchableOpacity>
      <View style={{width: 22}}>
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
  onSend = (messages: any) => {};
  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.secondary}}>
        <View style={styles.header}>
          <View>
            <Avatar
              rounded
              containerStyle={styles.containerAvatar}
              source={{
                uri: Create_sor.user.profile,
              }}
            />
            {/* <View
              style={[
                styles.isonline,
                this.props.route.params.data.isonline == false
                  ? {opacity: 0.7, backgroundColor: colors.riskIcons.orrange}
                  : null,
              ]}
            /> */}
          </View>
          <Text style={styles.userNameText}>Alyssa Carson</Text>
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
          renderSend={(props: any) => this.renderSend(props)}
          messages={this.state.messages}
          renderInputToolbar={(props: any) => this.renderInput(props)}
          renderFooter={this.renderFooter}
          renderComposer={(props: any) => this.renderComposer(props)}
          onSend={(messages) => this.onSend(messages)}
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

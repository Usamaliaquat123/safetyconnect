import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Icon, Avatar} from 'react-native-elements';
import {colors} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import {View_sor, messagingUsers, groupConversation} from '@service';
import {connect} from 'react-redux';
import {searchInObjects} from '@utils';
import {Imessage} from '@typings';
import {Search, Header, User} from '@components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {allRecentActivity, createApi} from '@service';

import styles from './styles';
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
    };
  }

  componentDidMount = () => {
    AsyncStorage.getItem('email').then((email: any) => {
      createApi
        .createApi()
        .getUser(email)
        .then((res: any) => {
          this.setState({currentUser: res.data.data});
        });
    });
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.primary}}>
        <ScrollView>
          <Header
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
              {this.state.users.map((d: Imessage) => (
                <User
                  id={d.userId}
                  name={d.name}
                  pendingsms={d.notseen}
                  image={d.image}
                  isOnline={d.isonline}
                  onPress={() =>
                    this.props.navigation.navigate('Chat', {data: d})
                  }
                />
              ))}
            </View>
            {/* Group Conversation */}
            <View style={styles.conversationContainer}>
              <Text style={styles.ttleConversation}>Group Conversations</Text>
              <View style={styles.line} />
              {this.state.group.map((d: Imessage) => (
                <User
                  id={d.userId}
                  name={d.name}
                  // pendingsms={d.notseen}
                  image={d.image}
                  isOnline={d.isonline}
                  onPress={() =>
                    this.props.navigation.navigate('Chat', {data: d})
                  }
                />
              ))}
            </View>
            <View style={styles.line} />
          </View>
        </ScrollView>
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

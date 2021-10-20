import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Icon, Avatar} from 'react-native-elements';
import {colors} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import {View_sor, messagingUsers, groupConversation} from '@service';
import {connect} from 'react-redux';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {getCurrentOrganization, searchInObjects} from '@utils';
import {Imessage} from '@typings';
import {Search, Header, User} from '@components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {allRecentActivity, createApi} from '@service';

import styles from '../styles';
type ChatGroupNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'ChatGroup'
>;
type ChatGroupRouteProp = RouteProp<StackNavigatorProps, 'ChatGroup'>;

export interface ChatGroupProps {
  route: ChatGroupRouteProp;
  navigation: ChatGroupNavigationProp;
  reduxActions: any;
  reduxState: any;
}
class ChatGroup extends React.Component<ChatGroupProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      users: [],
      currentUser: {},
      org: '',
      groupName: '',
      roomType: '',
    };
  }

  componentDidMount = () => {
    AsyncStorage.getItem('email').then((email: any) => {
      getCurrentOrganization().then((currentOrg: any) => {
        this.setState({users: currentOrg.data.data.members});

        createApi
          .createApi()
          .getUser(email)
          .then((user: any) => {
            var dta = {
              name: '',
              organization: '',
              involved_persons: '',
              roomType: 'private',
              createdBy: email,
              img_url: `https://dummyimage.com/35x35/E4FFDE/8DCD7E.jpg&text=${name[0].toUpperCase()}`,
            };
          });
      });
    });
  };

  createGroup = () => {};

  render() {
    return (
      <View style={{backgroundColor: colors.secondary}}>
        <View style={{backgroundColor: colors.primary}}>
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

              {/* <View style={styles.line} /> */}
            </View>
          </ScrollView>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatGroup);

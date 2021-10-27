import * as React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
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
import {user, orgnaization} from '@typings';
import {Search, Header, User} from '@components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {allRecentActivity, createApi} from '@service';

import styles from './styles';
type ChatGroupNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'ChatGroup'
>;
type ChatGroupRouteProp = RouteProp<StackNavigatorProps, 'ChatGroup'>;

// Search in Involved Persons
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

  searchInUsers = (str: string, strArray: Array<any>): Array<Object> => {
    var strArr = [];
    for (var j = 0; j < strArray.length; j++) {
      if (strArray[j].email.toLowerCase().match(str)) {
        strArr.push(strArray[j]);
      }
    }
    return strArr;
  };
  componentDidMount = () => {
    AsyncStorage.getItem('email').then((email: any) => {
      getCurrentOrganization().then((currentOrg: any) => {
        this.setState({org: currentOrg});
        createApi
          .createApi()
          .getOrganization(currentOrg)
          .then((orgs: any) => {
            console.log('orgs.data.data.members');
            console.log(orgs.data.data.members);

            orgs.data.data.members.map((d, i) => {
              if (d.email != email) {
                orgs.data.data.members[i]['is_selected'] = false;
                this.state.users.push(d);
              } else {
                this.setState({user: d});
              }
            });
            this.setState({});

            // console.log(orgs.data.data.members);
            // this.setState({users: orgs.data.data.members});
          });
        // console.log('users');
        // console.log(currentOrg.data.members);
        // this.setState({users: currentOrg.data.data.members});
      });
    });
  };

  createGroup = () => {
    console.log(this.state.users.filter((d) => d.is_selected == true));
    this.state.user['is_selected'] = true;
    this.state.users.push(this.state.user);
    console.log(this.state.user);
    // var dta =
    // var ids = this.state.users
    //   .filter((d) => d.is_selected == true)
    //   .map((f: any) => f._id);
    // console.log(ids);
    // console.log()
    var dta = {
      name: this.state.groupName,
      organization: this.state.org,
      involved_persons: this.state.users
        .filter((d) => d.is_selected == true)
        .map((f: any) => f._id),
      roomType: 'private',
      createdBy: this.state.user._id,
      img_url: `https://dummyimage.com/35x35/E4FFDE/8DCD7E.jpg&text=${this.state.groupName[0].toUpperCase()}`,
    };

    // console.log(dta);

    createApi
      .createApi()
      .createGroupApi(dta)
      .then((res) => {
        console.log(res);

        if (res.status == 200) {
          this.props.navigation.goBack();
        }
      });
  };

  render() {
    return (
      <View style={{backgroundColor: colors.secondary}}>
        <View style={{backgroundColor: colors.primary}}>
          <ScrollView>
            <Header
              isback={true}
              title={'New Chat'}
              onBackPress={() => this.props.navigation.goBack()}
              profile={this.state.currentUser.img_url}
            />

            <View style={styles.content}>
              <View style={[styles.inputContainer, {marginBottom: wp(5)}]}>
                <TextInput
                  style={styles.authInputs}
                  onChangeText={(e) => {
                    this.setState({groupName: e});
                  }}
                  value={this.state.groupName}
                  placeholder={'Group Name'}
                />
              </View>
              <View style={[styles.line, {marginBottom: wp(5)}]} />
              <Search
                onChange={(e: string) => {
                  console.log(e.length);
                  var usr = this.state.users;
                  this.setState({
                    users:
                      e.length != 0
                        ? this.searchInUsers(e, this.state.users)
                        : usr,
                  });
                }}
                value={'Search'}
                iconName={'search'}
                placeHolder={'Search Users'}
                iconType={'evilicon'}
              />
              <View style={styles.conversationContainer}>
                <Text style={styles.ttleConversation}>Select a Users</Text>
                <View style={styles.line} />
                {this.state.users.map((d: any, i: number) => (
                  <User
                    switch={true}
                    key={i}
                    isSelected={d.is_selected}
                    id={d._id}
                    name={d.name}
                    pendingsms={0}
                    image={d.img_url}
                    isOnline={true}
                    onPress={() => {
                      var d = [...this.state.users];

                      d[i].is_selected = !d[i].is_selected;
                      this.setState({users: d});
                    }}
                  />
                ))}
              </View>
              {/* Create gROUP */}
              <TouchableOpacity
                // this.setState({repeatedSorModal: true})
                onPress={() => this.createGroup()}
                style={[
                  styles.submitsorbtnSb,

                  // {backgroundColor: colors.green},
                ]}>
                <Text style={[styles.submitsorbtnSbtxt]}>Create Group </Text>
              </TouchableOpacity>

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

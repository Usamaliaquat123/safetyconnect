import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Icon, Avatar} from 'react-native-elements';
import {colors, fonts} from '@theme';
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
import Modal from 'react-native-modal';
var CustomIcon: any = Icon;
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
  isGroupModal: Boolean;
  createGroup: Function;
  setisGroupModal: Function;
  users: Array<any>;
}

const ChatGroup = (props: ChatGroupProps) => {
  const [loading, setloading] = useState(false);
  const [users, setusers] = useState([]);
  const [currentUser, setcurrentUser] = useState({});
  const [org, setorg] = useState('');
  const [groupName, setgroupName] = useState('');
  const [roomType, setroomType] = useState('');
  const [searchUser, setsearchUser] = useState('');

  const searchInUsers = (str: string, strArray: Array<any>): Array<Object> => {
    var strArr = [];
    for (var j = 0; j < strArray.length; j++) {
      if (strArray[j].email.toLowerCase().match(str)) {
        strArr.push(strArray[j]);
      }
    }
    return strArr;
  };

  useEffect(() => {
    setusers(users);
    console.log(users);
  }, [users]);

  useEffect(() => {
    console.log('props.users');
    console.log(props.users);
    props.users.map((d) => (d['isSelected'] = false));
    setusers(props.users);
    // AsyncStorage.getItem('email').then((email: any) => {
    //   createApi
    //     .createApi()
    //     .getUser(email)
    //     .then((user: any) => setcurrentUser(user.data.data));
    //   getCurrentOrganization().then((currentOrg: any) => {
    //     setorg(currentOrg);
    //     createApi
    //       .createApi()
    //       .getOrganization(currentOrg)
    //       .then((orgs: any) => {
    //         console.log('orgs.data.data.members');
    //         console.log(orgs.data.data.members);
    //         orgs.data.data.members.map((d: any, i: number) => {
    //           if (d.email != email) {
    //             orgs.data.data.members[i]['is_selected'] = false;
    //             setusers(d);
    //           } else {
    //             setusers(d);
    //           }
    //         });
    //         // console.log(orgs.data.data.members);
    //         // this.setState({users: orgs.data.data.members});
    //       });
    //     // console.log('users');
    //     // console.log(currentOrg.data.members);
    //     // this.setState({users: currentOrg.data.data.members});
    //   });
    // });
  }, []);

  const createGroup = () => {
    // console.log(this.state.users.filter((d) => d.is_selected == true));
    //  currentUser['is_selected'] = true;
    // users.push(this.state.user);
    // console.log(this.state.user);
    // var dta =
    // var ids = this.state.users
    //   .filter((d) => d.is_selected == true)
    //   .map((f: any) => f._id);
    // console.log(ids);
    // console.log()
    // console.log(dta);
  };

  return (
    <Modal
      isVisible={props.isGroupModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={500}
      animationOutTiming={500}
      backdropOpacity={0.25}
      backdropTransitionOutTiming={0}
      useNativeDriver
      avoidKeyboard
      onBackdropPress={props.setisGroupModal}
      style={{
        padding: 0,
        paddingTop: wp(5),
        margin: 0,
      }}>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          width: wp(99),
          bottom: 0,
          top: wp(10),
          //   height: wp(100),
          //   paddingHorizontal: 22,
          paddingTop: wp(5),
          borderTopLeftRadius: wp(6),
          borderTopRightRadius: wp(6),
          backgroundColor: colors.secondary,
        }}>
        <View style={{backgroundColor: colors.secondary}}>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                paddingLeft: wp(4),
                paddingRight: wp(4),
                justifyContent: 'space-between',
              }}>
              <CustomIcon
                onPress={() => props.setisGroupModal()}
                name="cross"
                size={wp(5)}
                type="entypo"
                color={colors.text}
              />
              <Text
                style={{
                  fontSize: wp(3.2),
                  fontFamily: fonts.SfuiDisplayHeavy,
                  color: colors.primary,
                }}>
                New Group
              </Text>
              <TouchableOpacity
                onPress={() => {
                  console.log();

                  if (users.filter((d) => d.isSelected).length != 0) {
                    if (groupName) {
                      props.createGroup(props);
                    }
                  }
                }}>
                <Text
                  style={[
                    {
                      fontSize: wp(3),
                      fontFamily: fonts.SFuiDisplayBold,

                      color: colors.green,
                    },

                    users.filter((d) => d.isSelected).length != 0
                      ? groupName
                        ? {color: colors.green}
                        : {color: colors.textOpa}
                      : {color: colors.textOpa},
                  ]}>
                  Create
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              <View
                style={[
                  styles.inputContainer,
                  {
                    marginBottom: wp(5),
                    marginLeft: wp(5),
                    marginRight: wp(5),
                  },
                ]}>
                <TextInput
                  style={styles.authInputs}
                  onChangeText={(e) => {
                    setgroupName(e);
                  }}
                  placeholderTextColor={colors.textOpa}
                  value={groupName}
                  placeholder={'Type Group Name here'}
                />
              </View>
              <View style={styles.line} />

              <View
                style={[
                  styles.conversationContainer,
                  {marginLeft: wp(5), marginRight: wp(5)},
                ]}>
                <View
                  style={[
                    styles.inputContainer,
                    {marginBottom: wp(5), marginTop: wp(5)},
                  ]}>
                  <CustomIcon
                    // onPress={() => searchInUsers()}
                    name="search"
                    containerStyle={{marginRight: wp(1)}}
                    size={wp(5)}
                    type="feather"
                    color={colors.textOpa}
                  />
                  <TextInput
                    style={styles.authInputs}
                    onChangeText={(e) => {
                      setsearchUser(e);
                    }}
                    placeholderTextColor={colors.textOpa}
                    value={searchUser}
                    placeholder={'Search peoples...'}
                  />
                </View>
                {users?.map((d: any, i: number) => (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        var b: any = [...users];
                        users[i].isSelected = !users[i].isSelected;
                        setusers(b);
                        console.log(b);
                      }}
                      style={{
                        flexDirection: 'row',
                        marginTop: wp(2),
                        marginBottom: wp(2),
                        alignItems: 'center',
                        marginRight: wp(0.5),
                        //   justifyContent: 'space-between',
                      }}>
                      <Avatar
                        size={wp(10)}
                        rounded
                        source={{
                          uri: d.image,
                        }}
                      />

                      <Text
                        style={{
                          fontFamily: fonts.SFuiDisplaySemiBold,
                          fontSize: wp(2.5),
                          marginLeft: wp(3),
                        }}>
                        {d.name}
                      </Text>
                      <View
                        style={[
                          styles.circleSelect,
                          {position: 'absolute', right: 0},
                          d.isSelected == true
                            ? {backgroundColor: colors.green}
                            : {
                                backgroundColor: colors.secondary,
                                borderWidth: 0.3,
                              },
                        ]}>
                        <Text style={styles.textNumber}></Text>
                      </View>
                    </TouchableOpacity>

                    {users.length != i + 1 && <View style={styles.line} />}
                  </>
                ))}
              </View>
              {/* Create gROUP */}

              {/* <View style={styles.line} /> */}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
export default ChatGroup;

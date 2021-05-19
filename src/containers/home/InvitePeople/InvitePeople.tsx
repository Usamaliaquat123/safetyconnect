import * as React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as reduxActions from '../../../store/actions/listSorActions';

import {Icon, Avatar} from 'react-native-elements';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';

import {RouteProp} from '@react-navigation/native';
import {colors, images, GlStyles} from '@theme';
import {animation} from '@theme';
import LottieView from 'lottie-react-native';
import {createApi as api} from '@service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {bindActionCreators} from 'redux';

import {AllSorDTO} from '@dtos';
import {getActiveChildNavigationOptions} from 'react-navigation';
import {searchInSuggestions} from '@utils/utils';
// import {validateEmail} from '@utils/';
type InvitePeopleNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'InvitePeople'
>;
type InvitePeopleRouteProp = RouteProp<StackNavigatorProps, 'InvitePeople'>;

export interface InvitePeopleProps {
  navigation: InvitePeopleNavigationProp;
  route: InvitePeopleRouteProp;
  reduxActions: any;
  reduxState: any;
}

class InvitePeople extends React.Component<InvitePeopleProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      // Error State
      errorModal: false,
      orgError: false,
      org: '',
      orgDetails: '',
      projectLeader: '',
      peoplesText: '',
      peoples: [], // must be array of id's
      projects: [],
      users: [{email: 'inconnent12345@outlook.com', name: 'Usama'}],
      usersTags: [],
    };
  }

  searchUsersAndEmail = async (e: string) => {
    if (e !== '') {
      var tags = searchInSuggestions(e, this.state.users);
      this.setState({usersTags: tags});
    } else {
    }
    this.setState({org: e});
  };
  invitePeople = () => {};
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <View style={styles.header}>
            <View style={styles.headertle}>
              <View>
                <Text style={styles.title}>Create organization</Text>
                <View style={styles.underScrore} />
              </View>
            </View>
          </View> */}
          {/* content */}
          <View style={styles.content}>
            {/* {this.state.loading ? (
              <View>
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: wp(40),
                  }}>
                  <LottieView
                    autoPlay={true}
                    style={{width: wp(90)}}
                    source={animation.loading}
                    loop={true}
                  />
                </View>
              </View>
            ) : ( */}
            <View>
              <Text style={styles.headingContainer}>
                Invite People to Project{' '}
              </Text>
              <Text style={styles.subheading}>
                Safetyconnect will send an email invitation to the invited
                users.
              </Text>
              {/* inputs container */}
              <View style={styles.inputsContainer}>
                {/* Email Container */}
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.emailTextContainer}>
                      Write Email Address:
                    </Text>
                  </View>
                  <View style={[styles.inputContainer]}>
                    <TextInput
                      value={this.state.org}
                      multiline={true}
                      style={styles.authInputs}
                      onChangeText={(e) => this.searchUsersAndEmail(e)}
                      placeholder={'Enter Name'}
                    />
                  </View>
                  {this.state.orgError && (
                    <Text style={{fontSize: wp(3), color: colors.error}}>
                      Type username or invite by email
                    </Text>
                  )}
                </View>

                {/* Suggestions of invited users */}
                {this.state.usersTags.length != 0 ? (
                  <View>
                    <View style={styles.involveSuggestCont}>
                      {this.state.usersTags.map((d: any, i: number) => (
                        <TouchableOpacity
                          key={i}
                          onPress={() => {
                            this.setState({org: '', usersTags: []});
                            if (
                              this.state.exclateToTags.filter(
                                (v: any) => v == d,
                              ).length == 0
                            ) {
                              this.state.exclateToTags.push(d);
                            } else {
                              return null;
                            }
                          }}
                          style={[
                            styles.involvePsuggCont,
                            this.state.usersTags.length == i + 1
                              ? {borderBottomWidth: wp(0)}
                              : null,
                          ]}>
                          <Avatar
                            containerStyle={{marginRight: wp(3)}}
                            rounded
                            source={{
                              uri: d.img_url,
                            }}
                          />
                          <View>
                            <Text style={styles.involvePSt}>{d.name}</Text>
                            <Text style={{fontSize: wp(2), opacity: .5}}>{d.email}</Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ) : null}

                {/* People */}
                <View>
                  <View style={{flexDirection: 'row', marginTop: wp(3)}}>
                    <Text style={styles.emailTextContainer}>
                      Choose starting Project
                    </Text>
                    <Icon
                      containerStyle={{marginTop: wp(1), marginLeft: wp(2)}}
                      name={'info'}
                      type={'feather'}
                      size={wp(3)}
                      iconStyle={{opacity: 0.5}}
                    />
                  </View>
                  <View style={[styles.inputContainer]}>
                    <TextInput
                      value={this.state.peoplesText}
                      style={{
                        fontSize: wp(3),
                        width: wp(80),
                      }}
                      onChangeText={(e) => this.setState({peoplesText: e})}
                      placeholder={'Enter name'}
                    />
                  </View>
                  {this.state.orgError && (
                    <Text style={{fontSize: wp(3), color: colors.error}}>
                      Add people to the organization
                    </Text>
                  )}
                  <View
                    style={{
                      marginTop: wp(3),
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name={'plus'}
                      type={'antdesign'}
                      size={wp(4)}
                      color={colors.primary}
                    />
                    <Text style={styles.inviteppleText}>Add Project</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => this.invitePeople()}
                style={styles.siginBtnContainer}>
                <Text style={styles.signinText}>Create Organization</Text>
              </TouchableOpacity>
            </View>
            {/* )} */}
          </View>
        </ScrollView>
        {/* validations error */}
        {/* Modal Container */}
        <Modal
          isVisible={this.state.errorModal}
          onBackdropPress={() =>
            this.setState({errorModal: false, loading: false})
          }>
          {this.state.loading == true && (
            <View>
              <ActivityIndicator color={colors.primary} size={'large'} />
            </View>
          )}
        </Modal>
      </View>
    );
  }
}

// const mapStateToProps = (state: any) => {
//   return {};
// };

// const mapDispatchToProps = (dispatch: any) => {
//   return {};
// };

const mapStateToProps = (state: AllSorDTO) => ({
  reduxState: state.allSors,
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvitePeople);

import * as React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as reduxActions from '@actions';

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
import {
  searchInSuggestions,
  validateEmail,
  getCurrentProject,
  getCurrentOrganization,
} from '@utils';
import {Tags} from '@components';
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
      orgOrProj: '',
      loading: false,
      // Error State
      errorModal: false,
      orgError: false,
      org: '',
      orgDetails: '',
      projectLeader: '',

      peoples: [], // must be array of id's
      // projects: [],
      matchedEmailSuggestions: '',
      users: [],
      usersTags: [],
      usersSuggestions: [],
      projectsSugg: [],
      projects: [],

      errHeading: '',
      errDesc: '',

      projectText: '',
      noOrg: false,
    };
  }
  componentDidMount() {
    // get all projects

    getCurrentOrganization().then((orgId: any) => {
      api
        .createApi()
        .getOrganization(orgId)
        .then((data: any) => {
          getCurrentProject().then((res) =>
            this.setState({
              projectText: data.data.data.projects.filter(
                (d) => d.project_id._id == res,
              )[0].project_id.project_name,
              // noOrg: false,
              users: data.data.data.members,
            }),
          ),
            // );

            AsyncStorage.getItem('email').then((email: any) => {
              this.setState({
                currentOrg: orgId,
                organizationName: data.data.data.name,
                user: email,
                projects: data.data.data.projects,
              });
            });
        });
    });
  }

  searchUsersAndEmail = async (e: string) => {
    if (e !== '') {
      var tags = searchInSuggestions(e.toLowerCase(), this.state.users);

      if (tags.length == 0) {
        if (validateEmail(e)) {
          this.setState({matchedEmailSuggestions: e});
        }
      }
      this.setState({usersSuggestions: tags});
    } else {
      this.setState({usersSuggestions: []});
    }
    this.setState({org: e});
  };

  chnageProjectName = async (e: string) => {
    if (e !== '') {
      var matchedsugg = [];
      for (let i = 0; i < this.state.projects.length; i++) {
        if (
          this.state.projects[i].project_id.project_name
            .toLowerCase()
            .match(e.toLowerCase())
        ) {
          matchedsugg.push(this.state.projects[i]);
        }
      }
    }

    if (matchedsugg != undefined) {
      this.setState({projectsSugg: matchedsugg});
    }
    this.setState({projectText: e});
  };
  invitePeople = () => {
    var data = {
      emails: this.state.usersTags.map((user: any) => user.email),
      organization: this.state.currentOrg,
      project: this.state.projects.filter(
        (p: any) => p.project_id.project_name == this.state.projectText,
      )[0].project_id._id,
      invitedBy: this.state.user,
      organizationName: this.state.organizationName,
      projectName: this.state.projectText,
    };

    this.props.reduxActions.inviteUser(data, this.props.navigation);

    // api
    //   .createApi()
    //   .inviteBulk(data)
    //   .then((res) => {
    //     if (res.data == 'invited') {
    //       this.props.navigation.goBack();
    //     }
    //   });
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* content */}
          <View style={styles.content}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.headingContainer}>
                  Invite People to Project{' '}
                </Text>
                <Icon
                  onPress={() => this.props.navigation.goBack()}
                  containerStyle={{marginLeft: wp(2)}}
                  name={'cross'}
                  type={'entypo'}
                  size={wp(4.6)}
                  iconStyle={{opacity: 0.5}}
                />
              </View>
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
                    {this.state.usersTags.length != 0 && (
                      <Tags
                        style={{height: wp(10)}}
                        tags={this.state.usersTags}
                        onClose={(d: any) =>
                          this.setState({
                            usersTags: this.state.usersTags.filter(
                              (v: any) => v !== d,
                            ),
                          })
                        }
                      />
                    )}
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
                {this.state.usersSuggestions.length != 0 ? (
                  <View>
                    <View style={styles.involveSuggestCont}>
                      {this.state.usersSuggestions.map((d: any, i: number) => (
                        <TouchableOpacity
                          key={i}
                          onPress={() => {
                            this.setState({org: '', usersSuggestions: []});
                            if (
                              this.state.usersTags.filter((v: any) => v == d)
                                .length == 0
                            ) {
                              this.state.usersTags.push(d);
                            } else {
                              return null;
                            }
                          }}
                          style={[
                            styles.involvePsuggCont,
                            this.state.usersSuggestions.length == i + 1
                              ? {borderBottomWidth: wp(0)}
                              : null,
                          ]}>
                          <View>
                            <Text style={styles.involvePSt}>{d.name}</Text>
                            <Text style={{fontSize: wp(2), opacity: 0.5}}>
                              {d.email}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ) : (
                  <>
                    {this.state.matchedEmailSuggestions === '' ? null : (
                      <View style={styles.involveSuggestCont}>
                        <TouchableOpacity
                          onPress={() => {
                            this.state.usersTags.push({
                              email: this.state.org,
                              name: this.state.org,
                            });
                            this.setState({
                              org: '',
                              matchedEmailSuggestions: '',
                            });
                          }}
                          style={[
                            styles.involvePsuggCont,
                            {borderBottomWidth: 0},
                          ]}>
                          <Icon
                            name={'pluscircle'}
                            type={'antdesign'}
                            size={wp(5)}
                            containerStyle={{opacity: 0.5}}
                          />
                          <View style={{alignItems: 'center'}}>
                            <Text
                              style={{
                                opacity: 0.5,
                                fontSize: wp(3),
                                marginLeft: wp(4),
                              }}>
                              Invite {this.state.org}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                  </>
                )}

                {/* Project */}
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
                      onFocus={() =>
                        this.setState({projectsSugg: this.state.projects})
                      }
                      // editable={this.state.noOrg}
                      value={
                        this.state.noOrg == false
                          ? this.state.projectText
                          : "You don't have any organizations yet"
                      }
                      style={{
                        fontSize: wp(3),
                        width: wp(80),
                      }}
                      onChangeText={(e) => this.chnageProjectName(e)}
                      placeholder={'Enter name'}
                    />
                  </View>
                  {this.state.orgError && (
                    <Text style={{fontSize: wp(3), color: colors.error}}>
                      Add people to the organization
                    </Text>
                  )}

                  {/* Suggestions of invited users */}
                  {this.state.projectsSugg.length != 0 ? (
                    <View>
                      <View style={styles.involveSuggestCont}>
                        {this.state.projectsSugg.map((d: any, i: number) => (
                          <TouchableOpacity
                            key={i}
                            onPress={() => {
                              this.setState({
                                projectText: d.project_id.project_name,
                                projectsSugg: [],
                              });
                            }}
                            style={[
                              styles.involvePsuggCont,
                              this.state.projectsSugg.length == i + 1
                                ? {borderBottomWidth: wp(0)}
                                : null,
                            ]}>
                            <Icon
                              name={'stats-chart'}
                              type={'ionicon'}
                              iconStyle={{opacity: 0.5}}
                              size={wp(3)}
                              containerStyle={{marginRight: wp(3)}}
                            />
                            <View style={{alignItems: 'center'}}>
                              <Text
                                style={[
                                  styles.involvePSt,
                                  {fontSize: wp(3), opacity: 0.5},
                                ]}>
                                {d.project_id.project_name}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>

              <TouchableOpacity
                onPress={() => this.invitePeople()}
                style={styles.siginBtnContainer}>
                <Text style={styles.signinText}>Send Invite</Text>
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
          {this.state.loading == true ? (
            <View>
              <LottieView
                autoPlay={true}
                style={{width: wp(90)}}
                source={animation.loading}
                loop={true}
              />
            </View>
          ) : (
            <View style={styles.modelContainer}>
              <View>
                <Text style={styles.errHeadPop}>{this.state.errHeading}</Text>
                <Text style={styles.errEmailPassDesc}>
                  {this.state.errDesc}
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('CreateOrg')}>
                  <Text style={styles.plzTryAgain}>
                    Create your organization
                  </Text>
                </TouchableOpacity>
              </View>
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

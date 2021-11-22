import React, {useState, useEffect} from 'react';
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
import {FLIPPED_ALIAS_KEYS} from '@babel/types';
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

const InvitePeople = (props: InvitePeopleProps) => {
  const [loading, setLoading] = useState(false);
  const [orgOrProj, setorgOrProj] = useState('');

  const [errorModal, seterrorModal] = useState(false);
  const [orgError, setorgError] = useState(false);
  const [org, setorg] = useState('');
  const [orgDetails, setorgDetails] = useState('');
  const [projectLeader, setprojectLeader] = useState('');
  const [peoples, setpeoples] = useState([]);
  const [matchedEmailSuggestions, setmatchedEmailSuggestions] = useState('');
  const [users, setusers] = useState([]);
  const [usersTags, setusersTags] = useState([]);
  const [usersSuggestions, setusersSuggestions] = useState([]);
  const [projectsSugg, setprojectsSugg] = useState([]);
  const [projects, setprojects] = useState([]);

  const [errHeading, seterrHeading] = useState('');
  const [errDesc, seterrDesc] = useState('');
  const [projectText, setprojectText] = useState('');
  const [organizationName, setorganizationName] = useState('');
  const [user, setuser] = useState({});
  const [currentOrg, setcurrentOrg] = useState('');

  const [inviteSended, setinviteSended] = useState(false);
  const [noOrg, setnoOrg] = useState(false);

  useEffect(() => {
    getCurrentOrganization().then((orgId: any) => {
      api
        .createApi()
        .getOrganization(orgId)
        .then((data: any) => {
          getCurrentProject().then((res) => {
            setprojectText(
              data.data.data.projects.filter(
                (d: any) => d.project_id._id == res,
              )[0].project_id.project_name,
            );
            setusers(data.data.data.members);
          });
          // );

          AsyncStorage.getItem('email').then((email: any) => {
            setcurrentOrg(orgId);
            setorganizationName(data.data.data.name);
            setuser(email);
            setprojects(data.data.data.projects);
          });
        });
    });
  }, []);
  // Search Users and Email
  const searchUsersAndEmail = async (e: string) => {
    if (e !== '') {
      var tags: any = searchInSuggestions(e.toLowerCase(), users);

      if (tags.length == 0) {
        if (validateEmail(e)) {
          setmatchedEmailSuggestions(e);
        }
      }
      setusersSuggestions(tags);
    } else {
      setusersSuggestions([]);
    }
    setorg(e);
  };

  // change project name
  const chnageProjectName = async (e: any) => {
    if (e !== '') {
      var matchedsugg: any = [];
      for (let i = 0; i < projects.length; i++) {
        if (
          projects[i].project_id.project_name
            .toLowerCase()
            .match(e.toLowerCase())
        ) {
          matchedsugg.push(projects[i]);
        }
      }
    }

    if (matchedsugg != undefined) {
      setprojectsSugg(matchedsugg);
    }
    setprojectText(e);
  };

  // invite peoples
  const invitePeople = () => {
    if (usersTags.map((user: any) => user.email).length != 0) {
      var data = {
        emails: usersTags.map((user: any) => user.email),
        organization: currentOrg,
        project: projects.filter(
          (p: any) => p.project_id.project_name == projectText,
        )[0].project_id._id,
        invitedBy: user,
        organizationName: organizationName,
        projectName: projectText,
      };

      console.log('invited');
      console.log(data);
      setinviteSended(true);
      setTimeout(() => {
        props.reduxActions.inviteUser(data, props.navigation);
        setinviteSended(false);
      }, 2000);
    }
  };

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
                onPress={() => props.navigation.goBack()}
                containerStyle={{marginLeft: wp(2)}}
                name={'cross'}
                type={'entypo'}
                size={wp(4.6)}
                iconStyle={{opacity: 0.5}}
              />
            </View>
            <Text style={styles.subheading}>
              Safetyconnect will send an email invitation to the invited users.
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
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {usersTags.length != 0 && (
                      <Tags
                        style={{height: wp(10)}}
                        tags={usersTags}
                        onClose={(d: any) =>
                          setusersTags(usersTags.filter((v: any) => v !== d))
                        }
                      />
                    )}
                  </View>
                  <TextInput
                    value={org}
                    multiline={true}
                    style={[styles.authInputs]}
                    onChangeText={(e) => searchUsersAndEmail(e)}
                    placeholder={'Enter your email'}
                  />
                </View>
                {orgError && (
                  <Text style={{fontSize: wp(3), color: colors.error}}>
                    Type username or invite by email
                  </Text>
                )}
              </View>

              {/* Suggestions of invited users */}
              {usersSuggestions.length != 0 ? (
                <View>
                  <View style={styles.involveSuggestCont}>
                    {usersSuggestions.map((d: any, i: number) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => {
                          setorg('');
                          setusersSuggestions([]);
                          if (
                            usersTags.filter((v: any) => v == d).length == 0
                          ) {
                            usersTags.push(d);
                          } else {
                            return null;
                          }
                        }}
                        style={[
                          styles.involvePsuggCont,
                          usersSuggestions.length == i + 1
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
                  {matchedEmailSuggestions === '' ? null : (
                    <View style={styles.involveSuggestCont}>
                      <TouchableOpacity
                        onPress={() => {
                          usersTags.push({
                            email: org,
                            name: org,
                          });

                          setorg('');
                          setmatchedEmailSuggestions('');
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
                            Invite {org}
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
                    onFocus={() => setprojectsSugg(projects)}
                    // editable={this.state.noOrg}
                    value={
                      noOrg == false
                        ? projectText
                        : "You don't have any organizations yet"
                    }
                    style={{
                      fontSize: wp(3),
                      width: wp(80),
                    }}
                    onChangeText={(e) => chnageProjectName(e)}
                    placeholder={'Enter name'}
                  />

                  <Icon
                    containerStyle={{
                      position: 'absolute',
                      right: wp(5),
                      top: wp(5),
                    }}
                    name={'down'}
                    type={'antdesign'}
                    size={wp(3)}
                    iconStyle={{opacity: 0.5}}
                  />
                </View>
                {orgError && (
                  <Text style={{fontSize: wp(3), color: colors.error}}>
                    Add people to the organization
                  </Text>
                )}

                {/* Suggestions of invited users */}
                {projectsSugg.length != 0 ? (
                  <View>
                    <View style={styles.involveSuggestCont}>
                      {projectsSugg.map((d: any, i: number) => (
                        <TouchableOpacity
                          key={i}
                          onPress={() => {
                            setprojectText(d.project_id.project_name);
                            setprojectsSugg([]);
                          }}
                          style={[
                            styles.involvePsuggCont,
                            projectsSugg.length == i + 1
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
              onPress={() => invitePeople()}
              style={styles.siginBtnContainer}>
              <Text style={styles.signinText}>Send Invite</Text>
            </TouchableOpacity>
          </View>
          {/* )} */}
        </View>
      </ScrollView>
      <Modal
        isVisible={inviteSended}
        onBackdropPress={() => setinviteSended(false)}>
        <View style={styles.modelContainer}>
          <View>
            <Text style={[styles.errHeadPop, {color: colors.green}]}>
              Invite Sent
            </Text>
            <Text style={styles.errEmailPassDesc}>
              Email invite has been sended on your given project
            </Text>
          </View>
        </View>
      </Modal>
      {/* validations error */}
      {/* Modal Container */}
      <Modal
        isVisible={errorModal}
        onBackdropPress={() => {
          seterrorModal(false);
          setLoading(false);
        }}>
        {loading == true ? (
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
              <Text style={styles.errHeadPop}>{errHeading}</Text>
              <Text style={styles.errEmailPassDesc}>{errDesc}</Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('CreateOrg')}>
                <Text style={styles.plzTryAgain}>Create your organization</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};

const mapStateToProps = (state: AllSorDTO) => ({
  reduxState: state.allSors,
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvitePeople);

import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Avatar} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {bindActionCreators} from 'redux';

import {colors, fonts} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {Tags, SuggestionsAvatar, User} from '@components';
import {RouteProp, CommonActions} from '@react-navigation/native';
import styles from './styles';
import {createApi as api} from '@service';
import {animation} from '@theme';
import LottieView from 'lottie-react-native';
import * as reduxActions from '@actions';
import {copilot, walkthroughable, CopilotStep} from 'react-native-copilot';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {default as Model} from 'react-native-modal';

import {
  validateEmail,
  getCurrentProject,
  getCurrentOrganization,
  searchInSuggestions,
  savedCurrentProjectAndOrganizations,
  suggestInActionsRecommendations,
} from '@utils';
import {loadingSceneName} from 'aws-amplify';
import {DEFAULT_HEADERS} from 'apisauce';
import {involved_persons} from '@typings';
const WalkthroughableText = walkthroughable(Text);
const WalkthroughableTouchableOpacity = walkthroughable(TouchableOpacity);
const WalkthroughableView = walkthroughable(View);
const WalkthroughableInput = walkthroughable(TextInput);
type CreateProjectNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'createProject'
>;
type CreateProjectRouteProp = RouteProp<StackNavigatorProps, 'createProject'>;

export interface CreateProjectProps {
  navigation: CreateProjectNavigationProp;
  route: CreateProjectRouteProp;
  reduxActions: any;
  reduxState: any;
}

const CreateProject = (props: CreateProjectProps) => {
  const [teamMembers, setteamMembers] = useState([]);
  const [teamMembersText, setteamMembersText] = useState('');
  const [assignSuppervisor, setassignSuppervisor] = useState([]);
  const [assignSuppervisorText, setassignSuppervisorText] = useState([]);
  const [allAssignSuppervisorText, setallAssignSuppervisorText] = useState([]);
  const [assignLeaderss, setassignLeaderss] = useState([]);
  const [assignLeaderssText, setassignLeaderssText] = useState([]);
  const [allAssignLeaders, setallAssignLeaders] = useState([]);
  const [assignLeaderssT, setassignLeaderssT] = useState('');
  const [assignSuppervisorT, setassignSuppervisorT] = useState('');
  const [assignLocations, setassignLocations] = useState([]);
  const [assignLocationsText, setassignLocationsText] = useState('');
  const [projectName, setprojectName] = useState('');
  const [loading, setloading] = useState(false);
  const [projects, setprojects] = useState([]);
  // Errors popup
  const [errorProjectName, seterrorProjectName] = useState(false);
  const [locations, setlocations] = useState([]);
  const [errorTeamMem, seterrorTeamMem] = useState(false);
  const [projectDescription, setprojectDescription] = useState('');
  // suggestions
  const [locationSugg, setlocationSugg] = useState([]);
  const [involvedPersons, setinvolvedPersons] = useState([]);
  const [createModal, setcreateModal] = useState(false);
  // location
  const [locationName, setlocationName] = useState('');
  const [locationNameErr, setlocationNameErr] = useState(false);
  const [locationSupervisor, setlocationSupervisor] = useState('');
  const [locationSupervisorErr, setlocationSupervisorErr] = useState(false);
  const [additionalSuppervisors, setadditionalSuppervisors] = useState('');
  const [errorLocationName, seterrorLocationName] = useState(false);
  // Location : suggestion
  const [locationSuppervisorsTags, setlocationSuppervisorsTags] = useState([]);
  const [locationSuppervisorsSugg, setlocationSuppervisorsSugg] = useState([]);
  const [user, setuser] = useState('');
  const [organizationId, setorganizationId] = useState('');
  const [orgName, setorgName] = useState('');
  const [additionalSuppervisorsSugg, setadditionalSuppervisorsSugg] = useState(
    [],
  );
  const [additionalSuppervisorsTags, setadditionalSuppervisorsTags] = useState(
    [],
  );
  const filterContries = (contries: string) => {
    setassignLocationsText(contries);
  };

  // Add Location
  const addLocation = async () => {
    if (locationName !== '') {
      // var loca = JSON.parse(location);
      // this.state.locations.push();
      setcreateModal(false);
      setlocationName('');
      setlocationSuppervisorsTags([]);
      setadditionalSuppervisorsTags([]);
      setadditionalSuppervisorsSugg([]);
      setlocationSuppervisorsSugg([]);

      if (props.route.params?.users != undefined) {
        var supervisor = locationSuppervisorsTags.filter(
          (d) => props.route.params.users.filter((f: any) => d.email != f)[0],
        );
        var additional_supervisor = additionalSuppervisorsTags.filter(
          (d) => props.route.params.users.filter((f: any) => d.email != f)[0],
        );
        assignLocations.push({
          name: locationName,
          supervisor: supervisor.map((d: any) => d._id)[0],
          additional_supervisor: additional_supervisor.map(
            (d: any) => d._id,
          )[0],
        });
      } else {
        assignLocations.push({
          name: locationName,
          supervisor: locationSuppervisorsTags.map((d: any) => d._id)[0],
          additional_supervisor: additionalSuppervisorsTags.map(
            (d: any) => d._id,
          )[0],
        });
      }

      // await AsyncStorage.setItem('locations', this.state.locationName);
      // this.props.navigation.goBack();
    } else {
      setlocationNameErr(false);
    }
  };
  // Create Project
  const createProject = async () => {
    if (projectName !== '') {
      seterrorProjectName(false);
      if (assignLocations.length > 0) {
        // if (this.state.assignLeaderss.length != 0) {
        // if (this.state.assignSuppervisor.length != 0) {

        // this.setState({loading: true});
        await AsyncStorage.getItem('email')
          .then((email: any) => {
            seterrorTeamMem(false);
            // this.props.route.params.suggestedUsers?.map((d  :any) => )

            var members = [];

            if (assignSuppervisor.length != 0) {
              members = assignLeaderss.concat(assignSuppervisor);
            } else {
              members = assignLeaderss;
            }

            for (var i = 0; i < members.length; i++) {
              var obj = members[i];

              if (members.indexOf(obj._id) !== -1) {
                members.splice(i, 1);
              }
            }

            // console.log('members');
            // // console.log(members);
            // var dta = [
            //   ...new Set(members.map((item) => JSON.stringify(item))),
            // ];

            const d = [
              ...new Set(members.map((itm) => JSON.stringify(itm))),
            ].map((i) => JSON.parse(i));

            // d.map((item) => {
            //   if(item.email == this.state.user){
            //     return
            //   }
            // })

            // if( gol.map((j) => j._id == this.state))

            var gol = d.filter((d) => d.email != user);
            // if (this.props.route.params?.users != undefined) {
            // var bulkData = {
            //   emails: gol.map((d) => d.email),
            //   organization: this.state.organizationId,
            //   invitedBy: this.state.user,
            //   organizationName: this.state.orgName,
            //   projectName: this.state.projectName,
            // };

            // // console.log(data);

            // api
            //   .createApi()
            //   .inviteBulk(bulkData)
            //   .then((res) => {
            //     // console.log(res);
            //   });
            // }
            var involvedPersons: Array<any> = [];
            if (props.route.params?.users != undefined) {
              involvedPersons = gol.filter(
                (d) =>
                  props.route.params.users.filter((f: any) => d.email != f)[0],
              );
            } else {
              involvedPersons = gol;
            }

            var data = {
              created_by: email,
              sors: [],
              project_name: projectName,
              // involved_persons: members.map((d: any) => d._id),
              locations: assignLocations.map((d) => d.name),
              project_leader: assignLeaderss.map((d) => d.email),
              secondary_leader: assignSuppervisor.map((d) => d.email),
              involved_persons: involvedPersons.map((j) => j._id),
              description: projectDescription,
              p_locations: assignLocations,
              organization: organizationId,
            };

            setloading(false);

            console.log(gol);

            console.log(data);
            console.log(organizationId);
            console.log(gol.map((d) => d.email));

            if (props.route.params?.users != undefined) {
              props.reduxActions.createProject(
                data,
                organizationId,
                props.navigation,
                gol.map((d) => d.email),
                orgName,
                true,
              );
            } else {
              props.reduxActions.createProject(
                data,
                organizationId,
                props.navigation,
                gol.map((d) => d.email),
                orgName,
                false,
              );
            }
          })
          .catch((err) => {});
        // } else {
        //   this.setState({loading: false});
        //   this.setState({errorTeamMem: true});
        // }
      } else {
        setloading(false);
        seterrorLocationName(true);
      }
    } else {
      setloading(false);
      seterrorProjectName(true);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('email').then((email: any) => {
      setuser(email);
    });

    getCurrentOrganization().then((orgid: any) => {
      setorganizationId(orgid);

      api
        .createApi()
        .getOrganization(orgid)
        .then((org: any) => {
          setorgName(org.data.data.name);

          if (props.route.params?.users != undefined) {
            var dta: any = [];
            props.route.params.users.map((d: any) => {
              dta.push({
                img_url:
                  'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
                _id: '60ba3fd6172e5471c3a93cf1',
                name: d.split('@')[0],
                email: d,
              });
            });

            setallAssignSuppervisorText(dta);
            setallAssignLeaders(dta);
          } else {
            setallAssignSuppervisorText(org.data.data.members);
            setallAssignLeaders(org.data.data.members);
          }
        })
        .catch((err: any) => {});
      // this.props.reduxActions.getOrganization(orgid).then((res: any) => {});
    });
    return () => {
      setallAssignSuppervisorText([]);
      setallAssignLeaders([]);
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* content */}
        <View style={[styles.content]}>
          {props.reduxState.loading == true ? (
            <View
              style={{
                alignSelf: 'center',
                marginTop: wp(4),
                marginBottom: wp(40),
              }}>
              <LottieView
                autoPlay={true}
                style={{width: wp(90)}}
                source={animation.loading}
                loop={true}
              />
            </View>
          ) : (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.headingContainer}>Add New Project</Text>
                <Icon
                  onPress={() => props.navigation.goBack()}
                  containerStyle={{marginLeft: wp(2)}}
                  name={'cross'}
                  type={'entypo'}
                  size={wp(4.6)}
                  iconStyle={{opacity: 0.5}}
                />
              </View>
              {/* inputs container */}

              <View style={styles.inputsContainer}>
                <CopilotStep text="Your project name" order={1} name="openApp">
                  {/* Email Container */}
                  <WalkthroughableView>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.emailTextContainer}>
                        Project Name
                      </Text>
                      <Text
                        style={[
                          styles.emailTextContainer,
                          {opacity: 0.5, marginLeft: wp(1), marginTop: wp(2)},
                        ]}>
                        (Mandatory)
                      </Text>
                    </View>

                    <View style={[styles.inputContainer]}>
                      <TextInput
                        style={styles.authInputs}
                        value={projectName}
                        onChangeText={(e) => {
                          setprojectName(e);
                        }}
                        placeholder={'Enter Project Name'}
                      />
                    </View>
                  </WalkthroughableView>
                </CopilotStep>

                {errorProjectName && (
                  <Text style={{fontSize: wp(3), color: colors.error}}>
                    Enter your project name{' '}
                  </Text>
                )}
                {/* Descriptions */}
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: wp(2),
                    }}>
                    <Text style={[styles.emailTextContainer]}>
                      {' '}
                      Project Description
                    </Text>
                    <Icon
                      name={'info'}
                      type={'feather'}
                      size={wp(3.5)}
                      color={colors.textOpa}
                    />
                  </View>
                  <View>
                    <View style={[styles.inputContainer]}>
                      <TextInput
                        placeholder={'Enter project description here'}
                        style={styles.authInputs}
                        value={projectDescription}
                        onChangeText={(e) => setprojectDescription(e)}
                      />
                    </View>
                  </View>
                </View>

                {/* Assign Locations */}

                {/* Locations */}
                <CopilotStep
                  text="Your project name"
                  order={2}
                  name="locationCop">
                  <WalkthroughableView>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={[styles.emailTextContainer, {marginTop: wp(2)}]}>
                        {' '}
                        Locations
                      </Text>
                      <Text
                        style={[
                          styles.emailTextContainer,
                          {opacity: 0.5, marginLeft: wp(1), marginTop: wp(2)},
                        ]}>
                        (Mandatory)
                      </Text>
                    </View>

                    {errorLocationName && (
                      <Text style={{fontSize: wp(3), color: colors.error}}>
                        * Add your location
                      </Text>
                    )}
                    <View
                      style={{
                        flexWrap: 'wrap',
                        alignContent: 'center',
                        flexDirection: 'row',
                        marginTop: wp(2),
                      }}>
                      <Tags
                        type={'location'}
                        onClose={(d: any) => {
                          setassignLocations(
                            assignLocations.filter((v: any) => v !== d),
                          );
                        }}
                        tags={assignLocations}
                      />
                    </View>

                    {/* add new location */}
                    {assignLocations.length < 3 && (
                      <TouchableOpacity
                        onPress={() => setcreateModal(true)}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Icon
                          containerStyle={{marginRight: wp(3)}}
                          name={'plus'}
                          type={'antdesign'}
                          size={wp(4)}
                          color={colors.primary}
                        />
                        <Text
                          style={{
                            fontSize: wp(3.4),
                            color: colors.primary,
                            fontFamily: fonts.SFuiDisplayMedium,
                          }}>
                          Add New Location
                        </Text>
                      </TouchableOpacity>
                    )}
                  </WalkthroughableView>
                </CopilotStep>

                {/* Asssign Leaders */}
                <CopilotStep
                  text="Add the invited project leaders"
                  order={3}
                  name="projectLeadersCop">
                  <WalkthroughableView>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: wp(3),
                      }}>
                      <Text style={[styles.emailTextContainer]}>
                        {' '}
                        Project Leaders
                      </Text>
                      <Icon
                        name={'info'}
                        type={'feather'}
                        size={wp(3.5)}
                        color={colors.textOpa}
                      />
                    </View>
                    {assignLeaderss.length < 1 ? (
                      <View style={[styles.inputContainer]}>
                        <TextInput
                          onFocus={() => {
                            setassignLeaderssText(
                              searchInSuggestions('', allAssignLeaders),
                            );
                          }}
                          placeholder={'Add Leaders that you already invited'}
                          style={styles.authInputs}
                          value={assignLeaderssT}
                          onChangeText={(e) => {
                            if (e !== '') {
                              var arr: any = searchInSuggestions(
                                e.toLowerCase(),
                                allAssignLeaders,
                              );

                              setassignLeaderssText(arr);
                              setassignLeaderssT(e);
                            } else {
                              setassignLeaderssText([]);
                              setassignLeaderssT(e);
                            }
                          }}
                        />
                      </View>
                    ) : null}
                  </WalkthroughableView>
                </CopilotStep>

                {/* Suggestions of projectEmail  */}
                {assignLeaderssText.length != 0 ? (
                  <View style={styles.involveSuggestCont}>
                    {assignLeaderssText.map((d: any, i: number) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => {
                          setassignLeaderssT('');
                          setassignLeaderssText([]);

                          assignLeaderss.push(d);
                        }}
                        style={[
                          styles.involvePsuggCont,
                          assignLeaderssText.length == i + 1
                            ? {borderBottomWidth: wp(0)}
                            : null,
                        ]}>
                        <Text style={styles.involvePSt}>{d.email}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : null}
                {/* Tags or project leaders */}
                <View
                  style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    marginTop: wp(2),
                  }}>
                  <Tags
                    type={'addTeamMem'}
                    onClose={(d: any) => {
                      setassignLeaderss(
                        assignLeaderss.filter((v: any) => v !== d),
                      );
                    }}
                    tags={assignLeaderss}
                  />
                </View>

                {/* Asssign Supervisor */}
                <CopilotStep
                  text="Add the invited secondary project leaders"
                  order={4}
                  name="SecprojectLeadersCop">
                  <WalkthroughableView>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text style={[styles.emailTextContainer]}>
                          {' '}
                          Secondary Project leaders
                        </Text>
                        <Icon
                          name={'info'}
                          type={'feather'}
                          size={wp(3.5)}
                          color={colors.textOpa}
                        />
                      </View>
                      {allAssignLeaders.length < 15 ? (
                        <View style={[styles.inputContainer]}>
                          <TextInput
                            style={styles.authInputs}
                            placeholder={'Enter name'}
                            onFocus={() => {
                              setassignSuppervisorText(
                                searchInSuggestions(
                                  '',
                                  allAssignSuppervisorText,
                                ),
                              );
                            }}
                            value={assignSuppervisorT}
                            onChangeText={(e) => {
                              if (e !== '') {
                                setassignSuppervisorText(
                                  searchInSuggestions(
                                    e.toLowerCase(),
                                    allAssignSuppervisorText,
                                  ),
                                );
                                setassignSuppervisorT(e);
                              } else {
                                setassignSuppervisorText([]);
                                setassignSuppervisorT(e);
                              }
                            }}
                          />
                        </View>
                      ) : null}

                      {/* {this.state.assignSuppervisorText != '' ? (
                    <SuggestionsAvatar
                      onSelect={(d: string) => {
                        this.state.assignSuppervisor.push(d);
                        this.setState({
                          assignSuppervisorText: '',
                        });
                      }}
                      text={this.state.assignSuppervisorText}
                    />
                  ) : null} */}

                      {/* Suggestions of emails  */}
                      {assignSuppervisorText.length != 0 ? (
                        <View style={styles.involveSuggestCont}>
                          {assignSuppervisorText.map((d: any, i: number) => (
                            <TouchableOpacity
                              key={i}
                              onPress={() => {
                                setassignSuppervisorT('');
                                setassignSuppervisorText(
                                  assignSuppervisorText.filter(
                                    (b: any) => b != d,
                                  ),
                                );
                                setassignSuppervisor;

                                assignSuppervisor.push(d);
                              }}
                              style={[
                                styles.involvePsuggCont,
                                assignSuppervisorText.length == i + 1
                                  ? {borderBottomWidth: wp(0)}
                                  : null,
                              ]}>
                              <Text style={styles.involvePSt}>{d.email}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      ) : null}

                      <View
                        style={{
                          flexWrap: 'wrap',
                          flexDirection: 'row',
                          marginTop: wp(2),
                        }}>
                        <Tags
                          type={'addTeamMem'}
                          onClose={(d: any) => {
                            setassignSuppervisor(
                              assignSuppervisor.filter((v: any) => v !== d),
                            );
                          }}
                          tags={assignSuppervisor}
                        />
                      </View>
                    </View>
                  </WalkthroughableView>
                </CopilotStep>
              </View>

              {/* Invite people */}

              {/* 

              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('InvitePeople', {
                    data: 'organization',
                  })
                }
                style={{
                  marginTop: wp(3),
                  flexDirection: 'row',
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  containerStyle={{marginRight: wp(1)}}
                  name={'plus'}
                  type={'antdesign'}
                  color={colors.primary}
                  size={wp(3.5)}
                />
                <Text
                  style={{
                    fontSize: wp(3),
                    textAlign: 'center',
                    color: colors.primary,
                    fontFamily: fonts.SFuiDisplayBold,
                  }}>
                  Invite new People
                </Text>
              </TouchableOpacity>

*/}

              <TouchableOpacity
                onPress={() => createProject()}
                style={styles.siginBtnContainer}>
                <Text style={styles.signinText}>Add Project</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* //////////// */}
      {/* //////////// */}
      {/* //////////// */}
      {/* //////////// */}
      {/* //////////// */}
      {/* @location */}
      {/* //////////// */}
      {/* //////////// */}
      {/* //////////// */}
      {/* //////////// */}

      <Model isVisible={createModal}>
        <View>
          {/* content */}
          <View style={styles.contentLocations}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.headingContainer}>Add New Location</Text>
                <Icon
                  onPress={() => setcreateModal(false)}
                  containerStyle={{marginLeft: wp(2)}}
                  name={'cross'}
                  type={'entypo'}
                  size={wp(4.6)}
                  iconStyle={{opacity: 0.5}}
                />
              </View>
              {/* inputs container */}
              <View style={styles.inputsContainer}>
                {/* Email Container */}
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.emailTextContainer}>Location Name</Text>
                    <Text
                      style={[
                        styles.emailTextContainer,
                        {opacity: 0.5, marginLeft: wp(3)},
                      ]}>
                      (Mandatory)
                    </Text>
                  </View>
                  <View style={[styles.inputContainer]}>
                    <TextInput
                      value={locationName}
                      style={styles.authInputs}
                      onChangeText={(e) => setlocationName(e)}
                      placeholder={'Enter your new location'}
                    />
                  </View>
                  {locationNameErr && (
                    <Text style={{fontSize: wp(3), color: colors.error}}>
                      Type your location name
                    </Text>
                  )}
                </View>

                {/* Location Supervisor */}
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: wp(3),
                      alignItems: 'center',
                    }}>
                    <Text style={styles.emailTextContainer}>
                      Location Supervisor
                    </Text>
                    <Icon
                      containerStyle={{marginLeft: wp(2)}}
                      name={'info'}
                      type={'feather'}
                      size={wp(3)}
                      iconStyle={{opacity: 0.5}}
                    />
                  </View>

                  {locationSuppervisorsTags.length == 0 && (
                    <>
                      <View style={[styles.inputContainer]}>
                        <TextInput
                          onFocus={() => {
                            setlocationSuppervisorsSugg(
                              searchInSuggestions('', allAssignLeaders),
                            );
                          }}
                          value={locationSupervisor}
                          style={styles.authInputs}
                          onChangeText={(e) => {
                            if (e !== '') {
                              var arr: any = searchInSuggestions(
                                e.toLowerCase(),
                                allAssignLeaders,
                              );
                              setlocationSuppervisorsSugg(arr);
                            } else {
                              setlocationSuppervisorsSugg([]);
                            }
                            setlocationSupervisor(e);
                          }}
                          placeholder={'Enter Name'}
                        />
                      </View>

                      {/* Suggestions of projectEmail  */}
                      {locationSuppervisorsSugg.length != 0 ? (
                        <View style={styles.involveSuggestCont}>
                          {locationSuppervisorsSugg.map((d: any, i: number) => (
                            <TouchableOpacity
                              key={i}
                              onPress={() => {
                                setlocationSupervisor('');
                                setlocationSuppervisorsSugg(
                                  locationSuppervisorsSugg.filter(
                                    (b: any) => b != d,
                                  ),
                                );

                                locationSuppervisorsTags.push(d);
                              }}
                              style={[
                                styles.involvePsuggCont,
                                locationSuppervisorsSugg.length == i + 1
                                  ? {borderBottomWidth: wp(0)}
                                  : null,
                              ]}>
                              <Text style={styles.involvePSt}>{d.email}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      ) : null}
                    </>
                  )}

                  {/* Tags or project leaders */}
                  <View
                    style={{
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      marginTop: wp(2),
                    }}>
                    <Tags
                      type={'attachments'}
                      onClose={(d: any) => {
                        setlocationSuppervisorsTags(
                          locationSuppervisorsTags.filter((v: any) => v !== d),
                        );
                      }}
                      tags={locationSuppervisorsTags}
                    />
                  </View>

                  {locationSupervisorErr && (
                    <Text style={{fontSize: wp(3), color: colors.error}}>
                      Assign your location supervisor
                    </Text>
                  )}
                </View>

                {/* Additional Suppervisors */}
                <View>
                  <View style={{flexDirection: 'row', marginTop: wp(3)}}>
                    <Text style={styles.emailTextContainer}>
                      Additional Suppervisors
                    </Text>
                    <Icon
                      containerStyle={{marginTop: wp(1), marginLeft: wp(2)}}
                      name={'info'}
                      type={'feather'}
                      size={wp(3)}
                      iconStyle={{opacity: 0.5}}
                    />
                  </View>
                  {additionalSuppervisorsTags.length == 0 && (
                    <>
                      <View style={[styles.inputContainer]}>
                        <TextInput
                          onFocus={() => {
                            setadditionalSuppervisorsSugg(
                              searchInSuggestions('', allAssignLeaders),
                            );
                          }}
                          value={additionalSuppervisors}
                          style={styles.authInputs}
                          onChangeText={(e: any) => {
                            if (e !== '') {
                              var arr: any = searchInSuggestions(
                                e.toLowerCase(),
                                allAssignLeaders,
                              );
                              setadditionalSuppervisorsSugg(arr);
                            } else {
                              setadditionalSuppervisorsSugg([]);
                            }
                            setadditionalSuppervisors(e);
                          }}
                          placeholder={'Enter name'}
                        />
                      </View>

                      {/* Suggestions of projectEmail  */}
                      {additionalSuppervisorsSugg.length != 0 ? (
                        <View style={styles.involveSuggestCont}>
                          {additionalSuppervisorsSugg.map(
                            (d: any, i: number) => (
                              <TouchableOpacity
                                key={i}
                                onPress={() => {
                                  setadditionalSuppervisorsSugg(
                                    additionalSuppervisorsSugg.filter(
                                      (b: any) => b != d,
                                    ),
                                  );
                                  setadditionalSuppervisors('');

                                  additionalSuppervisorsTags.push(d);
                                }}
                                style={[
                                  styles.involvePsuggCont,
                                  additionalSuppervisorsSugg.length == i + 1
                                    ? {borderBottomWidth: wp(0)}
                                    : null,
                                ]}>
                                <Text style={styles.involvePSt}>{d.email}</Text>
                              </TouchableOpacity>
                            ),
                          )}
                        </View>
                      ) : null}
                    </>
                  )}

                  {/* Tags or project leaders */}
                  <View
                    style={{
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      marginTop: wp(2),
                    }}>
                    <Tags
                      type={'attachments'}
                      onClose={(d: any) => {
                        setadditionalSuppervisorsTags(
                          additionalSuppervisorsTags.filter(
                            (v: any) => v !== d,
                          ),
                        );
                      }}
                      tags={additionalSuppervisorsTags}
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => addLocation()}
                style={styles.siginBtnContainer}>
                <Text style={styles.signinText}>Add Location</Text>
              </TouchableOpacity>
            </View>
            {/* )} */}
          </View>
        </View>
      </Model>
    </View>
  );
};

const mapStateToProps = (state: any) => ({
  reduxState: state.projects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});
var copCreateProject = copilot({
  // style: {}
  verticalOffset: 24,
  animated: true,
  overlay: 'view',
})(CreateProject);

export default connect(mapStateToProps, mapDispatchToProps)(copCreateProject);

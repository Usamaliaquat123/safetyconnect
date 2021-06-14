import * as React from 'react';
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
import {colors, fonts} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {Tags, SuggestionsAvatar} from '@components';
import {RouteProp, CommonActions} from '@react-navigation/native';
import styles from './styles';
import {createApi as api} from '@service';
import {animation} from '@theme';
import LottieView from 'lottie-react-native';

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

class CreateProject extends React.Component<CreateProjectProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      teamMembers: [],
      teamMembersText: '',
      assignSuppervisor: [],
      assignSuppervisorText: [],
      allAssignSuppervisorText: [],

      assignLeaderss: [],
      assignLeaderssText: [],
      allAssignLeaders: [],
      assignLeaderssT: '',
      assignSuppervisorT: '',
      assignLocations: [],
      assignLocationsText: '',
      projectName: '',
      loading: false,
      projects: [],
      email: 'inconnent12345@outlook.com',
      // errors popup
      errorProjectName: false,
      locations: [],
      errorTeamMem: false,
      projectDescription: '',
      // suggestions
      locationSugg: [],
      involvedPersons: [],
      createModal: false,

      // location
      locationName: '',
      locationNameErr: false,
      locationSupervisor: '',
      locationSupervisorErr: false,
      additionalSuppervisors: '',
      // Location : suggestion
      locationSuppervisorsTags: [],
      locationSuppervisorsSugg: [],

      additionalSuppervisorsSugg: [],
      additionalSuppervisorsTags: [],
    };
  }
  // Filter All countries
  filterContries = (contries: string) => {
    this.setState({assignLocationsText: contries});
  };
  componentWillUnmount() {
    this.setState({
      allAssignSuppervisorText: [],

      allAssignLeaders: [],
    });
  }

  createProject = async () => {
    if (this.state.projectName !== '') {
      this.setState({errorProjectName: false});

      if (
        this.state.assignLeaderss.concat(this.state.assignSuppervisor).length !=
        0
      ) {
        this.setState({loading: true});
        await AsyncStorage.getItem('email')
          .then((email: any) => {
            this.setState({errorTeamMem: false});
            // this.props.route.params.suggestedUsers?.map((d  :any) => )
            var members = this.state.assignLeaderss.concat(
              this.state.assignSuppervisor,
            );
            console.log(members.map((d: any) => d._id));

            console.log('members');
            console.log(members);
            console.log('members');

            api
              .createApi()
              .Postproject({
                created_by: email,
                project_name: this.state.projectName,
                involved_persons: members.map((d: any) => d._id),
                locations: this.state.assignLocations,
                p_locations: {
                  name: this.state.locationName,
                  supervisor: this.state.locationSuppervisorsTags[0].email,
                  additional_supervisor: this.state
                    .additionalSuppervisorsTags[0].email,
                },
                organization: this.props.route.params.organization,
              })

              .then((res: any) => {
                console.log(res);
                console.log('created project');

                if (res.status == 200) {
                  api
                    .createApi()
                    .getUser(email)
                    .then((userdata: any) => {
                      AsyncStorage.setItem(
                        'organization',
                        this.props.route.params.organization,
                      );

                      savedCurrentProjectAndOrganizations(
                        res.data.data.project_id,
                        this.props.route.params.organization,
                      );
                      this.setState({loading: false});
                      // AsyncStorage.setItem('email', email);

                      this.props.navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [
                            {
                              name: 'Main',
                            },
                          ],
                        }),
                      );
                      // this.props.navigation.navigate('Main');
                      //  AsyncStorage.setItem('token', res.)
                    });
                }
              })
              .catch((err) => {});
            // this.props.navigation.pop();
          })
          .catch((err) => {});
      } else {
        this.setState({loading: false});
        this.setState({errorTeamMem: true});
      }
    } else {
      this.setState({loading: false});

      this.setState({errorProjectName: true});
    }
  };
  addLocation = async () => {
    if (this.state.locationName !== '') {
      // var loca = JSON.parse(location);
      this.state.locations.push(this.state.locationName);
      this.setState({createModal: false});
      // this.setState({
      //   locationName: '',
      //   locationSupervisor: '',
      //   additionalSuppervisors: '',
      // });
      this.state.assignLocations.push(this.state.locationName);
      // await AsyncStorage.setItem('locations', this.state.locationName);
      // this.props.navigation.goBack();
    } else {
      this.setState({locationNameErr: true});
    }
  };
  componentDidMount = async () => {
    console.log(this.props.route.params.organization);
    console.log(this.props.route.params.suggestedUsers);

    // api

    AsyncStorage.getItem('email').then((email: any) => {
      for (let i = 0; i < this.props.route.params.suggestedUsers.length; i++) {
        api
          .createApi()
          .getUser(this.props.route.params.suggestedUsers[i].email)
          .then((res: any) => {
            this.state.allAssignSuppervisorText.push({
              email: res.data.data.email,
              _id: res.data.data._id,
            });
            this.state.allAssignLeaders.push({
              email: res.data.data.email,
              _id: res.data.data._id,
            });
          });
      }

      // this.setState({
      //   allAssignSuppervisorText: this.props.route.params.suggestedUsers,
      //   allAssignLeaders: this.props.route.params.suggestedUsers,
      // });
    });

    AsyncStorage.getItem('locations').then((locations: any) => {
      console.log(locations);
      var location = JSON.parse(locations);
      if (location != null) {
        this.setState({locationSugg: location});
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* content */}
          <View style={[styles.content]}>
            {this.state.loading == true ? (
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
                    onPress={() => this.props.navigation.goBack()}
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
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.emailTextContainer}>Project Name</Text>
                    <Text
                      style={{
                        fontFamily: fonts.SFuiDisplayLight,
                        opacity: 0.5,
                        fontSize: wp(3.4),
                      }}>
                      ( Mandatory )
                    </Text>
                  </View>

                  <View style={[styles.inputContainer]}>
                    <TextInput
                      style={styles.authInputs}
                      value={this.state.projectName}
                      onChange={(e) => {
                        this.setState({projectName: e.nativeEvent.text});
                      }}
                      placeholder={'Enter Project Name'}
                    />
                  </View>
                  {this.state.errorProjectName && (
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
                      <Text
                        style={{
                          fontFamily: fonts.SFuiDisplayLight,
                          opacity: 0.5,

                          fontSize: wp(3.4),
                        }}>
                        ( Mandatory )
                      </Text>
                    </View>
                    <View>
                      <View style={[styles.inputContainer]}>
                        <TextInput
                          placeholder={'Enter project description here'}
                          style={styles.authInputs}
                          value={this.state.projectDescription}
                          onChangeText={(e) =>
                            this.setState({projectDescription: e})
                          }
                        />
                      </View>
                    </View>
                  </View>

                  {/* Assign Locations */}

                  {/* Locations */}
                  <View>
                    <Text
                      style={[styles.emailTextContainer, {marginTop: wp(2)}]}>
                      {' '}
                      Locations
                    </Text>
                    {/* {this.state.assignLocations.length < 1 ? (
                      <View style={[styles.inputContainer]}>
                        <TextInput
                          placeholder={'Add Locations'}
                          style={styles.authInputs}
                          value={this.state.assignLocationsText}
                          onChangeText={(e) => {
                            this.filterContries(e);
                          }}
                        />
                      </View>
                    ) : null} */}
                    {/* Assign Locations suggestions */}
                    {/* {this.state.assignLocationsText != '' ? (
                      <SuggestionsAvatar
                        type={'location'}
                        locations={this.state.locations}
                        onSelect={(d: string) => {
                          this.state.assignLocations.push(d);
                          this.setState({
                            assignLocationsText: '',
                          });
                        }}
                        text={this.state.assignLocationsText}
                      />
                    ) : null} */}

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
                          this.setState({
                            assignLocations: this.state.assignLocations.filter(
                              (v: any) => v !== d,
                            ),
                          });
                        }}
                        tags={this.state.assignLocations}
                      />
                    </View>

                    {/* add new location */}
                    {this.state.assignLocations.length < 3 && (
                      <TouchableOpacity
                        onPress={() => this.setState({createModal: true})}
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
                  </View>

                  {/* Asssign Leaders */}
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
                  <View style={[styles.inputContainer]}>
                    {this.state.assignLeaderss.length < 15 ? (
                      <TextInput
                        placeholder={'Add Leaders that you already invited'}
                        style={styles.authInputs}
                        value={this.state.assignLeaderssT}
                        onChangeText={(e) => {
                          if (e !== '') {
                            var arr = searchInSuggestions(
                              e.toLowerCase(),
                              this.state.allAssignLeaders,
                            );

                            this.setState({
                              assignLeaderssText: arr,
                              assignLeaderssT: e,
                            });
                          } else {
                            this.setState({
                              assignLeaderssText: [],
                              assignLeaderssT: e,
                            });
                          }
                        }}
                      />
                    ) : null}
                  </View>

                  {/* Suggestions of projectEmail  */}
                  {this.state.assignLeaderssText.length != 0 ? (
                    <View style={styles.involveSuggestCont}>
                      {this.state.assignLeaderssText.map(
                        (d: any, i: number) => (
                          <TouchableOpacity
                            key={i}
                            onPress={() => {
                              this.setState({
                                assignLeaderssT: '',
                                assignLeaderssText: [],
                              });

                              this.state.assignLeaderss.push(d);
                            }}
                            style={[
                              styles.involvePsuggCont,
                              this.state.assignLeaderssText.length == i + 1
                                ? {borderBottomWidth: wp(0)}
                                : null,
                            ]}>
                            <Text style={styles.involvePSt}>{d.email}</Text>
                          </TouchableOpacity>
                        ),
                      )}
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
                        this.setState({
                          assignLeaderss: this.state.assignLeaderss.filter(
                            (v: any) => v !== d,
                          ),
                        });
                      }}
                      tags={this.state.assignLeaderss}
                    />
                  </View>

                  {/* Asssign Supervisor */}
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
                    {this.state.assignSuppervisor.length < 15 ? (
                      <View style={[styles.inputContainer]}>
                        <TextInput
                          style={styles.authInputs}
                          placeholder={'Enter name'}
                          value={this.state.assignSuppervisorT}
                          onChangeText={(e) => {
                            if (e !== '') {
                              this.setState({
                                assignSuppervisorText: searchInSuggestions(
                                  e.toLowerCase(),
                                  this.state.allAssignLeaders,
                                ),
                                assignSuppervisorT: e,
                              });
                            } else {
                              this.setState({
                                assignSuppervisorText: [],
                                assignSuppervisorT: e,
                              });
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
                    {this.state.assignSuppervisorText.length != 0 ? (
                      <View style={styles.involveSuggestCont}>
                        {this.state.assignSuppervisorText.map(
                          (d: any, i: number) => (
                            <TouchableOpacity
                              key={i}
                              onPress={() => {
                                this.setState({
                                  assignSuppervisorT: '',
                                  assignSuppervisorText: [],
                                });

                                this.state.assignSuppervisor.push(d);
                              }}
                              style={[
                                styles.involvePsuggCont,
                                this.state.assignSuppervisorText.length == i + 1
                                  ? {borderBottomWidth: wp(0)}
                                  : null,
                              ]}>
                              <Text style={styles.involvePSt}>{d.email}</Text>
                            </TouchableOpacity>
                          ),
                        )}
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
                          this.setState({
                            assignSuppervisor: this.state.assignSuppervisor.filter(
                              (v: any) => v !== d,
                            ),
                          });
                        }}
                        tags={this.state.assignSuppervisor}
                      />
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => this.createProject()}
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

        <Model
          isVisible={this.state.createModal}
          onBackdropPress={() => {
            this.setState({createModal: false, loading: false});
          }}>
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
                    onPress={() => this.setState({createModal: false})}
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
                      <Text style={styles.emailTextContainer}>
                        Location Name
                      </Text>
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
                        value={this.state.locationName}
                        style={styles.authInputs}
                        onChangeText={(e) => this.setState({locationName: e})}
                        placeholder={'Enter your new location'}
                      />
                    </View>
                    {this.state.locationNameErr && (
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
                    <View style={[styles.inputContainer]}>
                      <TextInput
                        value={this.state.locationSupervisor}
                        style={styles.authInputs}
                        onChangeText={(e) => {
                          if (e !== '') {
                            var arr = searchInSuggestions(
                              e.toLowerCase(),
                              this.state.allAssignLeaders,
                            );
                            this.setState({locationSuppervisorsSugg: arr});
                          } else {
                            this.setState({locationSuppervisorsSugg: []});
                          }

                          this.setState({locationSupervisor: e});
                        }}
                        placeholder={'Enter Name'}
                      />
                    </View>

                    {/* Suggestions of projectEmail  */}
                    {this.state.locationSuppervisorsSugg.length != 0 ? (
                      <View style={styles.involveSuggestCont}>
                        {this.state.locationSuppervisorsSugg.map(
                          (d: any, i: number) => (
                            <TouchableOpacity
                              key={i}
                              onPress={() => {
                                this.setState({
                                  locationSupervisor: '',
                                  locationSuppervisorsSugg: [],
                                });

                                this.state.locationSuppervisorsTags.push(d);
                              }}
                              style={[
                                styles.involvePsuggCont,
                                this.state.locationSuppervisorsSugg.length ==
                                i + 1
                                  ? {borderBottomWidth: wp(0)}
                                  : null,
                              ]}>
                              <Text style={styles.involvePSt}>{d.email}</Text>
                            </TouchableOpacity>
                          ),
                        )}
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
                          this.setState({
                            locationSuppervisorsTags: this.state.locationSuppervisorsTags.filter(
                              (v: any) => v !== d,
                            ),
                          });
                        }}
                        tags={this.state.locationSuppervisorsTags}
                      />
                    </View>

                    {this.state.locationSupervisorErr && (
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
                    <View style={[styles.inputContainer]}>
                      <TextInput
                        value={this.state.additionalSuppervisors}
                        style={styles.authInputs}
                        onChangeText={(e) => {
                          if (e !== '') {
                            var arr = searchInSuggestions(
                              e.toLowerCase(),
                              this.state.allAssignLeaders,
                            );
                            this.setState({additionalSuppervisorsSugg: arr});
                          } else {
                            this.setState({additionalSuppervisorsSugg: []});
                          }
                          this.setState({additionalSuppervisors: e});
                        }}
                        placeholder={'Enter name'}
                      />
                    </View>

                    {/* Suggestions of projectEmail  */}
                    {this.state.additionalSuppervisorsSugg.length != 0 ? (
                      <View style={styles.involveSuggestCont}>
                        {this.state.additionalSuppervisorsSugg.map(
                          (d: any, i: number) => (
                            <TouchableOpacity
                              key={i}
                              onPress={() => {
                                this.setState({
                                  additionalSuppervisors: '',
                                  additionalSuppervisorsSugg: [],
                                });

                                this.state.additionalSuppervisorsTags.push(d);
                              }}
                              style={[
                                styles.involvePsuggCont,
                                this.state.additionalSuppervisorsSugg.length ==
                                i + 1
                                  ? {borderBottomWidth: wp(0)}
                                  : null,
                              ]}>
                              <Text style={styles.involvePSt}>{d.email}</Text>
                            </TouchableOpacity>
                          ),
                        )}
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
                          this.setState({
                            additionalSuppervisorsTags: this.state.additionalSuppervisorsTags.filter(
                              (v: any) => v !== d,
                            ),
                          });
                        }}
                        tags={this.state.additionalSuppervisorsTags}
                      />
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => this.addLocation()}
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
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);

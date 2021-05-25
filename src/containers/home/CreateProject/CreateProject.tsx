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
import {Icon, ThemeConsumer} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors, fonts} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {Tags, SuggestionsAvatar} from '@components';
import {RouteProp} from '@react-navigation/native';
import styles from './styles';
import {createApi as api} from '@service';
import {animation} from '@theme';
import LottieView from 'lottie-react-native';

import {orgnaization} from '@typings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {validateEmail, getCurrentProject, getCurrentOrganization} from '@utils';
type CreateProjectNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'CreateProj'
>;
type CreateProjectRouteProp = RouteProp<StackNavigatorProps, 'CreateProj'>;

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
      assignSuppervisorText: '',
      assignLeaderss: [],
      assignLeaderssText: '',
      assignSuppervisorT: '',
      assignLeaderssT: '',
      assignLocations: [],
      assignLocationsText: '',
      projectName: '',
      loading: false,
      projects: [],
      email: 'inconnent12345@outlook.com',
      // errors popup
      errorProjectName: false,
      locations: [
        {name: 'Kitchen'},
        {name: 'offce'},
        {name: 'washroom'},
        {name: 'berlin'},
        {name: 'germany '},
        {name: 'house'},
      ],
      errorTeamMem: false,
      projectDescription: '',
      // suggestions
      locationSugg: [],
      involvedPersons: [],
    };
  }
  // Filter All countries
  filterContries = (contries: string) => {
    this.setState({assignLocationsText: contries});
  };

  createProject = async () => {
    if (this.state.projectName !== '') {
      this.setState({errorProjectName: false});
      if (this.state.teamMembers.length > 2) {
        this.setState({loading: true});
        await AsyncStorage.getItem('email')
          .then((email: any) => {
            this.setState({errorTeamMem: false});

            api
              .createApi()
              .Postproject({
                created_by: email,
                project_name: this.state.projectName,
                involved_persons: [],
                organization: this.props.route.params.organization,
              })

              .then((res: any) => {
                if (res.status == 200) {
                  api
                    .createApi()
                    .getUser({email: email})
                    .then((res: any) => {
                      AsyncStorage.setItem(
                        'organization',
                        this.props.route.params.organization,
                      );

                      this.savedCurrentProjectAndOrganizations(
                        this.props.route.params.organization,
                        res.data.data.project_id,
                      );
                      this.setState({loading: false});
                      AsyncStorage.setItem('email', this.state.email);
                      this.props.navigation.navigate('Main');
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

  componentDidMount() {
    getCurrentOrganization().then((org) => {
      console.log(org);
    });
    // console.log(this.props.route.params.organization);
    // if (this.props.route.params.organization == undefined) {
    //   console.log('sdsds');
    // }
    // Organization id
    // this.props.route.params.organization;
    // get project members

    // if (this.props.route.params.organization)
    // api
    //   .createApi()
    //   .getOrganization(this.props.route.params.organization)
    //   .then((organization: any) => {
    //     // Members
    //     // organization.data.data.members;
    //   });
    // Get locations from local storage

    AsyncStorage.getItem('locations').then((locations: any) => {
      var location = JSON.parse(locations);
      if (location != null) {
        this.setState({locationSugg: location});
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* content */}
          <View
            style={[
              styles.content,
              // this.state.loading ? {height: wp(100)} : {height: wp(100)},
            ]}>
            {this.state.loading == true ? (
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: wp(40),
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
                    {this.state.assignLocations.length < 1 ? (
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
                    ) : null}
                    {/* Assign Locations suggestions */}
                    {this.state.assignLocationsText != '' ? (
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
                    ) : null}

                    <View
                      style={{
                        flexWrap: 'wrap',
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
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('AddLocation')
                      }
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
                        placeholder={'Add Leaders and invite by @ email'}
                        style={styles.authInputs}
                        value={this.state.assignLeaderssT}
                        onChangeText={(e) => {
                          if (validateEmail(e)) {
                            this.setState({
                              assignLeaderssText: e,
                              assignLeaderssT: e,
                            });
                          } else {
                            this.setState({
                              assignLeaderssText: '',
                              assignLeaderssT: e,
                            });
                          }
                        }}
                      />
                    ) : null}
                  </View>

                  {/* Assign Leaders suggestions */}
                  {this.state.assignLeaderssText != '' ? (
                    <SuggestionsAvatar
                      onSelect={(d: string) => {
                        this.state.assignLeaderss.push(d);
                        this.setState({
                          assignLeaderssText: '',
                        });
                      }}
                      text={this.state.assignLeaderssText}
                    />
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
                            this.setState({
                              assignSuppervisorText: '',
                              assignSuppervisorT: e,
                            });
                          }}
                        />
                      </View>
                    ) : null}

                    {this.state.assignSuppervisorText != '' ? (
                      <SuggestionsAvatar
                        onSelect={(d: string) => {
                          this.state.assignSuppervisor.push(d);
                          this.setState({
                            assignSuppervisorText: '',
                          });
                        }}
                        text={this.state.assignSuppervisorText}
                      />
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

// <View>
// {/* Add Team Members */}
// <Text style={styles.emailTextContainer}>
//   Add Team Members
// </Text>
// <View style={[styles.inputContainer]}>
//   {this.state.teamMembers.length < 15 ? (
//     <TextInput
//       style={styles.authInputs}
//       value={this.state.teamMembersText}
//       placeholder={'Add Team Members'}
//       onChange={(e) => {
//         {
//           this.setState({
//             teamMembersText: e.nativeEvent.text,
//           });
//         }
//       }}
//     />
//   ) : null}
// </View>
// {this.state.errorTeamMem && (
//   <Text style={{fontSize: wp(3), color: colors.error}}>
//     Add atleast 2 members{' '}
//   </Text>
// )}

// {/* Add Team Suggestions */}
// {this.state.teamMembersText != '' ? (
//   <SuggestionsAvatar
//     onSelect={(d: string) => {
//       this.state.teamMembers.push(d);
//       this.setState({
//         teamMembersText: '',
//       });
//     }}
//     text={this.state.teamMembersText}
//   />
// ) : null}
// <View
//   style={{
//     flexWrap: 'wrap',
//     flexDirection: 'row',
//     marginTop: wp(2),
//   }}>
//   <Tags
//     type={'addTeamMem'}
//     onClose={(d: any) => {
//       this.setState({
//         teamMembers: this.state.teamMembers.filter(
//           (v: any) => v !== d,
//         ),
//       });
//     }}
//     tags={this.state.teamMembers}
//   />
// </View>
// </View>

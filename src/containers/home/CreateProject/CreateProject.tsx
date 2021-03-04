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
import {colors} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps, AuthNavigatorProp} from '@nav';
import {Tags, SuggestionsAvatar} from '@components';
import {RouteProp} from '@react-navigation/native';
import styles from './styles';
import {createApi as api} from '@service';
import {animation} from '@theme';
import LottieView from 'lottie-react-native';

import {orgnaization} from '@typings';
import AsyncStorage from '@react-native-async-storage/async-storage';
type CreateProjectNavigationProp = StackNavigationProp<
  AuthNavigatorProp,
  'CreateProj'
>;
type CreateProjectRouteProp = RouteProp<AuthNavigatorProp, 'CreateProj'>;

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
      assignLocations: [],
      assignLocationsText: '',
      projectName: '',
      laoding: false,
      projects: [],
      email: 'inconnent12345@outlook.com',
      // errors popup
      errorProjectName: false,
      errorTeamMem: false,
    };
  }

  filterContries = (contries: string) => {
    api
      .createApi()
      .contriesAll({name: contries})
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  createProject = async () => {
    if (this.state.projectName !== '') {
      this.setState({errorProjectName: false});
      if (this.state.teamMembers.length > 2) {
        this.setState({loading: true});
        await AsyncStorage.getItem('email')
          .then((email: any) => {
            this.setState({errorTeamMem: false});

            console.log(email);
            api
              .createApi()
              .Postproject({
                created_by: email,
                project_name: this.state.projectName,
                involved_persons: [],
                organization: this.props.route.params.organization,
              })

              .then((res: any) => {
                console.log(res);

                if (res.status == 200) {
                  api
                    .createApi()
                    .getUser({email: email})
                    .then((res: any) => {
                      AsyncStorage.setItem('id', res.data.data._id);
                      AsyncStorage.setItem(
                        'organization',
                        this.props.route.params.organization,
                      );
                      this.setState({loading: false});
                      this.props.navigation.navigate('Home');
                      //  AsyncStorage.setItem('token', res.)
                      console.log(res);
                    });
                }
              })
              .catch((err) => console.log(err));
            // this.props.navigation.pop();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.setState({loading: false});
        this.setState({errorTeamMem: true});
      }
    } else {
      this.setState({loading: false});

      this.setState({errorProjectName: true});
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <Icon
                onPress={() => this.props.navigation.goBack()}
                size={wp(5.5)}
                name="arrow-back-outline"
                type="ionicon"
                color={colors.secondary}
              />
              <View>
                <Text style={styles.title}>Create organization</Text>
                <View style={styles.underScrore} />
              </View>
            </View>
          </View>
          {/* content */}
          <View style={styles.content}>
            {this.state.loading == true ? (
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
            ) : (
              <View>
                <Text style={styles.headingContainer}>Create Project</Text>

                {/* inputs container */}
                <View style={styles.inputsContainer}>
                  {/* Email Container */}
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.emailTextContainer}>Project Name</Text>
                    <Text style={{color: colors.error, marginTop: wp(2)}}>
                      *
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
                  {/* Add Team Members */}
                  <Text style={styles.emailTextContainer}>
                    Add Team Members
                  </Text>
                  <View style={[styles.inputContainer]}>
                    {this.state.teamMembers.length < 15 ? (
                      <TextInput
                        style={styles.authInputs}
                        value={this.state.teamMembersText}
                        placeholder={'Add Team Members'}
                        onChange={(e) => {
                          {
                            this.setState({
                              teamMembersText: e.nativeEvent.text,
                            });
                          }
                        }}
                      />
                    ) : null}
                  </View>
                  {this.state.errorTeamMem && (
                    <Text style={{fontSize: wp(3), color: colors.error}}>
                      Add atleast 2 members{' '}
                    </Text>
                  )}
                  {/* Add Team Suggestions */}
                  {this.state.teamMembersText != '' ? (
                    <SuggestionsAvatar
                      onSelect={(d: string) => {
                        this.state.teamMembers.push(d);
                        this.setState({
                          teamMembersText: '',
                        });
                      }}
                      text={this.state.teamMembersText}
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
                          teamMembers: this.state.teamMembers.filter(
                            (v: any) => v !== d,
                          ),
                        });
                      }}
                      tags={this.state.teamMembers}
                    />
                  </View>

                  {/* Asssign Supervisor */}
                  <Text style={styles.emailTextContainer}>
                    {' '}
                    Assign Suppervisors
                  </Text>
                  {this.state.assignSuppervisor.length < 15 ? (
                    <View style={[styles.inputContainer]}>
                      <TextInput
                        style={styles.authInputs}
                        placeholder={'Add Suppervisors'}
                        value={this.state.assignSuppervisorText}
                        onChange={(e) => {
                          this.setState({
                            assignSuppervisorText: e.nativeEvent.text,
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
                  {/* Asssign Leaders */}
                  <Text style={styles.emailTextContainer}> Assign Leaders</Text>
                  <View style={[styles.inputContainer]}>
                    {this.state.assignLeaderss.length < 15 ? (
                      <TextInput
                        placeholder={'Add Leaders'}
                        style={styles.authInputs}
                        value={this.state.assignLeaderssText}
                        onChange={(e) => {
                          this.setState({
                            assignLeaderssText: e.nativeEvent.text,
                          });
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
                  {/* Assign Locations */}
                  <Text style={styles.emailTextContainer}>
                    {' '}
                    Assign Locations
                  </Text>
                  <View style={[styles.inputContainer]}>
                    {this.state.assignLocations < 6 ? (
                      <TextInput
                        placeholder={'Add Locations'}
                        style={styles.authInputs}
                        value={this.state.assignLocationsText}
                        onChange={(e) => {
                          this.filterContries(e.nativeEvent.text);
                          this.setState({
                            assignLocationsText: e.nativeEvent.text,
                          });
                        }}
                      />
                    ) : null}
                  </View>

                  {/* Assign Locations suggestions */}
                  {this.state.assignLocationsText != '' ? (
                    <SuggestionsAvatar
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
                      type={'addTeamMem'}
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
                </View>

                <TouchableOpacity
                  onPress={() => this.createProject()}
                  style={styles.siginBtnContainer}>
                  <Text style={styles.signinText}>Create Project</Text>
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

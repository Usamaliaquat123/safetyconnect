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
      teamMembers: ['john doe', 'sunny leone'],
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
      errorProjectName: true,
      errorTeamMem: true,
    };
  }

  componentWillUnmount = () => {
    if (this.props.route.params.onGoBack) {
      // console.log(this.state.p)
      this.props.route.params.onGoBack(this.state.projects);
    }
  };

  createProject = () => {
    if (this.state.projectName !== '') {
      this.setState({errorProjectName: false});
      if (this.state.teamMembers.length < 2) {
        this.setState({errorTeamMem: false});
        this.setState({
          projects: this.props.route.params.data.push({
            created_by: this.state.emails,
            project_name: this.state.projectName,
            involved_persons: this.state.teamMembers,
          }),
        });
        this.props.navigation.pop();
      } else {
        this.setState({errorTeamMem: true});
      }
    } else {
      this.setState({errorProjectName: true});
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <Icon
                onPress={() => this.props.navigation.goBack()}
                size={25}
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
                <Text
                  style={{
                    fontSize: wp(3.5),
                    opacity: 0.5,
                    textAlign: 'center',
                    marginTop: wp(-5),
                  }}>
                  Connecting...
                </Text>
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
                      onChange={(e) =>
                        this.setState({projectName: e.nativeEvent.text})
                      }
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
                    <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                      <Tags
                        onClose={(d: any) => {
                          this.setState({
                            teamMembers: this.state.teamMembers.filter(
                              (v: any) => v !== d,
                            ),
                          });
                        }}
                        tags={this.state.teamMembers}
                      />
                      {this.state.teamMembers.length < 5 ? (
                        <TextInput
                          style={styles.authInputs}
                          value={this.state.teamMembersText}
                          onChange={(e) => {
                            this.setState({
                              teamMembersText: e.nativeEvent.text,
                            });
                          }}
                        />
                      ) : null}
                    </View>
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

                  {/* Asssign Supervisor */}
                  <Text style={styles.emailTextContainer}>
                    {' '}
                    Assign Suppervisors
                  </Text>
                  <View style={[styles.inputContainer]}>
                    <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                      <Tags
                        onClose={(d: any) => {
                          this.setState({
                            assignSuppervisor: this.state.assignSuppervisor.filter(
                              (v: any) => v !== d,
                            ),
                          });
                        }}
                        tags={this.state.assignSuppervisor}
                      />
                      {this.state.assignSuppervisor < 6 ? (
                        <TextInput
                          style={styles.authInputs}
                          value={this.state.assignSuppervisorText}
                          onChange={(e) => {
                            this.setState({
                              assignSuppervisorText: e.nativeEvent.text,
                            });
                          }}
                        />
                      ) : null}
                    </View>
                  </View>
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
                  {/* Asssign Leaders */}
                  <Text style={styles.emailTextContainer}> Assign Leaders</Text>
                  <View style={[styles.inputContainer]}>
                    <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                      <Tags
                        onClose={(d: any) => {
                          this.setState({
                            assignLeaderss: this.state.assignLeaderss.filter(
                              (v: any) => v !== d,
                            ),
                          });
                        }}
                        tags={this.state.assignLeaderss}
                      />
                      {this.state.assignLeaderss < 6 ? (
                        <TextInput
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
                  {/* Assign Locations */}
                  <Text style={styles.emailTextContainer}>
                    {' '}
                    Assign Locations
                  </Text>
                  <View style={[styles.inputContainer]}>
                    <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                      <Tags
                        onClose={(d: any) => {
                          this.setState({
                            assignLocations: this.state.assignLocations.filter(
                              (v: any) => v !== d,
                            ),
                          });
                        }}
                        tags={this.state.assignLocations}
                      />
                      {this.state.assignLocations < 6 ? (
                        <TextInput
                          style={styles.authInputs}
                          value={this.state.assignLocationsText}
                          onChange={(e) => {
                            this.setState({
                              assignLocationsText: e.nativeEvent.text,
                            });
                          }}
                        />
                      ) : null}
                    </View>
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
                </View>

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('CreateOrg')}
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

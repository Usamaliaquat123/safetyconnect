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
import {Tags} from '@components';
import {Icon} from 'react-native-elements';
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
import {validateEmail} from '@utils/utils';
// import {validateEmail} from '@utils/';
type CreateOrgNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'Login'
>;
type CreateOrgRouteProp = RouteProp<StackNavigatorProps, 'Login'>;

export interface CreateOrgProps {
  navigation: CreateOrgNavigationProp;
  route: CreateOrgRouteProp;
  reduxActions: any;
  reduxState: any;
}

class CreateOrg extends React.Component<CreateOrgProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      // Error State
      errorModal: false,
      orgError: false,
      orgDescError: false,
      org: '',
      orgDetails: '',
      peoplesText: '',
      peoples: [], // must be array of id's
      suggestedPps: ['asdhj@jasd.com'],
      suggestedEmail: false,
      selectedEmails: [],

      projects: [],
    };
  }
  componentDidMount() {
    // AsyncStorage.getItem('inviteEmails').then((emails) => {
    //   if (emails != null) {
    //     if (JSON.parse(emails) != null) {
    //     } else {
    //       this.setState({suggestedPps: JSON.parse(emails)});
    //     }
    //   }
    // });
  }

  searchForUsers = (e: string) => {
    if (validateEmail(e)) {
      this.setState({suggestedEmail: true});
    } else {
    }
    this.setState({peoplesText: e});
  };
  createOrg = () => {
    if (this.state.org !== '') {
      if (this.state.orgDetails !== '') {
        this.setState({loading: true, errorModal: true});

        AsyncStorage.getItem('email')
          .then((email: any) => {
            var data = {
              created_by: email,
              name: this.state.org,
              details: this.state.orgDetails,
              members: [],
              projects: [],
            };
            api
              .createApi()
              .organization(data)
              .then((res: any) => {
                console.log(res);
                if (res.status == 200) {
                  if (this.state.selectedEmails.length != 0) {
                    var inviteData = {
                      emails: this.state.selectedEmails,
                      organization: res.data.data.organization_id,
                      invitedBy: email,
                      organizationName: this.state.org,
                    };
                    api
                      .createApi()
                      .inviteBulk(inviteData)
                      .then((invited) => {
                        var invitedPP = {
                          users: this.state.selectedEmails,
                          orgnaizationId: res.data.data.organization_id,
                          organizationName: this.state.org,
                        };

                        AsyncStorage.getItem('invitedUsersEmails').then(
                          (invitedEmails: any) => {
                            console.log(this.state.selectedEmails);
                            var emails = JSON.parse(invitedEmails);
                            if (emails == null) {
                              AsyncStorage.setItem(
                                'invitedUsersEmails',
                                JSON.stringify(this.state.selectedEmails),
                              );
                            } else {
                              for (
                                let k = 0;
                                k < this.state.selectedEmails.length;
                                k++
                              ) {
                                emails.push(this.state.selectedEmails[k]);
                              }
                              emails.push(this.state.selectedEmails);
                              console.log('saved');

                              AsyncStorage.setItem(
                                'invitedUsersEmails',
                                JSON.stringify(emails),
                              );
                            }
                          },
                        );
                        this.setState({loading: false, errorModal: false});
                        this.props.navigation.navigate('createProject', {
                          organization: res.data.data.organization_id,
                        });
                      });
                  } else {
                    this.setState({loading: false, errorModal: false});
                    this.props.navigation.navigate('createProject', {
                      organization: res.data.data.organization_id,
                    });
                  }
                } else {
                  this.setState({loading: false, errorModal: false});
                }
              })
              .catch((err) => {
                this.setState({loading: false, errorModal: false});
              });
          })
          .catch((err) => {
            this.setState({loading: true, errorModal: true});
          });
      } else {
        this.setState({loading: false});
        this.setState({orgDescError: true});
      }
    } else {
      this.setState({loading: false});
      this.setState({orgError: true});
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.headingContainer}>
                  Add New Organization
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
              {/* inputs container */}
              <View style={styles.inputsContainer}>
                {/* Email Container */}
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.emailTextContainer}>
                      Organization Name
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
                      value={this.state.org}
                      style={styles.authInputs}
                      onChangeText={(e) => this.setState({org: e})}
                      placeholder={'Enter Organization Name'}
                    />
                  </View>
                  {this.state.orgError && (
                    <Text style={{fontSize: wp(3), color: colors.error}}>
                      Type your organization name
                    </Text>
                  )}
                </View>

                {/* Organization Description */}
                <View>
                  <View style={{flexDirection: 'row', marginTop: wp(3)}}>
                    <Text style={styles.emailTextContainer}>
                      Organization Description
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
                      value={this.state.orgDetails}
                      style={styles.authInputs}
                      onChangeText={(e) => this.setState({orgDetails: e})}
                      placeholder={'Enter Organization description here'}
                    />
                  </View>
                  {this.state.orgDescError && (
                    <Text style={{fontSize: wp(3), color: colors.error}}>
                      Type your organization description
                    </Text>
                  )}
                </View>

                {/* People */}
                <View>
                  <View style={{flexDirection: 'row', marginTop: wp(3)}}>
                    <Text style={styles.emailTextContainer}>People</Text>
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
                      style={styles.authInputs}
                      onChangeText={(e) => this.searchForUsers(e)}
                      placeholder={'Enter name or add email'}
                    />
                  </View>
                  {this.state.orgError && (
                    <Text style={{fontSize: wp(3), color: colors.error}}>
                      Add people to the organization
                    </Text>
                  )}
                </View>
                <View>
                  {this.state.suggestedEmail == false ? null : (
                    <View style={styles.involveSuggestCont}>
                      <TouchableOpacity
                        onPress={() => {
                          this.state.selectedEmails.push(
                            this.state.peoplesText,
                          );
                          this.setState({
                            peoplesText: '',
                            suggestedEmail: false,
                          });
                        }}
                        style={[
                          styles.involvePsuggCont,
                          {borderBottomWidth: 0},
                        ]}>
                        <Icon
                          name={'send'}
                          type={'feather'}
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
                            Invite {this.state.peoplesText}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <View style={{flexDirection: 'row'}}>
                  {this.state.selectedEmails.length != 0 && (
                    <Tags
                      type={'organizationPeoplesSuggestioms'}
                      style={{height: wp(10)}}
                      tags={this.state.selectedEmails}
                      onClose={(d: any) =>
                        this.setState({
                          selectedEmails: this.state.selectedEmails.filter(
                            (v: any) => v !== d,
                          ),
                        })
                      }
                    />
                  )}
                </View>
              </View>

              <TouchableOpacity
                onPress={() => this.createOrg()}
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrg);

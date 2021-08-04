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
  imagePicker,
  cameraCapture,
  suggestInActionsRecommendations,
} from '@utils';
import RNFetchBlob from 'rn-fetch-blob';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as reduxActions from '../../../store/actions/listSorActions';
import {Tags} from '@components';
import {Icon, Avatar} from 'react-native-elements';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import DocumentPicker from 'react-native-document-picker';
import {RouteProp} from '@react-navigation/native';
import {colors, images, GlStyles, fonts} from '@theme';
import {animation} from '@theme';
import LottieView from 'lottie-react-native';
import {createApi as api} from '@service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {bindActionCreators} from 'redux';

import {AllSorDTO} from '@dtos';
import {getActiveChildNavigationOptions} from 'react-navigation';
import {validateEmail, profileUploader} from '@utils';
import {default as Model} from 'react-native-modal';

// import {validateEmail} from '@utils/';
type CreateOrgNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'CreateOrganization'
>;
type CreateOrgRouteProp = RouteProp<StackNavigatorProps, 'CreateOrganization'>;

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
      uploadedImage: '',
      orgError: false,
      orgDescError: false,
      org: '',
      orgDetails: '',
      peoplesText: '',
      fileLoading: false,
      peoples: [], // must be array of id's
      suggestedEmail: false,
      selectedEmails: [],
      members: [],
      assignProjects: [],

      createNewProject: false,
    };
  }
  componentDidMount() {}

  searchForUsers = (e: string) => {
    if (validateEmail(e)) {
      this.setState({suggestedEmail: true});
    } else {
    }
    this.setState({peoplesText: e});
  };

  // Image capture of the organization
  imgCap = (str: string) => {
    if (str == 'upload') {
      imagePicker()
        .then((res: any) => {
          if (res.didCancel == true) {
            this.setState({photoModal: false, uploadedImage: ''});
          } else {
            console.log(res);

            // this.setState({
            //   photoModal: false,
            //   orgImageBase64: res.base64,
            //   uploadedImage: res.uri,
            //   photofileType: res.type.split('/')[1],

            //   fileType: res.type.split('/')[1],
            // });

            var imgData = {
              name: res.name,
              uri: res.uri,
              type: res.type,
            };
            this.setState({fileLoading: true});

            profileUploader(res.type, res.type.split('/')[1], res.base64).then(
              (filename: any) => {
                imgData['uri'] = filename[0];
                console.log(imgData);

                this.setState({
                  fileLoading: false,
                  photoModal: false,
                  uploadedImage: filename[0],
                  // orgUploadImgUrl : filename[0],
                  photofileType: res.type,
                  fileType: res.type.split('/')[1],
                });
              },
            );
          }
        })
        .catch((err) => {
          this.setState({photoModal: false, uploadedImage: ''});
        });
    }
  };
  uplaodOrganizationImage = () => {};

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
              img_url: this.state.uploadedImage,
              projects: [],
            };

            console.log(data);
            api
              .createApi()
              .organization(data)
              .then((res: any) => {
                console.log('res');
                console.log(res);
                if (res.status == 200) {
                  if (this.state.selectedEmails.length != 0) {
                    var emails = this.state.selectedEmails;

                    var inviteData = {
                      emails: emails,
                      organization: res.data.data.organization_id,
                      invitedBy: email,
                      organizationName: this.state.org,
                    };
                    api
                      .createApi()
                      .inviteBulk(inviteData)
                      .then((invited) => {
                        this.setState({loading: false, errorModal: false});
                        AsyncStorage.setItem(
                          'invitedUsers',
                          JSON.stringify(emails),
                        );
                        this.props.navigation.navigate('createProject');
                      });
                  } else {
                    this.setState({loading: false, errorModal: false});
                    // this.props.navigation.navigate('createProject', {
                    //   organization: res.data.data.organization_id,
                    // });
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
          <View
            style={{
              marginRight: wp(5),
              marginLeft: wp(5),
              marginTop: wp(15),
              marginBottom: wp(5),
            }}>
            <View style={styles.content}>
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
              {/* Upload profile photo */}
              <TouchableOpacity
                onPress={() => this.imgCap('upload')}
                style={{
                  padding: wp(3),
                  // width: wp(50),
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <View>
                  {this.state.fileLoading ? (
                    <LottieView
                      autoPlay={true}
                      style={{width: wp(20)}}
                      source={animation.profileimage}
                      loop={true}
                    />
                  ) : (
                    <Avatar
                      rounded
                      size={wp(25)}
                      source={{
                        uri:
                          this.state.uploadedImage !== ''
                            ? this.state.uploadedImage
                            : 'https://via.placeholder.com/150',
                      }}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: wp(3.5),
                  fontFamily: fonts.SFuiDisplayBold,
                }}>
                Organization Logo
              </Text>

              <View>
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

                  {/* Project Leaders email suggestions */}

                  {/* selected projectLeaders tags */}

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
                  {/* Peoples email suggestions */}

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

                  {/* selected peoples tags */}
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
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

                  {/* Invite people */}
                  {/* <TouchableOpacity
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
                </View>

                <TouchableOpacity
                  onPress={() => this.createOrg()}
                  style={styles.siginBtnContainer}>
                  <Text style={styles.signinText}>Create Organization</Text>
                </TouchableOpacity>
              </View>
              {/* )} */}
            </View>
          </View>
        </ScrollView>

        {/* Error modal */}
        <Modal
          isVisible={this.state.errorModal}
          onBackdropPress={() =>
            this.setState({errorModal: false, loading: false})
          }>
          {this.state.loading == true && (
            <View>
              <View style={{alignSelf: 'center'}}>
                <LottieView
                  autoPlay={true}
                  style={{width: wp(90)}}
                  source={animation.loading}
                  loop={true}
                />
              </View>
            </View>
          )}
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state: AllSorDTO) => ({
  reduxState: state.allSors,
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrg);

import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View_sor, profileSetupSelections, createApi} from '@service';
import {connect} from 'react-redux';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps, route} from '@nav';
import {Avatar, Icon} from 'react-native-elements';
import {colors, images, GlStyles, fonts} from '@theme';
import {RouteProp} from '@react-navigation/native';
import {
  imagePicker,
  cameraCapture,
  suggestInActionsRecommendations,
} from '@utils';
import {Storage} from 'aws-amplify';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import {createApi as api} from '@service';
import {animation} from '@theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FadeOutToBottomAndroidSpec} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs';
type TellAboutYouNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'TellAboutYou'
>;
type TellAboutYouRouteProp = RouteProp<StackNavigatorProps, 'TellAboutYou'>;
const industries = [
  'Oil & Gas',
  'Mining and Quarrying',
  'Petrochemicals & Polymers',
  'Construction',
  'Power Generation & Distribution',
  'Transportation & Logistics',
  'Health Care & Pharmaceuticals',
];
export interface TellAboutYouProps {
  navigation: TellAboutYouNavigationProp;
  route: TellAboutYouRouteProp;
  reduxActions: any;
  reduxState: any;
}

class TellAboutYou extends React.Component<TellAboutYouProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      uploadedImage: '',
      photoModal: false,
      selected: 0,
      photo: '',
      photofileType: '',
      fileType: '',
      role: '',
      name: '',
      selectedIndustry: false,
      selectedDesignAndArchi: false,
      IndustrySelection: profileSetupSelections.IndustrySelection,
      DesignAndArchitecture: profileSetupSelections.DesignAndArchitecture,
      IndustrySelectionText: '',
      DesignAndArchitectureText: '',
      // Errors
      imageError: false,
      roleError: false,
      errorModal: false,
      nameError: false,
      laoding: false,
      arrayOfRole: [],

      IndustryRole: '',
    };
  }

  componentDidMount = () => {};

  imgCap = (str: string) => {
    if (str == 'upload') {
      imagePicker()
        .then((res: any) => {
          if (res.didCancel == true) {
            this.setState({photoModal: false, uploadedImage: ''});
          } else {
            console.log();
            this.setState({});
            this.setState({
              photoModal: false,
              uploadedImage: res.uri,
              photofileType: res.type,
              fileType: res.type.split('/')[1],
            });
          }
        })
        .catch((err) => {
          this.setState({photoModal: false, uploadedImage: ''});
        });
    } else {
      cameraCapture()
        .then((res: any) => {
          if (res.didCancel == true) {
            this.setState({photoModal: false, uploadedImage: ''});
          } else {
            this.setState({
              photoModal: false,
              uploadedImage: res.uri,
              photofileType: res.type,
              fileType: res.type.split('/')[1],
            });
          }
        })
        .catch((err) => {
          this.setState({photoModal: false, uploadedImage: ''});
        });
    }
  };

  updateProfile = () => {
    if (this.state.uploadedImage !== '') {
      if (this.state.name !== '') {
        if (this.state.DesignAndArchitectureText !== '') {
          this.setState({DesignAndArchitectureTextError: false});
          if (this.state.IndustryRole !== '') {
            var data = {
              bucket: 'hns-codist',
              report: 'profile',
              fileType: [this.state.photofileType],
              ext: [this.state.fileType],
            };

            console.log(data);
            createApi
              .createApi()
              .getFilesUrl(data)
              .then((geturi: any) => {
                console.log(geturi.data[0].url);
              });

            this.setState({
              loading: true,
              errorModal: true,
              IndustryRoleError: false,
            });
            api
              .createApi()
              .setUserInfo({
                email: this.props.route.params.username,
                role: this.state.DesignAndArchitectureText,
                department: this.state.IndustryRole,
                industry: this.state.name,
              })
              .then((res) => {
                console.log('with in set user info');
                console.log(res);
                console.log('with in set user info');
                if ((res.status = 200)) {
                  this.setState({
                    loading: false,
                    errorModal: false,
                  });
                  api
                    .createApi()
                    .getUser(this.props.route.params.username)
                    .then((res: any) => {
                      AsyncStorage.setItem(
                        'user',
                        JSON.stringify(res.data.data),
                      );
                    });
                  AsyncStorage.setItem(
                    'email',
                    this.props.route.params.username,
                  );

                  this.props.navigation.navigate('CreateOrganization');
                }
              });
          } else {
            this.setState({IndustryRoleError: true, nameError: false});
          }
        } else {
          this.setState({
            DesignAndArchitectureTextError: true,
            nameError: false,
          });
        }

        // api.
      } else {
        this.setState({nameError: true});
      }
    } else {
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* content */}
          <View>
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
              <View style={{marginTop: wp(10)}}>
                <Text style={styles.headingContainer}>
                  Tell us more about yourself
                </Text>

                {/* Upload profile photo */}
                <View style={{marginTop: wp(5)}}>
                  <Text
                    style={{
                      fontSize: wp(3),
                      opacity: 0.5,
                      fontFamily: fonts.SFuiDisplayMedium,
                    }}>
                    Upload your Profile Picture
                  </Text>

                  <View
                    style={{
                      padding: wp(3),
                      flexDirection: 'row',
                      width: wp(50),
                      justifyContent: 'space-between',
                    }}>
                    <View style={{paddingRight: wp(10)}}>
                      <Avatar
                        rounded
                        size={'large'}
                        source={{
                          uri:
                            this.state.uploadedImage !== ''
                              ? this.state.uploadedImage
                              : 'https://via.placeholder.com/150',
                        }}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontFamily: fonts.SFuiDisplayMedium,
                          opacity: 0.5,
                          fontSize: wp(3),
                          marginBottom: wp(4),
                        }}>
                        Upload picture from your phone gallery
                      </Text>
                      {/* Button to upload profile picture */}
                      <TouchableOpacity
                        onPress={() => this.imgCap('upload')}
                        style={{
                          borderWidth: wp(0.3),
                          alignItems: 'center',
                          padding: wp(3),
                          // width: wp(30),
                          borderRadius: wp(3),

                          borderColor: colors.primary,
                        }}>
                        <Text
                          style={{
                            fontSize: wp(3),
                            fontFamily: fonts.SFuiDisplayMedium,
                            color: colors.primary,
                          }}>
                          Upload Picture
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View style={styles.inputsContainer}>
                  <Text style={[styles.emailTextContainer, {marginTop: wp(2)}]}>
                    Your Industry*
                  </Text>
                  <View
                    style={[
                      styles.inputContainer,
                      this.state.selected == 0
                        ? {borderColor: colors.primary, padding: wp(0)}
                        : {
                            borderColor: colors.textOpa,
                            padding: wp(0),
                          },
                    ]}>
                    <TextInput
                      onFocus={() => this.setState({selected: 0})}
                      underlineColorAndroid="transparent"
                      style={styles.selectText}
                      value={this.state.name}
                      onChange={(e) =>
                        this.setState({name: e.nativeEvent.text})
                      }
                      placeholder={'Oil and Gas'}
                    />
                  </View>
                  {this.state.nameError && (
                    <Text style={{color: colors.error, fontSize: wp(3)}}>
                      * Enter your Industry Name
                    </Text>
                  )}
                  {/*Industry selectionv   */}
                  <Text style={styles.emailTextContainer}>Type of Role</Text>

                  <View
                    style={[
                      styles.inputContainer,
                      this.state.selected == 2
                        ? {borderColor: colors.primary, padding: wp(0)}
                        : {
                            borderColor: colors.textOpa,
                            padding: wp(0),
                          },
                    ]}>
                    <TextInput
                      // secureTextEntry={this.state.isEye}
                      style={styles.authInputs}
                      onFocus={() => this.setState({selected: 2})}
                      value={this.state.IndustryRole}
                      onChangeText={(e) => {
                        // if (validatePassword(this.state.password)) {
                        //   this.setState({error: false});
                        // } else {

                        //   this.setState({error: true});
                        // }

                        if (e !== '') {
                          this.setState({
                            arrayOfRole: suggestInActionsRecommendations(
                              e,
                              industries,
                            ),
                          });
                        } else {
                          this.setState({arrayOfRole: []});
                        }

                        console.log();

                        this.setState({IndustryRole: e});
                      }}
                      placeholder={'Top Management'}
                    />
                  </View>
                  {this.state.IndustryRoleError && (
                    <Text style={{color: colors.error, fontSize: wp(3)}}>
                      * Enter your Industry Role
                    </Text>
                  )}
                  {this.state.arrayOfRole.length != 0 ? (
                    <View style={styles.involveSuggestCont}>
                      {this.state.arrayOfRole.map((d: string, i: number) => (
                        <TouchableOpacity
                          key={i}
                          onPress={() => {
                            this.setState({
                              IndustryRole: d,
                              arrayOfRole: [],
                            });
                          }}
                          style={[
                            styles.involvePsuggCont,
                            this.state.arrayOfRole.length == i + 1
                              ? {borderBottomWidth: wp(0)}
                              : null,
                          ]}>
                          <Text style={styles.involvePSt}>{d}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : null}

                  {/* <Text style={styles.passwordWarning}>
                    Password must contain at least 8 characters and must include
                    numbers and special character.
                  </Text> */}
                  {/*Deraprtment selectionv   */}
                  <Text style={styles.emailTextContainer}>Your Role</Text>

                  <View
                    style={[
                      styles.inputContainer,
                      this.state.selected == 3
                        ? {borderColor: colors.primary, padding: wp(0)}
                        : {
                            borderColor: colors.textOpa,
                            padding: wp(0),
                          },
                    ]}>
                    <TextInput
                      onFocus={() => this.setState({selected: 3})}
                      underlineColorAndroid="transparent"
                      style={styles.selectText}
                      value={this.state.DesignAndArchitectureText}
                      onChange={(e) =>
                        this.setState({
                          DesignAndArchitectureText: e.nativeEvent.text,
                        })
                      }
                      placeholder={'General Management'}
                    />
                  </View>
                  {this.state.DesignAndArchitectureTextError && (
                    <Text style={{color: colors.error, fontSize: wp(3)}}>
                      * Enter your Role
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  onPress={() => this.updateProfile()}
                  style={styles.siginBtnContainer}>
                  <Text style={styles.signinText}>Continue</Text>
                  <Icon
                    containerStyle={{marginLeft: wp(2)}}
                    size={wp(5)}
                    name="arrowright"
                    type="antdesign"
                    color={colors.secondary}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* validations error */}
          {/* Modal Container */}
          {/* <Modal
            isVisible={this.state.errorModal}
            onBackdropPress={() =>
              this.setState({errorModal: false, loading: false})
            }>
            {this.state.loading == true && (
              <View>
                <ActivityIndicator color={colors.primary} size={'large'} />
              </View>
            )}
          </Modal> */}
          {/* Modal Container */}
          {/* <Modal
            isVisible={this.state.photoModal}
            onBackdropPress={() => this.setState({photoModal: false})}>
            <View
              style={{
                backgroundColor: colors.secondary,
                justifyContent: 'center',
                borderRadius: wp(8),
                padding: wp(10),
              }}>
              <TouchableOpacity
                onPress={() => this.imgCap('take')}
                style={[styles.takeaPhotoContainer, {marginTop: wp(1)}]}>
                <Icon
                  size={wp(5)}
                  name="camerao"
                  type="antdesign"
                  color={colors.text}
                />
                <Text style={[styles.selectText, {marginLeft: wp(10)}]}>
                  Take a photo
                </Text>
                <Icon
                  containerStyle={{position: 'absolute', right: wp(0)}}
                  size={wp(5)}
                  name="right"
                  type="antdesign"
                  color={colors.text}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.imgCap('upload')}
                style={styles.takeaPhotoContainer}>
                <Icon
                  size={wp(5)}
                  name="photo"
                  type="font-awesome"
                  color={colors.text}
                />
                <Text style={[styles.selectText, {marginLeft: wp(10)}]}>
                  Upload a photo
                </Text>
                <Icon
                  size={wp(5)}
                  name="right"
                  containerStyle={{position: 'absolute', right: wp(0)}}
                  type="antdesign"
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </Modal> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(TellAboutYou);

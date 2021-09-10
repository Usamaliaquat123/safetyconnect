import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
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
  // fileuploader,
  profileUploader,
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
type GoogleSigninOptnNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'GoogleSigninOptn'
>;
type GoogleSigninOptnRouteProp = RouteProp<
  StackNavigatorProps,
  'GoogleSigninOptn'
>;
const industries = [
  'Oil & Gas',
  'Mining and Quarrying',
  'Petrochemicals & Polymers',
  'Construction',
  'Power Generation & Distribution',
  'Transportation & Logistics',
  'Health Care & Pharmaceuticals',
  'Others (Please Specify)',
];

const typeofRole = [
  'CEO',
  'Director',
  'General Manager	',
  'Corporate Manager	',
  'Advisor',
  'Executive',
  'Other',
];

const yourRole = ['Manager', 'Supervisor', 'Craft Worker'];

export interface TellAboutYouProps {
  navigation: GoogleSigninOptnNavigationProp;
  route: GoogleSigninOptnRouteProp;
  reduxActions: any;
  reduxState: any;
}

class GoogleSigninOptn extends React.Component<GoogleSigninOptnProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      uploadedImage: '',
      photoModal: false,
      selected: 0,
      photo: '',
      photofileType: '',
      fileLoading: false,
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

      arrayOfTypesOfRole: [],
      IndustryRole: '',

      // Array of your role
      arrayOfYourRole: [],

      userFullNameError: false,
      userFullName: '',
    };
  }

  componentDidMount = () => {};

  imgCap = (str: string) => {
    if (str == 'upload') {
      imagePicker()
        .then((res: any) => {
          // console.log(res);
          if (res.didCancel == true) {
            this.setState({photoModal: false, uploadedImage: ''});
          } else {
            console.log();

            // RNFS.readFile(res.uri).then((file) => console.log(file));

            //   var data = {
            //     bucket:"hns-codist",
            //     report:"old",
            //     fileType: [""],
            //     ext:[""]
            // }

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

            // this.state.filename.push(imgData);

            this.setState({});

            // console.log(res);

            // this.setState({});
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
    if (this.state.name !== '') {
      if (this.state.uploadedImage !== '') {
        createApi
          .createApi()
          .createUser({
            name: this.state.name,
            email: this.props.route.params.data.emails, // dynal=mic link
            organization: [],
            img_url:
              'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
          })
          .then((res) => {
            this.setState({loading: false, errorModal: false});
            navigation.navigate('TellAboutYou', {
              username: user.signInUserSession.idToken.payload.email,
              isgoogle: true,
            });
          });
        this.setState({loading: false, errorModal: false});
      } else {
        this.setState({
          DesignAndArchitectureTextError: true,
          nameError: false,
        });
      }
    } else {
      this.setState({nameError: true});
    }
  };

  render() {
    return (
      <View style={[styles.container]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* content */}
          <View>
            {this.state.loading == true ? (
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginTop: wp(55),
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
                              this.state.uploadedImage != ''
                                ? this.state.uploadedImage
                                : 'https://via.placeholder.com/150',
                          }}
                        />
                      )}
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

                {/* {this.props.route.params.isgoogle == true && (
                  <View style={styles.inputsContainer}>
                    <Text
                      style={[styles.emailTextContainer, {marginTop: wp(2)}]}>
                      Your Full Name *
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
                        value={this.state.userFullName}
                        onChangeText={(e) => {
                          this.setState({userFullName: e});
                        }}
                        placeholder={'john doe'}
                      />
                    </View>
                    {this.state.userFullNameError && (
                      <Text style={{color: colors.error, fontSize: wp(3)}}>
                        * Enter your Industry Name
                      </Text>
                    )}
                  </View>
                )} */}

                {/* your industry */}
                <View style={styles.inputsContainer}>
                  <Text style={[styles.emailTextContainer, {marginTop: wp(2)}]}>
                    Your Full Name
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
                      onChangeText={(e) => {
                        if (e !== '') {
                          this.setState({
                            arrayOfRole: suggestInActionsRecommendations(
                              e.toLowerCase(),
                              industries,
                            ),
                          });
                        } else {
                          this.setState({arrayOfRole: []});
                        }
                        this.setState({name: e});
                      }}
                      placeholder={'Your Full Name '}
                    />
                  </View>

                  {this.state.nameError && (
                    <Text style={{color: colors.error, fontSize: wp(3)}}>
                      * Enter your Industry Name
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

export default connect(mapStateToProps, mapDispatchToProps)(GoogleSigninOptn);

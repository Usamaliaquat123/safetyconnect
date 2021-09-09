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

  uploadImageUri = async (url: any, img: any) => {
    const uri = img;
    const response = await fetch(uri);
    const imgBlob = await response.blob();

    RNFS.readFile(uri).then((file) => console.log(file));

    createApi
      .createApi('', '', '', '', '', '', url)
      .uploadFile(imgBlob)
      .then((res) => {
        console.log(img);
      });
  };

  updateProfile = () => {
    if (this.state.name !== '') {
      if (this.state.DesignAndArchitectureText !== '') {
        this.setState({DesignAndArchitectureTextError: false});
        if (this.state.IndustryRole !== '') {
          this.setState({
            loading: true,
            errorModal: true,
            IndustryRoleError: false,
          });

          var setUserInfoData = {
            email: this.props.route.params.username,
            role: this.state.DesignAndArchitectureText,
            department: this.state.IndustryRole,
            industry: this.state.name,
            img_url:
              this.state.uploadedImage === ''
                ? 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                : this.state.uploadedImage,
          };

          console.log(setUserInfoData);
          api
            .createApi()
            .setUserInfo(setUserInfoData)
            .then((res) => {
              console.log(res);
              if ((res.status = 200)) {
                this.setState({
                  loading: false,
                  errorModal: false,
                });
                api
                  .createApi()
                  .getUser(this.props.route.params.username)
                  .then((res: any) => {
                    AsyncStorage.setItem('user', JSON.stringify(res.data.data));
                  });
                AsyncStorage.setItem('email', this.props.route.params.username);

                this.props.navigation.navigate('CreateOrganization');
              }
            });
          //   .catch((err) => console.log(err));
          // } else if (res.status == null) {
          // }
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
                    Your Industry *
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
                      placeholder={'For example: Oil and Gas'}
                    />
                    <TouchableOpacity
                      style={{
                        // marginRight: wp(),
                        paddingRight: wp(2),
                        width: wp(10),
                        height: wp(10),
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}
                      onPress={() => {
                        if (this.state.arrayOfRole.length == 0) {
                          this.setState({arrayOfRole: industries});
                        } else {
                          this.setState({arrayOfRole: []});
                        }
                      }}>
                      <Icon
                        containerStyle={{marginRight: wp(3)}}
                        name={'down'}
                        type={'antdesign'}
                        size={wp(3)}
                        color={colors.text}
                      />
                    </TouchableOpacity>
                  </View>

                  {this.state.nameError && (
                    <Text style={{color: colors.error, fontSize: wp(3)}}>
                      * Enter your Industry Name
                    </Text>
                  )}
                  {this.state.arrayOfRole.length != 0 ? (
                    <View style={styles.involveSuggestCont}>
                      {this.state.arrayOfRole.map((d: string, i: number) => (
                        <TouchableOpacity
                          key={i}
                          onPress={() => {
                            this.setState({
                              name: d,
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
                  {/*Industry selection   */}
                  <Text style={styles.emailTextContainer}>Type of Role *</Text>

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
                            arrayOfTypesOfRole: suggestInActionsRecommendations(
                              e.toLowerCase(),
                              typeofRole,
                            ),
                          });
                        } else {
                          this.setState({arrayOfTypesOfRole: []});
                        }
                        this.setState({IndustryRole: e});
                      }}
                      placeholder={'For example: Top Management'}
                    />
                    <TouchableOpacity
                      style={{
                        // marginRight: wp(),
                        paddingRight: wp(6),
                        width: wp(10),
                        height: wp(10),
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}
                      onPress={() => {
                        if (this.state.arrayOfTypesOfRole.length == 0) {
                          this.setState({arrayOfTypesOfRole: typeofRole});
                        } else {
                          this.setState({arrayOfTypesOfRole: []});
                        }
                      }}>
                      <Icon
                        // containerStyle={{marginRight: wp(3)}}
                        name={'down'}
                        type={'antdesign'}
                        size={wp(3)}
                        color={colors.text}
                      />
                    </TouchableOpacity>
                  </View>
                  {this.state.IndustryRoleError && (
                    <Text style={{color: colors.error, fontSize: wp(3)}}>
                      * Enter your Industry Role
                    </Text>
                  )}

                  {this.state.arrayOfTypesOfRole.length != 0 ? (
                    <View style={styles.involveSuggestCont}>
                      {this.state.arrayOfTypesOfRole.map(
                        (d: string, i: number) => (
                          <TouchableOpacity
                            key={i}
                            onPress={() => {
                              this.setState({
                                IndustryRole: d,
                                arrayOfTypesOfRole: [],
                              });
                            }}
                            style={[
                              styles.involvePsuggCont,
                              this.state.arrayOfTypesOfRole.length == i + 1
                                ? {borderBottomWidth: wp(0)}
                                : null,
                            ]}>
                            <Text style={styles.involvePSt}>{d}</Text>
                          </TouchableOpacity>
                        ),
                      )}
                    </View>
                  ) : null}

                  {/* <Text style={styles.passwordWarning}>
                    Password must contain at least 8 characters and must include
                    numbers and special character.
                  </Text> */}
                  {/*Deraprtment selectionv   */}
                  <Text style={styles.emailTextContainer}>Your Role *</Text>

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
                      onChangeText={(e) => {
                        if (e !== '') {
                          this.setState({
                            arrayOfYourRole: suggestInActionsRecommendations(
                              e.toLowerCase(),
                              yourRole,
                            ),
                          });
                        } else {
                          this.setState({arrayOfYourRole: []});
                        }
                        this.setState({DesignAndArchitectureText: e});
                      }}
                      placeholder={'For example: General Management'}
                    />
                    <TouchableOpacity
                      style={{
                        // marginRight: wp(),
                        paddingRight: wp(6),
                        width: wp(10),
                        height: wp(10),
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}
                      onPress={() => {
                        if (this.state.arrayOfYourRole.length == 0) {
                          this.setState({arrayOfYourRole: yourRole});
                        } else {
                          this.setState({arrayOfYourRole: []});
                        }
                      }}>
                      <Icon
                        // containerStyle={{marginRight: wp(8)}}
                        name={'down'}
                        type={'antdesign'}
                        size={wp(3)}
                        color={colors.text}
                      />
                    </TouchableOpacity>
                  </View>
                  {this.state.DesignAndArchitectureTextError && (
                    <Text style={{color: colors.error, fontSize: wp(3)}}>
                      * Enter your Role
                    </Text>
                  )}
                  {this.state.arrayOfYourRole.length != 0 ? (
                    <View style={styles.involveSuggestCont}>
                      {this.state.arrayOfYourRole.map(
                        (d: string, i: number) => (
                          <TouchableOpacity
                            key={i}
                            onPress={() => {
                              this.setState({
                                DesignAndArchitectureText: d,
                                arrayOfYourRole: [],
                              });
                            }}
                            style={[
                              styles.involvePsuggCont,
                              this.state.arrayOfYourRole.length == i + 1
                                ? {borderBottomWidth: wp(0)}
                                : null,
                            ]}>
                            <Text style={styles.involvePSt}>{d}</Text>
                          </TouchableOpacity>
                        ),
                      )}
                    </View>
                  ) : null}
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

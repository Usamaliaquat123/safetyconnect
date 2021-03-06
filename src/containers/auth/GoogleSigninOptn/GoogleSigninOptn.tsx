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

export interface GoogleSigninOptnProps {
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
      createApi
        .createApi()
        .createUser({
          name: this.state.name,
          email: this.props.route.params.data, // dynal=mic link
          organization: [],
          img_url:
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
        })
        .then((res) => {
          this.setState({loading: false, errorModal: false});
          this.props.navigation.navigate('TellAboutYou', {
            username: this.props.route.params.data,
            isgoogle: true,
          });
        });
      this.setState({loading: false, errorModal: false});
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
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.headingContainer}>
                    Continue With Google
                  </Text>
                  <View style={styles.imgContainerOfSocialAccounts}>
                    <Image source={images.google} style={GlStyles.images} />
                  </View>
                </View>

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
                        this.setState({name: e});
                      }}
                      placeholder={'Your Full Name '}
                    />
                  </View>

                  {this.state.nameError && (
                    <Text style={{color: colors.error, fontSize: wp(3)}}>
                      * Enter your full name
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

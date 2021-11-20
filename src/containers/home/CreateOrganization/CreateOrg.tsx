import React, {useState, useEffect} from 'react';
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
  savedCurrentOrganization,
} from '@utils';
import RNFetchBlob from 'rn-fetch-blob';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as reduxActions from '@actions';
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
import {copilot, walkthroughable, CopilotStep} from 'react-native-copilot';
import {organizationDTO} from '@dtos';
import {getActiveChildNavigationOptions} from 'react-navigation';
import {validateEmail, profileUploader} from '@utils';
import {default as Model} from 'react-native-modal';
const WalkthroughableText = walkthroughable(Text);
const WalkthroughableTouchableOpacity = walkthroughable(TouchableOpacity);
const WalkthroughableView = walkthroughable(View);
const WalkthroughableInput = walkthroughable(TextInput);
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
  reduxState: organizationDTO;
}

const createOrg = (props: CreateOrgProps) => {
  const [loading, setloading] = useState(false);
  const [errorModal, seterrorModal] = useState(false);
  const [uploadedImage, setuploadedImage] = useState('');
  const [orgError, setorgError] = useState(false);
  const [orgDescError, setorgDescError] = useState(false);
  const [org, setorg] = useState('');
  const [orgDetails, setorgDetails] = useState('');
  const [peoplesText, setpeoplesText] = useState('');
  const [fileLoading, setfileLoading] = useState(false);
  const [peoples, setpeoples] = useState([]);
  const [suggestedEmail, setsuggestedEmail] = useState(false);
  const [selectedEmails, setselectedEmails] = useState([]);
  const [members, setmembers] = useState([]);
  const [assignProjects, setAssignProjects] = useState([]);
  const [unregisteredUser, setunregisteredUser] = useState([]);
  const [createNewProject, setcreateNewProject] = useState(false);
  const [photoModal, setphotoModal] = useState(false);
  // Searching for users
  const searchForUsers = (e: string) => {
    if (validateEmail(e)) {
      setsuggestedEmail(true);
    } else {
    }
    setpeoplesText(e);
  };

  // Image capture of the organization
  const imgCap = (str: string) => {
    if (str == 'upload') {
      imagePicker()
        .then((res: any) => {
          if (res.didCancel == true) {
            setuploadedImage('');
          } else {
            var imgData = {
              name: res.name,
              uri: res.uri,
              type: res.type,
            };
            setfileLoading(true);
            profileUploader(res.type, res.type.split('/')[1], res.base64).then(
              (filename: any) => {
                imgData['uri'] = filename[0];
                console.log(imgData);
                setfileLoading(false);
                setuploadedImage(filename[0]);
              },
            );
          }
        })
        .catch((err) => {
          setuploadedImage('');
        });
    }
  };

  // Create organization
  const createOrg = () => {
    // this.props.reduxActions;
    if (org !== '') {
      // if (this.state.orgDetails !== '') {
      AsyncStorage.getItem('email')
        .then((email: any) => {
          var data = {
            created_by: email,
            name: org,
            details: orgDetails === '' ? 'placeholder ' : orgDetails,
            members: [],
            img_url:
              uploadedImage == ''
                ? 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                : uploadedImage,
            projects: [],
          };

          console.log(data);
          console.log('this.state.selectedEmails');
          console.log(selectedEmails);

          props.reduxActions.createOrganization(
            data,
            selectedEmails,
            props.navigation,
          );
        })
        .catch((err) => {
          setloading(true);
          seterrorModal(true);
        });
    } else {
      setloading(false);
      setorgError(true);
    }
  };

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
              <Text style={styles.headingContainer}>Add New Organization</Text>
              {/* <Icon
                onPress={() => this.props.navigation.goBack()}
                containerStyle={{marginLeft: wp(2)}}
                name={'cross'}
                type={'entypo'}
                size={wp(4.6)}
                iconStyle={{opacity: 0.5}}
              /> */}
            </View>
            {/* Upload profile photo */}

            <TouchableOpacity
              onPress={() => imgCap('upload')}
              style={{
                padding: wp(3),
                // width: wp(50),
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <CopilotStep
                text="Upload your organization logo"
                order={1}
                name="openApp">
                <WalkthroughableView>
                  {fileLoading ? (
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
                          uploadedImage !== ''
                            ? uploadedImage
                            : 'https://via.placeholder.com/150',
                      }}
                    />
                  )}
                </WalkthroughableView>
              </CopilotStep>
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
                <CopilotStep
                  text="Enter your organization name"
                  order={2}
                  name="secondText">
                  <WalkthroughableView>
                    <View style={{flexDirection: 'row', marginBottom: wp(2)}}>
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

                    <View>
                      <View style={[styles.inputContainer]}>
                        <TextInput
                          value={org}
                          style={styles.authInputs}
                          onChangeText={(e) => setorg(e)}
                          placeholder={'Enter Organization Name'}
                        />
                      </View>
                    </View>

                    {orgError && (
                      <Text style={{fontSize: wp(3), color: colors.error}}>
                        Type your organization name
                      </Text>
                    )}
                  </WalkthroughableView>
                </CopilotStep>

                {/* Organization Description */}
                <View>
                  <View style={{flexDirection: 'row', marginTop: wp(3)}}>
                    <Text style={styles.emailTextContainer}>
                      Organization Description
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
                      value={orgDetails}
                      style={styles.authInputs}
                      onChangeText={(e) => setorgDetails(e)}
                      placeholder={'Enter Organization description here'}
                    />
                  </View>
                  {orgDescError && (
                    <Text style={{fontSize: wp(3), color: colors.error}}>
                      Type your organization description
                    </Text>
                  )}
                </View>

                {/* Project Leaders email suggestions */}

                {/* selected projectLeaders tags */}

                {/* People */}
                <CopilotStep
                  text="Invite co-workers or employees "
                  order={3}
                  name="peopleguide">
                  <WalkthroughableView>
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
                        value={peoplesText}
                        style={styles.authInputs}
                        onChangeText={(e) => searchForUsers(e)}
                        placeholder={'Enter name or add email'}
                      />
                    </View>
                    {orgError && (
                      <Text style={{fontSize: wp(3), color: colors.error}}>
                        Add people to the organization
                      </Text>
                    )}
                  </WalkthroughableView>
                </CopilotStep>
                {/* Peoples email suggestions */}

                <View>
                  {suggestedEmail == false ? null : (
                    <View style={styles.involveSuggestCont}>
                      <TouchableOpacity
                        onPress={() => {
                          selectedEmails.push(peoplesText);

                          setpeoplesText('');
                          setsuggestedEmail(false);
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
                            Invite {peoplesText}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {/* selected peoples tags */}
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {selectedEmails.length != 0 && (
                    <Tags
                      type={'organizationPeoplesSuggestioms'}
                      style={{height: wp(10)}}
                      tags={selectedEmails}
                      onClose={(d: any) =>
                        setselectedEmails(
                          selectedEmails.filter((v: any) => v !== d),
                        )
                      }
                    />
                  )}
                </View>
              </View>

              <TouchableOpacity
                onPress={() => createOrg()}
                style={styles.siginBtnContainer}>
                <Text style={styles.signinText}>Create Organization</Text>
              </TouchableOpacity>
            </View>
            {/* )} */}
          </View>
        </View>
      </ScrollView>

      {/* Error modal */}
      <Modal isVisible={props.reduxState.loading}>
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
      </Modal>
    </View>
  );
};

const mapStateToProps = (state: any) => ({
  reduxState: state.organizations,
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});
// guider copilot
var copCreateOrg = copilot({
  // style: {}
  verticalOffset: 24,
  animated: true,
  overlay: 'view',
})(createOrg);
export default connect(mapStateToProps, mapDispatchToProps)(copCreateOrg);

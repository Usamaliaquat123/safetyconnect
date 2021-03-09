import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Auth} from 'aws-amplify';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthNavigatorProp} from '@nav';
import {validatePassword} from '@utils';
import {colors, images, GlStyles} from '@theme';
import {RouteProp, ThemeProvider} from '@react-navigation/native';
import styles from './styles';
import LottieView from 'lottie-react-native';
import {createApi as api} from '@service';
import {animation} from '@theme';
import Modal from 'react-native-modal';

type CreatePassNavigationProp = StackNavigationProp<
  AuthNavigatorProp,
  'CreatePass'
>;
type CreatePassRouteProp = RouteProp<AuthNavigatorProp, 'CreatePass'>;

export interface CreatePassProps {
  navigation: CreatePassNavigationProp;
  route: CreatePassRouteProp;
  reduxActions: any;
  reduxState: any;
  // username: string;
}

class CreatePass extends React.Component<CreatePassProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      password: '',
      error: false,
      isEye: false,
      contentPopup: '',
      passMachErr: false,
      errorModal: false,
      passMatchText: '',
      loading: true,
    };
  }
  componentDidMount() {
    console.log(this.props.route.params.email, this.props.route.params.code);
  }

  componentWillUnmount = () => {
    this.setState({
      password: '',
      passMatchText: '',
    });
  };

  setupPass = () => {
    if (validatePassword(this.state.password)) {
      if (this.state.password == this.state.passMatchText) {
        try {
          this.setState({
            passMachErr: false,
            error: false,
            loading: true,
            errorModal: true,
          });
          Auth.forgotPasswordSubmit(
            this.props.route.params.email,
            this.props.route.params.code,
            this.state.password,
          )
            .then((res) => {
              Auth.signIn(
                this.props.route.params.email,
                this.state.password,
              ).then((res) => {
                this.setState({loading: false, errorModal: false});
                this.props.navigation.navigate('tellAboutYou', {
                  username: this.props.route.params.email,
                });
              });
            })
            .catch((err) => {
              this.setState({loading: false, errorModal: false});
              console.log(err);
            })
            .catch((err) => {
              this.setState({loading: false, errorModal: false});
              console.log(err);
            });
        } catch (err) {
          console.log(err);
          this.setState({loading: false, errorModal: false});
        }
      } else {
        this.setState({passMachErr: true, error: false});
      }
    } else {
      this.setState({error: true});
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headertle}>
              {/* <Icon
                containerStyle={{marginLeft: wp(2)}}
                onPress={() => this.props.navigation.goBack()}
                size={25}
                name="arrow-back-outline"
                type="ionicon"
                color={colors.secondary}
              /> */}
              <View>
                <Text style={styles.title}>Sign up</Text>
                <View style={styles.underScrore} />
              </View>
            </View>
          </View>
          {/* content */}
          <View style={styles.content}>
            {/* {this.state.loading == true ? ( */}
            {/* <View
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
                loading...
              </Text>
            </View> */}
            {/* ) : ( */}
            <View>
              <Text style={styles.headingContainer}>
                Welcome to Safety Connect
              </Text>
              {/* inputs container */}
              <View style={styles.inputsContainer}>
                <Text style={styles.passTextContainer}>Create Password</Text>
                <View style={[styles.inputContainer]}>
                  <TextInput
                    secureTextEntry={this.state.isEye}
                    style={styles.authInputs}
                    value={this.state.password}
                    onChange={(e) => {
                      // if (validatePassword(this.state.password)) {
                      //   this.setState({error: false});
                      // } else {
                      //   this.setState({error: true});
                      // }
                      this.setState({password: e.nativeEvent.text});
                    }}
                    placeholder={'******'}
                  />
                  <TouchableOpacity
                    onPress={() => this.setState({isEye: !this.state.isEye})}
                    style={styles.eyeIconContainer}>
                    {this.state.isEye == true ? (
                      <Icon
                        containerStyle={{opacity: 0.5}}
                        size={wp(5)}
                        name="eye-with-line"
                        type="entypo"
                        color={colors.text}
                      />
                    ) : (
                      <Icon
                        containerStyle={{opacity: 0.5}}
                        size={wp(5)}
                        name="eye"
                        type="antdesign"
                        color={colors.text}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                {this.state.error == true && (
                  <Text
                    style={{
                      paddingTop: wp(2),
                      color: colors.error,
                      fontSize: wp(3),
                    }}>
                    Enter your valid password..
                  </Text>
                )}
              </View>

              {/* {this.state.error && ( */}
              <View>
                <Text style={[styles.dontHaveAccount]}>
                  * Password must be a 8 characters long.
                </Text>
                <Text style={[styles.dontHaveAccount]}>
                  * Password must be at least one uppercase character.
                </Text>
                <Text style={[styles.dontHaveAccount]}>
                  * Password must be at least one lowercase character
                </Text>
                <Text style={[styles.dontHaveAccount]}>
                  * Password must be include one special character
                </Text>
              </View>
              {/* )} */}

              <View style={styles.inputsContainer}>
                <Text style={styles.passTextContainer}>Confirm Password</Text>
                <View style={[styles.inputContainer]}>
                  <TextInput
                    secureTextEntry={this.state.isEye}
                    style={styles.authInputs}
                    value={this.state.passMatchText}
                    onChange={(e) => {
                      if (this.state.password == e.nativeEvent.text) {
                        this.setState({passMachErr: false});
                      } else {
                        this.setState({passMachErr: true});
                      }
                      this.setState({passMatchText: e.nativeEvent.text});
                    }}
                    placeholder={'******'}
                  />
                  <TouchableOpacity
                    onPress={() => this.setState({isEye: !this.state.isEye})}
                    style={styles.eyeIconContainer}>
                    {this.state.isEye == true ? (
                      <Icon
                        containerStyle={{opacity: 0.5}}
                        size={wp(5)}
                        name="eye-with-line"
                        type="entypo"
                        color={colors.text}
                      />
                    ) : (
                      <Icon
                        containerStyle={{opacity: 0.5}}
                        size={wp(5)}
                        name="eye"
                        type="antdesign"
                        color={colors.text}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                {this.state.passMachErr == true && (
                  <Text
                    style={{
                      paddingTop: wp(2),
                      color: colors.error,
                      fontSize: wp(3),
                    }}>
                    Your password is not matched
                  </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={() => this.setupPass()}
                style={styles.siginBtnContainer}>
                <Text style={styles.signinText}>Continue</Text>
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
          {this.state.contentPopup !== '' && (
            <View
              style={{backgroundColor: colors.secondary, borderRadius: wp(4)}}>
              <Text>{this.state.contentPopup}</Text>
            </View>
          )}
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatePass);

// const handleSubmit = async (event) => {
//   event.preventDefault();
//   if (!shouldSubmit) {
//     toast((t) => <Toast type="error" message="Invalid Email" toastRef={t} />);
//     return;
//   }
//   // try to signup user with email and default password
//   try {
//     const signUpResponse = await Auth.signUp({
//       username: email,
//       password,
//       attributes: {
//         profile: 'NotConfirmed',
//       },
//     });
//     console.log(signUpResponse);
//     // check if user profile is confirmed or not.
//     if (signUpResponse.userConfirmed) {
//       // check if limit is not reached else send email for forgot password
//       const sendEmail = await Auth.forgotPassword(email).catch((error) => {
//         if (error.message.includes('limit')) {
//           console.log('here');
//           toast((t) => (
//             <Toast
//               type="error"
//               message="Attempt limit reached. Try again later."
//               toastRef={t}
//             />
//           ));
//         }
//       });
//       if (sendEmail) navigate('/verify-email', { state: { email } });
//     }
//     // navigate('/verify-email', navigate('/verify-email', {state: { email }}));
//   } catch (e) {
//     console.log(e.message);
//     if (e.message.includes('google')) {
//       navigate('/already-met');
//     }
//     Auth.signIn(email, process.env.REACT_APP_DEFAULT_PASSWORD)
//       .then()
//       .catch(async (err) => {
//         console.log(err);
//         if (err.message.includes('Incorrect')) {
//           toast((t) => (
//             <Toast
//               type="error"
//               message="Account already exists."
//               toastRef={t}
//             />
//           ));
//         }
//         if (err.message.includes('NotConfirmed')) {
//           const sendEmail = await Auth.forgotPassword(email).catch(
//             (error) => {
//               if (error.message.includes('limit')) {
//                 console.log('here');
//                 toast((t) => (
//                   <Toast
//                     type="error"
//                     message="Attempt limit reached. Try again later."
//                     toastRef={t}
//                   />
//                 ));
//               }
//             }
//           );
//           if (sendEmail) navigate('/verify-email', { state: { email } });
//         }
//       });
//   }
// };

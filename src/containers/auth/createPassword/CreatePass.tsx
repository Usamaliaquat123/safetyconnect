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
import {RouteProp} from '@react-navigation/native';
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
      errorModal: false,
    };
  }

  componentWillUnmount = () => {
    this.setState({
      password: '',
    });
  };
  createPass = async () => {
    if (this.state.password !== '') {
      if (validatePassword(this.state.password)) {
        console.log('sdsdsd');
        this.setState({loading: true, errorModal: true});
        const signup = await Auth.forgotPassword(
          this.props.route.params.username,
        );
        if (signup) {
          this.setState({loading: false, errorModal: false});
          try {
            Auth.signIn(this.props.route.params.username, this.state.password);
            this.props.navigation.navigate('tellAboutYou', {
              username: this.props.route.params.username,
            });

            console.log(signup);
          } catch (error) {
            console.log(error);
          }
        } else {
          this.setState({loading: false});
        }
      } else {
        console.log('Error avalidations');

        this.setState({error: true});
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
              <Icon
                containerStyle={{marginLeft: wp(2)}}
                onPress={() => this.props.navigation.goBack()}
                size={25}
                name="arrow-back-outline"
                type="ionicon"
                color={colors.secondary}
              />
              <View>
                <Text style={styles.title}>Sign up</Text>
                <View style={styles.underScrore} />
              </View>
            </View>
          </View>
          {/* content */}
          <View style={styles.content}>
            {/* {this.state.loading == true ? ( */}
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
                loading...
              </Text>
            </View>
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
                      if (validatePassword(this.state.password)) {
                        this.setState({error: false});
                      } else {
                        this.setState({error: true});
                      }
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
              </View>
              {/* {this.state.error && ( */}
              <View>
                <Text
                  style={[
                    styles.dontHaveAccount,
                    this.state.passError == '8char' && {color: colors.error},
                  ]}>
                  * Password must be a 8 characters long.
                </Text>
                <Text
                  style={[
                    styles.dontHaveAccount,
                    this.state.passError == 'upperCase' && {
                      color: colors.error,
                    },
                  ]}>
                  * Password must be at least one uppercase character.
                </Text>
                <Text
                  style={[
                    styles.dontHaveAccount,
                    this.state.passError == 'lowerCase' && {
                      color: colors.error,
                    },
                  ]}>
                  * Password must be at least one lowercase character
                </Text>
                <Text
                  style={[
                    styles.dontHaveAccount,
                    this.state.passError == 'specialChar' && {
                      color: colors.error,
                    },
                  ]}>
                  * Password must be include one special character
                </Text>
              </View>
              {/* )} */}

              <TouchableOpacity
                onPress={() => this.createPass()}
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

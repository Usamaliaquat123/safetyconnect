import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {
  View,
  ScrollView,
  Text,
  Image,
  Linking,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {colors, images, GlStyles, animation} from '@theme';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {Auth} from 'aws-amplify';
import {openInbox} from 'react-native-email-link';

import {RouteProp} from '@react-navigation/native';
import styles from './styles';
import dynamicLinks from '@react-native-firebase/dynamic-links';

type VerifyNavigationProp = StackNavigationProp<StackNavigatorProps, 'Verify'>;
type VerifyRouteProp = RouteProp<StackNavigatorProps, 'Verify'>;

export interface VerifyProps {
  navigation: VerifyNavigationProp;
  route: VerifyRouteProp;
  reduxActions: any;
  reduxState: any;
}

class Verify extends React.Component<VerifyProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      errorModal: false,

      disableVerify: false,
    };
  }

  componentDidMount() {
    dynamicLinks()
      .getInitialLink()
      .then((link) => this.handleDynamicLink(link));
    dynamicLinks().onLink(this.handleDynamicLink);
  }
  handleDynamicLink = (link: any) => {
    if (link != null) {
      if (link.url.split('/')[3].split('?')[0] == 'user-info') {
        this.props.navigation.navigate('CreatePass', {
          email: link.url
            .split('/')[3]
            .split('?')[1]
            .split('email=')[1]
            .split('&')[0],
          code: link.url
            .split('/')[3]
            .split('?')[1]
            .split('&')[1]
            .split('=')[1],
        });
      }
    }
  };
  // resend verification email
  handleResendVerificationEmail = async () => {
    if (this.state.disableVerify == false) {
      this.setState({loading: true, errorModal: true, disableVerify: true});
      await Auth.forgotPassword(this.props.route.params.email)
        .then(() => {
          this.setState({loading: false, errorModal: false});
          setTimeout(() => {
            this.setState({disableVerify: false});
          }, 10000);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.containerVerifyText}>
            <Text style={styles.headingContainer}>
              Please verify your email before
            </Text>
            <Text style={styles.headingContainer}>signing in.</Text>
          </View>

          {/* Open Gmail */}
          <TouchableOpacity
            onPress={() => {
              openInbox({app: 'gmail'});
            }}
            style={styles.siginwithGoogle}>
            <View style={{width: wp(7), height: wp(7), marginRight: wp(3)}}>
              <Image source={images.socialIcon.gmail} style={GlStyles.images} />
            </View>
            <Text style={styles.signinTextGoogle}>Open Gmail </Text>
          </TouchableOpacity>
          {/* Open Outlook */}
          <TouchableOpacity
            onPress={() => openInbox({app: 'outlook'})}
            style={styles.siginwithGoogle}>
            <View style={{width: wp(7), height: wp(7), marginRight: wp(3)}}>
              <Image
                source={images.socialIcon.outlook}
                style={GlStyles.images}
              />
            </View>
            <Text style={styles.signinTextGoogle}>Open Outlook </Text>
          </TouchableOpacity>
          {/* Open Yahoo */}
          <TouchableOpacity
            onPress={() => openInbox({app: 'yahoo'})}
            style={styles.siginwithGoogle}>
            <View style={{width: wp(7), height: wp(7), marginRight: wp(3)}}>
              <Image source={images.socialIcon.yahoo} style={GlStyles.images} />
            </View>
            <Text style={styles.signinTextGoogle}>Open Yahoo </Text>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: wp(10),
            }}>
            <Text style={styles.detailContainer}>
              {/* {this.props.route.params.email} */}
              Make sure to check your Spam or Junk again.
            </Text>
            <Text style={styles.detailContainer}>
              folders before requesting verfication link
            </Text>
            <Text style={styles.detailContainer}>again.</Text>
          </View>

          {/* Don't have a Acctouny */}
          <Text style={styles.dontHaveAccount}>Didn't received email ? </Text>
          <TouchableOpacity
            onPress={() => this.handleResendVerificationEmail()}
            style={[styles.createnewaccountContainer]}>
            <Text
              style={[
                styles.createNewAccount,
                this.state.disableVerify ? {opacity: 0.5} : null,
              ]}>
              Resend Verification Email
            </Text>
          </TouchableOpacity>

          {/* validations error */}
          {/* Modal Container */}
          <Modal
            isVisible={this.state.errorModal}
            onBackdropPress={() =>
              this.setState({errorModal: false, loading: false})
            }>
            {this.state.loading == true ? (
              <View style={{alignSelf: 'center'}}>
                <LottieView
                  autoPlay={true}
                  style={{width: wp(90)}}
                  source={animation.loading}
                  loop={true}
                />
              </View>
            ) : null}
          </Modal>

          {/* </View> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Verify);

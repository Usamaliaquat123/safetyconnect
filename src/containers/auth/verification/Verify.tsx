import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {colors, images, GlStyles} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
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
    this.state = {};
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

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* content */}
          {/* <View style={styles.content}> */}
          {/* <View style={{alignSelf: 'center'}}>
            <Image source={images.forgotPass} width={wp(40)} height={wp(40)} />
          </View> */}
          <View style={styles.containerVerifyText}>
            <Text style={styles.headingContainer}>
              Please verify your email before
            </Text>
            <Text style={styles.headingContainer}>signing in.</Text>
          </View>

          {/* Or */}
          {/* <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View> */}
          {/* Open Gmail */}
          <TouchableOpacity style={styles.siginwithGoogle}>
            <View style={{width: wp(7), height: wp(7), marginRight: wp(3)}}>
              <Image source={images.socialIcon.gmail} style={GlStyles.images} />
            </View>
            <Text style={styles.signinTextGoogle}>Open Gmail </Text>
          </TouchableOpacity>
          {/* Open Outlook */}
          <TouchableOpacity style={styles.siginwithGoogle}>
            <View style={{width: wp(7), height: wp(7), marginRight: wp(3)}}>
              <Image
                source={images.socialIcon.outlook}
                style={GlStyles.images}
              />
            </View>
            <Text style={styles.signinTextGoogle}>Open Outlook </Text>
          </TouchableOpacity>
          {/* Open Yahoo */}
          <TouchableOpacity style={styles.siginwithGoogle}>
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
            onPress={() => this.props.navigation.navigate('Login')}
            style={styles.createnewaccountContainer}>
            <Text style={styles.createNewAccount}>
              Resend Verification Email
            </Text>
          </TouchableOpacity>
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

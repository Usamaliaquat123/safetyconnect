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
    console.log(link);
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
          <View style={styles.header}>
            <View style={styles.headertle}>
              <View>
                <Text style={styles.title}>Sign up</Text>
                <View style={styles.underScrore} />
              </View>
            </View>
          </View>
          {/* content */}
          <View style={styles.content}>
            <View style={{alignSelf: 'center'}}>
              <Image
                source={images.forgotPass}
                width={wp(40)}
                height={wp(40)}
              />
            </View>
            <View style={styles.containerVerifyText}>
              <Text style={styles.headingContainer}>
                Please verify your email address!
              </Text>
            </View>
            <Text
              style={{
                marginTop: wp(3),
                fontSize: wp(3),
                color: colors.text,
                textAlign: 'center',
              }}>
              {this.props.route.params.email}
            </Text>
            <TouchableOpacity
              // onPress={() => this.props.navigation.navigate("")}
              style={styles.siginBtnContainer}>
              <Text style={styles.signinText}>Continue</Text>
            </TouchableOpacity>
            {/* Don't have a Acctouny */}
            <Text style={styles.dontHaveAccount}>
              Didn't receive an email ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}
              style={styles.createnewaccountContainer}>
              <Text style={styles.createNewAccount}>Resend Email</Text>
            </TouchableOpacity>
            {/* Or */}
            <View style={styles.orContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.line} />
            </View>
            {/* Google Signin */}
            <TouchableOpacity style={styles.siginwithGoogle}>
              <View style={{width: wp(5), height: wp(5), marginRight: wp(3)}}>
                <Image source={images.google} style={GlStyles.images} />
              </View>
              <Text style={styles.signinTextGoogle}>Continue with Google </Text>
            </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(Verify);

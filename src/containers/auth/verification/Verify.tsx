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
type VerifyNavigationProp = StackNavigationProp<StackNavigatorProps, 'Login'>;
type VerifyRouteProp = RouteProp<StackNavigatorProps, 'Login'>;

export interface VerifyProps {
  navigation: VerifyNavigationProp;
  route: VerifyRouteProp;
  reduxActions: any;
  reduxState: any;
}

class Verify extends React.Component<VerifyProps, any> {
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
            <View style={styles.containerVerifyText}>
              <Text style={styles.headingContainer}>Please verify your</Text>
              <Text style={styles.headingContainer}>email address!</Text>
            </View>

            <TouchableOpacity style={styles.siginBtnContainer}>
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

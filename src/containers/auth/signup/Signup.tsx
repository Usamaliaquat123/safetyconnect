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
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Icon, Avatar} from 'react-native-elements';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {colors, images, GlStyles} from '@theme';
import {RouteProp} from '@react-navigation/native';
import styles from './styles';
type SignupNavigationProp = StackNavigationProp<StackNavigatorProps, 'Login'>;
type SignupRouteProp = RouteProp<StackNavigatorProps, 'Login'>;

export interface SignupProps {
  navigation: SignupNavigationProp;
  route: SignupRouteProp;
  reduxActions: any;
  reduxState: any;
}

class Signup extends React.Component<SignupProps, any> {
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
            <Text style={styles.headingContainer}>Sign up</Text>
            {/* inputs container */}
            <View style={styles.inputsContainer}>
              {/* Email Container */}
              <Text style={styles.emailTextContainer}>Email</Text>
              <View style={[styles.inputContainer]}>
                <TextInput
                  style={styles.authInputs}
                  onChange={(e) => console.log(e)}
                  placeholder={'Enter your email'}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.siginBtnContainer}>
              <Text style={styles.signinText}>Continue</Text>
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
            {/* Don't have a Acctouny */}
            <Text style={styles.dontHaveAccount}>Already a member ? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}
              style={styles.createnewaccountContainer}>
              <Text style={styles.createNewAccount}>
                Signin to your existing account!
              </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

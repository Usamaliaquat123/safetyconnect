import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {Create_sor} from '@service';
import {RouteProp} from '@react-navigation/native';
import {colors, images, GlStyles} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
type LoginNavigationProp = StackNavigationProp<StackNavigatorProps, 'Login'>;
type LoginRouteProp = RouteProp<StackNavigatorProps, 'Login'>;

export interface LoginProps {
  navigation: LoginNavigationProp;
  route: LoginRouteProp;
  reduxActions: any;
  reduxState: any;
}

class Login extends React.Component<LoginProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedInput: 1,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <View>
                <Text style={styles.title}>Sign In</Text>
                <View style={styles.underScrore} />
              </View>
            </View>
          </View>
          {/* content */}
          <View style={styles.content}>
            <Text style={styles.headingContainer}>Sign In</Text>
            {/* inputs container */}
            <View style={styles.inputsContainer}>
              {/* Email Container */}
              <Text style={styles.emailTextContainer}>Email</Text>
              <View
                style={[
                  styles.inputContainer,
                  this.state.selectedInput == 1
                    ? {borderColor: colors.green}
                    : {borderColor: colors.textOpa},
                ]}>
                <TextInput
                  onFocus={() => this.setState({selectedInput: 1})}
                  style={styles.authInputs}
                  onChange={(e) => console.log(e)}
                  placeholder={'Enter your email'}
                />
              </View>
              {/* Password Container */}

              <Text style={styles.passTextContainer}>Password</Text>
              <View
                style={[
                  styles.inputContainer,
                  this.state.selectedInput == 2
                    ? {borderColor: colors.green}
                    : {borderColor: colors.textOpa},
                ]}>
                <TextInput
                  secureTextEntry={true}
                  onFocus={() => this.setState({selectedInput: 2})}
                  style={styles.authInputs}
                  onChange={(e) => console.log(e)}
                  placeholder={'******'}
                />
                <View style={styles.eyeIconContainer}>
                  <Icon
                    containerStyle={{opacity: 0.5}}
                    size={15}
                    name="eye"
                    type="feather"
                    color={colors.text}
                  />
                </View>
              </View>
            </View>
            <Text style={styles.forgetPassText}>Forget Password ? </Text>
            <TouchableOpacity style={styles.siginBtnContainer}>
              <Text style={styles.signinText}>Sign in </Text>
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
            <Text style={styles.dontHaveAccount}>Don't have an Account ?</Text>
            <TouchableOpacity style={styles.createnewaccountContainer}>
              <Text style={styles.createNewAccount}>Create New Account</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);

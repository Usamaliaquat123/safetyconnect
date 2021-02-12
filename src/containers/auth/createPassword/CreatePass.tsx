import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Auth} from 'aws-amplify';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {colors, images, GlStyles} from '@theme';
import {RouteProp} from '@react-navigation/native';
import styles from './styles';
type CreatePassNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'CreatePass'
>;
type CreatePassRouteProp = RouteProp<StackNavigatorProps, 'CreatePass'>;

export interface CreatePassProps {
  navigation: CreatePassNavigationProp;
  route: CreatePassRouteProp;
  reduxActions: any;
  reduxState: any;
  // username: string;
}

class CreatePass extends React.Component<CreatePassProps, any> {
  createPass = async () => {
    const signup = await Auth.forgotPassword(this.props.route.params.username);
    if (signup) this.props.navigation.navigate('tellAboutYou');
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
            <Text style={styles.headingContainer}>
              Welcome to Safety Connect
            </Text>
            {/* inputs container */}
            <View style={styles.inputsContainer}>
              <Text style={styles.passTextContainer}>Create Password</Text>
              <View style={[styles.inputContainer]}>
                <TextInput
                  secureTextEntry={true}
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
            {/* 8 char validation */}
            <Text style={styles.dontHaveAccount}>
              Password must be a 8 characters long.
            </Text>
            {/* 8 char validation */}
            <Text style={styles.dontHaveAccount}>
              Password must be contain a capital letter.
            </Text>
            {/* 8 char validation */}
            <Text style={styles.dontHaveAccount}>
              Password must be contain a number.
            </Text>
            <TouchableOpacity style={styles.siginBtnContainer}>
              <Text style={styles.signinText}>Continue</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatePass);

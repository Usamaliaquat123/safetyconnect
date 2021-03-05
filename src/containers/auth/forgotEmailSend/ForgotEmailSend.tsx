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
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthNavigatorProp} from '@nav';
import styles from './styles';
import {colors, images} from '@theme';
import {Icon} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export interface ForgotEmailSendProps {
  navigation: forgotEmailSendNavigationProp;
  route: forgotEmailSendRouteProp;
  reduxActions: any;
  reduxState: any;
}

type forgotEmailSendNavigationProp = StackNavigationProp<
  AuthNavigatorProp,
  'Forgot'
>;
type forgotEmailSendRouteProp = RouteProp<AuthNavigatorProp, 'Forgot'>;

class ForgotEmailSend extends React.Component<ForgotEmailSendProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

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
                <Text style={styles.title}>Forgot Password</Text>
                <View style={styles.underScrore} />
              </View>
            </View>
          </View>
          {/* content */}
          <View style={styles.content}>
            <View>
              <Text style={styles.headingContainer}>Forgot Password</Text>

              <View style={{alignItems: 'center', marginTop: wp(10)}}>
                <Image
                  source={images.forgotPass}
                  width={wp(80)}
                  height={wp(80)}
                />
              </View>
              {/* Don't have a Acctouny */}
              <View style={styles.dtHaveContainer}>
                <Text style={styles.dontHaveAccount}>
                  Email sent to you. Please check. If you haven't
                </Text>
                <Text style={styles.dontHaveAccount}>
                  received email. Click here to resend the link.
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={styles.siginBtnContainer}>
                <Text style={styles.signinText}>Resend Confirmation Link</Text>
              </TouchableOpacity>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotEmailSend);

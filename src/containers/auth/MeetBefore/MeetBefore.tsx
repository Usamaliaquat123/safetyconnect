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
import {RouteProp, CommonActions} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthNavigatorProp} from '@nav';
import styles from './styles';
import {colors, images, GlStyles} from '@theme';
import {Icon} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export interface MeetBeforeProps {
  navigation: MeetBeforeNavigationProp;
  route: MeetBeforeRouteProp;
  reduxActions: any;
  reduxState: any;
}

type MeetBeforeNavigationProp = StackNavigationProp<
  AuthNavigatorProp,
  'Forgot'
>;
type MeetBeforeRouteProp = RouteProp<AuthNavigatorProp, 'Forgot'>;

class MeetBefore extends React.Component<MeetBeforeProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: 'inconnent12345@outylook.com',
    };
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
                <Text style={styles.title}>Sign up</Text>
                <View style={styles.underScrore} />
              </View>
            </View>
          </View>
          {/* content */}
          <View style={styles.content}>
            <View>
              <Text style={styles.headingContainer}>
                Hey{' '}
                <Text style={{color: colors.text}}>
                  {this.state.email.split('@')[0]}
                </Text>{' '}
                , we&apos;ve already met!
              </Text>

              <View
                style={{
                  width: wp(80),
                  height: wp(50),
                  alignSelf: 'center',
                  marginTop: wp(10),
                }}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={images.meetBefore}
                  //   width={wp(40)}
                  //   height={wp(40)}
                />
              </View>
              {/* Don't have a Acctouny */}
              <View style={styles.dtHaveContainer}>
                <Text style={styles.dontHaveAccount}>
                  Looks like you already have an account.
                </Text>
                <Text style={styles.dontHaveAccount}>
                  please{' '}
                  <Text
                    style={{
                      fontSize: wp(3),
                      color: colors.primary,
                      fontWeight: 'bold',
                    }}>
                    Sign In
                  </Text>{' '}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [
                        {
                          name: 'Login',
                        },
                      ],
                    }),
                  );
                }}
                style={styles.siginwithGoogle}>
                <View style={{width: wp(5), height: wp(5), marginRight: wp(3)}}>
                  <Image source={images.google} style={GlStyles.images} />
                </View>
                <Text style={styles.signinTextGoogle}>Use Google Account </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(MeetBefore);

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
export interface NothingFoundProps {
  navigation: NothingFoundNavigationProp;
  route: NothingFoundRouteProp;
  reduxActions: any;
  reduxState: any;
}

type NothingFoundNavigationProp = StackNavigationProp<
  AuthNavigatorProp,
  'Forgot'
>;
type NothingFoundRouteProp = RouteProp<AuthNavigatorProp, 'Forgot'>;

class NothingFound extends React.Component<NothingFoundProps, any> {
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
                <Text style={styles.title}>View SOR</Text>
                <View style={styles.underScrore} />
              </View>
            </View>
          </View>
          {/* content */}
          <View style={styles.content}>
            <View>
              <Text style={styles.headingContainer}>Nothing Found</Text>

              <View style={{alignItems: 'center', marginTop: wp(5)}}>
                <Image
                  source={images.forgotPass}
                  width={wp(80)}
                  height={wp(80)}
                />
              </View>
              {/* Don't have a Acctouny */}
              <View style={styles.dtHaveContainer}>
                <Text style={styles.dontHaveAccount}>
                  Confirmation Link will be sent to you{' '}
                </Text>
                <Text style={styles.dontHaveAccount}>
                  on your given email address.{' '}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => this.signup()}
                style={styles.siginBtnContainer}>
                <Text style={styles.signinText}>Continue</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(NothingFound);

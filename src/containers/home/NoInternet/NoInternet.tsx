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

// import {StackNavigationProps} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import styles from './styles';
import {colors, images} from '@theme';

import {Icon} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export interface NoInternetProps {
  navigation: NoInternetNavigationProp;
  route: NoInternetRouteProp;
  reduxActions: any;
  reduxState: any;
}

type NoInternetNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'NoInternet'
>;
type NoInternetRouteProp = RouteProp<StackNavigatorProps, 'NoInternet'>;

class NoInternet extends React.Component<NoInternetProps, any> {
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
              <Text style={styles.headingContainer}>
                No Internet Connection
              </Text>

              <View style={{alignItems: 'center', marginTop: wp(10)}}>
                <Image
                  source={images.noInternet}
                  width={wp(80)}
                  height={wp(80)}
                />
              </View>
              {/* Don't have a Acctouny */}
              <View style={styles.dtHaveContainer}>
                <Text style={styles.dontHaveAccount}>
                  Sorry, there is no internet connection
                </Text>
                <Text style={styles.dontHaveAccount}>found your device.</Text>
              </View>

              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={styles.siginBtnContainer}>
                <Text style={styles.signinText}>Try Again</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(NoInternet);

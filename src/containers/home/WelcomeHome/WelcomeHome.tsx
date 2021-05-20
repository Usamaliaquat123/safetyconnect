import * as React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as reduxActions from '../../../store/actions/listSorActions';

import {Icon} from 'react-native-elements';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';

import {RouteProp} from '@react-navigation/native';
import {colors, images, GlStyles} from '@theme';
import {animation} from '@theme';
import LottieView from 'lottie-react-native';
import {createApi as api} from '@service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {bindActionCreators} from 'redux';

import {AllSorDTO} from '@dtos';
import {getActiveChildNavigationOptions} from 'react-navigation';
// import {validateEmail} from '@utils/';
type WelcomeHomeNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'WelcomeHome'
>;
type WelcomeHomeRouteProp = RouteProp<StackNavigatorProps, 'WelcomeHome'>;

export interface WelcomeHomeProps {
  navigation: WelcomeHomeNavigationProp;
  route: WelcomeHomeRouteProp;
  reduxActions: any;
  reduxState: any;
}

class WelcomeHome extends React.Component<WelcomeHomeProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  WelcomeHome = () => {};
  render() {
    return (
      <View style={styles.container}>
        <Text>Hey John! Lets start using SefetyConnect</Text>
      </View>
    );
  }
}

const mapStateToProps = (state: AllSorDTO) => ({
  reduxState: state.allSors,
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeHome);

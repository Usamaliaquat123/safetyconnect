import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
  RefreshControl,
  PanResponder,
  Image,
  TextInput,
} from 'react-native';
import {createApi, Create_sor, submitted} from '@service';
import {Icon, Avatar} from 'react-native-elements';
import {colors, fonts, animation, images, GlStyles} from '@theme';
import {AllSorDTO} from '@dtos';
import {connect} from 'react-redux';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Auth} from 'aws-amplify';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import {bindActionCreators} from 'redux';
import OneSignal from 'react-native-onesignal';
import * as reduxActions from '../../../../store/actions/listSorActions';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import {
  classifySor,
  filterAndMappingPersons,
  mapAllProjects,
  mapAllOrganizations,
  getCurrentProject,
} from '@utils';
import {Card, ListCard} from '@components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import {createApi} from '@service';
// import {Storage} from 'aws-amplify';

// import jwtDecode from 'jwt-decode';
import {Isor, involved_persons, orgnaization} from '@typings';
// import {  } from "";
type PreviewNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'Preview'
>;
type PreviewRouteProp = RouteProp<StackNavigatorProps, 'Preview'>;
// Project Id
export interface ViewAllProps {
  route: PreviewRouteProp;
  navigation: PreviewNavigationProp;
  reduxActions: any;
  reduxState: AllSorDTO;
  // initial: AllSorDTO;
  initialList: any;
}

export class Preview extends React.Component<ViewAllProps, any> {
  constructor(props: ViewAllProps) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    return (
      <View style={{backgroundColor: colors.secondary, flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <Icon
                size={25}
                name="arrow-back-outline"
                type="ionicon"
                color={colors.secondary}
              />
              <View>
                <Text style={styles.title}>Observations and Feedback</Text>
              </View>
            </View>
          </View>

          <View style={styles.content}></View>
        </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(Preview);

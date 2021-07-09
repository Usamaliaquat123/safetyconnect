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
type ViewAllSOrNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'ViewAllSOr'
>;
type ViewAllSOrRouteProp = RouteProp<StackNavigatorProps, 'ViewAllSOr'>;
// Project Id
export interface ViewAllProps {
  route: ViewAllSOrRouteProp;
  navigation: ViewAllSOrNavigationProp;
  reduxActions: any;
  reduxState: AllSorDTO;
  // initial: AllSorDTO;
  initialList: any;
}
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function dp(percentage: any) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = dp(80);
const itemHorizontalMargin = dp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const SLIDER_1_FIRST_ITEM = 1;
export class ViewAllSOr extends React.Component<ViewAllProps, any> {
  constructor(props: ViewAllProps) {
    super(props);
    this.state = {
      // animation of drafts
      AnimatedDownDraft: new Animated.Value(0),
      AnimatedOpacDraft: new Animated.Value(0),
      // animation of notified
      AnimatedDownNotify: new Animated.Value(0),
      AnimatedOpacNotify: new Animated.Value(0),
      // animation of submitted
      AnimatedDownSubmitted: new Animated.Value(0),
      AnimatedOpacSubmitted: new Animated.Value(0),
      currentlocation: Create_sor.Observation.locations[0],
      project: 'List View',
      isInProgress: false,
      isDraft: false,
      isSubmited: false,
      isExclated: false,
      isCompleted: false,
      selectP: false,
      draft: [],
      exclated: [],
      submitted: [],
      closed: [],
      inprogress: [],
      pendingClosure: [],
      repeatedSorModal: false,
      isAuthenticated: false,
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      bottomWidth: wp(100),
      setUser: '',
      // New sor modal popup
      newsorModal: false,
      refreshing: false,
      involvedPerson: [],
      repeatedSors: [],

      loading: false,
      projectId: '',
    };
  }

  componentDidMount = () => {
  
  };



  render() {
    return (
      <View style={{backgroundColor: colors.secondary, flex: 1}}>
        <ScrollView
        
          showsVerticalScrollIndicator={false}>
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
            <View style={styles.headerSelect}>
              {/* Project selector */}
              <View style={styles.leftSelector}>
                <TouchableOpacity
                  onPress={() => this.setState({project: 'List View'})}
                  style={{width: wp(5), height: wp(5)}}>
                  <Image
                    source={images.listview}
                    style={[
                      GlStyles.images,
                      this.state.project == 'List View'
                        ? {tintColor: colors.green}
                        : {tintColor: colors.lightGrey},
                    ]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({project: 'Board View'})}
                  style={{width: wp(5), height: wp(5), marginLeft: wp(5)}}>
                  <Image
                    source={images.boardView}
                    style={[
                      GlStyles.images,
                      this.state.project != 'List View'
                        ? {tintColor: colors.green}
                        : {tintColor: colors.lightGrey},
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
         
         
         
         
          </View>

          <View style={styles.content}>
         
          </View>

        
      
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewAllSOr);

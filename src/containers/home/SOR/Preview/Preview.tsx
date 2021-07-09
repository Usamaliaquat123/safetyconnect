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
import moment from 'moment';
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
  capitalizeFirstLetter,
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
    this.state = {
      sor_type: 'concern',
    };
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
                <Text style={styles.title}>Observation Summary</Text>
              </View>
            </View>
          </View>

          <View style={styles.content}>
            {/* Observation Details */}
            <View
              style={{
                // marginTop: wp(3),
                marginBottom: wp(3),
                paddingLeft: wp(3),
                paddingRight: wp(3),
              }}>
              {/* Observation ID */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',

                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: fonts.SFuiDisplayMedium,
                    fontSize: wp(4),
                    width: '50%',
                  }}>
                  Observation ID:
                </Text>
                <Text
                  style={{
                    // marginLeft: wp(10),
                    width: '50%',
                    fontFamily: fonts.SFuiDisplayLight,
                    fontSize: wp(3),
                  }}>
                  112233
                </Text>
              </View>
              {/* Observation Type */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',

                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    width: '50%',
                    fontFamily: fonts.SFuiDisplayMedium,
                    fontSize: wp(4),
                  }}>
                  Observation Type:
                </Text>
                <View
                  style={{
                    width: '50%',
                  }}>
                  <TouchableOpacity style={styles.classittleicon}>
                    {this.state.sor_type != 'lsr' ? (
                      <View>
                        {this.state.sor_type != 'near miss' ? (
                          <Icon
                            size={wp(3)}
                            name={
                              this.state.sor_type == 'lsr'
                                ? 'aperture'
                                : this.state.sor_type == 'positive'
                                ? 'check-circle'
                                : this.state.sor_type == 'concern'
                                ? 'warning'
                                : this.state.sor_type == 'near miss'
                                ? 'centercode'
                                : 'frowno'
                            }
                            type={
                              this.state.sor_type == 'lsr'
                                ? 'ionicon'
                                : this.state.sor_type == 'positive'
                                ? 'font-awesome-5'
                                : this.state.sor_type == 'concern'
                                ? 'antdesign'
                                : this.state.sor_type == 'near miss'
                                ? 'font-awesome-5'
                                : 'antdesign'
                            }
                            color={
                              this.state.sor_type == 'lsr'
                                ? colors.classify_sor_btns.lsr
                                : this.state.sor_type == 'positive'
                                ? colors.classify_sor_btns.positive
                                : this.state.sor_type == 'concern'
                                ? colors.classify_sor_btns.concern
                                : this.state.sor_type == 'near miss'
                                ? colors.classify_sor_btns.nearmiss
                                : 'frowno'
                            }
                          />
                        ) : null}
                      </View>
                    ) : null}

                    {this.state.sor_type == 'lsr' ? (
                      <View style={{width: wp(7), height: wp(7)}}>
                        <Image
                          source={images.lsr}
                          style={[GlStyles.images, {tintColor: colors.text}]}
                        />
                      </View>
                    ) : null}
                    {this.state.sor_type == 'near miss' ? (
                      <View style={{width: wp(8), height: wp(8)}}>
                        <Image
                          source={images.nearMiss}
                          style={GlStyles.images}
                        />
                      </View>
                    ) : null}
                    <Text
                      style={[
                        styles.clasifyT,
                        this.state.sor_type == 'lsr'
                          ? {color: colors.classify_sor_btns.lsr}
                          : this.state.sor_type == 'positive'
                          ? {color: colors.classify_sor_btns.positive}
                          : this.state.sor_type == 'concern'
                          ? {color: colors.classify_sor_btns.concern}
                          : this.state.sor_type == 'near miss'
                          ? {color: colors.classify_sor_btns.nearmiss}
                          : null,
                      ]}>
                      {capitalizeFirstLetter(this.state.sor_type)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Reported on  */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',

                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    width: '50%',
                    fontFamily: fonts.SFuiDisplayMedium,
                    fontSize: wp(4),
                  }}>
                  Reported on:
                </Text>
                <Text
                  style={{
                    width: '50%',
                    fontFamily: fonts.SFuiDisplayLight,
                    fontSize: wp(3),
                  }}>
                  {/* {moment(this.state.time).format('MMM DD, YYYY LT')} */}
                </Text>
              </View>
              {/* Project */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',

                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    width: '50%',
                    fontFamily: fonts.SFuiDisplayMedium,
                    fontSize: wp(4),
                  }}>
                  Project:
                </Text>
                <Text
                  style={{
                    width: '50%',
                    fontFamily: fonts.SFuiDisplayLight,
                    fontSize: wp(3),
                  }}>
                  {/* {this.state.projectName} */}
                </Text>
              </View>
              {/* Location */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',

                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    width: '50%',
                    fontFamily: fonts.SFuiDisplayMedium,
                    fontSize: wp(4),
                  }}>
                  Location:
                </Text>
                <Text
                  style={{
                    width: '50%',
                    fontFamily: fonts.SFuiDisplayLight,
                    fontSize: wp(3),
                  }}>
                  {/* {this.props.route.params.data.location} */}
                </Text>
              </View>
            </View>
            {/* Line  */}

            <View style={styles.lineheight} />

            {/* Observation Details */}
            <View style={{padding: wp(3)}}>
              <Text
                style={{fontSize: wp(4), fontFamily: fonts.SFuiDisplayBold}}>
                Observation Details
              </Text>
              {/* Date  */}
              <Text
                style={{fontSize: wp(3), fontFamily: fonts.SFuiDisplayLight}}>
                On {moment().format('MMMM Do YYYY, h:mm')}
              </Text>
              {/* Observation */}
              <Text
                style={{
                  fontSize: wp(3),
                  fontFamily: fonts.SFuiDisplayLight,
                }}>
                it was observed that
              </Text>

              {/*   Observation details */}
              <View style={{marginTop: wp(2)}}>
                {/* Observation type */}
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: wp(3.4)}}>Observation Type</Text>
                  {/* Obs type */}
                  <View></View>
                </View>
                {/* Observation status */}
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: wp(3.4)}}>Status</Text>
                  <Text style={{fontSize: wp(3.4), opacity: 0.5}}>Draft</Text>
                </View>
                {/* potiential risk */}
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: wp(3.4)}}>Potiential Risk</Text>
                  {/* Potitential risk */}
                  <View></View>
                </View>
                {/* Actual risk */}
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: wp(3.4)}}>Actual Risk</Text>
                  {/* Actual Risk */}
                  <View></View>
                </View>
              </View>
            </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Preview);

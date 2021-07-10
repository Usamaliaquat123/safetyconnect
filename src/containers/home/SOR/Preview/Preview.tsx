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
import {bindActionCreators} from 'redux';
import * as reduxActions from '../../../../store/actions/listSorActions';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp} from '@react-navigation/native';
import {
  classifySor,
  filterAndMappingPersons,
  mapAllProjects,
  capitalizeFirstLetter,
  downloadFile,
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
    this.state = {
      sor_type: 'concern',
      prisk:
        this.props.route.params.data.potential_risk?.likelihood *
        this.props.route.params.data.potential_risk?.severity,

      risk:
        this.props.route.params.data.risk.likelihood *
        this.props.route.params.data.risk.severity,
      createdByName: '',
      projectName: '',
      attachments: [],
      involvedperson: [],
    };
  }

  // Print sor
  printSor = () => {};
  componentDidMount = () => {
    // this.props.route.
    console.log('this.props.route.params.data');
    console.log(this.props.route.params.data);

    createApi
      .createApi()
      .getUser(this.props.route.params.data.created_by)
      .then((user: any) => {
        this.setState({createdByName: user.data.data.name});
      });

    getCurrentProject().then((currentProj: any) => {
      createApi
        .createApi()
        .getProject({projectid: currentProj})
        .then((res: any) => {
          this.setState({
            projectName: res.data.data.project_name,
          });

          this.setState({
            involvedperson: this.props.route.params.data.involved_persons[0]
              .name,
          });
          this.getAllAttachments(this.props.route.params.data.attachments);
        });
    });
  };

  // get All Attachments
  getAllAttachments = (attach: any) => {
    var dta = attach.map((d) => `report/${d}`);

    var data = {
      bucket: 'hns-codist',
      report: dta,
    };

    createApi
      .createApi()
      .getFileApi(data)
      .then((d: any) => {
        for (let i = 0; i < d.data.length; i++) {
          if (
            attach[i].split('.')[1] == 'png' ||
            attach[i].split('.')[1] == 'jpeg' ||
            attach[i].split('.')[1] == 'jpg'
          ) {
            this.state.attachments.push({
              type: 'image',
              upload: '',
              name: attach[i],
              uri: d.data[i],
            });

            this.setState({});
          } else if (attach[i].split('.')[1] == 'pdf') {
            this.state.attachments.push({
              type: 'pdf',
              upload: '',
              name: attach[i],
              uri: d.data[i],
            });
            this.setState({});
          } else if (
            attach[i].split('.')[1] == 'docx' ||
            attach[i].split('.')[1] == 'doc'
          ) {
            this.state.attachments.push({
              type: 'pdf',
              upload: '',
              name: attach[i],
              uri: d.data[i],
            });
            this.setState({});
          } else if (attach[i].split('.')[1] == 'xlsx') {
            this.state.attachments.push({
              type: 'xlsx',
              upload: '',
              name: attach[i],
              uri: d.data[i],
            });
            this.setState({});
          }
        }
      });
  };

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
                marginTop: wp(3),
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
                    fontFamily: fonts.SFuiDisplayBold,
                    fontSize: wp(3),
                    width: '50%',
                  }}>
                  Observation ID:
                </Text>
                <Text
                  style={{
                    // marginLeft: wp(10),
                    width: '50%',
                    fontFamily: fonts.SFuiDisplayMedium,
                    fontSize: wp(3),
                  }}>
                  112233
                </Text>
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
                    fontFamily: fonts.SFuiDisplayBold,
                    fontSize: wp(3),
                  }}>
                  Reported on:
                </Text>
                <Text
                  style={{
                    width: '50%',
                    fontFamily: fonts.SFuiDisplayMedium,
                    fontSize: wp(3),
                  }}>
                  {moment(this.props.route.params.data.occured_at).format(
                    'MMM DD, YYYY LT',
                  )}
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
                    fontFamily: fonts.SFuiDisplayBold,
                    fontSize: wp(3),
                  }}>
                  Project:
                </Text>
                <Text
                  style={{
                    width: '50%',
                    fontFamily: fonts.SFuiDisplayMedium,
                    fontSize: wp(3),
                  }}>
                  {this.state.projectName}
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
                    fontFamily: fonts.SFuiDisplayBold,
                    fontSize: wp(3),
                  }}>
                  Location:
                </Text>
                <Text
                  style={{
                    width: '50%',
                    fontFamily: fonts.SFuiDisplayMedium,
                    fontSize: wp(3),
                  }}>
                  {this.props.route.params.data.location}
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
                {this.props.route.params.data.details}
              </Text>

              {/*   Observation details */}
              <View style={{marginTop: wp(2)}}>
                {/* Observation type */}
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      width: '50%',
                      fontSize: wp(3),
                      fontFamily: fonts.SFuiDisplayBold,
                    }}>
                    Observation Type
                  </Text>
                  {/* Obs type */}

                  <View
                    style={{
                      width: '50%',
                    }}>
                    <TouchableOpacity style={styles.classittleicon}>
                      {this.props.route.params.data.sor_type != 'lsr' ? (
                        <View>
                          {this.props.route.params.data.sor_type !=
                          'near miss' ? (
                            <Icon
                              size={wp(3)}
                              name={
                                this.props.route.params.data.sor_type == 'lsr'
                                  ? 'aperture'
                                  : this.props.route.params.data.sor_type ==
                                    'positive'
                                  ? 'check-circle'
                                  : this.props.route.params.data.sor_type ==
                                    'concern'
                                  ? 'warning'
                                  : this.props.route.params.data.sor_type ==
                                    'near miss'
                                  ? 'centercode'
                                  : 'frowno'
                              }
                              type={
                                this.props.route.params.data.sor_type == 'lsr'
                                  ? 'ionicon'
                                  : this.props.route.params.data.sor_type ==
                                    'positive'
                                  ? 'font-awesome-5'
                                  : this.props.route.params.data.sor_type ==
                                    'concern'
                                  ? 'antdesign'
                                  : this.props.route.params.data.sor_type ==
                                    'near miss'
                                  ? 'font-awesome-5'
                                  : 'antdesign'
                              }
                              color={
                                this.props.route.params.data.sor_type == 'lsr'
                                  ? colors.classify_sor_btns.lsr
                                  : this.props.route.params.data.sor_type ==
                                    'positive'
                                  ? colors.classify_sor_btns.positive
                                  : this.props.route.params.data.sor_type ==
                                    'concern'
                                  ? colors.classify_sor_btns.concern
                                  : this.props.route.params.data.sor_type ==
                                    'near miss'
                                  ? colors.classify_sor_btns.nearmiss
                                  : 'frowno'
                              }
                            />
                          ) : null}
                        </View>
                      ) : null}

                      {this.props.route.params.data.sor_type == 'lsr' ? (
                        <View style={{width: wp(7), height: wp(7)}}>
                          <Image
                            source={images.lsr}
                            style={[GlStyles.images, {tintColor: colors.text}]}
                          />
                        </View>
                      ) : null}
                      {this.props.route.params.data.sor_type == 'near miss' ? (
                        <View style={{width: wp(5), height: wp(5)}}>
                          <Image
                            source={images.nearMiss}
                            style={GlStyles.images}
                          />
                        </View>
                      ) : null}
                      <Text
                        style={[
                          styles.clasifyT,
                          this.props.route.params.data.sor_type == 'lsr'
                            ? {color: colors.classify_sor_btns.lsr}
                            : this.props.route.params.data.sor_type ==
                              'positive'
                            ? {color: colors.classify_sor_btns.positive}
                            : this.props.route.params.data.sor_type == 'concern'
                            ? {color: colors.classify_sor_btns.concern}
                            : this.props.route.params.data.sor_type ==
                              'near miss'
                            ? {color: colors.classify_sor_btns.nearmiss}
                            : null,
                        ]}>
                        {capitalizeFirstLetter(
                          this.props.route.params.data.sor_type,
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* Observation status */}
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: wp(1),
                    marginBottom: wp(1),
                  }}>
                  <Text
                    style={{
                      width: '50%',

                      fontSize: wp(3),
                      fontFamily: fonts.SFuiDisplayBold,
                    }}>
                    Status
                  </Text>
                  <Text
                    style={{
                      fontSize: wp(2.7),
                      opacity: 0.5,
                      fontFamily: fonts.SFuiDisplayMedium,
                    }}>
                    {this.props.route.params.data.status == 1
                      ? 'Draft'
                      : this.props.route.params.data.status == 2
                      ? 'In Progress'
                      : this.props.route.params.data.status == 3
                      ? 'Esclated To'
                      : this.props.route.params.data.status == 4
                      ? 'Pending Closure'
                      : this.props.route.params.data.status == 5
                      ? 'Closed'
                      : '--'}
                  </Text>
                </View>
                {/* potiential risk */}
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: wp(1),
                    marginBottom: wp(1),
                  }}>
                  <Text
                    style={{
                      width: '50%',
                      fontSize: wp(3),
                      fontFamily: fonts.SFuiDisplayBold,
                    }}>
                    Potiential Risk
                  </Text>
                  {/* Potitential risk */}
                  <View
                    style={[
                      styles.riskCapacity,
                      this.state.prisk < 6
                        ? {backgroundColor: colors.green}
                        : this.state.prisk < 14
                        ? {backgroundColor: colors.yellow}
                        : {backgroundColor: colors.error},
                    ]}>
                    <Text style={styles.riskCapacityText}>
                      {this.state.prisk < 6
                        ? `${this.state.prisk}-low`
                        : this.state.prisk < 14
                        ? `${this.state.prisk}-Medium`
                        : `${this.state.prisk}-High`}
                    </Text>
                  </View>
                </View>
                {/* Actual risk */}
                <View style={{flexDirection: 'row', marginBottom: wp(3)}}>
                  <Text
                    style={{
                      fontSize: wp(3),
                      width: '50%',
                      fontFamily: fonts.SFuiDisplayBold,
                    }}>
                    Actual Risk
                  </Text>
                  {/* Actual Risk */}
                  <View
                    style={[
                      styles.riskCapacity,
                      this.state.risk < 6
                        ? {backgroundColor: colors.green}
                        : this.state.risk < 14
                        ? {backgroundColor: colors.yellow}
                        : {backgroundColor: colors.error},
                    ]}>
                    <Text style={styles.riskCapacityText}>
                      {this.state.risk < 6
                        ? `${this.state.risk}-low`
                        : this.state.risk < 14
                        ? `${this.state.risk}-Medium`
                        : `${this.state.risk}-High`}
                    </Text>
                  </View>
                </View>

                {/* Actions and recommendations */}
                {this.props.route.params.data.action_required.length != 0 && (
                  <View style={styles.lineheight} />
                )}

                {this.props.route.params.data.action_required.length != 0 && (
                  <>
                    <View style={{marginTop: wp(3), marginBottom: wp(3)}}>
                      <Text
                        style={{
                          fontSize: wp(4),
                          fontFamily: fonts.SFuiDisplayBold,
                        }}>
                        Actions and Recommendations{' '}
                      </Text>

                      {this.props.route.params.data.action_required.map(
                        (d, i) => (
                          <Text
                            style={{
                              fontSize: wp(3),
                              fontFamily: fonts.SFuiDisplayMedium,
                            }}>
                            {i + 1}. {d.content}
                          </Text>
                        ),
                      )}
                    </View>
                  </>
                )}

                {/* Line  */}

                <View style={styles.lineheight} />
                {/* Line  */}

                {/* People */}
                <View style={{marginTop: wp(3), marginBottom: wp(3)}}>
                  <Text
                    style={{
                      fontSize: wp(4),
                      fontFamily: fonts.SFuiDisplayBold,
                    }}>
                    People
                  </Text>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontSize: wp(3),
                          fontFamily: fonts.SFuiDisplayBold,
                          marginRight: wp(30),
                        }}>
                        Initiated By :{' '}
                      </Text>
                      <Text
                        style={{
                          fontSize: wp(3),
                          fontFamily: fonts.SFuiDisplayMedium,
                        }}>
                        {' '}
                        {this.state.createdByName}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontSize: wp(3),
                          fontFamily: fonts.SFuiDisplayBold,
                          marginRight: wp(23),
                        }}>
                        Area Supervisor :{' '}
                      </Text>
                      <Text
                        style={{
                          fontSize: wp(3),
                          fontFamily: fonts.SFuiDisplayMedium,
                        }}>
                        {' '}
                        --
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontSize: wp(3),
                          fontFamily: fonts.SFuiDisplayBold,
                          marginRight: wp(21),
                        }}>
                        Involved Persons :{' '}
                      </Text>
                      <Text
                        style={{
                          fontSize: wp(3),
                          fontFamily: fonts.SFuiDisplayMedium,
                        }}>
                        {' '}
                        {this.state.involvedperson}
                      </Text>
                    </View>
                  </View>
                </View>

                {this.state.attachments.length != 0 && (
                  <View style={styles.lineheight} />
                )}

                {this.state.attachments.length != 0 && (
                  <View>
                    <View style={{marginTop: wp(3), marginBottom: wp(3)}}>
                      <Text
                        style={{
                          fontSize: wp(4),
                          fontFamily: fonts.SFuiDisplayBold,
                        }}>
                        Attachments
                      </Text>
                    </View>
                    {/* All Attachments */}
                    <View style={{marginTop: wp(1), marginBottom: wp(5)}}>
                      {this.state.attachments.map((d: any, i: number) => (
                        <View>
                          {/* {d.type != 'image' ? ( */}
                          <View style={styles.attachFileContainer}>
                            <View>
                              <Image
                                source={
                                  d.type == 'pdf'
                                    ? images.pdf
                                    : d.type == 'doc'
                                    ? images.doc
                                    : d.type == 'text'
                                    ? images.text
                                    : d.type == 'doc'
                                    ? images.doc
                                    : d.type == 'image'
                                    ? images.imageIcon
                                    : null
                                }
                                style={{width: wp(7), height: wp(7)}}
                              />
                            </View>
                            <Text style={styles.attchFileText}>
                              {d.name.substring(0, 10)}.../.{d.type}
                            </Text>
                            <View
                              style={{
                                position: 'absolute',
                                right: wp(1),
                                top: wp(1.5),
                                alignItems: 'center',
                                flexDirection: 'row',
                              }}>
                              <TouchableOpacity
                                onPress={() => {
                                  if (d.upload != 'self') {
                                    // this.photoAnim.play();
                                    downloadFile(d.uri, d.type)
                                      .then((res: any) => {
                                        console.log(res);
                                      })
                                      .catch((err) => {});
                                  }
                                }}>
                                <Icon
                                  name={'clouddownload'}
                                  type={'antdesign'}
                                  color={colors.text}
                                  containerStyle={{
                                    opacity: 0.5,
                                    marginTop: wp(3),
                                    marginRight: wp(3),
                                  }}
                                />
                              </TouchableOpacity>

                              {d.upload == 'self' ? (
                                <TouchableOpacity
                                  onPress={() => {
                                    var arr = [
                                      ...this.state.attachments,
                                    ].filter((b) => b != d);
                                    this.setState({attachments: arr});
                                  }}>
                                  <Icon
                                    containerStyle={{
                                      marginRight: wp(2),
                                      marginTop: wp(2),
                                      opacity: 0.5,
                                    }}
                                    name="circle-with-cross"
                                    size={wp(5)}
                                    type="entypo"
                                    color={colors.text}
                                  />
                                </TouchableOpacity>
                              ) : null}
                            </View>
                          </View>
                          {/* // ) : null} */}
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                <TouchableOpacity
                  onPress={() => this.printSor()}
                  style={{
                    padding: wp(4),
                    backgroundColor: colors.green,
                    borderRadius: wp(3),
                  }}>
                  <Text
                    style={{
                      fontSize: wp(3.4),
                      fontFamily: fonts.SFuiDisplayBold,
                      color: colors.secondary,
                      textAlign: 'center',
                    }}>
                    Print
                  </Text>
                </TouchableOpacity>
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

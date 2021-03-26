import * as React from 'react';

import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
  Modal,
  Easing,
  Alert,
  ActivityIndicator,
} from 'react-native';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import moment from 'moment';
import {connect} from 'react-redux';
import {Icon, Avatar, Card} from 'react-native-elements';
import {colors, GlStyles, animation, images, fonts} from '@theme';
import {
  View_sor,
  notified,
  Create_sor,
  riskxSeverityxliklihood,
  createApi,
} from '@service';
import styles from './style';
import {StackNavigationProp} from '@react-navigation/stack';
import {Tags, Chart, CommentPop, SuggestionsPop} from '@components';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {default as Model} from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  imagePicker,
  capitalizeFirstLetter,
  cameraCapture,
  searchInSuggestions,
  imageVideoDetector,
  DocType,
  imageAndVideoObjectMap,
  downloadFile,
} from '@utils';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {involved_persons, actions} from '@typings';
import {number} from 'prop-types';
import {ForceTouchGestureHandler} from 'react-native-gesture-handler';
// import {colors} from '@theme';
// import listAction from './../../../../store/actions/listActions';
type ViewSORNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'ViewSOR'
>;
type ViewSORRouteProp = RouteProp<StackNavigatorProps, 'ViewSOR'>;
export interface ViewSORProps {
  route: ViewSORRouteProp;
  navigation: ViewSORNavigationProp;
  reduxActions: any;
  reduxState: any;
}

class ViewSOR extends React.Component<ViewSORProps, any> {
  public animation: any;
  public photoAnim: any;
  public fileNotSupported: any;
  constructor(props: any) {
    super(props);
    this.state = {
      time: this.props.route.params.data.occured_at,
      initAnim: new Animated.Value(0),
      imageViewer: false,
      images: [],
      photoArr: [],
      selectedInput: 0,
      commentText: '',
      contentAnim: new Animated.Value(80),
      // custom data
      sor_type: this.props.route.params.data.sor_type,
      observation: this.props.route.params.data.details,
      date: this.props.route.params.data.occured_at,
      comments: View_sor.user.comments,
      involvedPerson: [],
      notifiedPerson: this.props.route.params.data.esclate_to,
      attachments: [],

      actionsAndRecommendations: this.props.route.params.data.action_required,
      // popup Assigners
      addAssigners: false,
      involveAndNotifiedUsersName: '',
      IsaddInvAndNotifiedUser: false,
      involvedAndNotifiedUserType: 'involved',
      commentAttachment: [],
      addInvolvedandNotifiedUsers: [],
      selectedRisk: true,
      // Risk Array
      liklihood: riskxSeverityxliklihood.liklihood,
      severity: riskxSeverityxliklihood.severity,
      invPhoto: '',
      // for selection
      notifiedAndInv: 0,
      // comments edit
      editDelComment: false,
      editAttachedCommentArr: [],
      EditcommentText: '',
      editDiscardComment: '',
      editDiscardCommentIndex: 0,
      // actions and recommendation

      SuggestionPop: false,
      allActionsEdit: [],
      newActions: false,
      allActionsEditIndex: 0,
      // actions and recommendations
      actionsAndRecommendationText: '',
      // Submited to
      submitted_to: this.props.route.params.data.submit_to,
      esclate_to: this.props.route.params.data.esclate_to,

      editInvolvedAndEsclatedPersons: false,
      involvePersonsSelected: false,

      // Loading
      loading: false,
    };

    this.animation = React.createRef();
    this.photoAnim = React.createRef();
    this.fileNotSupported = React.createRef();
  }

  componentDidMount = () => {
    // this.props.route.params.data.action_required
    for (
      let i = 0;
      i < this.props.route.params.data.action_required.length;
      i++
    ) {
      this.props.route.params.data.action_required[i]['date'] = moment(
        this.props.route.params.data.action_required[i].date,
      ).format('YYYY-MM-DD');
    }

    this.props.route.params.data.action_required.forEach(
      (v) => delete v.default,
    );

    createApi
      .createApi()
      .getProject({projectid: '6056061f49cf9ae72efe8e6e'})
      .then((res: any) => {
        this.setState({involvedPerson: res.data.data.involved_persons});
        this.mappingInvolved(
          res.data.data.involved_persons,
          this.props.route.params.data.involved_persons[0],
        );
        for (let i = 0; i < res.data.data.involved_persons.length; i++) {
          res.data.data.involved_persons[i]['selected'] = false;
        }
      });

    this.fileAndImageCapturer(this.props.route.params.data.attachments);
    this.mapViewSorPhoto();
    this.AnimatedViews();
    console.log(this.props.route.params.data.risk);
    this.mappingMapping(
      this.props.route.params.data.risk.severity,
      this.props.route.params.data.risk.likelihood,
    );
  };

  mappingInvolved = (persons: Array<any>, person: string | undefined) => {
    persons.map((d: any, i: number) => {
      if (d._id == person) {
        d.selected = true;
      } else {
        d.selected = false;
      }
    });
  };
  onSubmitUpdateSor = async (status?: number) => {
    this.setState({loading: true});

    var liklihood = this.state.liklihood.filter(
      (d: any) => d.selected == true,
    )[0].value;
    // this.state.actionsAndRecommendations.filter(())
    var severity = this.state.severity.filter((d: any) => d.selected == true)[0]
      .value;
    console.log(this.props.route.params.data._id);
    var update = {
      report: {
        _id: this.props.route.params.data._id,
        created_by: 'haider@gmail.com',
        details: this.state.observation,
        occured_at: moment().format('YYYY-MM-DD'),
        involved_persons: this.props.route.params.data.involved_persons,
        risk: {
          severity: severity,
          likelihood: liklihood,
        },
        action_required: this.state.actionsAndRecommendations,
        user_location: {
          latitude: 66.666,
          longitude: 66.666,
        },
        location: 'pindi boys',
        submit_to: this.state.submitted_to,
        esclate_to: this.state.esclate_to,
        status: 2,
        attachments: [],
        comments: [],
      },
      project: '6038cf8472762b29b1bed1f3',
    };

    console.log(update);

    createApi
      .createApi()
      .updateSor(update)
      .then((res) => {
        console.log(res);
        this.setState({loading: false});
        this.props.navigation.navigate('ViewAllSOr');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Submitted To

  AnimatedViews = () => {
    Animated.timing(this.state.contentAnim, {
      toValue: wp(0),
      duration: 1500,
      easing: Easing.elastic(3),
      useNativeDriver: false,
    }).start();

    Animated.timing(this.state.initAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  mapViewSorPhoto = () => {
    View_sor.user.Attachments.map((d, i) => {
      if (d.type == 'photo') {
        this.state.images.push({url: d.url});
      }
    });
  };

  fileAndImageCapturer = (attachments: Array<string>) => {
    /*
     * Image object Map to this
     *
     *      type: 'video',
     *      upload: 'self',
     *      name: d.name,
     *      url: d.uri,
     */
    var mapped = imageAndVideoObjectMap(attachments);
  };

  imgCap = (str: string, arr: Array<Object>) => {
    if (str == 'upload') {
      imagePicker()
        .then((res: any) => {
          arr.push({id: 24, name: 'John Doe', photo: res.uri});

          this.setState({photoModal: false});
        })
        .catch((err) => {
          this.setState({photoModal: false});
        });
    } else {
      cameraCapture()
        .then((res: any) => {
          arr.push({id: 24, name: 'John Doe', photo: res.uri});

          this.setState({photoModal: false});
        })
        .catch((err) => {
          this.setState({photoModal: false});
        });
    }
  };
  // Document Attachments
  openDoc = async (attach: Array<Object>) => {
    try {
      var res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      // DocType(res, this.state.attachments).then((res) => {
      //   this.setState({});
      // });

      res.map((d, i) => {
        if (d.type.split('/')[0] == 'image') {
          attach.splice(0, 0, {
            type: 'photo',
            upload: 'self',
            name: d.name,
            url: d.uri,
          });
        } else if (d.type.split('/')[0] == 'video') {
          attach.splice(0, 0, {
            type: 'video',
            upload: 'self',
            name: d.name,
            url: d.uri,
          });
        } else if (d.type.split('/')[1] == 'pdf') {
          attach.splice(0, 0, {
            type: 'pdf',
            upload: 'self',
            name: d.name,
            url: d.uri,
          });
        } else if (d.type.split('/')[0] == 'text') {
          attach.splice(0, 0, {
            type: 'text',
            upload: 'self',
            name: d.name,
            url: d.uri,
          });
        } else if (
          d.type.split('.').pop() == 'document' ||
          d.type.split('/')[1] == 'msword'
        ) {
          attach.splice(0, 0, {
            type: 'doc',
            upload: 'self',
            name: d.name,
            url: d.uri,
          });
        } else if (
          d.type.split('/')[1] == 'vnd.ms-excel' ||
          d.type.split('.').pop() == 'sheet'
        ) {
          // attach.splice(0, 0, {
          //   type: 'excel',
          //   upload: 'self',
          //   name: d.name,
          //   url: d.uri,
          // });
        } else if (
          d.type.split('/')[1] == 'vnd.ms-powerpoint' ||
          d.type.split('.').pop() == 'presentation'
        ) {
          // attach.splice(0, 0, {
          //   type: 'powerpoint',
          //   upload: 'self',
          //   name: d.name,
          //   url: d.uri,
          // });
        } else {
          showMessage({
            message: 'File not supported',
            type: 'danger',
            position: 'bottom',
          });
        }
      });

      this.setState({});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  mappingMapping = (sev: number, lik: number) => {
    this.state.liklihood.map((d: any, i: number) => {
      if (sev == d.value) {
        d.selected = true;
      } else {
        d.selected = false;
      }
    });
    this.state.severity.map((d: any, i: number) => {
      if (lik == d.value) {
        d.selected = true;
      } else {
        d.selected = false;
      }
    });
    this.setState({});
  };

  render() {
    return (
      <Animated.View style={[styles.container, {opacity: this.state.initAnim}]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <Icon
                onPress={() => this.props.navigation.goBack()}
                size={25}
                name="arrow-back-outline"
                type="ionicon"
                color={colors.secondary}
              />
              <View>
                <Text style={styles.title}>SOR Report</Text>
                <View style={styles.underScrore} />
              </View>
              <View style={styles.avatarView}>
                <Avatar
                  rounded
                  source={{
                    uri: View_sor.user.profile,
                  }}
                />
              </View>
            </View>
          </View>
          <Animated.View
            style={[styles.content, {marginTop: this.state.contentAnim}]}>
            <View style={styles.contentPadding}>
              <TouchableOpacity style={styles.classittleicon}>
                {this.state.sor_type != 'lsr' ? (
                  <View>
                    {this.state.sor_type != 'near miss' ? (
                      <Icon
                        size={wp(6)}
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
                    <Image source={images.nearMiss} style={GlStyles.images} />
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
              <View style={styles.obserContainer}>
                <View>
                  <TextInput
                    multiline={true}
                    value={this.state.observation}
                    onChange={(e) => {
                      this.setState({observation: e.nativeEvent.text});
                      this.setState({time: Date.now()});
                    }}
                    style={styles.observationText}
                  />
                </View>
                <Text style={styles.observationDate}>
                  {moment(this.state.time).fromNow()}
                </Text>
              </View>
              <View style={styles.subContainer}>
                <View style={styles.submittedTo}>
                  <Text style={styles.subText}>Submitted to : </Text>
                  <Text style={styles.obvText}>
                    {this.state.submitted_to[0].split('@')[0]}
                  </Text>
                </View>
                <View style={styles.observerTo}>
                  <Text style={styles.obvText}>Observer : </Text>
                  <Text style={styles.obvText}>
                    {this.state.esclate_to[0].split('@')[0]}
                  </Text>
                </View>
              </View>
              <View style={styles.involveNortify}>
                {/* Notified To Section */}
                <View style={styles.notifiedSec}>
                  <Text style={styles.notifyPText}>Esclate to : </Text>
                  {this.state.notifiedPerson.map(
                    (d: involved_persons, i: number) => {
                      var j = 2;

                      return (
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              editInvolvedAndEsclatedPersons: true,
                            });
                          }}>
                          <Avatar
                            containerStyle={{
                              marginLeft: wp(-(j + 1)),
                              borderColor: colors.secondary,
                              borderWidth: wp(0.5),
                            }}
                            size={wp(8)}
                            rounded
                            source={{
                              uri: d.img_url,
                            }}
                          />
                        </TouchableOpacity>
                      );
                    },
                  )}
                  {this.state.notifiedPerson.length < 6 ? (
                    <TouchableOpacity
                      onPress={() => {
                        if (this.state.notifiedPerson.length < 6) {
                          this.setState({
                            notifiedAndInv: 1,
                            photoArr: this.state.notifiedPerson,
                            IsaddInvAndNotifiedUser: true,
                            involvedAndNotifiedUserType: 'notified',
                          });
                        }
                      }}
                      style={[
                        styles.addCircle,
                        this.state.notifiedAndInv == 1
                          ? {backgroundColor: colors.primary}
                          : {backgroundColor: colors.lightGrey},
                      ]}>
                      <Icon
                        size={wp(3.5)}
                        name="plus"
                        type="antdesign"
                        color={
                          this.state.notifiedAndInv == 1
                            ? colors.secondary
                            : colors.primary
                        }
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
                {/* Involved Person  */}
                <View style={styles.notifiedSec}>
                  <Text style={styles.invpText}>Involved People</Text>
                  {this.state.involvedPerson.map((d: any, i: number) => {
                    var j = 1;
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({editInvolvedAndEsclatedPersons: true})
                        }>
                        <Avatar
                          containerStyle={{
                            marginLeft: wp(-(j + 1)),
                            borderWidth: wp(0.5),
                            borderColor: colors.secondary,
                          }}
                          size={wp(8)}
                          rounded
                          source={{
                            uri: d.img_url,
                          }}
                        />
                      </TouchableOpacity>
                    );
                  })}
                  {this.state.involvedPerson.length < 6 ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          notifiedAndInv: 2,
                          photoArr: this.state.involvedPerson,
                          IsaddInvAndNotifiedUser: true,
                          involvedAndNotifiedUserType: 'involved',
                        });
                      }}
                      style={[
                        styles.addCircle,
                        this.state.notifiedAndInv == 2
                          ? {backgroundColor: colors.primary}
                          : {backgroundColor: colors.lightGrey},
                      ]}>
                      <Icon
                        size={wp(3.5)}
                        name="plus"
                        type="antdesign"
                        color={
                          this.state.notifiedAndInv == 2
                            ? colors.secondary
                            : colors.primary
                        }
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
              <View style={styles.risk}>
                <Text style={styles.riskText}>
                  Risk{' '}
                  <Text style={styles.riskttle}>(Severity x Likelihood)</Text>
                </Text>
                {this.state.selectedRisk == false ? (
                  <View>
                    <Chart
                      liklihood={this.state.liklihood}
                      severity={this.state.severity}
                      style={{alignSelf: 'center', marginTop: wp(3)}}
                      onPress={(v: object) => {}}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => this.setState({selectedRisk: false})}
                    style={{flexDirection: 'row'}}>
                    <View style={styles.riskIcon}>
                      <Text style={styles.riskIconText}>
                        {this.props.route.params.data.risk.likelihood *
                          this.props.route.params.data.risk.severity}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>Action / Recommendation</Text>
                <Text style={styles.sugForYouText}>Suggested for you</Text>
                {this.props.route.params.data.action_required == undefined ? (
                  <Text style={styles.nosuchActionsAndRecommendations}>
                    No such Actions / Recommendations
                  </Text>
                ) : (
                  <View>
                    {this.state.actionsAndRecommendations.map(
                      (d: actions, i: number) => (
                        <TouchableOpacity
                        
                          onPress={() => {
                            var data = [
                              ...this.state.actionsAndRecommendations,
                            ];
                            if (d.is_complete == true) {
                              data[i].is_complete = false;
                            } else {
                              data[i].is_complete = true;
                            }
                            this.setState({actionsAndRecommendations: data});
                          }}
                          onLongPress={() => {
                            this.setState({
                              allActionsEdit: d,
                              SuggestionPop: true,
                              allActionsEditIndex: i,
                              newActions: false,
                            });
                          }}
                          style={[
                            styles.actionRecomCon,
                            d.is_complete == true
                              ? {
                                  borderWidth: wp(0.2),
                                  backgroundColor: colors.lightBlue,
                                  borderColor: colors.primary,
                                }
                              : {
                                  borderWidth: wp(0.3),
                                  borderColor: colors.lightGrey,
                                },
                          ]}>
                          <View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Icon
                                size={wp(3.5)}
                                name="checkcircle"
                                type="antdesign"
                                color={
                                  d.is_complete == true
                                    ? colors.green
                                    : colors.lightGrey
                                }
                              />
                              <Text style={styles.statusARText}>
                                {d.is_complete == true ? 'Completed' : 'Status'}
                              </Text>
                              <View
                                style={{position: 'absolute', right: wp(3)}}>
                                <Text style={[styles.actionTypeElemAsdmin]}>
                                  {d.category}
                                </Text>
                              </View>
                            </View>
                            <Text
                              style={[
                                styles.obvTextAction,
                                d.is_complete == true
                                  ? {color: colors.text, opacity: 0.5}
                                  : null,
                              ]}>
                              {d.content}
                            </Text>
                          </View>

                          <View style={styles.subAss}>
                            <TouchableOpacity>
                              <Text style={styles.subAssText}>
                                Assigned to:{' '}
                                <Text style={styles.subAssuser}>
                                  {d.assigned_to}
                                 
                                </Text>
                              </Text>
                            </TouchableOpacity>

                            <Text style={styles.subAssText}>
                              {moment(d.date).format('MMM DD YYYY')}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ),
                    )}
                  </View>
                )}
              </View>
              <View
                style={[
                  styles.addActionAndRecommendation,
                  this.state.notifiedAndInv == 3
                    ? {borderColor: colors.green}
                    : {borderColor: colors.lightGrey},
                ]}>
                <TextInput
                  onFocus={() => this.setState({notifiedAndInv: 3})}
                  maxLength={500}
                  onChange={(e) =>
                    this.setState({
                      actionsAndRecommendationText: e.nativeEvent.text,
                    })
                  }
                  value={this.state.actionsAndRecommendationText}
                  multiline={true}
                  style={styles.textaddActionContainer}
                  placeholder={'Add action / recommendation here'}
                />
                {/* <TouchableOpacity
                  onPress={() => {
                    this.submitActionsAndRecommendations(this.st);
                  }}
                  style={{
                    position: 'absolute',
                    right: wp(13),
                    padding: wp(2),
                    borderRadius: wp(2),
                    top: wp(2.7),
                    backgroundColor: colors.lightGrey,
                  }}>
                  <Icon
                    size={wp(4)}
                    name="admin-panel-settings"
                    type="material"
                    color={colors.primary}
                  />
                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => {
                    // this.submitActionsAndRecommendations(
                    //   this.state.actionsAndRecommendationText,
                    // );
                    if (this.state.actionsAndRecommendationText !== '') {
                      this.setState({
                        allActionsEdit: {
                          is_complete: false,
                          is_selected: false,
                          content: this.state.actionsAndRecommendationText,
                          assigned_to: [],
                          date: moment().format('YYYY-MM-DD'),
                          status: 0,
                          category: 'Elimination',
                        },

                        SuggestionPop: true,
                        newActions: true,
                      });
                    }
                  }}
                  style={{
                    position: 'absolute',
                    right: wp(3),
                    padding: wp(2),
                    borderRadius: wp(2),
                    top: wp(2.7),
                    backgroundColor: colors.lightGrey,
                  }}>
                  <Icon
                    size={wp(4)}
                    name="arrowright"
                    type="antdesign"
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.attachmentsContainer}>
                <Text style={styles.attachmentsFont}>Attachments</Text>
                {this.state.attachments.length == 0 ? (
                  <Text style={styles.youdonthaveAnyAttachments}>
                    You don't have any attachments
                  </Text>
                ) : (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignSelf: 'center',
                      }}>
                      {this.state.attachments.map((d: any, i: number) => {
                        if (d.type == 'photo') {
                          return (
                            <TouchableOpacity
                              onPress={() => this.setState({imageViewer: true})}
                              style={styles.AttchimageContainer}>
                              <Image
                                source={{
                                  uri: d.url,
                                }}
                                style={[GlStyles.images, {borderRadius: wp(3)}]}
                                resizeMode={'cover'}
                              />
                              <TouchableOpacity
                                onPress={() => {
                                  if (d.upload != 'self') {
                                    this.photoAnim.play();
                                    downloadFile(d.url, d.type)
                                      .then((res: any) => {})
                                      .catch((err) => {});
                                  }
                                }}
                                style={styles.lottieDownloadContainer}>
                                <LottieView
                                  ref={(animation) => {
                                    this.photoAnim = animation;
                                  }}
                                  style={{width: wp(11)}}
                                  source={animation.download}
                                  loop={false}
                                />

                                {d.upload == 'self' ? (
                                  <TouchableOpacity
                                    style={{marginRight: wp(3)}}
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
                              </TouchableOpacity>
                            </TouchableOpacity>
                          );
                        }
                      })}
                    </View>
                  </View>
                )}

                {this.state.attachments.map((d: any, i: number) => (
                  <View>
                    {d.type != 'photo' ? (
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
                                : // : d.type == 'excel'
                                  // ? images.excel
                                  // : d.type == 'powerpoint'
                                  // ? images.powerpoint
                                  null
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
                                this.photoAnim.play();
                                downloadFile(d.url, d.type)
                                  .then((res: any) => {})
                                  .catch((err) => {});
                              }
                            }}>
                            <LottieView
                              ref={(animation) => {
                                this.animation = animation;
                              }}
                              style={{width: wp(15)}}
                              source={animation.download}
                              loop={false}
                            />
                          </TouchableOpacity>

                          {d.upload == 'self' ? (
                            <TouchableOpacity
                              onPress={() => {
                                var arr = [...this.state.attachments].filter(
                                  (b) => b != d,
                                );
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
                    ) : null}
                  </View>
                ))}
                {this.state.attachments.length < 6 && (
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.attachments.length < 6) {
                        this.openDoc(this.state.attachments);
                      }
                    }}
                    style={{marginTop: wp(3), flexDirection: 'row'}}>
                    <Icon
                      containerStyle={{marginRight: wp(3)}}
                      name="plus"
                      size={wp(4)}
                      type="antdesign"
                      color={colors.primary}
                    />
                    <Text
                      style={{
                        fontSize: wp(3),
                        fontWeight: 'bold',
                        opacity: 0.5,
                        color: colors.primary,
                      }}>
                      Add New Attachments
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {/* Map Integration */}
              {/* <Text
                style={{
                  fontSize: wp(3),
                  color: colors.text,
                  marginBottom: wp(3),
                }}>
                Hall No, 1 first floor, Plot No. 45 Street 10, I-9/2, Islamabad,
                Federal, Islamabad Capital Territory 44000
              </Text> */}
              <View style={{width: wp(90), height: wp(50)}}>
                <Image
                  source={images.map}
                  style={[GlStyles.images, {borderRadius: wp(3)}]}
                  resizeMode={'cover'}
                />
              </View>
              {/* comments sections */}
            </View>
            <View style={styles.commentsSections}>
              {this.state.comments.map((d: any, i: number) => {
                return (
                  <View>
                    <TouchableOpacity
                      onLongPress={() => {
                        if (d.attachments != undefined) {
                          this.setState({
                            editAttachedCommentArr: d.attachments,
                          });
                        } else {
                          this.setState({
                            editAttachedCommentArr: [],
                          });
                        }
                        this.setState({
                          editDiscardComment: d.comment,
                          editDiscardCommentIndex: i,
                          editDelComment: true,
                        });
                      }}
                      style={styles.userComments}>
                      <Avatar
                        containerStyle={{position: 'absolute', top: wp(0)}}
                        size={wp(6)}
                        rounded
                        source={{
                          uri: d.image,
                        }}
                      />
                      <View style={styles.commentUser}>
                        <Text style={styles.userCommentName}>{d.user}</Text>
                        <Text style={styles.usercomment}>{d.comment}</Text>
                      </View>
                      <View style={styles.dateComments}>
                        <Text style={styles.dateTextComment}>
                          {moment(d.date).fromNow()}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {d.attachments != undefined ? (
                      <ScrollView
                        style={{marginBottom: wp(3), marginLeft: wp(8)}}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        {d.attachments.map((d: any, i: number) => (
                          <View
                            style={[
                              styles.AttchimageContainer,
                              {
                                backgroundColor: colors.secondary,
                                justifyContent: 'center',
                                alignItems: 'center',
                              },
                            ]}>
                            {d.type == 'photo' ? (
                              <Image
                                source={{
                                  uri: d.url,
                                }}
                                style={[GlStyles.images, {borderRadius: wp(5)}]}
                                resizeMode={'cover'}
                              />
                            ) : (
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
                                      : // : d.type == 'excel'
                                        // ? images.excel
                                        // : d.type == 'powerpoint'
                                        // ? images.powerpoint
                                        null
                                  }
                                  style={{width: wp(10), height: wp(10)}}
                                />
                              </View>
                            )}

                            <TouchableOpacity
                              onPress={() => {
                                var arr = [
                                  ...this.state.commentAttachment,
                                ].filter((j) => j != d);
                                this.setState({commentAttachment: arr});
                              }}
                              style={{
                                position: 'absolute',
                                right: wp(2),
                                top: wp(2),
                                zIndex: wp(1),
                              }}>
                              <Icon
                                size={wp(5)}
                                name="download-outline"
                                type="material-community"
                                color={colors.text}
                              />
                            </TouchableOpacity>
                          </View>
                        ))}
                      </ScrollView>
                    ) : null}
                  </View>
                );
              })}
              <View style={{flexDirection: 'row'}}>
                <Avatar
                  containerStyle={{
                    marginRight: wp(2),
                    marginTop: wp(4),
                  }}
                  size={wp(6)}
                  rounded
                  source={{
                    uri:
                      'https://media-exp1.licdn.com/dms/image/C5603AQHGeQB42B1CcA/profile-displayphoto-shrink_200_200/0/1588740771758?e=1618444800&v=beta&t=CtMgG7KLgfGZO-pYkX6tdvwbCGnuU-g4G2TiocMI1gc',
                  }}
                />

                <View
                  style={[
                    styles.commentTextInput,
                    this.state.notifiedAndInv == 4
                      ? {borderColor: colors.green}
                      : {borderColor: colors.lightGrey},
                  ]}>
                  <TextInput
                    onFocus={() => this.setState({notifiedAndInv: 4})}
                    style={{fontSize: wp(3), width: wp(50)}}
                    multiline={true}
                    value={this.state.commentText}
                    onChange={(e) =>
                      this.setState({commentText: e.nativeEvent.text})
                    }
                    placeholder={'Your comment here '}
                  />
                  <View
                    style={{
                      top: wp(2.7),
                      position: 'absolute',
                      right: wp(3),
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      onPress={() => this.openDoc(this.state.commentAttachment)}
                      style={{
                        backgroundColor: colors.lightBlue,
                        padding: wp(2),
                        marginRight: wp(2),
                        borderRadius: wp(3),
                      }}>
                      <Icon
                        size={wp(5)}
                        name="attachment"
                        type="entypo"
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        if (this.state.commentText != '') {
                          var map = [...this.state.comments];

                          map.push({
                            user: 'TestUser',
                            date: Date.now(),
                            image:
                              'https://media-exp1.licdn.com/dms/image/C4D03AQG7BnPm02BJ7A/profile-displayphoto-shrink_400_400/0/1597134258301?e=1614211200&v=beta&t=afZdYNgBsJ_CI2bCBxkaHESDbTcOq95eUuLVG7lHHEs',
                            comment: this.state.commentText
                              .replace(/\s+/g, ' ')
                              .trim(),
                            attachments: this.state.commentAttachment,
                          });
                          this.setState({
                            commentText: '',
                            comments: map,
                            commentAttachment: [],
                          });
                        }
                      }}
                      style={{
                        padding: wp(2),
                        borderRadius: wp(3),
                        backgroundColor: colors.lightBlue,
                      }}>
                      <Icon
                        size={wp(5)}
                        name="arrowright"
                        type="antdesign"
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {this.state.commentAttachment.length != 0 ? (
                <ScrollView
                  horizontal={true}
                  style={{marginLeft: wp(6.7)}}
                  showsHorizontalScrollIndicator={false}>
                  {this.state.commentAttachment.map((d: any, i: number) => (
                    <View
                      style={{
                        marginLeft: wp(2),
                        marginTop: wp(3),
                        marginBottom: wp(5),
                      }}>
                      {d.type == 'photo' ? (
                        <View style={styles.AttchimageContainer}>
                          <Image
                            source={{
                              uri: d.url,
                            }}
                            style={[GlStyles.images, {borderRadius: wp(5)}]}
                            resizeMode={'cover'}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              var arr = [
                                ...this.state.commentAttachment,
                              ].filter((j) => j != d);
                              this.setState({commentAttachment: arr});
                            }}
                            style={{
                              position: 'absolute',
                              right: wp(2),
                              top: wp(2),
                              zIndex: wp(1),
                            }}>
                            <Icon
                              size={wp(5)}
                              name="circle-with-cross"
                              type="entypo"
                              color={colors.text}
                            />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View>
                          <View
                            style={[
                              styles.AttchimageContainer,
                              {
                                backgroundColor: colors.secondary,
                                justifyContent: 'center',
                                alignItems: 'center',
                              },
                            ]}>
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
                                  : // : d.type == 'excel'
                                    // ? images.excel
                                    // : d.type == 'powerpoint'
                                    // ? images.powerpoint
                                    null
                              }
                              style={{width: wp(10), height: wp(10)}}
                            />

                            <Text
                              style={{
                                fontSize: wp(2.5),

                                color: colors.text,
                                marginTop: wp(2),
                              }}>
                              {d.name.split('.')[0].substring(0, 10)}...{' '}
                              {d.name.split('.')[1]}
                            </Text>

                            <TouchableOpacity
                              onPress={() => {
                                var arr = [
                                  ...this.state.commentAttachment,
                                ].filter((j) => j != d);
                                this.setState({commentAttachment: arr});
                              }}
                              style={{
                                position: 'absolute',
                                right: wp(2),
                                top: wp(2),
                                zIndex: wp(1),
                              }}>
                              <Icon
                                size={wp(5)}
                                name="circle-with-cross"
                                type="entypo"
                                color={colors.text}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    </View>
                  ))}
                </ScrollView>
              ) : (
                <View style={{marginLeft: wp(5)}}>
                  <Text style={[styles.attchFileText]}>
                    Uploaded files will be appear here .
                  </Text>
                </View>
              )}
            </View>
            {/* Submit btns  */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: wp(5),
              }}>
              <TouchableOpacity style={styles.saveAsDraftContainer}>
                <Text style={styles.saveAsDraftText}>Save as Draft</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.onSubmitUpdateSor()}
                style={styles.saveAsSubmitContainer}>
                <Text style={styles.saveAsSubmitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
        <Model
          animationIn={'bounceInUp'}
          animationOut={'bounceOutDown'}
          animationInTiming={2000}
          animationOutTiming={2000}
          isVisible={this.state.addAssigners}
          onBackdropPress={() => this.setState({addAssigners: false})}>
          <View
            style={{
              backgroundColor: colors.secondary,
              justifyContent: 'center',
              borderRadius: wp(5),
              padding: wp(6),
            }}>
            <Text
              style={{
                fontSize: wp(4),
                fontWeight: 'bold',
                textAlign: 'center',
                color: colors.text,
                marginBottom: wp(3),
              }}>
              Assigners
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {View_sor.user.observer.map((d, i) => {
                var j = 1;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({});
                    }}>
                    <Avatar
                      containerStyle={{marginLeft: wp(-(j + 1))}}
                      size={wp(15)}
                      rounded
                      source={{
                        uri: View_sor.user.profile,
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            {/* details of user */}

            <View
              style={{
                backgroundColor: colors.lightBlue,
                borderRadius: wp(3),
                // padding: wp(3),
              }}>
              {/* <View style={}></View> */}
              {/* <Text>Adsd</Text> */}
            </View>
            {/* add users here */}
            <View style={{flexDirection: 'row', marginTop: wp(10)}}>
              <Avatar
                containerStyle={{marginRight: wp(2)}}
                size={wp(6)}
                rounded
                source={{
                  uri:
                    'https://media-exp1.licdn.com/dms/image/C4D03AQG7BnPm02BJ7A/profile-displayphoto-shrink_400_400/0/1597134258301?e=1614211200&v=beta&t=afZdYNgBsJ_CI2bCBxkaHESDbTcOq95eUuLVG7lHHEs',
                }}
              />

              <View style={[styles.commentTextInput, {width: wp(70)}]}>
                <TextInput
                  style={{fontSize: wp(3)}}
                  onChange={(e) => {}}
                  placeholder={'Type users email to add '}
                />
                <View
                  style={{
                    position: 'absolute',
                    right: wp(3),
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      padding: wp(2),
                      borderRadius: wp(3),
                      backgroundColor: colors.lightBlue,
                    }}>
                    <Icon
                      size={wp(5)}
                      name="arrowright"
                      type="antdesign"
                      color={colors.primary}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Model>
        {/* Add Involved Users  */}
        <Model
          animationIn={'bounceInUp'}
          animationOut={'bounceOutDown'}
          animationInTiming={1000}
          animationOutTiming={1000}
          isVisible={this.state.IsaddInvAndNotifiedUser}
          onBackdropPress={() =>
            this.setState({IsaddInvAndNotifiedUser: false})
          }>
          <View
            style={{
              backgroundColor: colors.secondary,
              justifyContent: 'center',

              borderRadius: wp(8),
              paddingTop: wp(5),
              paddingBottom: wp(5),
            }}>
            <View style={{alignSelf: 'center'}}>
              {/* <TouchableOpacity
                onPress={() => {
                  imagePicker()
                    .then((res: any) => {
                      this.setState({
                        invPhoto: res.uri == undefined ? '' : res.uri,
                      });
                    })
                    .catch((err) => this.setState({invPhoto: ''}));
                }}>
                {this.state.invPhoto === '' ? (
                  <View
                    style={{
                      borderWidth: wp(0.2),
                      borderRadius: wp(10),
                      width: wp(20),
                      height: wp(20),
                      alignItems: 'center',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      padding: wp(3),
                    }}>
                    <Icon
                      size={wp(5)}
                      containerStyle={{
                        // opacity: 0.5,
                        position: 'absolute',
                        top: wp(7.5),
                        right: wp(-1.9),
                      }}
                      name="pluscircle"
                      type="antdesign"
                      color={colors.green}
                    />
                    <Icon
                      size={wp(10)}
                      containerStyle={{opacity: 0.5, position: 'absolute'}}
                      name="camera"
                      type="evilicon"
                      color={colors.text}
                    />
                  </View>
                ) : (
                  <Avatar
                    containerStyle={{alignSelf: 'center'}}
                    rounded
                    size={wp(20)}
                    source={{
                      uri: this.state.invPhoto,
                    }}
                  />
                )}
              </TouchableOpacity> */}

              <Text
                style={{
                  fontSize: wp(3),
                  fontWeight: 'bold',
                  textAlign: 'center',
                  opacity: 0.5,
                  marginTop: wp(2),
                }}>
                {this.state.involvedAndNotifiedUserType == 'involved'
                  ? 'Add Involved User Details'
                  : 'Add Notified User Details'}
              </Text>
              <TextInput
                style={[
                  {
                    fontSize: wp(3),
                    width: wp(80),
                    borderWidth: wp(0.2),
                    borderRadius: wp(3),
                    paddingLeft: wp(4),
                    paddingRight: wp(4),
                    marginTop: wp(3),
                  },
                  this.state.selectedInput == 1
                    ? {borderColor: colors.green}
                    : {borderColor: colors.text},
                ]}
                onFocus={() => this.setState({selectedInput: 1})}
                multiline={true}
                value={this.state.involveAndNotifiedUsersName}
                onChange={(v: any) => {
                  this.setState({
                    addInvolvedandNotifiedUsers: searchInSuggestions(
                      v.nativeEvent.text,
                      this.state.involvedPerson,
                    ),
                    involveAndNotifiedUsersName: v.nativeEvent.text,
                  });
                }}
                placeholder={'Type your name / email ...'}
              />

              {this.state.addInvolvedandNotifiedUsers.length != 0 ? (
                <View style={styles.involveSuggestCont}>
                  {this.state.addInvolvedandNotifiedUsers.map(
                    (d: involved_persons, i: number) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => {
                          this.setState({
                            involveAndNotifiedUsersName: d.email,
                            invPhoto: d.img_url,
                            addInvolvedandNotifiedUsers: [],
                          });
                        }}
                        style={[
                          styles.involvePsuggCont,
                          this.state.addInvolvedandNotifiedUsers.length == i + 1
                            ? {borderBottomWidth: wp(0)}
                            : null,
                        ]}>
                        <Avatar
                          containerStyle={{marginRight: wp(3)}}
                          rounded
                          source={{
                            uri: d.img_url,
                          }}
                        />
                        <View>
                          <Text style={styles.involvePSt}>
                            {d.email.split('@')[0]}
                          </Text>
                          <Text style={{fontSize: wp(2.5)}}>{d.email}</Text>
                        </View>
                      </TouchableOpacity>
                    ),
                  )}
                </View>
              ) : null}
              <TouchableOpacity
                onPress={() => {
                  if (this.state.involveAndNotifiedUsersName !== '') {
                    if (this.state.involvedAndNotifiedUserType == 'involved') {
                      this.state.involvedPerson.push({
                        _id: Date.now(),
                        email: this.state.involveAndNotifiedUsersName,
                        name: this.state.involveAndNotifiedUsersName.split(
                          '@',
                        )[0],
                        img_url:
                          this.state.invPhoto === ''
                            ? `https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png`
                            : this.state.invPhoto,
                      });
                    } else {
                      this.state.notifiedPerson.push({
                        _id: Date.now(),
                        email: this.state.involveAndNotifiedUsersName,
                        name: this.state.involveAndNotifiedUsersName.split(
                          '@',
                        )[0],
                        img_url:
                          this.state.invPhoto === ''
                            ? `https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png`
                            : this.state.invPhoto,
                      });
                    }
                    this.setState({
                      IsaddInvAndNotifiedUser: false,
                      involveAndNotifiedUsersName: '',
                      invPhoto: '',
                    });
                  }
                }}
                style={{
                  backgroundColor: colors.green,
                  borderRadius: wp(3),
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: wp(5),
                  padding: wp(3),
                  width: wp(50),
                }}>
                <Text style={{fontSize: wp(3), color: colors.secondary}}>
                  Add User
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Model>
        {/*
         *
         * @ Edit Actions and Recommendations :Options *
         * desc: Acrions popup that allow us to edit or delete actions
         */}
        <Modal visible={this.state.imageViewer} transparent={true}>
          <TouchableOpacity
            onPress={() => this.setState({imageViewer: false})}
            style={{backgroundColor: 'black', alignItems: 'flex-end'}}>
            <Icon
              containerStyle={{marginTop: wp(3), marginRight: wp(3)}}
              name={'cross'}
              type={'entypo'}
              color={colors.lightGrey}
              size={wp(5)}
            />
          </TouchableOpacity>
          <ImageViewer
            enableSwipeDown={true}
            flipThreshold={100}
            onCancel={() => {}}
            imageUrls={this.state.images}
          />
        </Modal>
        {this.state.SuggestionPop == true && (
          <SuggestionsPop
            suggestedUsers={this.state.involvedPerson}
            onClose={() =>
              this.setState({SuggestionPop: !this.state.SuggestionPop})
            }
            allSuggestions={this.state.actionsAndRecommendations}
            isOpen={this.state.SuggestionPop}
            suggestions={this.state.allActionsEdit}
            save={(d: any) => {
              if (this.state.newActions == true) {
                this.state.actionsAndRecommendations.push(d);
              } else {
                this.state.actionsAndRecommendations[
                  this.state.allActionsEditIndex
                ] = d;
              }
              console.log(this.state.actionsAndRecommendations);
              // this.state.actionsAndRecommendations.push(d)
              this.setState({SuggestionPop: false});
            }}
            discard={() => {
              this.setState({
                actionsAndRecommendations: this.state.actionsAndRecommendations.filter(
                  (d: any) => d != this.state.allActionsEdit,
                ),
                SuggestionPop: false,
              });
            }}
          />
        )}
        {/*
         *
         * @Comment
         * :Options * desc: comment popup that allow us to edit or delete comments
         */}
        <CommentPop
          onClose={() =>
            this.setState({editDelComment: !this.state.editDelComment})
          }
          editDiscardComment={this.state.editDiscardComment}
          commentIndex={this.state.editDiscardCommentIndex}
          isOpen={this.state.editDelComment}
          openDoc={() => this.openDoc(this.state.editAttachedCommentArr)}
          attachments={this.state.editAttachedCommentArr}
          comments={this.state.comments}
          commentTextString={this.state.EditcommentText}
          commentTextStringOnChange={(e: string) =>
            this.setState({editDiscardComment: e})
          }
          deleteAttachment={(e: string) => {
            this.setState({editAttachedCommentArr: e});
          }}
          discardComment={(e: any) => {
            this.state.comments.splice(this.state.editDiscardCommentIndex, 1);
            this.setState({editDelComment: false});
          }}
          submitComment={(e: any) => {
            this.state.comments[this.state.editDiscardCommentIndex][
              'comment'
            ] = this.state.editDiscardComment;
            this.state.comments[this.state.editDiscardCommentIndex][
              'date'
            ] = Date.now();
            this.state.comments[this.state.editDiscardCommentIndex][
              'attachments'
            ] = this.state.editAttachedCommentArr;

            this.setState({editDelComment: false});
          }}
        />
        <FlashMessage ref="myLocalFlashMessage" />

        <Model
          animationIn={'bounceInUp'}
          animationOut={'bounceOutDown'}
          animationInTiming={1000}
          animationOutTiming={1000}
          isVisible={this.state.loading}
          onBackdropPress={() => this.setState({loading: false})}>
          <ActivityIndicator color={colors.primary} size={'large'} />
        </Model>
      </Animated.View>
    );
  }
}

const mapStateToProps = (state: unknown) => {
  return {};
};

const mapDispatchToProps = (dispatch: unknown) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewSOR);

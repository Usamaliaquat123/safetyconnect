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
  BackHandler,
} from 'react-native';

import moment from 'moment';
import {connect} from 'react-redux';
import {Icon, Avatar, Card} from 'react-native-elements';
import {colors, GlStyles, animation, images} from '@theme';
import {
  View_sor,
  notified,
  Create_sor,
  riskxSeverityxliklihood,
} from '@service';
import styles from './style';
import {StackNavigationProp} from '@react-navigation/stack';
import {Tags, Chart} from '@components';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {default as Model} from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  imagePicker,
  cameraCapture,
  searchInSuggestions,
  DocType,
  downloadFile,
} from '@utils';
import DocumentPicker from 'react-native-document-picker';
import listAction from './../../../../store/actions/listActions';
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
  constructor(props: any) {
    super(props);
    this.state = {
      initAnim: new Animated.Value(0),
      imageViewer: false,
      images: [],
      photoArr: [],
      selectedInput: 0,
      commentText: '',
      contentAnim: new Animated.Value(80),
      // custom data
      observation: View_sor.user.observation,
      date: View_sor.user.date,
      comments: View_sor.user.comments,
      involvedPerson: View_sor.user.InvolvedPersons,
      notifiedPerson: View_sor.user.NotifiedTo,
      attachments: View_sor.user.Attachments,
      actionsAndRecommendations: View_sor.user.ActionAndRecommendation,
      // popup Assigners
      addAssigners: false,
      involveAndNotifiedUsersName: '',
      IsaddInvAndNotifiedUser: false,
      involvedAndNotifiedUserType: 'involved',
      commentAttachment: [
        // {type: 'photo', upload: 'self', name: 'sds', url: 'sds'},
        // {type: 'photo', upload: 'self', name: 'sds', url: 'sds'},
        // {type: 'photo', upload: 'self', name: 'sds', url: 'sds'},
        // {type: 'photo', upload: 'self', name: 'sds', url: 'sds'},
      ],
      addInvolvedandNotifiedUsers: [],
      selectedRisk: true,

      // Risk Array
      liklihood: riskxSeverityxliklihood.liklihood,
      severity: riskxSeverityxliklihood.severity,
    };

    this.animation = React.createRef();
    this.photoAnim = React.createRef();
  }
  componentDidMount = () => {
    this.mapViewSorPhoto();
    this.AnimatedViews();
    this.mappingMapping(
      View_sor.user.Risk.severity,
      View_sor.user.Risk.liklihood,
    );
  };

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

  // openGalleryAndMap = (data : Array<any>) : Array<any> => {

  //   return [{"sdsd"}]
  // }

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
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // DocType(res, this.state.attachments).then((res) => {
      //   this.setState({});
      // });

      if (res.type.split('/')[0] == 'image') {
        console.log('image');
        attach.push({
          type: 'photo',
          upload: 'self',
          name: res.name,
          url: res.uri,
        });
      } else if (res.type.split('/')[0] == 'video') {
        attach.push({
          type: 'video',
          upload: 'self',
          name: res.name,
          url: res.uri,
        });
        console.log('video');
      } else if (res.type.split('/')[1] == 'pdf') {
        attach.push({
          type: 'pdf',
          upload: 'self',
          name: res.name,
          url: res.uri,
        });
        console.log('pdf');
      } else if (res.type.split('/')[0] == 'text') {
        attach.push({
          type: 'text',
          upload: 'self',
          name: res.name,
          url: res.uri,
        });
      } else if (res.type.split('.').pop() == 'document') {
        attach.push({
          type: 'doc',
          upload: 'self',
          name: res.name,
          url: res.uri,
        });
      }
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
      }
    });
    this.state.severity.map((d: any, i: number) => {
      if (lik == d.value) {
        d.selected = true;
      }
    });
    this.setState({});
  };

  render() {
    // this.handleBackButtonClick();
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
            // <.View
            style={[styles.content, {marginTop: this.state.contentAnim}]}>
            <View style={styles.contentPadding}>
              <TouchableOpacity
                onPress={() => console.log('click on change classify btns')}
                style={styles.classittleicon}>
                <Icon
                  size={wp(6)}
                  name={
                    View_sor.user.classifyType == 'LSR'
                      ? 'aperture'
                      : View_sor.user.classifyType == 'positive'
                      ? 'check-circle'
                      : View_sor.user.classifyType == 'concern'
                      ? 'warning'
                      : View_sor.user.classifyType == 'nearmiss'
                      ? 'centercode'
                      : 'frowno'
                  }
                  type={
                    View_sor.user.classifyType == 'LSR'
                      ? 'ionicon'
                      : View_sor.user.classifyType == 'positive'
                      ? 'font-awesome-5'
                      : View_sor.user.classifyType == 'concern'
                      ? 'antdesign'
                      : View_sor.user.classifyType == 'nearmiss'
                      ? 'font-awesome-5'
                      : 'antdesign'
                  }
                  color={colors.text}
                />
                <Text style={styles.clasifyT}>
                  {View_sor.user.classifyType}
                </Text>
              </TouchableOpacity>
              <View style={styles.obserContainer}>
                <View>
                  <TextInput
                    multiline={true}
                    value={this.state.observation}
                    onChange={(e) =>
                      this.setState({observation: e.nativeEvent.text})
                    }
                    style={styles.observationText}
                  />
                </View>
                <Text style={styles.observationDate}>
                  {moment(View_sor.user.date).format('Do MMM, YYYY')}
                </Text>
              </View>
              <View style={styles.subContainer}>
                <View style={styles.submittedTo}>
                  <Text style={styles.subText}>Submitted to : </Text>
                  <Text style={styles.obvText}>
                    {View_sor.user.observer[0].name}
                  </Text>
                </View>
                <View style={styles.observerTo}>
                  <Text style={styles.obvText}>Observer : </Text>
                  <Text style={styles.obvText}>
                    {View_sor.user.submittedTo[0].name}{' '}
                  </Text>
                </View>
              </View>
              <View style={styles.involveNortify}>
                {/* Notified To Section */}
                <View style={styles.notifiedSec}>
                  <Text style={styles.notifyPText}>Notified to : </Text>
                  {this.state.notifiedPerson.map((d: any, i: number) => {
                    var j = 2;

                    return (
                      <View>
                        <Avatar
                          containerStyle={{marginLeft: wp(-(j + 1))}}
                          size={wp(8)}
                          rounded
                          source={{
                            uri: d.photo,
                          }}
                        />
                      </View>
                    );
                  })}
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        photoArr: this.state.notifiedPerson,
                        IsaddInvAndNotifiedUser: true,
                        involvedAndNotifiedUserType: 'notified',
                      })
                    }
                    style={[
                      styles.addCircle,
                      {backgroundColor: colors.lightGrey},
                    ]}>
                    <Icon
                      size={wp(3.5)}
                      name="plus"
                      type="antdesign"
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                </View>
                {/* Involved Person  */}
                <View style={styles.notifiedSec}>
                  <Text style={styles.invpText}>Involved People</Text>
                  {this.state.involvedPerson.map((d: any, i: number) => {
                    var j = 1;
                    return (
                      <View>
                        <Avatar
                          containerStyle={{marginLeft: wp(-(j + 1))}}
                          size={wp(8)}
                          rounded
                          source={{
                            uri: d.photo,
                          }}
                        />
                      </View>
                    );
                  })}
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        photoArr: this.state.involvedPerson,
                        IsaddInvAndNotifiedUser: true,
                        involvedAndNotifiedUserType: 'involved',
                      })
                    }
                    style={[
                      styles.addCircle,
                      {backgroundColor: colors.lightGrey},
                    ]}>
                    <Icon
                      size={wp(3.5)}
                      name="plus"
                      type="antdesign"
                      color={colors.primary}
                    />
                  </TouchableOpacity>
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
                      onPress={(v: object) => console.log(v)}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => this.setState({selectedRisk: false})}
                    style={{flexDirection: 'row'}}>
                    <View style={styles.riskIcon}>
                      <Text style={styles.riskIconText}>
                        {View_sor.user.Risk.severity *
                          View_sor.user.Risk.liklihood}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>Action / Recommendation</Text>
                <Text style={styles.sugForYouText}>Suggested for you</Text>
                {this.state.actionsAndRecommendations.map(
                  (d: any, i: number) => (
                    <View
                      style={[
                        styles.actionRecomCon,
                        d.status == 'Completed'
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
                      <TouchableOpacity
                        onPress={() => {
                          var data = [...this.state.actionsAndRecommendations];
                          if (d.status == 'Completed') {
                            data[i].status = 'status';
                          } else {
                            data[i].status = 'Completed';
                          }
                          this.setState({actionsAndRecommendations: data});
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Icon
                            onPress={() => this.props.navigation.goBack()}
                            size={wp(3.5)}
                            name="checkcircle"
                            type="antdesign"
                            color={
                              d.status == 'Completed'
                                ? colors.green
                                : colors.lightGrey
                            }
                          />
                          <Text style={styles.statusARText}>{d.status}</Text>
                          <View style={{position: 'absolute', right: wp(3)}}>
                            <Text style={[styles.actionTypeElemAsdmin]}>
                              {d.type}
                            </Text>
                          </View>
                        </View>
                        <Text
                          style={[
                            styles.obvTextAction,
                            d.status == 'Completed'
                              ? {color: colors.text, opacity: 0.5}
                              : null,
                          ]}>
                          {d.observation}
                        </Text>
                      </TouchableOpacity>

                      <View style={styles.subAss}>
                        <TouchableOpacity>
                          <Text style={styles.subAssText}>
                            Assigned to:{' '}
                            <Text style={styles.subAssuser}>
                              {d.AssignedTo}
                            </Text>
                          </Text>
                        </TouchableOpacity>

                        <Text style={styles.subAssText}>
                          {moment(d.time).format('MMM DD YYYY')}
                        </Text>
                      </View>
                    </View>
                  ),
                )}
              </View>
              <View style={styles.addActionAndRecommendation}>
                <TextInput
                  onChange={(e) => console.log(e)}
                  multiline={true}
                  style={styles.textaddActionContainer}
                  placeholder={'Add action / recommendation here'}
                />
                <View
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
                </View>
              </View>
              <View style={styles.attachmentsContainer}>
                <Text style={{fontSize: wp(3), fontWeight: 'bold'}}>
                  Attachments
                </Text>
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
                                  .then((res: any) => {
                                    console.log(res);
                                  })
                                  .catch((err) => console.log(err));
                              }
                            }}
                            style={{
                              flexDirection: 'row',
                              position: 'absolute',
                              right: wp(-2),
                              top: wp(2),
                              zIndex: wp(1),
                            }}>
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
                                  var arr = [...this.state.attachments].filter(
                                    (b) => b != d,
                                  );
                                  console.log(arr);
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
                                : null
                            }
                            style={{width: wp(7), height: wp(7)}}
                          />
                        </View>
                        <Text style={styles.attchFileText}>
                          {d.name.substring(0, 10)}.../.{d.type}
                        </Text>
                        <View
                          // onPress={() => {
                          //   if (d.upload != 'self') {
                          //     this.photoAnim.play();
                          //     downloadFile(d.url, d.type)
                          //       .then((res: any) => {
                          //         console.log(res);
                          //       })
                          //       .catch((err) => console.log(err));
                          //   }
                          // }}
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
                                  .then((res: any) => {
                                    console.log(res);
                                  })
                                  .catch((err) => console.log(err));
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
                                console.log(arr);
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

                <TouchableOpacity
                  onPress={() => this.openDoc(this.state.attachments)}
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
              </View>
              {/* Map Integration */}
              <View></View>
              {/* comments sections */}
            </View>
            <View style={styles.commentsSections}>
              {this.state.comments.map((d: any, i: number) => {
                console.log(`sdasdsa ${d.attachments}`);
                return (
                  <View>
                    <View style={styles.userComments}>
                      <Avatar
                        containerStyle={{marginTop: wp(0)}}
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
                    </View>
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
                                      : null
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
                  containerStyle={{marginRight: wp(2)}}
                  size={wp(6)}
                  rounded
                  source={{
                    uri:
                      'https://media-exp1.licdn.com/dms/image/C4D03AQG7BnPm02BJ7A/profile-displayphoto-shrink_400_400/0/1597134258301?e=1614211200&v=beta&t=afZdYNgBsJ_CI2bCBxkaHESDbTcOq95eUuLVG7lHHEs',
                  }}
                />

                <View style={styles.commentTextInput}>
                  <TextInput
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
                            comment: this.state.commentText,
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
                      {/* <Text
                  style={{
                    fontSize: wp(2.7),
                    opacity: 0.5,
                  }}>
                  Upload files will appear here
                </Text> */}
                      {/* // {type: 'photo', upload: 'self', name: 'sds', url: 'sds'}, */}
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
                                  : null
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
              <TouchableOpacity
                style={{
                  width: wp(45),
                  borderColor: colors.primary,
                  borderWidth: wp(0.3),
                  padding: wp(4),
                  marginRight: wp(3),
                  borderRadius: wp(4),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: colors.primary, fontSize: wp(3)}}>
                  Save as Draft
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: wp(45),
                  backgroundColor: colors.primary,
                  padding: wp(4),
                  justifyContent: 'center',
                  borderRadius: wp(4),
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: wp(3), color: colors.secondary}}>
                  Submit
                </Text>
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
                  onChange={(e) => console.log(e)}
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
        {/*  */}
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
              <TouchableOpacity
                onPress={() =>
                  imagePicker().then((res: any) => {
                    this.setState({invPhoto: res.uri});
                  })
                }>
                {this.state.invPhoto == null ? (
                  <Icon
                    containerStyle={{
                      opacity: 0.5,
                    }}
                    size={wp(20)}
                    name="user"
                    type="evilicon"
                    color={colors.text}
                  />
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
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: wp(3),
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: wp(2),
                }}>
                Add Involved User
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
                onChange={(v: any) =>
                  this.setState({
                    addInvolvedandNotifiedUsers: searchInSuggestions(
                      v,
                      this.state.involvedAndNotifiedUserType == 'involved'
                        ? Create_sor.Observation.esclateTo
                        : Create_sor.Observation.submitTo,
                    ),
                    involveAndNotifiedUsersName: v,
                  })
                }
                placeholder={'Type your name / email ...'}
              />

              {this.state.addInvolvedandNotifiedUsers.length != 0 ? (
                <View style={styles.involveSuggestCont}>
                  {this.state.addInvolvedandNotifiedUsers.map(
                    (d: string, i: number) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => {
                          this.setState({
                            involveAndNotifiedUsersName: d,
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
                            uri:
                              'https://media-exp1.licdn.com/dms/image/C4D03AQG7BnPm02BJ7A/profile-displayphoto-shrink_400_400/0/1597134258301?e=1614211200&v=beta&t=afZdYNgBsJ_CI2bCBxkaHESDbTcOq95eUuLVG7lHHEs',
                          }}
                        />
                        <Text style={styles.involvePSt}>{d}</Text>
                      </TouchableOpacity>
                    ),
                  )}
                </View>
              ) : null}
              <TouchableOpacity
                onPress={() => {
                  console.log(
                    this.state.involveAndNotifiedUsersName.substring(0, 2),
                  );
                  if (this.state.involvedAndNotifiedUserType == 'involved') {
                    this.state.involvedPerson.push({
                      id: Date.now(),
                      name: this.state.involveAndNotifiedUsersName,
                      photo:
                        this.state.invPhoto != ' '
                          ? this.state.invPhoto
                          : `https://dummyimage.com/500x500/aaaaaa/080808.png&text=${this.state.involveAndNotifiedUsersName.substring(
                              0,
                              2,
                            )}`,
                    });
                  } else {
                    this.state.notifiedPerson.push({
                      id: Date.now(),
                      name: this.state.involveAndNotifiedUsersName,
                      photo:
                        this.state.invPhoto != ' '
                          ? this.state.invPhoto
                          : `https://dummyimage.com/500x500/aaaaaa/080808.png&text=${this.state.involveAndNotifiedUsersName.substring(
                              0,
                              2,
                            )}`,
                    });
                  }

                  this.setState({
                    IsaddInvAndNotifiedUser: false,
                    involveAndNotifiedUsersName: '',
                    invPhoto: '',
                  });
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

            {/* <TouchableOpacity
              onPress={() => this.imgCap('take', this.state.photoArr)}
              style={[styles.takeaPhotoContainer, {marginTop: wp(1)}]}>
              <Icon
                size={wp(5)}
                name="camerao"
                type="antdesign"
                color={colors.text}
              />
              <Text style={[styles.selectText, {marginLeft: wp(10)}]}>
                Take a photo
              </Text>
              <Icon
                containerStyle={{position: 'absolute', right: wp(0)}}
                size={wp(5)}
                name="right"
                type="antdesign"
                color={colors.text}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.imgCap('upload', this.state.photoArr)}
              style={styles.takeaPhotoContainer}>
              <Icon
                size={wp(5)}
                name="photo"
                type="font-awesome"
                color={colors.text}
              />
              <Text style={[styles.selectText, {marginLeft: wp(10)}]}>
                Upload a photo
              </Text>
              <Icon
                size={wp(5)}
                name="right"
                containerStyle={{position: 'absolute', right: wp(0)}}
                type="antdesign"
                color={colors.primary}
              />
            </TouchableOpacity> */}
          </View>
        </Model>
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
            onCancel={() => console.log('sdsd')}
            imageUrls={this.state.images}
          />
        </Modal>
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

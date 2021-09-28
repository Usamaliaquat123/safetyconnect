import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {default as Model} from 'react-native-modal';
import {Icon} from 'react-native-elements';
import styles from './styles';
import {Tags, Suggestions} from '@components';
import Modal from 'react-native-modal';
import {fileuploader} from '@utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {colors, fonts, animation, GlStyles, images} from '@theme';
import {Avatar} from 'react-native-elements';
import {createApi, Create_sor} from '@service';
import LottieView from 'lottie-react-native';
// import {searchInSuggestions} from '@utils';
import DocumentPicker from 'react-native-document-picker';
import {involved_persons} from '@typings';
import moment from 'moment';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
export interface SuggestionsPopProps {
  onClose: Function;
  isOpen: boolean;
  suggestions: Array<any>;
  currentUser: any;
  newAct: Boolean;
  isView: Boolean;
  save: Function;
  discard: Function;
  suggestedUsers: Array<involved_persons>;
  allSuggestions: Array<any>;
  submitToAndObserverEmails?: Array<string>;
}

export const searchInSuggestions = (
  str: string,
  strArray: Array<involved_persons>,
): Array<Object> => {
  var strArr = [];
  for (var j = 0; j < strArray.length; j++) {
    if (strArray[j].email.toLowerCase().match(str.toLowerCase())) {
      strArr.push(strArray[j]);
    }
  }
  return strArr;
};

export default class SuggestionsPop extends React.Component<
  SuggestionsPopProps,
  any
> {
  constructor(props: any) {
    super(props);

    this.state = {
      suggestedUsers: props.suggestedUsers,
      observation: props.suggestions.content,
      submittedTo: props.suggestions.SubmittedTo,
      type: props.suggestions.category,
      status: props.suggestions.status,
      suggestions: [],
      matched: false,
      actionsChangeable: false,
      is_complete: props.suggestions.is_complete,
      is_selected: props.suggestions.is_selected,
      AssignedTo:
        typeof props.suggestions.assigned_to == 'string'
          ? [props.suggestions.assigned_to]
          : props.suggestions.assigned_to,
      actionsText: '',
      openCalendar: false,
      selectedInput: 0,
      justificationT: '',
      files: [],
      statuses: props.suggestions.status,
      attachments: [],
      addjustificationPop: true,
      targetDate: props.suggestions.dueDate,
      submitToAndObserverEmailsLocal: props.submitToAndObserverEmails,
      justificationErr: false,
    };
  }

  componentDidMount = () => {
    console.log('five why justification');
    console.log(this.props.suggestions);

    if (this.state.AssignedTo[0] == this.props.currentUser.email) {
      this.setState({actionsChangeable: true});
    } else {
      this.setState({actionsChangeable: false});
    }

    // if()

    AsyncStorage.getItem('email').then((e) => {
      // this.state.submitToAndObserverEmailsLocal.concat(e);
      this.setState({});

      // console.log('this.state.submitToAndObserverEmailsLocal');
      // console.log(this.state.submitToAndObserverEmailsLocal);

      if (
        this.state.submitToAndObserverEmailsLocal.filter((d: any) => d == e)
          .length == 0
      ) {
        this.setState({matched: false, actionsChangeable: false});
      } else {
        this.setState({matched: true});
      }
    });

    if (this.state.submitToAndObserverEmailsLocal.length != 0) {
      this.setState({matched: true});
    }

    if (this.state.statuses == 0) {
      this.setState({statuses: 'In Progress'});
    }

    if (this.props.suggestions.justification != undefined) {
      if (this.props.suggestions.justification.attachments.length != 0) {
        var slipiting = this.props.suggestions.justification.attachments.map(
          (d: any) => (d = `report/${d}`),
        );
        var dataa = {
          bucket: 'hns-codist',
          report: slipiting,
        };

        // console.log('sdsds');
        // console.log(
        //   this.props.suggestions.justification.attachments.map(
        //     (d) => d.split('.')[1],
        //   ),
        // );
        // var files = {
        //   name: this.props.suggestions.justification.attachments.split('/')[1],
        //   type: this.props.suggestions.justification.attachments
        //     .split('/')[1]
        //     .split('.')[1],
        //   uri: '',

        // };

        for (
          let j = 0;
          j < this.props.suggestions.justification.attachments.length;
          j++
        ) {
          // const element = this.props.suggestions.j[j];

          // console.log(files);
          createApi
            .createApi()
            .getPublicPhotos(dataa)
            .then((res) => {
              console.log(res.data);

              this.state.files.push({
                name: this.props.suggestions.justification.attachments[j],
                type:
                  this.props.suggestions.justification.attachments[j].split(
                    '.',
                  )[1] == 'jpeg'
                    ? 'image'
                    : this.props.suggestions.justification.attachments[j].split(
                        '.',
                      )[1] == 'png'
                    ? 'image'
                    : this.props.suggestions.justification.attachments[j].split(
                        '.',
                      )[1] == 'jpg'
                    ? 'image'
                    : this.props.suggestions.justification.attachments[j].split(
                        '.',
                      )[1],
                uri: res.data[j],
              });

              console.log('this.state.files');
              console.log(this.state.files);
              this.setState({});

              // this.setState({files: res.data});
            });
        }

        // if(){

        //   this.setState({
        //     actionsChangeable: this.props.suggestions.actionsChangeable,
        //   });
        // }

        console.log('old files');
      } else {
        // this.props.suggestions.justification.attachment.map(
        //   (d: any) => (d = `old/${d}`),
        // );
      }
      this.setState({
        justificationT: this.props.suggestions.justification.content,
      });
    }
    this.setState({
      addjustificationPop: false,
      // justificationT: 'his.props.suggestions.justification.content',
    });
    // }

    // if(this.props.suggestions.justification.attachment){

    // }
  };

  openDoc = async (attach: Array<Object>) => {
    try {
      var res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // DocType(res, this.state.attachments).then((res) => {
      //   this.setState({});
      // });

      if (res.type == 'image/jpeg' || res.type == 'image/png') {
        res['orgType'] = res.type;
        res.type = 'image';
      } else {
        if (res.name.split('.')[1] == 'docx') {
          res['orgType'] = res.type;
          res.type = 'docx';
        } else if (res.name.split('.')[1] == 'pdf') {
          res['orgType'] = res.type;
          res.type = 'pdf';
        } else if (res.name.split('.')[1] == 'xlsx') {
          res['orgType'] = res.type;
          res.type = 'xlsx';
        }
      }

      if (
        res.type == 'docx' ||
        res.type == 'pdf' ||
        res.type == 'xlsx' ||
        res.type == 'image'
      ) {
        var imgData = {
          name: res.name,
          uri: res.uri,
          type: res.type,
        };

        console.log(imgData);
        this.setState({fileLoading: true});

        fileuploader(res.orgType, res.orgType.split('/')[1], res.uri).then(
          (filename: any) => {
            console.log('filename hai');
            console.log(filename);
            imgData['name'] = filename;
            this.setState({fileLoading: false});
            attach.splice(0, 0, imgData);
            this.setState({});
          },
        );
        // this.state.filename.push(imgData);
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

  render() {
    return (
      <Model
        animationIn={'bounceInUp'}
        animationOut={'bounceOutDown'}
        animationInTiming={1000}
        animationOutTiming={1000}
        isVisible={this.props.isOpen}
        onBackdropPress={() => this.props.onClose()}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.containerPopup}>
            <View>
              <View style={styles.containerText}>
                <Text style={styles.containerTextString}>
                  Action / Recommendation
                </Text>
                <Icon
                  containerStyle={{
                    position: 'absolute',
                    right: wp(-15),
                    // top: wp(),
                  }}
                  onPress={() => this.props.onClose()}
                  name={'cross'}
                  type={'entypo'}
                  color={'black'}
                />
              </View>
            </View>
            {/* Content */}
            <View style={{alignSelf: 'flex-start', marginTop: wp(5)}}>
              <Text style={styles.recommendationsHead}>Recommendations</Text>
            </View>
            <View
              style={[
                styles.commentTextInput,
                this.state.selectedInput == 1
                  ? {borderColor: colors.green, borderWidth: wp(0.3)}
                  : {borderColor: colors.lightGrey},
              ]}>
              <TextInput
                onFocus={() => this.setState({selectedInput: 1})}
                style={styles.textInputPopup}
                multiline={true}
                editable={this.state.matched}
                value={this.state.observation}
                onChange={(e) => {
                  if (this.props.isView) {
                    this.setState({observation: e.nativeEvent.text});
                  }
                }}
                placeholder={
                  this.state.observation === ''
                    ? 'Type your recommendations here '
                    : this.state.observation
                }
              />
            </View>

            <View style={{marginTop: wp(3), alignSelf: 'flex-start'}}>
              <Text
                style={{
                  fontSize: wp(3),
                  marginLeft: wp(4),
                  textAlign: 'left',
                  fontFamily: fonts.SFuiDisplayMedium,
                }}>
                Target Date
              </Text>
              <TouchableOpacity
                onPress={() => this.setState({openCalendar: true})}
                style={[styles.commentTextInput, {marginLeft: wp(4)}]}>
                <TextInput
                  editable={false}
                  maxLength={500}
                  onFocus={() => {}}
                  style={styles.textInputPopup}
                  multiline={true}
                  value={moment(this.state.targetDate).format('DD MMM YYYY')}
                  // onChangeText={(e) => {}
                  placeholder={'Select your Target Date'}
                />

                <View style={styles.arrowRightAssigners}>
                  <Icon
                    size={wp(5)}
                    name="calendar"
                    type="antdesign"
                    color={colors.primary}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {this.state.AssignedTo != undefined && (
              <>
                {this.state.AssignedTo.length >= 1 && (
                  <View style={{alignSelf: 'center'}}>
                    <Text style={styles.assignersHead}>Assigners</Text>
                  </View>
                )}

                <>
                  {this.state.AssignedTo.length < 1 && (
                    <View>
                      {/* Assdigned to */}
                      <View style={{alignSelf: 'flex-start'}}>
                        <Text style={styles.tagAssigners}>Tag Assigners</Text>
                      </View>
                      {/* Assigners */}
                      {this.state.AssignedTo.length < 1 && (
                        <Text
                          style={{
                            fontSize: wp(3),
                            marginBottom: wp(1),
                            color: colors.error,
                          }}>
                          You have to assign someone..
                        </Text>
                      )}
                      <View style={[styles.commentTextInput]}>
                        <TextInput
                          maxLength={500}
                          editable={this.state.matched}
                          onFocus={() =>
                            this.setState({
                              selectedInput: 2,
                              suggestions: searchInSuggestions(
                                '',
                                this.state.suggestedUsers,
                              ),
                            })
                          }
                          style={styles.textInputPopup}
                          multiline={true}
                          value={this.state.actionsText}
                          onChangeText={(e) => {
                            if (e === '') {
                              this.setState({suggestions: [], actionsText: e});
                            } else {
                              // this.state.suggestedUsers.filter((d : any) => d.email != )

                              this.setState({
                                suggestions: searchInSuggestions(
                                  e,
                                  this.state.suggestedUsers,
                                ),
                              });

                              this.setState({actionsText: e});
                            }
                          }}
                          placeholder={'Type assigner email address'}
                        />

                        <TouchableOpacity
                          onPress={() => {
                            this.state.AssignedTo.push(this.state.actionsText);
                            this.setState({actionsText: ''});
                          }}
                          style={styles.arrowRightAssigners}>
                          <Icon
                            size={wp(5)}
                            name="arrowright"
                            type="antdesign"
                            color={colors.primary}
                          />
                        </TouchableOpacity>
                      </View>
                      {/* Suggestions  */}
                      {this.state.suggestions.length == 0 ? null : (
                        // {this.state.involvePersonSuggestions.length != 0 ? (
                        <View style={styles.involveSuggestCont}>
                          {this.state.suggestions.map(
                            (d: involved_persons, i: number) => (
                              <TouchableOpacity
                                key={i}
                                onPress={() => {
                                  this.state.AssignedTo.push(d.email);
                                  this.setState({
                                    involvePersonText: '',
                                    suggestions: [],
                                  });
                                }}
                                style={[
                                  styles.involvePsuggCont,
                                  this.state.suggestions.length == i + 1
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
                                    {d.name}
                                  </Text>
                                  <Text style={{fontSize: wp(2.5)}}>
                                    {d.email}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            ),
                          )}
                        </View>
                      )}
                    </View>
                  )}
                </>
                <View style={styles.tagsContainer}>
                  {this.state.AssignedTo.length != 0 ? (
                    <Tags
                      type={'suggAndRecommendationsPopup'}
                      onClose={(d: any) => {
                        if (this.state.matched == true) {
                          if (this.props.isView) {
                            this.setState({
                              AssignedTo: [],
                            });
                          }
                        }
                      }}
                      tags={this.state.AssignedTo}
                    />
                  ) : null}
                </View>

                {/* change statuses */}
                <Text style={styles.selectYourElemination}>
                  Select your actions status
                </Text>
                <View style={styles.eleminationAndAdministrativeContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.matched) {
                        if (this.props.isView) {
                          this.setState({statuses: 'In Progress'});
                        }
                      }
                    }}
                    style={{marginLeft: wp(2), marginRight: wp(2)}}>
                    <Icon
                      //@ts-ignore
                      size={wp(7)}
                      name="progress-clock"
                      type="material-community"
                      color={
                        this.state.statuses == 'In Progress'
                          ? colors.green
                          : colors.lightGrey
                      }
                    />
                    <Text style={{fontSize: wp(2.5), opacity: 0.5}}>
                      In Progress
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.matched) {
                        if (this.props.isView) {
                          this.setState({statuses: 'Completed'});
                        }
                      }
                    }}
                    style={{marginLeft: wp(2), marginRight: wp(2)}}>
                    <Icon
                      //@ts-ignore
                      size={wp(7)}
                      name="progress-check"
                      type="material-community"
                      color={
                        this.state.statuses == 'Completed'
                          ? colors.green
                          : colors.lightGrey
                      }
                    />
                    <Text style={{fontSize: wp(2.5), opacity: 0.5}}>
                      Completed
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.matched) {
                        if (this.props.isView) {
                          this.setState({statuses: 'Rejected'});
                        }
                      }
                    }}
                    style={{marginLeft: wp(2), marginRight: wp(2)}}>
                    <Icon
                      //@ts-ignore
                      size={wp(7)}
                      name="progress-alert"
                      type="material-community"
                      color={
                        this.state.statuses == 'Rejected'
                          ? colors.green
                          : colors.lightGrey
                      }
                    />
                    <Text style={{fontSize: wp(2.5), opacity: 0.5}}>
                      Rejected
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* Add Justification */}
                {this.state.statuses != 'In Progress' && (
                  <>
                    {this.state.addjustificationPop == true ? (
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            addjustificationPop: !this.state
                              .addjustificationPop,
                          })
                        }
                        style={styles.justificationContainer}>
                        <Text style={styles.justificationtext}>
                          Add Justification
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <>
                        <View>
                          <Text style={styles.justificationHeadingText}>
                            Justification:{'    '}
                          </Text>
                          <View style={styles.commentTextInput}>
                            <TextInput
                              onChangeText={(e) =>
                                this.setState({justificationT: e})
                              }
                              editable={this.state.matched}
                              multiline={true}
                              value={this.state.justificationT}
                              style={styles.textInputPopup}
                              placeholder={'Add your justification'}
                            />
                            <Icon
                              onPress={() => this.openDoc(this.state.files)}
                              name={'attachment'}
                              type={'entypo'}
                              size={wp(4)}
                            />
                          </View>
                          {this.state.justificationErr == true && (
                            <Text
                              style={{
                                fontSize: wp(3),
                                paddingLeft: wp(2),
                                fontFamily: fonts.SFuiDisplayMedium,
                                color: colors.error,
                              }}>
                              Justification is required!
                            </Text>
                          )}
                        </View>

                        {/* Justification attachments
                      {this.props.suggestions.justification.attachment.length ==
                      0 ? (
                        <Text>attachment </Text>
                      ) : (
                        <Text>attachment isn't avail</Text>
                      )} */}
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              alignSelf: 'center',
                            }}>
                            {/* File uploading */}

                            {this.state.fileLoading == true ? (
                              <View>
                                <LottieView
                                  autoPlay={true}
                                  style={{width: wp(30)}}
                                  source={animation.profileimage}
                                  loop={true}
                                />
                              </View>
                            ) : (
                              <>
                                <View
                                  style={{
                                    flexWrap: 'wrap',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  {this.state.files.map((d: any, i: number) => {
                                    if (d.type == 'image') {
                                      return (
                                        <TouchableOpacity
                                          onPress={() =>
                                            this.setState({imageViewer: true})
                                          }
                                          style={styles.AttchimageContainer}>
                                          <Image
                                            source={{
                                              uri: d.uri,
                                            }}
                                            style={[
                                              GlStyles.images,
                                              {borderRadius: wp(3)},
                                            ]}
                                            resizeMode={'cover'}
                                          />
                                          <TouchableOpacity
                                            onPress={() => {}}
                                            style={{
                                              position: 'absolute',
                                              right: wp(0),
                                            }}>
                                            <TouchableOpacity
                                              onPress={() => {
                                                var arr = [
                                                  ...this.state.files,
                                                ].filter((b) => b != d);
                                                this.setState({files: arr});
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
                                          </TouchableOpacity>
                                        </TouchableOpacity>
                                      );
                                    } else {
                                      return (
                                        <TouchableOpacity
                                          onPress={() =>
                                            this.setState({imageViewer: true})
                                          }
                                          style={[
                                            styles.AttchimageContainer,
                                            {
                                              // justifyContent : "center",
                                              alignItems: 'center',
                                              borderWidth: wp(0.3),
                                              borderColor: colors.textOpa,
                                            },
                                          ]}>
                                          <View
                                            style={{
                                              width: '60%',
                                              height: '60%',
                                              marginTop: wp(4),
                                            }}>
                                            <Image
                                              source={
                                                d.type == 'pdf'
                                                  ? images.pdf
                                                  : d.type == 'docx'
                                                  ? images.doc
                                                  : d.type == 'xlsx'
                                                  ? images.excel
                                                  : null
                                              }
                                              style={{
                                                width: '100%',
                                                height: '100%',
                                              }}
                                              resizeMode={'contain'}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: wp(2.5),
                                              marginTop: wp(1),
                                              marginBottom: wp(3),
                                              fontFamily:
                                                fonts.SFuiDisplayMedium,
                                              textAlign: 'center',
                                            }}>
                                            {d.name.slice(0, 3)}
                                          </Text>
                                          <TouchableOpacity
                                            onPress={() => {}}
                                            style={{
                                              position: 'absolute',
                                              right: wp(0),
                                            }}>
                                            <TouchableOpacity
                                              onPress={() => {
                                                var arr = [
                                                  ...this.state.files,
                                                ].filter((b) => b != d);
                                                this.setState({files: arr});
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
                                          </TouchableOpacity>
                                        </TouchableOpacity>
                                      );
                                    }
                                  })}
                                </View>
                              </>
                            )}
                          </View>
                        </View>
                      </>
                    )}
                  </>
                )}

                {/* Elimination / Administrative  */}
                <Text style={styles.selectYourElemination}>
                  Select your elimination / Administrative
                </Text>
                <View style={styles.eleminationAndAdministrativeContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.actionsChangeable == true) {
                        if (this.props.isView) {
                          this.setState({type: 'Elimination'});
                        }
                      } else if (this.props.newAct == true) {
                        this.setState({type: 'Elimination'});
                      }
                    }}
                    style={{marginLeft: wp(2), marginRight: wp(2)}}>
                    <Icon
                      //@ts-ignore
                      size={wp(7)}
                      name="team"
                      type="antdesign"
                      color={
                        this.state.type == 'Elimination'
                          ? colors.green
                          : colors.lightGrey
                      }
                    />
                    <Text style={{fontSize: wp(2.5), opacity: 0.5}}>
                      Elimination
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.actionsChangeable == true) {
                        if (this.props.isView) {
                          this.setState({type: 'Administrative'});
                        }
                      } else if (this.props.newAct == true) {
                        this.setState({type: 'Administrative'});
                      }
                    }}
                    style={{marginLeft: wp(2), marginRight: wp(2)}}>
                    <Icon
                      size={wp(7)}
                      name="admin-panel-settings"
                      type="material"
                      color={
                        this.state.type == 'Administrative'
                          ? colors.green
                          : colors.lightGrey
                      }
                    />
                    <Text style={{fontSize: wp(2.5), opacity: 0.5}}>Admin</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.actionsChangeable == true) {
                        if (this.props.isView) {
                          this.setState({type: 'Substitution'});
                        }
                      } else if (this.props.newAct == true) {
                        this.setState({type: 'Substitution'});
                      }
                    }}
                    style={{marginLeft: wp(2), marginRight: wp(2)}}>
                    <Icon
                      size={wp(7)}
                      name="unlink"
                      type="font-awesome"
                      color={
                        this.state.type == 'Substitution'
                          ? colors.green
                          : colors.lightGrey
                      }
                    />
                    <Text style={{fontSize: wp(2.5), opacity: 0.5}}>
                      Substitution
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.actionsChangeable == true) {
                        if (this.props.isView) {
                          this.setState({type: 'Engineering'});
                        }
                      } else if (this.props.newAct == true) {
                        this.setState({type: 'Engineering'});
                      }
                    }}
                    style={{marginLeft: wp(2), marginRight: wp(2)}}>
                    <Icon
                      size={wp(7)}
                      name="engineering"
                      type="material"
                      color={
                        this.state.type == 'Engineering'
                          ? colors.green
                          : colors.lightGrey
                      }
                    />
                    <Text style={{fontSize: wp(2.5), opacity: 0.5}}>
                      Engineering
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.actionsChangeable == true) {
                        if (this.props.isView) {
                          this.setState({type: 'PPE'});
                        }
                      } else if (this.props.newAct == true) {
                        this.setState({type: 'PPE'});
                      }
                    }}
                    style={{marginLeft: wp(2), marginRight: wp(2)}}>
                    <Icon
                      size={wp(7)}
                      name="engineering"
                      type="material"
                      color={
                        this.state.type == 'PPE'
                          ? colors.green
                          : colors.lightGrey
                      }
                    />
                    <Text
                      style={{
                        fontSize: wp(2.5),
                        opacity: 0.5,
                        textAlign: 'center',
                      }}>
                      PPE
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Discard and save buttons */}
                <View style={styles.btnsContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.discard();
                    }}
                    style={styles.btnDiscard}>
                    <Text style={styles.btnDiscardText}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.AssignedTo.length != 0) {
                        var sugg = {
                          // status: this.state.status,
                          content: this.state.observation,
                          createdBy: this.props.currentUser.email,
                          assignTo: this.state.AssignedTo[0],
                          assigned_to: this.state.AssignedTo[0],
                          dueDate: this.state.targetDate,
                          is_complete: this.state.is_complete,
                          // is_selected: this.state.is_selected,
                          category: this.state.type,
                          hierarchy: this.state.type,
                          status: `${this.state.statuses}`,
                          action: this.state.observation,
                        };

                        if (this.state.addjustificationPop == false) {
                          sugg['justification'] = {
                            content: this.state.justificationT,
                            attachments: this.state.files.map(
                              (d: any) => (d = d.name),
                            ),
                          };
                        }

                        if (
                          this.state.statuses == 'Completed' ||
                          this.state.statuses == 'Rejected'
                        ) {
                          console.log(this.state.justificationT);
                          if (this.state.justificationT !== '') {
                            this.props.save(sugg);
                          } else {
                            this.setState({justificationErr: true});
                          }
                        } else {
                          this.props.save(sugg);
                        }
                      }
                    }}
                    style={styles.saveBtn}>
                    <Text style={styles.sveBtnText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>

          {/* Callender */}

          <Modal
            animationInTiming={1000}
            animationIn={'bounceInUp'}
            animationOut={'bounceOutDown'}
            animationOutTiming={1000}
            useNativeDriver={true}
            isVisible={this.state.openCalendar}
            onBackdropPress={() => {
              this.setState({openCalendar: false});
            }}>
            <View
              style={{
                padding: wp(5),
                borderRadius: wp(3),
                backgroundColor: colors.secondary,
              }}>
              <Text
                style={{
                  fontSize: wp(3.5),
                  fontFamily: fonts.SFuiDisplayBold,
                  textAlign: 'center',
                }}>
                Select Your Date
              </Text>
              <View style={{}}>
                <Text
                  style={{
                    position: 'absolute',
                    top: wp(4),
                    // left: wp(1),
                    alignSelf: 'center',
                    // right: wp(1),
                    zIndex: 1000,
                    fontSize: wp(2.8),
                    // marginTop: wp(3),
                    opacity: 0.5,
                    fontFamily: fonts.SFuiDisplayBold,
                    // textAlign: 'center',
                  }}>
                  {this.state.currMonth}
                </Text>
              </View>
              <Icon
                onPress={() => this.setState({openCalendar: false})}
                containerStyle={{
                  position: 'absolute',
                  right: wp(2),
                  top: wp(2),
                }}
                name={'cross'}
                type={'entypo'}
                size={wp(4)}
                color={colors.text}
              />
              <Calendar
                theme={{
                  textDayFontSize: wp(3),
                  textDayFontFamily: fonts.SFuiDisplayMedium,
                  dotColor: colors.primary,
                  // textSectionTitleColor: colors.primary,

                  selectedDayTextColor: colors.primary,
                }}
                onDayPress={(day) => {
                  let data = {
                    [day.dateString]: {marked: true, color: 'green'},
                  };
                  this.setState({
                    //   currentDate: day.dateString,
                    marked: data,
                    selectedDay: day.dateString,
                  });

                  var date = `${day.dateString}`;

                  this.setState({targetDate: day.dateString});
                  this.setState({openCalendar: false});
                }}
                markedDates={this.state.marked}
                // markedDates={{}}
                markingType={'custom'}
                // Handler which gets executed on day long press. Default = undefined
                onDayLongPress={(day) => {}}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'yyyy MM'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={(d) => {}}
                // Hide month navigation arrows. Default = false
                hideArrows={false}
                // Replace default arrows with custom ones (direction can be 'left' or 'right')
                // renderArrow={(direction) => <Arrow />}
                // Do not show days of other months in month page. Default = false
                hideExtraDays={true}
                // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={false}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                firstDay={1}
                // Hide day names. Default = false
                hideDayNames={false}
                // Show week numbers to the left. Default = false
                showWeekNumbers={true}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={(subtractMonth) => subtractMonth()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={(addMonth) => addMonth()}
                // Disable left arrow. Default = false
                disableArrowLeft={false}
                // Disable right arrow. Default = false
                disableArrowRight={false}
                // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                disableAllTouchEventsForDisabledDays={true}
                // Replace default month and year title with custom one. the function receive a date as parameter.
                renderHeader={(date) => {
                  /*Return JSX*/

                  this.setState({currMonth: moment(date[0]).format('MMMM')});
                }}
                // Enable the option to swipe between months. Default = false
                enableSwipeMonths={true}
              />
            </View>
          </Modal>
        </ScrollView>
      </Model>
    );
  }
}

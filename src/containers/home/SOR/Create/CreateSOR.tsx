import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
} from 'react-native';
import {connect} from 'react-redux';
import {Create_sor, riskxSeverityxliklihood} from '@service/mock';
import styles from './style';
import moment from 'moment';
import {
  searchInSuggestions,
  filterLocation,
  classifySor,
  suggestInActionsRecommendations,
} from '@utils';
import {Icon, Avatar} from 'react-native-elements';
import {colors} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import DocumentPicker from 'react-native-document-picker';
import {Chart, Suggestions, RepeatedSor, Tags} from '@components';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import {classifySorBtn, Isor, involved_persons, user} from '@typings';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {parse} from 'react-native-svg';
import {createApi} from '@service';
type CreateSORNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'CreateSOR'
>;
type CreateSORRouteProp = RouteProp<StackNavigatorProps, 'CreateSOR'>;

export interface CreateSORProps {
  navigation: CreateSORNavigationProp;
  route: CreateSORRouteProp;
  reduxActions: any;
  reduxState: any;
}

class CreateSOR extends React.Component<CreateSORProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      // Animated View | Animations
      initAnim: new Animated.Value(0),
      contentAnim: new Animated.Value(80),
      // dropdownAnim: new Animated.Value(1),
      // *****
      selectL: false,
      projectSuggest: [],
      exclateToArr: [],
      observationT: '',
      obserLocation: '@Add Location',
      currentlocation: Create_sor.Observation.locations[0],
      project: Create_sor.Observation.projects[0],
      curTime: '',
      suggestions: [],
      involvePersonSuggestions: [],
      actionRecommendations: [],
      filename: [],
      involvePersonText: '',
      actionRecommendationsText: '',
      classifySorbtns: classifySor,
      observation: '',
      // esclateTo / submit To
      SelectsubmitTo: false,
      submitToArr: [],
      submitTo: '',
      selectEsclateTo: false,
      esclateTo: '',
      // repeated sor modal
      repeatedSorModal: false,
      submitToTags: [],
      exclateToTags: [],
      involvePersonTags: [],
      actionsTags: [],
      // Selected input
      selectedInputIndex: 1,

      liklihood: riskxSeverityxliklihood.liklihood,
      severity: riskxSeverityxliklihood.severity,
      // Involved Persons of this project
      involved_persons: [],
      user: {},
    };
  }
  submitDraft = async () => {
    // do shinhomet
  };
  // Document Picker and update the state
  pickupDoc = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      this.state.filename.push(
        res.name.length > 7
          ? res.name.substring(0, 8) + `...${res.type}`
          : res.name,
      );
      // this.setState({});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  // Extract Locations and Search in Suggestions Array
  extractLocation = (str: string) => {
    var location = filterLocation(str);
    if (location !== null) {
      this.setState({obserLocation: location[0].slice(1)});
    } else {
      this.setState({obserLocation: '@Add Location'});
    }
    var srchArr = suggestInActionsRecommendations(
      str,
      Create_sor.Observation.suggestions,
    );
    this.setState({suggestions: [...srchArr], observationT: str});
  };
  // Search in InvolvePersons Array
  suggestInvolvePersons = (str: string) => {
    // console.log(this.state.involved_persons);
    var srchSug = searchInSuggestions(str, this.state.involved_persons);
    if (str == '') {
      this.setState({
        involvePersonSuggestions: [],
        involvePersonText: str,
      });
    } else {
      console.log(srchSug);
      this.setState({
        involvePersonSuggestions: [...srchSug],
        involvePersonText: str,
      });
    }
  };

  // Search in Esclated To
  suggestInEsclatedTo = (str: string) => {
    var srchSug = searchInSuggestions(str, this.state.involved_persons);
    if (str == '') {
      this.setState({
        involvePersonSuggestions: [],
        involvePersonText: str,
      });
    } else {
      console.log(srchSug);
      this.setState({
        involvePersonSuggestions: [...srchSug],
        involvePersonText: str,
      });
    }
  };

  // Search Action / Recommendation Suggestions
  actionRecommendSuggestion = (str: string) => {
    if (str == '') {
      this.setState({
        actionRecommendations: [],
        actionRecommendationsText: str,
      });
    } else {
      const form = new FormData();
      this.setState({actionRecommendationsText: str});
      form.append('act1', str);
      createApi
        .createApi()
        .suggestiosns(form)
        .then((res: any) => {
          this.setState({
            actionRecommendations: [...res.data.actjson],
          });
        });
    }
  };

  // search in observatiosn
  searchInObservation = (str: string) => {
    const form = new FormData();
    form.append('obs1', str);
    createApi
      .createApi()
      .observationSuggestions(form)
      .then((res: any) => {
        this.setState({suggestions: res.data.results});
      });
  };
  componentDidMount = () => {
    // get involved users
    // AsyncStorage.getItem('involved_persons').then((res: any) =>
    // );
    console.log(this.state.involved_persons);
    // Get User info
    AsyncStorage.getItem('user').then((user: any) => {
      this.setState({user: JSON.parse(user)});
    });
    createApi
      .createApi()
      .getProject({
        projectid: '603b8c1b83176628f90f8dbe',
      })
      .then((res: any) => {
        // console.log(res.data.data.involved_persons);
        this.setState({involved_persons: res.data.data.involved_persons});
      });
    // Time Update on every seconds

    setInterval(() => {
      this.setState({
        curTime: moment().format('LT'),
        obserLocation: this.state.obserLocation
          ? this.state.obserLocation
          : '@Add Location',
      });
    }, 1000);
    this.AnimatedViews();
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

  onSubmit = () => {};

  componentWillUnmount = () => {};

  render() {
    return (
      <Animated.View style={[styles.container, {opacity: this.state.initAnim}]}>
        {/* Header */}
        <ScrollView>
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
                    uri: this.state.user.img_url,
                  }}
                />
              </View>
            </View>
          </View>
          {/* content */}
          <Animated.View
            style={[
              styles.content,
              {
                marginTop: this.state.contentAnim,
              },
            ]}>
            <Text style={styles.cnHeading}>Create New SOR</Text>
            {/* Observation Details */}
            <Text style={styles.observationT}>Observation Detail</Text>
            <View
              style={[
                styles.observationDetail,
                this.state.selectedInputIndex == 1
                  ? {borderColor: colors.green}
                  : null,
              ]}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.obserttle}>On </Text>
                <Icon
                  size={15}
                  name="calendar-clock"
                  type="material-community"
                  color={colors.primary}
                />
                <Text style={[styles.obserttle, {color: colors.primary}]}>
                  {moment().format('MMMM DD')}, {moment().format('YYYY')}{' '}
                </Text>
                <Text style={styles.obserttle}>
                  at about {this.state.curTime}
                </Text>
              </View>
              <Text style={styles.obserttle}> it was observed that</Text>
              <TextInput
                multiline={true}
                onFocus={() => this.setState({selectedInputIndex: 1})}
                value={this.state.observationT}
                underlineColorAndroid="transparent"
                placeholder="Enter your observation here"
                onChange={(t) => {
                  this.setState({observationT: t.nativeEvent.text});
                  this.searchInObservation(t.nativeEvent.text);
                }}
                style={[styles.obInputText]}></TextInput>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.obText}>
                  at{' '}
                  {/* <Text style={{color: colors.primary}}>
                  {this.state.obserLocation}
                </Text>{' '} */}
                </Text>
                <TextInput
                  value={this.state.observationr}
                  style={{
                    marginTop: wp(-4.5),
                    borderBottomWidth: 0,
                    color: colors.primary,
                    fontWeight: 'bold',
                    fontSize: wp(3),
                  }}
                  onChange={(e) =>
                    this.setState({observation: e.nativeEvent.text})
                  }
                  placeholder={'@Add Location'}
                />
                <Text style={styles.obText}> and it happend at</Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: wp(-7)}}>
                <Text
                  style={{
                    fontSize: wp(3),
                    opacity: 0.5,
                    marginTop: wp(3),
                    marginLeft: wp(1),
                  }}>
                  <Text style={{fontWeight: 'bold'}}>
                    {moment().format('MMMM DD, YYYY')}
                  </Text>{' '}
                  at about{' '}
                  <Text style={{fontWeight: 'bold'}}>
                    {moment().format('LT')}
                  </Text>
                </Text>
              </View>
            </View>
            {/* Suggestions  */}
            {this.state.suggestions.length != 0 ? (
              <Suggestions
                styles={{}}
                type={'observation'}
                arr={this.state.suggestions}
                onPress={(d: string) =>
                  this.setState({observationT: d, suggestions: []})
                }
              />
            ) : null}

            {/* Classify SOR */}
            <View style={styles.clasSorContainer}>
              <Text style={styles.clasSorHeading}>Classify SOR</Text>
              <View style={styles.clasSorBtnV}>
                {this.state.classifySorbtns.map(
                  (d: classifySorBtn, i: number) => (
                    <TouchableOpacity
                      key={i}
                      onPress={() => {
                        var classifySorbtns = [...this.state.classifySorbtns];
                        classifySorbtns.map((b: object, j: number) => {
                          if (classifySorbtns[j] == d) {
                            classifySorbtns[j].selected = !classifySorbtns[j]
                              .selected;
                          } else {
                            classifySorbtns[j].selected = false;
                          }
                        });

                        this.setState(classifySorbtns);
                      }}
                      style={[
                        styles.clasSorBtnCont,
                        {borderColor: d.color},
                        d.selected ? {backgroundColor: d.color} : {},
                      ]}>
                      <View style={styles.clasSorBtnWrap}>
                        <Icon
                          size={17}
                          name={d.icon}
                          type={d.type}
                          color={d.selected ? '#fff' : d.color}
                        />
                        <Text
                          style={[
                            styles.clasSorBtnTtl,
                            {
                              color: d.selected ? '#fff' : d.color,
                            },
                          ]}>
                          {d.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ),
                )}
              </View>
            </View>
            {/* Risk Chart*/}
            {this.state.classifySorbtns[1].selected == false ? (
              <View>
                <Text style={styles.RiskHeading}>Risk</Text>

                <Chart
                  liklihood={this.state.liklihood}
                  severity={this.state.severity}
                  style={{alignSelf: 'center', marginTop: wp(3)}}
                  onPress={(v: object) => console.log(v)}
                />
              </View>
            ) : null}
            {/* Involved Persons */}
            <View style={styles.involvePContainer}>
              <Text style={styles.involvePText}>
                Involved Person{' '}
                <Text style={styles.involvePTextOtional}>(Optional)</Text>
              </Text>
              <TextInput
                value={this.state.involvePersonText}
                style={[
                  styles.involvePInput,
                  this.state.selectedInputIndex == 2
                    ? {borderColor: colors.green}
                    : null,
                ]}
                onFocus={() => this.setState({selectedInputIndex: 2})}
                onChangeText={(e) => this.suggestInvolvePersons(e)}
                placeholder={'Enter person name /email'}
              />
              <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                <Tags
                  onClose={(d: any) => {
                    this.setState({
                      involvePersonTags: this.state.involvePersonTags.filter(
                        (v: any) => v !== d,
                      ),
                    });
                  }}
                  tags={this.state.involvePersonTags}
                />
              </View>
              {this.state.involvePersonSuggestions.length != 0 ? (
                <View style={styles.involveSuggestCont}>
                  {this.state.involvePersonSuggestions.map(
                    (d: involved_persons, i: number) => (
                      <View key={i}>
                        <TouchableOpacity
                          onPress={() => {
                            this.state.involvePersonTags.push(d);
                            this.setState({
                              involvePersonText: '',
                              involvePersonSuggestions: [],
                            });
                          }}
                          style={[
                            styles.involvePsuggCont,
                            this.state.involvePersonSuggestions.length == i + 1
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
                            <Text style={styles.involvePSt}>{d.name}</Text>
                            <Text style={{fontSize: wp(2.5), opacity: 0.5}}>
                              {d.email}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    ),
                  )}
                </View>
              ) : null}
            </View>

            {/* Attachment / Upload files */}
            <View style={{flexDirection: 'row', marginTop: wp(5)}}>
              <Text style={{fontSize: wp(3), fontWeight: 'bold'}}>
                Attachments{' '}
              </Text>
              <Text style={{fontStyle: 'italic', fontSize: wp(3)}}>
                (optional)
              </Text>
            </View>
            <View style={styles.uploadBorder}>
              <View style={styles.uploadBIcmTxt}>
                <Icon
                  style={{padding: 3}}
                  size={wp(10)}
                  name="file-text"
                  type="feather"
                  color={colors.primary}
                />
                <Text style={styles.uplaodText}>
                  Drag and drop your files to start upload{' '}
                </Text>
              </View>
              {this.state.filename.length != 0 ? (
                <View>
                  {/* {this.state.filename.map((d: string, i: number) => ( */}

                  <View
                    style={{
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                    }}>
                    <Tags
                      onClose={(d: any) => {
                        this.setState({
                          filename: this.state.filename.filter(
                            (v: any) => v !== d,
                          ),
                        });
                      }}
                      style={{alignContent: 'center'}}
                      tags={this.state.filename}
                    />
                  </View>
                  {/* // <Text style={styles.uplaodText}>{d}</Text> */}
                  {/* ))} */}
                </View>
              ) : null}

              <TouchableOpacity
                onPress={() => {
                  if (this.state.filename.length < 5) {
                    this.pickupDoc();
                  }
                }}
                style={styles.uplaodBtn}>
                <Text style={styles.uploadfileText}>Upload File</Text>
              </TouchableOpacity>
            </View>

            {/* Actions/Recommendation */}
            {this.state.classifySorbtns[1].selected == false ? (
              <View style={styles.actionContainer}>
                <Text style={styles.actionsRecHeading}>
                  Actions / Recommendation
                </Text>
                {this.state.actionsTags.length < 3 && (
                  <TextInput
                    onFocus={() => this.setState({selectedInputIndex: 3})}
                    style={[
                      styles.actionInput,
                      this.state.selectedInputIndex == 3
                        ? {borderColor: colors.green}
                        : null,
                    ]}
                    value={this.state.actionRecommendationsText}
                    onChangeText={(e) => this.actionRecommendSuggestion(e)}
                    placeholder={'Suggest your recommendation / actions'}
                  />
                )}

                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                  <Tags
                    type={'sugg'}
                    onClose={(d: any) => {
                      this.setState({
                        actionsTags: this.state.actionsTags.filter(
                          (v: any) => v !== d,
                        ),
                      });
                    }}
                    tags={this.state.actionsTags}
                  />
                </View>

                {/* Suggestions  */}
                {this.state.actionRecommendations.length != 0 ? (
                  <Suggestions
                    type={'suggestions'}
                    styles={{}}
                    arr={this.state.actionRecommendations}
                    onPress={(d: any) => {
                      console.log(d);
                      // this.state.actionsTags.push(d);

                      if (
                        this.state.actionsTags.filter((v: any) => v == d)
                          .length == 0
                      ) {
                        this.state.actionsTags.push(d);
                        this.setState({actionRecommendations: []});
                      } else {
                        return null;
                      }

                      this.setState({
                        actionRecommendationsText: '',
                        actionRecommendations: [],
                      });
                    }}
                  />
                ) : null}
              </View>
            ) : null}

            {/* Submit To / Esclate To */}
            <View style={styles.optnToggleContainer}>
              <View>
                <Text style={styles.sbBtnText}>Submit to</Text>
                <View
                  style={[
                    styles.optnselector,
                    this.state.selectedInputIndex == 4
                      ? {borderColor: colors.green}
                      : null,
                  ]}>
                  <TextInput
                    onFocus={() => this.setState({selectedInputIndex: 4})}
                    style={styles.optnselectorText}
                    placeholder={'Enter person name / email'}
                    underlineColorAndroid="transparent"
                    onChange={(v: any) => {
                      this.setState({
                        submitToArr: searchInSuggestions(
                          v,
                          this.state.involved_persons,
                        ),
                        submitTo: v,
                      });
                    }}
                    value={this.state.submitTo}></TextInput>
                </View>
                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                  <Tags
                    onClose={(d: any) => {
                      this.setState({
                        submitToTags: this.state.submitToTags.filter(
                          (v: any) => v !== d,
                        ),
                      });
                    }}
                    tags={this.state.submitToTags}
                  />
                </View>
                {this.state.submitToArr.length != 0 ? (
                  <View style={styles.involveSuggestCont}>
                    {this.state.submitToArr.map(
                      (d: involved_persons, i: number) => (
                        <TouchableOpacity
                          key={i}
                          onPress={() => {
                            this.setState({
                              submitTo: '',
                              submitToArr: [],
                            });

                            if (
                              this.state.submitToTags.filter(
                                (v: involved_persons) => v == d,
                              ).length == 0
                            ) {
                              this.state.submitToTags.push(d);
                            } else {
                              return null;
                            }
                          }}
                          style={[
                            styles.involvePsuggCont,
                            this.state.submitToArr.length == i + 1
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
                          <Text style={styles.involvePSt}>{d.name}</Text>
                        </TouchableOpacity>
                      ),
                    )}
                  </View>
                ) : null}
              </View>
              <View>
                <Text style={styles.sbBtnText}>Escalate to</Text>
                <View
                  style={[
                    styles.optnselector,
                    this.state.selectedInputIndex == 5
                      ? {borderColor: colors.green}
                      : null,
                  ]}>
                  <TextInput
                    onFocus={() => this.setState({selectedInputIndex: 5})}
                    underlineColorAndroid="transparent"
                    onChange={(v: any) =>
                      this.setState({
                        exclateToArr: searchInSuggestions(
                          v,
                          Create_sor.Observation.esclateTo,
                        ),
                        esclateTo: v,
                      })
                    }
                    placeholder={'Enter person name / email'}
                    style={styles.optnselectorText}
                    value={this.state.esclateTo}></TextInput>
                </View>
                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                  <Tags
                    onClose={(d: any) => {
                      this.setState({
                        exclateToTags: this.state.exclateToTags.filter(
                          (v: any) => v !== d,
                        ),
                      });
                    }}
                    tags={this.state.exclateToTags}
                  />
                </View>
                {this.state.exclateToArr.length != 0 ? (
                  <View>
                    <View style={styles.involveSuggestCont}>
                      {this.state.exclateToArr.map(
                        (d: involved_persons, i: number) => (
                          <TouchableOpacity
                            key={i}
                            onPress={() => {
                              this.setState({esclateTo: '', exclateToArr: []});
                              if (
                                this.state.exclateToTags.filter(
                                  (v: involved_persons) => v == d,
                                ).length == 0
                              ) {
                                this.state.exclateToTags.push(d);
                              } else {
                                return null;
                              }
                            }}
                            style={[
                              styles.involvePsuggCont,
                              this.state.exclateToArr.length == i + 1
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
                            <Text style={styles.involvePSt}>{d.name}</Text>
                          </TouchableOpacity>
                        ),
                      )}
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
            {/* Draft And Submit Btns */}
            <TouchableOpacity
              onPress={() => this.submitDraft()}
              style={styles.submitsorbtn}>
              <Text style={styles.submitsorbtntxt}>Save as Draft</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({repeatedSorModal: true})}
              style={styles.submitsorbtnSb}>
              <Text style={styles.submitsorbtnSbtxt}>Submit</Text>
            </TouchableOpacity>
          </Animated.View>

          <Modal
            animationInTiming={1000}
            animationIn={'bounceInUp'}
            animationOut={'bounceOutDown'}
            animationOutTiming={1000}
            useNativeDriver={true}
            isVisible={this.state.repeatedSorModal}>
            <RepeatedSor
              onViewSor={(d: Isor) => {
                this.setState({repeatedSorModal: false});
                this.props.navigation.navigate('ViewSOR', {data: d});
              }}
              onSkip={() => {
                this.setState({repeatedSorModal: false});
                this.props.navigation.goBack();
              }}
              onSubmit={() => {
                this.setState({repeatedSorModal: false});
                this.props.navigation.navigate('ViewAll');
              }}
            />
          </Modal>
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateSOR);

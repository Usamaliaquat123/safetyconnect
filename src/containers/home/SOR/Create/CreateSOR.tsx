import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
  ActivityIndicator,
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
import {bindActionCreators} from 'redux';
import * as reduxActions from '../../../../store/actions/listSorActions';

import {Icon, Avatar} from 'react-native-elements';
import {colors} from '@theme';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import DocumentPicker from 'react-native-document-picker';
import {
  Chart,
  Suggestions,
  RepeatedSor,
  SuggestionsPop,
  Tags,
  Calendars,
  Selector,
  FiveWhy,
} from '@components';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import {classifySorBtn, Isor, involved_persons} from '@typings';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, submitted} from '@service';
// import * as RNFS from 'react-native-fs';
// import {Buffer} from 'buffer';
import {AllSorDTO} from '@dtos';
import QuickReplies from 'react-native-gifted-chat/lib/QuickReplies';

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
// Project Id
const PROJECT_ID: string = '60867ed86281162915ce4aac';
class CreateSOR extends React.Component<CreateSORProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      // Animated View | Animations
      initAnim: new Animated.Value(0),
      contentAnim: new Animated.Value(80),
      // Current User email :"
      email: '',
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
      calendarModal: false,
      // esclateTo / submit To
      SelectsubmitTo: false,
      submitToArr: [],
      submitTo: '',
      selectEsclateTo: false,
      esclateTo: '',
      // repeated sor modal
      repeatedSorModal: false,
      repeatedSorData: [],
      submitToTags: [],
      exclateToTags: [],
      involvePersonTags: [],
      actionsTags: [],
      // Selected input
      selectedInputIndex: 1,
      img_url: '',
      liklihood: riskxSeverityxliklihood.liklihood,
      severity: riskxSeverityxliklihood.severity,
      // Involved Persons of this project
      involved_persons: [],
      potientialRisk: 0,
      errorModal: false,
      user: {},
      errHeadingText: '',
      loading: false,
      errDesText: '',
      reportIdInvestigation: '',
      fiveWhyAnswer: [],
      fiveWhyQuestion: [],
      SuggestionPop: false,
      fiveWhytoggle: false,
      countributoryCauses: '',
      rootCauses: '',
      fiveWHYdata: [],
      // Involved person
      involvedToArr: [],
      involvedTotags: [],
      involveToText: '',
    };
  }

  // Document Picker and update the state
  pickupDoc = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      this.state.filename.push({
        name: res.name,
        uri: res.uri,
        type: res.type,
      });
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
    var strArr = [];

    for (var j = 0; j < this.state.involved_persons.length; j++) {
      if (
        this.state.involved_persons[j].name
          .toLowerCase()
          .match(str.toLowerCase())
      ) {
        strArr.push(this.state.involved_persons[j]);
      }
    }

    if (str === '') {
      this.setState({
        involvePersonSuggestions: [],
        involvePersonText: str,
      });
    } else {
      this.setState({
        involvePersonSuggestions: strArr,
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
      form.append('q', str);
      createApi
        .createApi()
        .suggestiosns(form)
        .then((res: any) => {
          // console.log(res.data.results)
          this.setState({
            actionRecommendations: [...res.data.results],
          });
        });
    }
  };

  // Upload Files  to S3
  upoadFiles = async (
    userId: string,
    file: string,
    date: Date,
    type: string,
    uri: string,
  ) => {
    // RNFS.readFile(uri, 'base64')
    //   .then((res: any) => {
    //     Storage.put(
    //       `/public/sors/${userId}/${userId}-${file}-${date}`,
    //       Buffer.from(res, 'base64'),
    //     )
    //       .then((stored) => {})
    //       .catch((err) => {});
    //   })
    //   .catch((err: any) => {});
    // const result = await Storage.put('test.txt', 'Hello');
    // const object = {
    //   uri: `${uri}`,
    //   name: `${userId}${file}${date}`,
    //   type: `${type}`,
    // };
    // // Uploading files to S3
    // await Storage.put(
    //   `Users/sors/${userId}/${userId}${file}${date}`,
    //   object,
    // ).then((res) => {
    // });
    // .catch((err) => {});
  };
  // Getting files from the s3 storage

  // search in observatiosn
  searchInObservation = (str: string) => {
    const form = new FormData();
    form.append('q', str);
    createApi
      .createApi()
      .observationSuggestions(str)
      .then((res: any) => {
        // console.log(res);
        if (res.status == 200) {
          this.setState({suggestions: res.data.results});
        }
      });
  };

  processStorageList(result: any) {
    let files: any = [];
    let folders = new Set();
    result.forEach((res: any) => {
      if (res.size) {
        files.push(res);
        // sometimes files declare a folder with a / within then
        let possibleFolder = res.key.split('/').slice(0, -1).join('/');
        if (possibleFolder) {
          folders.add(possibleFolder);
        }
      } else {
        folders.add(res.key);
      }
    });
    return {files, folders};
  }
  componentDidMount = () => {
    // {key: "test.txt"} .catch(err => conso.le.log(err)});
    // const result = Storage.put('test.txt', 'Hello');
    // this.upoadFiles('602b81d95878d33f1081800e');
    // get involved users
    // AsyncStorage.getItem('involved_persons').then((res: any) =>
    // );

    // Get User info
    // AsyncStorage.getItem('user').then((user: any) => {
    //   this.setState({user: JSON.parse(user)});
    // });

    AsyncStorage.getItem('user').then((user: any) => {
      this.setState({user: JSON.parse(user)});
    });
    this.mappingMapping(1, 1);

    AsyncStorage.getItem('email').then((email: any) => {
      this.setState({email});
    });
    createApi
      .createApi()
      .getProject({
        projectid: PROJECT_ID,
      })
      .then((res: any) => {
        this.setState({involved_persons: res.data.data.involved_persons});
      });
    // Time Update on every seconds

    // setInterval(() => {
    //   this.setState({
    //     curTime: moment().format('LT'),
    //     obserLocation: this.state.obserLocation
    //       ? this.state.obserLocation
    //       : '@Add Location',
    //   });
    // }, 1000);
    // this.AnimatedViews();

    // const form = new FormData();
    // this.setState({actionRecommendationsText: "Damaged hammer was being used at  workshop, which can cause hand injury."});
    // form.append('q', "Damaged hammer was being used at  workshop, which can cause hand injury.");
    // createApi
    //   .createApi()
    //   .suggestiosns(form)
    //   .then((res: any) => {
    //     var obj = res.data.results
    //     for (let i = 0; i < res.data.results.length; i++) {
    //       obj[i]['status'] = 0
    //       obj[i]['is_selected'] = false
    //       obj[i]['is_complete'] = false
    //       obj[i]['date'] =moment().format('YYYY-MM-DD'),
    //       obj[i]['assigned_to'] = []
    //   }
    //     // console.log(res.data.results)
    //     this.setState({
    //       actionRecommendations: [...obj],
    //     });
    //   });
  };
  markAsComplete = () => {};
  preview = () => {};
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
  onCreateSor = (status: number) => {
    var sorbtns = this.state.classifySorbtns.filter(
      (d: any) => d.selected === true,
    );
    var liklihood = this.state.liklihood.filter((d: any) => d.selected == true);
    var severity = this.state.severity.filter((d: any) => d.selected == true);

    if (this.state.observationT !== '') {
      if (this.state.observation != '') {
        if (sorbtns.length != 0) {
          if (sorbtns[0].title == 'positive') {
            if (
              this.state.actionRecommendations.filter(
                (d: any) => d.selected == true,
              ).length != 0
            ) {
              if (
                this.state.actionRecommendations
                  .filter((d: any) => d.selected == true)
                  .filter((d: any) => d.assigned_to.length != 0).length != 0
              ) {
                if (this.state.submitToTags.length !== 0) {
                  if (this.state.exclateToTags.length !== 0) {
                    this.setState({loading: true, errorModal: true});

                    var rec = this.state.actionRecommendations.filter(
                      (d: any) => d.selected == true,
                    );

                    var actions: Array<any> = [];
                    for (let i = 0; i < rec.length; i++) {
                      actions.push({
                        assigned_to: rec[i].assigned_to,
                        category: rec[i].category,
                        content: rec[i].content,
                        date: rec[i].date,
                        is_complete: rec[i].is_complete,
                        is_selected: rec[i].is_selected,
                        // justification: rec[i].justification,
                      });
                      if (rec[i].justification !== '') {
                        actions['justification'] = rec[i].justification;
                      }
                    }

                    var sor = {
                      report: {
                        _id: '',
                        created_by: this.state.email,
                        details: this.state.observationT,
                        occured_at: new Date(),
                        involved_persons: this.state.involvePersonTags.map(
                          (d: any) => d._id,
                        ),

                        sor_type: sorbtns[0].title,
                        risk: {
                          severity: 5,
                          likelihood: 5,
                        },
                        action_required: actions,

                        location: this.state.observation,
                        submit_to: this.state.submitToTags.map(
                          (d: any) => d.email,
                        ),
                        esclate_to: this.state.exclateToTags.map(
                          (d: any) => d.email,
                        ),
                        status: status,
                        // attachments: this.state.filename,
                        comments: ' ',
                      },
                      organization: '60867e596281167f26ce4aab',
                      project: PROJECT_ID,
                    };

                    if (this.state.fiveWhytoggle) {
                      sor.report['_id'] = this.state.reportIdInvestigation;
                      AsyncStorage.getItem('user').then((user: any) => {
                        var obj = {
                          justification: {
                            question: [this.state.fiveWhyQuestion],
                            answer: [this.state.fiveWhyAnswer],
                            contributoryCauses: this.state.countributoryCauses,
                            rootCauses: this.state.rootCauses,
                          },
                          project: PROJECT_ID,
                          report: this.state.reportIdInvestigation,
                          user: JSON.parse(user)._id,
                          date: moment().format('MM-DD-YYYY'),
                        };

                        console.log(obj);

                        createApi
                          .createApi()
                          .createFiveWhy(obj)
                          .then((res) => {
                            console.log('five why');
                            console.log(res);
                          })
                          .catch((err: any) => console.log(err));
                      });

                      // _id: ress.data.data.report_id,
                    } else {
                      if (this.state.reportIdInvestigation == '') {
                        var bodyInitial = {
                          report: {
                            created_by: this.state.email,
                            comments: '',
                            status: 1,
                          },
                          project: PROJECT_ID,
                        };
                        createApi
                          .createApi()
                          .createSorInit(bodyInitial)
                          .then((res: any) => {
                            sor.report['_id'] = res.data.data.report_id;
                          })
                          .catch((err) => console.log(err));
                      } else {
                        sor.report['_id'] = this.state.reportIdInvestigation;
                      }
                    }

                    // console.log(sor)
                    // Repeated observations
                    // res.data.resultss
                    // var bodyInitial = {
                    //   report: {
                    //     created_by: this.state.email,
                    //     comments: '',
                    //     status: 1,
                    //   },
                    //   project: '607820d5724677561cf67ec5',
                    // };
                    // createApi
                    //   .createApi()
                    //   .createSorInit(bodyInitial)
                    //   .then((ress: any) => {
                    // Report Id
                    // res.data.data.report_id

                    // this.props.reduxActions.createSor(
                    //   sor,
                    //   '604b13d114ba138bd23d7f75',
                    //   'inconnent12345@outlook.com',
                    //   this.props.navigation,
                    // );

                    setTimeout(() => {
                      createApi
                        .createApi()
                        .createSor(sor)
                        .then((res: any) => {
                          this.setState({loading: false, errorModal: false});

                          console.log(res);

                          if (res.status == 200) {
                            this.props.navigation.navigate('ViewAllSOr');
                          } else {
                            console.log(res);
                            // this.setState({
                            //   errorModal: false,
                            //   errHeadingText: `CreateSor api returns ${res.data.status}.`,
                            //   errDesText: res.data.message,
                            // });
                          }
                        })
                        .catch(() =>
                          this.setState({loading: false, errorModal: false}),
                        );
                    }, 3000);

                    // })
                    // .catch(() => {
                    //   this.setState({loading: false, errorModal: false});
                    // });
                  } else {
                    this.setState({
                      errorModal: true,

                      errHeadingText: 'You didnt esclated anyone.',
                      errDesText: 'you are not selected esclated users.',
                    });
                    // Error on esclated to
                  }
                } else {
                  this.setState({
                    errorModal: true,

                    errHeadingText: 'You didnt submitted anyone.',
                    errDesText: 'you are not selected submitted users.',
                  });
                  // Error on submitted to
                }
              } else {
                this.setState({
                  errorModal: true,

                  errHeadingText: 'You didnt assigned someone ',
                  errDesText:
                    'You didnt assigned someone in your selected actions.',
                });
              }
            } else {
              this.setState({
                errorModal: true,
                errHeadingText: 'You didnt selected any actions.',
                errDesText: 'you are not selected any recommended actions.',
              });
              // Error on actions and recommendations
            }
          } else {
            if (severity.length !== 0) {
              if (
                this.state.actionRecommendations.filter(
                  (d: any) => d.selected == true,
                ).length != 0
              ) {
                if (
                  this.state.actionRecommendations
                    .filter((d: any) => d.selected == true)
                    .filter((d: any) => d.assigned_to.length != 0).length != 0
                ) {
                  if (this.state.submitToTags.length !== 0) {
                    if (this.state.exclateToTags.length !== 0) {
                      this.setState({loading: true, errorModal: true});
                      // for (
                      //   let i = 0;
                      //   i < this.state.actionRecommendations.length;
                      //   i++
                      // ) {
                      //   this.state.actionRecommendations[
                      //     i
                      //   ].assigned_to = this.state.actionRecommendations[
                      //     i
                      //   ].assigned_to[0];
                      // }
                      // Repeated observations
                      // res.data.results

                      // this.state.actionRecommendations
                      //   .filter((d: any) => d.selected == true)
                      //   .filter((d: any) => d.assigned_to.length != 0);

                      var rec = this.state.actionRecommendations.filter(
                        (d: any) => d.selected == true,
                      );
                      console.log(rec);
                      // console.log(rec.map((d: any) => delete d['selected']));

                      var actions: Array<any> = [];
                      for (let i = 0; i < rec.length; i++) {
                        actions.push({
                          assigned_to: rec[i].assigned_to,
                          category: rec[i].category,
                          content: rec[i].content,
                          date: rec[i].date,
                          is_complete: rec[i].is_complete,
                          is_selected: rec[i].is_selected,
                        });
                        if (rec[i].justification !== '') {
                          actions['justification'] = rec[i].justification;
                        }
                      }

                      var sors = {
                        report: {
                          _id: '',
                          created_by: this.state.email,
                          details: this.state.observationT,
                          occured_at: new Date(),
                          involved_persons: this.state.involvePersonTags.map(
                            (d: any) => d._id,
                          ),

                          sor_type: sorbtns[0].title,
                          risk: {
                            severity: liklihood[0].value,
                            likelihood: severity[0].value,
                          },
                          action_required: actions,

                          location: this.state.observation,
                          submit_to: this.state.submitToTags.map(
                            (d: any) => d.email,
                          ),
                          esclate_to: this.state.exclateToTags.map(
                            (d: any) => d.email,
                          ),
                          status: status,
                          attachments: [],
                          comments: ' ',
                        },
                        organization: '60867e596281167f26ce4aab',
                        project: PROJECT_ID,
                      };

                      if (this.state.fiveWhytoggle) {
                        sors.report['_id'] = this.state.reportIdInvestigation;
                        AsyncStorage.getItem('user').then((user: any) => {
                          var obj = {
                            //    countributoryCauses: '',
                            // rootCauses: '',
                            justification: {
                              question: this.state.fiveWhyQuestion,
                              answer: this.state.fiveWhyAnswer,
                              contributoryCauses: this.state
                                .countributoryCauses,
                              rootCauses: this.state.rootCauses,
                            },
                            project: PROJECT_ID,
                            report: this.state.reportIdInvestigation,
                            user: JSON.parse(user)._id,
                            date: moment().format('MM-DD-YYYY'),
                          };

                          console.log(obj);
                          createApi
                            .createApi()
                            .createFiveWhy(obj)
                            .then((res) => {
                              console.log('five why');
                              console.log(res);
                            })
                            .catch((err: any) => console.log(err));
                        });

                        // _id: ress.data.data.report_id,
                      } else {
                        if (this.state.reportIdInvestigation == '') {
                          var bodyInitial = {
                            report: {
                              created_by: this.state.email,
                              comments: '',
                              status: 1,
                            },
                            project: PROJECT_ID,
                          };
                          createApi
                            .createApi()
                            .createSorInit(bodyInitial)
                            .then((res: any) => {
                              sors.report['_id'] = res.data.data.report_id;
                            })
                            .catch((err) => console.log(err));
                        } else {
                          sors.report['_id'] = this.state.reportIdInvestigation;
                        }
                      }

                      console.log(sors);
                      setTimeout(() => {
                        createApi
                          .createApi()
                          .createSor(sors)
                          .then((res: any) => {
                            console.log(res);
                            this.setState({
                              loading: false,
                              errorModal: false,
                            });

                            if (res.status == 200) {
                              console.log('sdsd');
                              this.props.navigation.navigate('ViewAllSOr');
                            } else {
                              console.log(res);
                            }
                          })
                          .catch(() =>
                            this.setState({
                              loading: false,
                              errorModal: true,
                              errHeadingText: 'Error on create sor',
                              errDesText: 'Please refresh the app state.',
                            }),
                          );
                      }, 3000);
                    } else {
                      this.setState({
                        errorModal: true,

                        errHeadingText: 'You didnt esclated anyone.',
                        errDesText: 'you are not selected esclated users.',
                      });
                      // Error on esclated to
                    }
                  } else {
                    this.setState({
                      errorModal: true,

                      errHeadingText: 'You didnt submitted anyone.',
                      errDesText: 'you are not selected submitted users.',
                    });
                    // Error on submitted to
                  }
                } else {
                  this.setState({
                    errorModal: true,

                    errHeadingText: 'You didnt assigned someone ',
                    errDesText:
                      'You didnt assigned someone in your selected actions.',
                  });
                }
              } else {
                this.setState({
                  errorModal: true,

                  errHeadingText: 'You didnt selected any actions.',
                  errDesText: 'you are not selected any recommended actions.',
                });
              }

              // }
            } else {
              this.setState({
                errorModal: true,

                errHeadingText: 'Select your severity numbers.',
                errDesText: 'you are not selected severity numberss.',
              });
              // Error on severity
            }
          }
        } else {
          this.setState({
            errorModal: true,

            errHeadingText: 'Select your sor classification.',
            errDesText: 'you are not selected any classification.',
          });
          // Error on sor btns
        }
      } else {
        this.setState({
          errorModal: true,

          errHeadingText: 'Type your current location.',
          errDesText: 'You dont specify specify your location .',
        });
      }
    } else {
      this.setState({
        errorModal: true,
        errHeadingText: 'Type your observation.',
        errDesText: 'looks like your observation isnt valid.',
      });
      // Error on Observations
    }
  };

  // componentWillUnmount = () => {};

  render() {
    // this.state.liklihood[0].selected = true;
    // this.state.severity[0].selected = true;
    return (
      <Animated.View style={[styles.container]}>
        {/* Header */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <Icon
                onPress={() => this.props.navigation.navigate('ViewAllSOr')}
                size={25}
                name="arrow-back-outline"
                type="ionicon"
                color={colors.secondary}
              />
              <View>
                <Text style={styles.title}>Create Observation</Text>
              </View>
            </View>
          </View>
          {/* content */}
          <Animated.View style={[styles.content]}>
            {/* Select Project  / Select location */}
            <Selector
              selectedLocation={'Assembly Line'}
              selectedProject={'Safety Connect'}
              navigation={this.props.navigation}
            />
            {/* Line  */}
            <View style={styles.lineheight} />
            {/* Classify SOR */}

            <View style={styles.clasSorContainer}>
              <Text style={styles.clasSorHeading}>Classify Observation</Text>
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
            {/* Line  */}
            <View style={styles.lineheight} />
            {/* Observation Details */}
            <View style={styles.observationDetailsContainer}>
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
                <Text style={styles.obserttle}>it was observed that</Text>
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
                  style={[styles.obInputText]}
                />
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.obText}>
                    at{' '}
                    {/* <Text style={{color: colors.primary}}>
                  {this.state.obserLocation}
                </Text>{' '} */}
                  </Text>
                  <TextInput
                    value={this.state.observation}
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
                  onPress={(d: any) => {
                    const form = new FormData();
                    form.append('q', d.details);
                    createApi
                      .createApi()
                      .suggestiosns(form)
                      .then((res: any) => {
                        var obj = res.data.results;
                        for (let i = 0; i < res.data.results.length; i++) {
                          obj[i]['status'] = 0;
                          obj[i]['selected'] = false;
                          obj[i]['is_selected'] = false;
                          obj[i]['is_complete'] = false;
                          (obj[i]['date'] = moment().format('YYYY-MM-DD')),
                            (obj[i]['assigned_to'] = []);
                        }
                        this.setState({
                          potientialRisk: d.risk.total_risk,
                          actionRecommendations: [...obj],
                        });

                        // this.setState({
                        //     actionRecommendations: [...res.data.results],
                        //   });
                      });

                    // this.setState({selectedInputIndex: 3});

                    this.setState({observationT: d.details, suggestions: []});
                  }}
                />
              ) : null}
            </View>
            {/* Line  */}
            <View style={styles.lineheight} />
            {/* Risk Chart*/}
            {this.state.classifySorbtns[1].selected == false ? (
              <View style={styles.riskContainer}>
                {/* Potential Risk */}

                {this.state.potientialRisk == 0 ? null : (
                  <View style={styles.potentialRiskContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.potientialRiskHeading}>
                        Potential Risk
                      </Text>
                      <Text style={styles.systemDefinedtext}>
                        (System Defined)
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.badgePotientialRisk,
                        this.state.potientialRisk < 7
                          ? {borderColor: colors.green}
                          : this.state.potientialRisk < 14
                          ? {borderColor: colors.riskIcons.orrange}
                          : {borderColor: colors.error},
                      ]}>
                      <Text
                        style={[
                          styles.potentialRiskBadgeContainerText,
                          this.state.potientialRisk < 7
                            ? {color: colors.green}
                            : this.state.potientialRisk < 14
                            ? {color: colors.riskIcons.orrange}
                            : {color: colors.error},
                        ]}>
                        {this.state.potientialRisk} -{' '}
                        {this.state.potientialRisk < 7
                          ? 'Low'
                          : this.state.potientialRisk < 14
                          ? 'Medium'
                          : 'High'}
                      </Text>
                    </View>
                  </View>
                )}
                {/* Actual Risk */}
                <View>
                  <View style={{flexDirection: 'row', marginTop: wp(1)}}>
                    <Text style={styles.RiskHeading}>Actual Risk</Text>
                    <Text style={{fontStyle: 'italic', fontSize: wp(3)}}>
                      {/* {this.state.liklihood. * this.state.severity} */}
                    </Text>
                  </View>

                  <Chart
                    liklihood={this.state.liklihood}
                    severity={this.state.severity}
                    // style={{marginTop: wp(1)}}
                    onPress={(v: any) => {
                      // if (v.liklihood == undefined) {
                      //   this.setState({severity: v.severity});
                      // } else {
                      // }
                      // if (v.liklihood == undefined) {
                      //   console.log(
                      //     this.state.severity.filter((d) => d == v.severity),
                      //   );
                      //   this.setState({severity: [v.severity]});
                      // } else {
                      //   this.setState({liklihood: [v.liklihood]});
                      // }
                    }}
                  />
                </View>
              </View>
            ) : null}

            {/* Line  */}
            <View style={styles.lineheight} />
            {/* Five WHY Questions  */}
            <View style={styles.fiveWhyContainer}>
              <View style={styles.fiveWhyHeadingContainer}>
                <Text style={styles.investigationReqtext}>
                  {' '}
                  Investigation Required
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (this.state.fiveWhytoggle == true) {
                      this.setState({fiveWhytoggle: false});
                    } else {
                      if (this.state.reportIdInvestigation === '') {
                        var bodyInitial = {
                          report: {
                            created_by: this.state.user.email,
                            comments: '',
                            status: 1,
                          },
                          project: '60867ed86281162915ce4aac',
                        };
                        createApi
                          .createApi()
                          .createSorInit(bodyInitial)
                          .then((res: any) => {
                            this.setState({
                              reportIdInvestigation: res.data.data.report_id,
                            });
                            this.setState({fiveWhytoggle: true});
                          })
                          .catch((err) => console.log(err));
                      } else {
                        this.setState({fiveWhytoggle: true});
                      }
                    }
                    // this.setState({fiveWhytoggle: !this.state.fiveWhytoggle});
                  }}
                  style={styles.fivewhyToggleContainer}>
                  <View
                    style={[
                      styles.fivewhyToggeNo,
                      this.state.fiveWhytoggle == false
                        ? {
                            borderColor: colors.error,
                            backgroundColor: '#F59798',
                          }
                        : {
                            borderColor: colors.text,
                            borderRightWidth: wp(0),
                            opacity: 0.5,
                          },
                    ]}>
                    <Text
                      style={[
                        styles.fivewhyToggeNoText,
                        this.state.fiveWhytoggle == false
                          ? {color: colors.secondary}
                          : {color: colors.text},
                      ]}>
                      No
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.fivewhyToggeYes,
                      this.state.fiveWhytoggle
                        ? {
                            borderColor: colors.green,
                            backgroundColor: colors.lightGreen,
                          }
                        : {
                            borderColor: colors.text,
                            borderLeftWidth: wp(0),
                            opacity: 0.5,
                          },
                    ]}>
                    <Text
                      style={[
                        styles.fivewhyToggeYesText,
                        this.state.fiveWhytoggle
                          ? {color: colors.green}
                          : {color: colors.text},
                      ]}>
                      Yes
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {this.state.fiveWhytoggle ? (
                <FiveWhy
                  onChangeCountributory={(e: any) =>
                    this.setState({countributoryCauses: e})
                  }
                  onChangeRiskCause={(e: any) => this.setState({rootCauses: e})}
                  contributoryCauses={this.state.countributoryCauses}
                  rootCauses={this.state.rootCauses}
                  data={this.state.fiveWHYdata}
                  fiveWhyQuestions={(q: Array<string>) =>
                    this.setState({fiveWhyQuestion: q})
                  }
                  fiveWhyAnswer={(a: Array<string>) =>
                    this.setState({fiveWhyAnswer: a})
                  }
                  reportId={this.state.reportIdInvestigation}
                  userId={this.state.user._id}
                  containerStyle={{marginTop: wp(3)}}
                />
              ) : null}
            </View>

            {/* Line  */}
            <View style={styles.lineheight} />
            {/* Actions/Recommendation */}
            {this.state.classifySorbtns[1].selected == false ? (
              <View style={styles.actionContainer}>
                <Text style={styles.actionsRecHeading}>
                  Actions / Recommendation
                </Text>

                {/* Suggested Actions */}
                {this.state.actionRecommendations.map((d: any, i: number) => (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        var arr = this.state.actionRecommendations;
                        arr[i].selected = !arr[i].selected;
                        this.setState({actionRecommendations: arr});
                      }}
                      onLongPress={() => {
                        console.log(this.state.allActionsEdit);
                        this.setState({
                          allActionsEdit: d,
                          allActionsEditIndex: i,
                          SuggestionPop: true,
                          newActions: false,
                        });
                      }}
                      key={i}
                      style={[
                        styles.suggestedActionsContainer,
                        d.selected == true
                          ? {
                              backgroundColor: colors.lightBlue,
                              borderWidth: wp(0),
                            }
                          : {
                              backgroundColor: colors.secondary,
                              borderWidth: wp(0.2),
                            },
                      ]}>
                      <View style={{flexDirection: 'row', width: wp(84)}}>
                        <Text style={styles.actionType}>
                          {d.category}:{' '}
                          <Text style={styles.actionDesc}>
                            {d.content.substring(0, 50)}...
                          </Text>
                        </Text>
                      </View>
                      <Icon
                        size={wp(6)}
                        name="more-vertical"
                        type="feather"
                        color={'#686868'}
                      />
                    </TouchableOpacity>
                  </View>
                ))}

                <View style={[styles.addActionAndRecommendation]}>
                  {/* <TextInput
                    onFocus={() => {
                    
                    }}
                    style={[
                      styles.actionInput,
                      this.state.selectedInputIndex == 3
                        ? {borderColor: colors.green}
                        : null,
                    ]}
                    value={this.state.actionRecommendationsText}
                    onChangeText={(e) => this.actionRecommendSuggestion(e)}
                    placeholder={'Suggest your recommendation / actions'}
                  /> */}

                  <TextInput
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

                  <TouchableOpacity
                    onPress={() => {
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
                    style={styles.addActionsAndRecommendationArrow}>
                    <Icon
                      size={wp(4)}
                      name="arrowright"
                      type="antdesign"
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                </View>

                {/* Suggestions 
                {this.state.actionRecommendations.length != 0 ? (
                  <Suggestions
                    type={'suggestions'}
                    styles={{}}
                    arr={this.state.actionRecommendations}
                    onPress={(d: any) => {
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
                ) : null} */}
                {/* <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
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
                </View> */}
              </View>
            ) : null}

            {/* Line  */}
            <View style={styles.lineheight} />

            {/* Involved person */}

            <View
              style={{
                paddingTop: wp(4),
                paddingBottom: wp(5),
                paddingLeft: wp(3),
                paddingRight: wp(3),
              }}>
              <Text style={styles.sbBtnText}>Involved Person </Text>
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
                  onChangeText={(v: any) => {
                    if (v === '') {
                      this.setState({involvedToArr: [], involveToText: v});
                    } else {
                      this.setState({
                        involvedToArr: searchInSuggestions(
                          v.toLowerCase(),
                          this.state.involved_persons,
                        ),
                        involveToText: v,
                      });
                    }
                  }}
                  placeholder={'Select or Type Name'}
                  style={styles.optnselectorText}
                  value={this.state.involveToText}
                />
              </View>

              {this.state.involvedToArr.length != 0 ? (
                <View>
                  <View style={styles.involveSuggestCont}>
                    {this.state.involvedToArr.map(
                      (d: involved_persons, i: number) => (
                        <TouchableOpacity
                          key={i}
                          onPress={() => {
                            this.setState({
                              involveToText: '',
                              involvedToArr: [],
                            });
                            if (
                              this.state.involvePersonTags.filter(
                                (v: involved_persons) => v == d,
                              ).length == 0
                            ) {
                              this.state.involvePersonTags.push(d);
                            } else {
                              return null;
                            }
                          }}
                          style={[
                            styles.involvePsuggCont,
                            this.state.involvedToArr.length == i + 1
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
            </View>

            {/* Line  */}
            <View style={styles.lineheight} />
            {/* Attachment / Upload files */}
            <View style={styles.attachmentContainer}>
              <View style={styles.attachmentheadingContainer}>
                <Text style={styles.attachmentsHeading}>Attachments </Text>
                <Text style={styles.attachmentOptionalText}>(optional)</Text>
              </View>
              <View style={styles.attachmentContentContainer}>
                <View style={styles.uploadBorder}>
                  <Icon
                    size={wp(9)}
                    name="plus"
                    type="antdesign"
                    color={colors.primary}
                  />
                </View>
                <View style={styles.attachmentsDetailTextContainer}>
                  <Text style={styles.supportedfileFotmatsText}>
                    Supported file formats{' '}
                  </Text>
                  <Text style={styles.supportedfileFotmats}>
                    .doc, .pdf, .jpeg, .png, .xlsx
                  </Text>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.supportedfileFotmatsText}>
                      Maximum File Size:{' '}
                    </Text>
                    <Text style={styles.fileSizeText}>10 MB</Text>
                  </View>
                </View>
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
                      type={'attachments'}
                      style={{alignContent: 'center'}}
                      tags={this.state.filename}
                    />
                  </View>
                  {/* ))} */}
                </View>
              ) : null}
            </View>
            {/* Line  */}
            <View style={styles.lineheight} />
            {/* Submit To / Esclate To */}
            <View style={styles.optnToggleContainer}>
              <View>
                <Text style={styles.sbBtnText}>Submitted to</Text>
                <View
                  style={[
                    styles.optnselector,
                    this.state.selectedInputIndex == 4
                      ? {borderColor: colors.green}
                      : null,
                  ]}>
                  <TextInput
                    onFocus={() => {
                      this.setState({selectedInputIndex: 4});
                      // if (this.state.actionsTags.length == 0) {
                      //   this.state.actionsTags.push(
                      //     this.state.actionRecommendations[0],
                      //   );
                      // }
                    }}
                    style={styles.optnselectorText}
                    placeholder={'Select or Type Name'}
                    underlineColorAndroid="transparent"
                    onChangeText={(v: any) => {
                      if (v === '') {
                        this.setState({submitToArr: [], submitTo: v});
                      } else {
                        this.setState({
                          submitToArr: searchInSuggestions(
                            v.toLowerCase(),
                            this.state.involved_persons,
                          ),
                          submitTo: v,
                        });
                      }
                    }}
                    value={this.state.submitTo}
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
              </View>
              {/* notified only */}
              <View>
                <Text style={styles.sbBtnText}>Notified only </Text>
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
                    onChange={(v: any) => {
                      if (v === '') {
                        this.setState({exclateToArr: [], esclateTo: v});
                      } else {
                        this.setState({
                          exclateToArr: searchInSuggestions(
                            v.toLowerCase(),
                            this.state.involved_persons,
                          ),
                          esclateTo: v,
                        });
                      }
                    }}
                    placeholder={'Select or Type Name'}
                    style={styles.optnselectorText}
                    value={this.state.esclateTo}
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
              </View>
            </View>

            {/* Line  */}
            <View style={styles.lineheight} />
            {/* Draft And Submit Btns */}
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => this.onCreateSor(1)}
                style={[styles.submitsorbtn, {marginRight: wp(3)}]}>
                <Text style={styles.submitsorbtntxt}>Save as Draft</Text>
              </TouchableOpacity>
              <TouchableOpacity
                // this.setState({repeatedSorModal: true})
                onPress={() => this.onCreateSor(2)}
                style={[styles.submitsorbtn, {borderColor: colors.green}]}>
                <Text style={[styles.submitsorbtntxt, {color: colors.green}]}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: wp(10),
              }}>
              <TouchableOpacity
                onPress={() => this.preview()}
                style={[styles.submitsorbtn, {marginRight: wp(3)}]}>
                <Text style={styles.submitsorbtntxt}>Preview</Text>
              </TouchableOpacity>
              <TouchableOpacity
                // this.setState({repeatedSorModal: true})
                onPress={() => this.onCreateSor(4)}
                style={[
                  styles.submitsorbtnSb,
                  {backgroundColor: colors.green},
                ]}>
                <Text
                  style={[styles.submitsorbtnSbtxt, {color: colors.secondary}]}>
                  Mark as Complete
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          <Modal
            animationInTiming={1000}
            animationIn={'bounceInUp'}
            animationOut={'bounceOutDown'}
            animationOutTiming={1000}
            useNativeDriver={true}
            isVisible={this.state.calendarModal}>
            <View
              style={{backgroundColor: colors.secondary, borderRadius: wp(4)}}>
              <Calendars currentDate={Date.now()} />
            </View>
          </Modal>
          {/* validations error */}
          {/* Modal Container */}
          <Modal
            isVisible={this.state.errorModal}
            onBackdropPress={() => {
              this.setState({errorModal: false, loading: false});
            }}>
            {this.state.loading == true ? (
              <ActivityIndicator color={colors.primary} size={'large'} />
            ) : (
              <View style={styles.modelContainer}>
                <View>
                  <Text style={styles.errHeadPop}>
                    {this.state.errHeadingText}
                  </Text>
                  <Text style={styles.errEmailPassDesc}>
                    {this.state.errDesText}
                  </Text>
                  {/* <Text style={styles.plzTryAgain}>Please try again later.</Text> */}
                </View>
              </View>
            )}
          </Modal>
          {/* Repeated SOr Modal */}
          <Modal
            animationInTiming={1000}
            animationIn={'bounceInUp'}
            animationOut={'bounceOutDown'}
            animationOutTiming={1000}
            useNativeDriver={true}
            isVisible={this.state.repeatedSorModal}>
            <RepeatedSor
              repeatedSor={this.state.repeatedSorData}
              onViewSor={(d: Isor) => {
                this.setState({repeatedSorModald: false});
                this.props.navigation.navigate('ViewSOR', {data: d});
              }}
              onSkip={() => {
                this.setState({repeatedSorModal: false});
                this.props.navigation.goBack();
              }}
              onSubmit={() => {
                this.setState({repeatedSorModal: false});
                this.props.navigation.navigate('ViewAllSOr');
              }}
            />
          </Modal>

          {/* SuggestionPop */}
          {this.state.SuggestionPop == true && (
            <SuggestionsPop
              suggestedUsers={this.state.involved_persons}
              onClose={() =>
                this.setState({SuggestionPop: !this.state.SuggestionPop})
              }
              allSuggestions={this.state.actionRecommendations}
              isOpen={this.state.SuggestionPop}
              suggestions={this.state.allActionsEdit}
              save={(d: any) => {
                console.log(d);
                // console.log(this.state.newActions)
                // console.log(this.state.actionRecommendations)
                // console.log(this.state.allActionsEditIndex)
                if (this.state.newActions == true) {
                  this.state.actionRecommendations.push(d);
                } else {
                  this.state.actionRecommendations[
                    this.state.allActionsEditIndex
                  ] = d;
                }
                // this.state.actionsAndRecommendations.push(d)
                this.setState({SuggestionPop: false});
              }}
              discard={() => {
                console.log('sdsd');
                // console.log(this.state.actionRecommendations)
                this.setState({
                  actionRecommendations: this.state.actionRecommendations.filter(
                    (d: any) => d != this.state.allActionsEdit,
                  ),
                  SuggestionPop: false,
                });
              }}
            />
          )}
        </ScrollView>
      </Animated.View>
    );
  }
}

const mapStateToProps = (state: AllSorDTO) => ({
  reduxState: state.allSors,
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateSOR);

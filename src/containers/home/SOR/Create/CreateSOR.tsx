import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';
import {Create_sor, riskxSeverityxliklihood} from '@service/mock';
import styles from './style';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNFetchBlob from 'rn-fetch-blob';

import {
  searchInSuggestions,
  filterLocation,
  getCurrentProject,
  classifySor,
  suggestInActionsRecommendations,
  getCurrentOrganization,
  fileuploader
} from '@utils';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../../../../store/actions/listSorActions';

import {Icon, Avatar} from 'react-native-elements';
import {colors, images, GlStyles, fonts, animation} from '@theme';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

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
import {classifySorBtn, Isor, involved_persons, orgnaization} from '@typings';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, submitted} from '@service';
import {AllSorDTO} from '@dtos';
import QuickReplies from 'react-native-gifted-chat/lib/QuickReplies';
import {Colors} from 'react-native/Libraries/NewAppScreen';

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
      projectid: '',
      currentOrg: '',

      uploadedfiles : [],

      // Select date and time
      setDateModal: false,
      todayDateCallender: moment().format('YYYY-MM-DD'),
      marked: {
        [moment().format('YYYY-MM-DD')]: {marked: true, color: 'green'},
      },
      setTimeModal: false,
      currentTime: Date.now(),
    };
  }

  // Document Picker and update the state
  pickupDoc = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      if (res.type == 'image/jpeg' || res.type == 'image/png') {
        res["orgType"] = res.type
        res.type = 'image';
      } else {
        if (res.name.split('.')[1] == 'docx') {
          res["orgType"] = res.type
          res.type = 'docx';
        } else if (res.name.split('.')[1] == 'pdf') {
          res["orgType"] = res.type
          res.type = 'pdf';
        } else if (res.name.split('.')[1] == 'xlsx') {
          res["orgType"] = res.type
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
                }


            

                this.setState({ loading : true, errorModal : true })
                
                fileuploader(res.orgType,res.orgType.split('/')[1], res.uri).then((filename : any) => { 
                  imgData['name'] = filename
                  this.setState({ loading : false, errorModal : false })
                  this.state.uploadedfiles.push(filename)
          console.log(this.state.uploadedfiles)
        })


        this.state.filename.push(imgData);


        this.setState({});
      }
    } catch (err: any) {
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

  // // Search Action / Recommendation Suggestions
  // actionRecommendSuggestion = (str: string) => {
  //   if (str == '') {
  //     this.setState({
  //       actionRecommendations: [],
  //       actionRecommendationsText: str,
  //     });
  //   } else {
  //     const form = new FormData();
  //     this.setState({actionRecommendationsText: str});
  //     form.append('q', str);
  //     createApi
  //       .createApi()
  //       .suggestiosns(form)
  //       .then((res: any) => {
  //         console.log('eahhhoo');
  //         console.log(res.data);
  //         this.setState({
  //           actionRecommendations: [...res.data.results],
  //         });
  //       });
  //   }
  // };

  // Getting files from the s3 storage

  // search in observatiosn
  searchInObservation = (str: string) => {
    const form = new FormData();
    form.append('q', str);
    createApi
      .createApi()
      .observationSuggestions(str)
      .then((res: any) => {
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
    getCurrentProject().then((currentProj: any) => {
      this.setState({projectid: currentProj});
    });
    getCurrentOrganization().then((currentOrg: any) =>
      this.setState({currentOrg}),
    );
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

    AsyncStorage.getItem('email').then((email: any) => {
      createApi
        .createApi()
        .getUser(email)
        .then((user: any) => {
          var dta = user.data.data;
          this.setState({user: user.data.data});
        });
    });
    this.mappingMapping(1, 1);

    AsyncStorage.getItem('email').then((email: any) => {
      this.setState({email});
    });
    getCurrentProject().then((currentProj: any) => {
      this.setState({projectid: currentProj});

      createApi
        .createApi()
        .getProject({
          projectid: currentProj,
        })
        .then((res: any) => {
          console.log('res.data.data.involved_persons');
          console.log(res.data.data.involved_persons);
          this.setState({involved_persons: res.data.data.involved_persons});

          // var dups = res.data.data.involved_persons;

          // console.log(
          //   res.data.data.involved_persons.filter(
          //     (item, index) =>
          //       res.data.data.involved_persons.indexOf(item) === index,
          //   ),
          // );
        });
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
    var uploadedfiles = [];
    var sorbtns = this.state.classifySorbtns.filter(
      (d: any) => d.selected === true,
    );
    var liklihood = this.state.liklihood.filter((d: any) => d.selected == true);
    var severity = this.state.severity.filter((d: any) => d.selected == true);

    if (this.state.observationT !== '') {
      if (this.state.observation != '') {
        if (sorbtns.length != 0) {
          if (sorbtns[0].title == 'positive') {
            if (this.state.submitToTags.length !== 0) {
              if (this.state.exclateToTags.length !== 0) {
                this.setState({loading: true, errorModal: true});

                var sor = {
                  report: {
                    _id: '',
                    created_by: this.state.email,
                    details: this.state.observationT,
                    occured_at: this.state.currentTime,
                    involved_persons: this.state.involvePersonTags.map(
                      (d: any) => d._id,
                    ),

                    sor_type: sorbtns[0].title,
                    risk: {
                      severity: 5,
                      likelihood: 5,
                    },
                    action_required: [],

                    location: this.state.observation,
                    submit_to: this.state.submitToTags.map((d: any) => d.email),
                    esclate_to: this.state.exclateToTags.map(
                      (d: any) => d.email,
                    ),
                    status: status,
                    attachments: [],
                    comments: ' ',
                  },
                  organization: this.state.currentOrg,
                  project: this.state.projectid,
                };

                var bodyInitial = {
                  report: {
                    created_by: this.state.email,
                    comments: '',
                    status: 1,
                  },
                  project: this.state.projectid,
                };
                createApi
                  .createApi()
                  .createSorInit(bodyInitial)
                  .then((res: any) => {
                    this.setState({
                      reportIdInvestigation: res.data.data.report_id,
                    });
                    sor.report['_id'] = res.data.data.report_id;
                  })
                  .catch((err) => console.log(err));

                setTimeout(() => {
                  createApi
                    .createApi()
                    .createSor(sor)
                    .then((res: any) => {
                      this.setState({loading: false, errorModal: false});
                      console.log(res);

                      if (this.state.fiveWhytoggle) {
                        // sor.report['_id'] = this.state.reportIdInvestigation;
                        this.setState({loading: true, errorModal: true});
                        var obj = {
                          justification: {
                            question: [this.state.fiveWhyQuestion],
                            answer: [this.state.fiveWhyAnswer],
                          },
                          contributoryCauses: this.state.countributoryCauses,
                          rootCauses: this.state.rootCauses,
                          project: this.state.projectid,
                          report: this.state.reportIdInvestigation,
                          user: this.state.user._id,
                          date: moment().format('MM-DD-YYYY'),
                        };

                        createApi
                          .createApi()
                          .createFiveWhy(obj)
                          .then((res) => {
                            this.setState({
                              loading: false,
                              errorModal: false,
                            });
                            this.props.navigation.goBack();

                            console.log(res);
                          })
                          .catch((err: any) => console.log(err));

                        // _id: ress.data.data.report_id,
                      } else {
                        this.setState({
                          loading: false,
                          errorModal: false,
                        });
                        this.props.navigation.goBack();
                      }

                      if (res.status == 200) {
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

            // } else {
            //   this.setState({
            //     errorModal: true,
            //     errHeadingText: 'You didnt selected any actions.',
            //     errDesText: 'you are not selected any recommended actions.',
            //   });
            //   // Error on actions and recommendations
            // }
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
                      console.log(this.state.exclateToTags);

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
                          justification: rec[i].justification,
                          action: 'low',
                        });
                        // if (rec[i].justification !== '') {
                        //   actions['justification'] = rec[i].justification;
                        // }
                      }

                      var sors = {
                        report: {
                          _id: '',
                          created_by: this.state.email,
                          details: this.state.observationT,
                          occured_at: this.state.currentTime,
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
                        organization: this.state.currentOrg,
                        project: this.state.projectid,
                      };

                      console.log('sors of actions ');
                      console.log(sors);

                      var bodyInitial = {
                        report: {
                          created_by: this.state.email,
                          comments: '',
                          status: 1,
                        },
                        project: this.state.projectid,
                      };
                      createApi
                        .createApi()
                        .createSorInit(bodyInitial)
                        .then((res: any) => {
                          this.setState({
                            reportIdInvestigation: res.data.data.report_id,
                          });
                          sors.report['_id'] = res.data.data.report_id;
                        })
                        .catch((err) => console.log(err));

                      console.log(sors);
                      setTimeout(() => {
                        createApi
                          .createApi()
                          .createSor(sors)
                          .then((res: any) => {
                            if (this.state.fiveWhytoggle == true) {
                              this.setState({
                                loading: true,
                                errorModal: true,
                              });
                              var newObj = {
                                //    countributoryCauses: '',
                                // rootCauses: '',
                                justification: {
                                  question: this.state.fiveWhyQuestion,
                                  answer: this.state.fiveWhyAnswer,
                                },
                                project: this.state.projectid,
                                contributoryCauses: this.state
                                  .countributoryCauses,
                                rootCauses: this.state.rootCauses,
                                report: this.state.reportIdInvestigation,
                                user: this.state.user._id,
                                date: moment().format('MM-DD-YYYY'),
                              };

                              console.log(newObj);
                              console.log('five why data ');
                              createApi
                                .createApi()
                                .createFiveWhy(newObj)
                                .then((res) => {
                                  this.setState({
                                    loading: false,
                                    errorModal: false,
                                  });
                                  this.props.navigation.goBack();
                                  console.log('five why');
                                  console.log(res);
                                })
                                .catch((err: any) => console.log(err));

                              // _id: ress.data.data.report_id,
                            } else {
                              console.log(res);
                              this.setState({
                                loading: false,
                                errorModal: false,
                              });

                              this.props.navigation.goBack();
                            }
                            // if (res.status == 200) {
                            //   console.log('sdsd');

                            // } else {
                            //   console.log(res);
                            // }
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
                    }
                  } else {
                    this.setState({
                      errorModal: true,

                      errHeadingText: 'You didnt submitted anyone.',
                      errDesText: 'you are not selected submitted users.',
                    });
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

  componentWillUnmount = () => {};

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
                onPress={() => this.props.navigation.goBack()}
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
            {/* <Selector
              orgnaization={this.state.currentOrg}
              projects={this.state.projectid}
              selectedLocation={'Assembly Line'}
              selectedProject={this.state.projectid}
              navigation={this.props.navigation}
            /> */}
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
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({setDateModal: !this.state.setDateModal})
                    }>
                    <Text style={[styles.obserttle, {color: colors.primary}]}>
                      {moment(this.state.todayDateCallender).format('MMMM DD')},{' '}
                      {moment(this.state.todayDateCallender).format('YYYY')}{' '}
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.obserttle}>at about </Text>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState({setTimeModal: !this.state.setTimeModal});
                    }}>
                    <Text style={[styles.obserttle, {color: colors.primary}]}>
                      {moment(this.state.currentTime).format('LT')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.obserttle}>it was observed that</Text>
                <TextInput
                  multiline={true}
                  onFocus={() => this.setState({selectedInputIndex: 1})}
                  value={this.state.observationT}
                  underlineColorAndroid="transparent"
                  placeholder="Enter your observation here"
                  onChangeText={(t) => {
                    this.setState({observationT: t});
                    this.searchInObservation(t);
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
                    placeholder={'@Add Area'}
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
                      {moment(this.state.todayDateCallender).format(
                        'MMMM DD, YYYY',
                      )}
                    </Text>{' '}
                    at about{' '}
                  </Text>

                  <Text
                    style={{
                      fontFamily: fonts.SFuiDisplayBold,
                      marginTop: wp(3),
                      fontSize: wp(3),
                    }}>
                    {moment().format('LT')}
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
                    }}
                  />
                </View>
              </View>
            ) : null}

            {/* Line  */}
            <View style={styles.lineheight} />
            {/* Five WHY Questions  */}

            {this.state.classifySorbtns[3].selected == true && (
              <View style={styles.fiveWhyContainer}>
                <View style={styles.fiveWhyHeadingContainer}>
                  <Text style={styles.investigationReqtext}>
                    {' '}
                    Investigation Required
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({fiveWhytoggle: !this.state.fiveWhytoggle});

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
                        this.state.fiveWhytoggle == true
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
                          this.state.fiveWhytoggle == true
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
                    onChangeCountributory={(e: any) => {
                      this.setState({countributoryCauses: e});
                    }}
                    onChangeRiskCause={(e: any) => {
                      this.setState({rootCauses: e});
                    }}
                    contributoryCauses={this.state.countributoryCauses}
                    rootCauses={this.state.rootCauses}
                    data={this.state.fiveWHYdata}
                    fiveWhyQuestions={(q: Array<string>) => {
                      this.setState({fiveWhyQuestion: q});
                    }}
                    fiveWhyAnswer={(a: Array<string>) => {
                      this.setState({fiveWhyAnswer: a});
                    }}
                    reportId={this.state.reportIdInvestigation}
                    userId={this.state.user._id}
                    containerStyle={{marginTop: wp(3)}}
                  />
                ) : null}
              </View>
            )}

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
                            status: 'InProgress',
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
                    ? {borderColor: colors.primary}
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
                          <View>
                            <Text style={styles.involvePSt}>{d.name}</Text>
                            <Text style={{fontSize: wp(2.5), opacity: 0.5}}>
                              {d.email}
                            </Text>
                          </View>
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
              <View>
                {/* Attachments photos */}
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignSelf: 'center',
                  }}>
                  {this.state.filename.map((d: any, i: number) => {
                    if (d.type == 'image') {
                      return (
                        <TouchableOpacity
                          onPress={() => this.setState({imageViewer: true})}
                          style={styles.AttchimageContainer}>
                          <Image
                            source={{
                              uri: d.uri,
                            }}
                            style={[GlStyles.images, {borderRadius: wp(3)}]}
                            resizeMode={'cover'}
                          />
                          <TouchableOpacity
                            onPress={() => {}}
                            style={{position: 'absolute', right: wp(0)}}>
                            <TouchableOpacity
                              onPress={() => {
                                var arr = [...this.state.filename].filter(
                                  (b) => b != d,
                                );
                                this.setState({filename: arr});
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
                          onPress={() => this.setState({imageViewer: true})}
                          style={[
                            styles.AttchimageContainer,
                            {borderWidth: wp(0.3), borderColor: colors.textOpa},
                          ]}>
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
                            style={[GlStyles.images]}
                            resizeMode={'contain'}
                          />
                          <Text
                            style={{
                              fontSize: wp(2.5),
                              marginTop: wp(1),
                              fontFamily: fonts.SFuiDisplayMedium,
                              textAlign: 'center',
                            }}>
                            {d.name}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {}}
                            style={{position: 'absolute', right: wp(0)}}>
                            <TouchableOpacity
                              onPress={() => {
                                var arr = [...this.state.filename].filter(
                                  (b) => b != d,
                                );
                                this.setState({filename: arr});
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
              </View>

              <View style={styles.attachmentContentContainer}>
                <TouchableOpacity
                  onPress={() => this.pickupDoc()}
                  style={styles.uploadBorder}>
                  <Icon
                    size={wp(9)}
                    name="plus"
                    type="antdesign"
                    color={colors.primary}
                  />
                </TouchableOpacity>
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
                      ? {borderColor: colors.primary}
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
                          <View>
                            <Text style={styles.involvePSt}>{d.name}</Text>
                            <Text style={{fontSize: wp(2.5), opacity: 0.5}}>
                              {d.email}
                            </Text>
                          </View>
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
                      ? {borderColor: colors.primary}
                      : null,
                  ]}>
                  <TextInput
                    onFocus={() => this.setState({selectedInputIndex: 5})}
                    underlineColorAndroid="transparent"
                    onChangeText={(v: any) => {
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
                            <View>
                              <Text style={styles.involvePSt}>{d.name}</Text>
                              <Text style={{fontSize: wp(2.5), opacity: 0.5}}>
                                {d.email}
                              </Text>
                            </View>
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
                style={[styles.submitsorbtn, {borderWidth: wp(0.2), borderColor :colors.primary, backgroundColor: colors.secondary}]}>
                <Text style={[styles.submitsorbtntxt, {color: colors.primary}]}>
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
                onPress={() => this.onCreateSor(5)}
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

          {/* validations error */}
          {/* Modal Container */}
          <Modal
            isVisible={this.state.errorModal}
            onBackdropPress={() => {
              this.setState({errorModal: false, loading: false});
            }}>
            {this.state.loading == true ? (
              <LottieView
                autoPlay={true}
                style={{width: wp(90)}}
                source={animation.loading}
                loop={true}
              />
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

          {/* Callender */}

          <Modal
            animationInTiming={1000}
            animationIn={'bounceInUp'}
            animationOut={'bounceOutDown'}
            animationOutTiming={1000}
            useNativeDriver={true}
            isVisible={this.state.setDateModal}
            onBackdropPress={() => {
              this.setState({setDateModal: false, loading: false});
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
              <Icon
                onPress={() => this.setState({setDateModal: false})}
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

                  this.setState({todayDateCallender: day.dateString});
                  this.setState({setDateModal: false});
                }}
                markedDates={this.state.marked}
                // markedDates={{}}
                markingType={'custom'}
                // Handler which gets executed on day long press. Default = undefined
                onDayLongPress={(day) => {}}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'yyyy MM'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={(month) => {}}
                // Hide month navigation arrows. Default = false
                hideArrows={true}
                // Replace default arrows with custom ones (direction can be 'left' or 'right')
                // renderArrow={(direction) => <Arrow />}
                // Do not show days of other months in month page. Default = false
                hideExtraDays={true}
                // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={true}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                firstDay={1}
                // Hide day names. Default = false
                hideDayNames={true}
                // Show week numbers to the left. Default = false
                showWeekNumbers={true}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={(subtractMonth) => subtractMonth()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={(addMonth) => addMonth()}
                // Disable left arrow. Default = false
                disableArrowLeft={true}
                // Disable right arrow. Default = false
                disableArrowRight={true}
                // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                disableAllTouchEventsForDisabledDays={true}
                // Replace default month and year title with custom one. the function receive a date as parameter.
                renderHeader={(date) => {
                  /*Return JSX*/
                }}
                // Enable the option to swipe between months. Default = false
                enableSwipeMonths={true}
              />
            </View>
          </Modal>

          {this.state.setTimeModal && (
            <DateTimePicker
              // testID="dateTimePicker"
              style={{backgroundColor: colors.darkLightGrey}}
              // themeVariant={'dark'}
              value={new Date()}
              mode={'time'}
              is24Hour={true}
              display="clock"
              onChange={(d: any) => {
                this.setState({setTimeModal: false});
                if (d.type == 'set') {
                  this.setState({currentTime: d.nativeEvent.timestamp});
                }
              }}
            />
          )}
          {/* Time Picker */}

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
                if (this.state.newActions == true) {
                  this.state.actionRecommendations.push(d);
                } else {
                  this.state.actionRecommendations[
                    this.state.allActionsEditIndex
                  ] = d;
                  this.state.actionRecommendations[
                    this.state.allActionsEditIndex
                  ].is_complete = true;
                }
                this.setState({SuggestionPop: false});
              }}
              discard={() => {
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

// if (this.state.filename.length != 0) {
//   var filetypes = [];
//   var extensions = [];
//   // if (res.type == 'image/jpeg' || res.type == 'image/png') {
//   //   res.type = 'image';
//   // } else {

//   for (let i = 0; i < this.state.filename.length; i++) {
//     if (this.state.filename.type == 'docx') {
//       filetypes.push('application/docx');
//       extensions.push('docx');
//     } else if (this.state.filename.type == 'pdf') {
//       filetypes.push('application/pdf');
//       extensions.push('pdf');
//     } else if (this.state.filename.type == 'xlsx') {
//       filetypes.push('application/xlsx');
//       extensions.push('xlsx');
//     } else if (this.state.filename.type == 'image/jpeg') {
//       filetypes.push('image/jpeg');
//       extensions.push('jpeg');
//     } else if (this.state.filename.type == 'image/png') {
//       filetypes.push('image/png');
//       extensions.push('png');
//     }
//   }

//   var attachmentsData = {
//     bucket: 'hns-codist',
//     report: 'attachments',
//     fileType: filetypes,
//     ext: extensions,
//   };

//   createApi
//     .createApi()
//     .getFilesUrl(attachmentsData)
//     .then((getUrl: any) => {
//       for (let j = 0; j < this.state.filename.length; j++) {
//         createApi
//           .createApi('', '', '', '', '', '', getUrl.data[0].url)
//           .uploadFile(this.state.filename[j].uri)
//           .then((uploaddta) => {
//             if (uploaddta.status == 200) {
//               uploadedfiles.push(getUrl.data[0].fileName);
//             }
//           });
//       }
//     });

// }

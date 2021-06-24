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
} from 'react-native';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import moment from 'moment';
import {connect} from 'react-redux';
import {Icon, Avatar, Card} from 'react-native-elements';
import {colors, GlStyles, animation, images, fonts} from '@theme';
import RNFetchBlob from 'rn-fetch-blob';
import Upload from 'react-native-background-upload';

import {
  View_sor,
  notified,
  Create_sor,
  riskxSeverityxliklihood,
  createApi,
} from '@service';
import styles from './style';
import {StackNavigationProp} from '@react-navigation/stack';
import {Tags, Chart, CommentPop, SuggestionsPop, FiveWhy} from '@components';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {default as Model} from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';
import {bindActionCreators} from 'redux';
import {AllSorDTO} from '@dtos';
import {
  imagePicker,
  capitalizeFirstLetter,
  cameraCapture,
  searchInSuggestions,
  imageVideoDetector,
  DocType,
  imageAndVideoObjectMap,
  filterAndMappingPersons,
  downloadFile,
  filterLocation,
  getCurrentProject,
} from '@utils';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {involved_persons, actions} from '@typings';
import * as reduxActions from '../../../../store/actions/listSorActions';

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
      user: {},
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
      comments: [],
      suggestedUsers: [],
      involvedPerson: [],
      involved_person: this.props.route.params.data.involved_persons,
      notifiedPerson: this.props.route.params.data.involved_persons,

      commentsSugg: [],
      attachments: [],

      actionsAndRecommendations: this.props.route.params.data.action_required,
      // popup Assigners
      addAssigners: false,
      involveAndNotifiedUsersName: '',
      IsaddInvAndNotifiedUser: false,
      involvedAndNotifiedUserType: 'involved',
      commentAttachment: [],
      addInvolvedandNotifiedUsers: [],
      errorModal: false,
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

      AllUsers: [],

      // Five WHY
      fiveWhytoggle: true,
      reportIdInvestigation: '',

      // Potiential Risk
      potientialRisk: 9,
      // Esclated to
      exclateToArr: [],
      fiveWhyQuestion: [],
      fiveWhyAnswer: [],
      fiveWHYdata: [],
      countributoryCauses: '',
      countributoryCausesD: '',
      rootCauses: '',
      rootCausesD: '',
      // Reassign to
      reAssignToArr: [],
      exclateToTags: [],
      reAssignToArrTags: [],
      projectName: '',
      commentMentionReplace: '',
      projectId: '',
    };

    this.animation = React.createRef();
    this.photoAnim = React.createRef();

    this.fileNotSupported = React.createRef();
  }

  componentDidMount = () => {
    console.log('line 173');
    console.log(this.props.route.params.data.submit_to);
    console.log(this.props.route.params.data.involved_persons);

    this.getFilesFromServer(this.props.route.params.data.attachments);
    getCurrentProject().then((currentProj: any) => {
      this.setState({projectId: currentProj});

      createApi
        .createApi()
        .getProject({projectid: currentProj})
        .then((res: any) => {
          this.setState({
            projectName: res.data.data.project_name,
            involvedPerson: res.data.data.involved_persons,
          });

          console.log('involved person on 181');
          console.log(res.data.data.involved_persons);
          this.mappingInvolved(
            res.data.data.involved_persons,
            this.props.route.params.data.involved_persons[0],
          );

          // console.log('on line 189');
          // console.log(this.props.route.params.data.involved_persons[0]);

          for (let i = 0; i < res.data.data.involved_persons.length; i++) {
            res.data.data.involved_persons[i]['selected'] = false;
          }

          this.setState({involved_person: res.data.data.involved_persons});
        })
        .catch((err) => {});
    });

    // Get user and save it on state
    AsyncStorage.getItem('email').then((email: any) => {
      createApi
        .createApi()
        .getUser(email)
        .then((user: any) => {
          this.setState({user: user.data.data});
        });
    });

    this.getFiveWHY();
    this.mappingMapping(
      this.props.route.params.data.risk.severity,
      this.props.route.params.data.risk.likelihood,
    );
    this.getAllComments();
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

    this.fileAndImageCapturer(this.props.route.params.data.attachments);
    this.mapViewSorPhoto();
    this.AnimatedViews();
    this.mappingMapping(
      this.props.route.params.data.risk.severity,
      this.props.route.params.data.risk.likelihood,
    );
  };

  // FIVE WHY
  getFiveWHY = () => {
    // Question map and them push

    if (this.props.route.params.data.justifications.length != 0) {
      this.props.route.params.data.justifications[0].justification.question.map(
        (d, i) => {
          this.state.fiveWHYdata.push({question: d});
        },
      );
      //   // Answer map and then push
      this.props.route.params.data.justifications[0].justification.answer.map(
        (d, i) => {
          this.state.fiveWHYdata[i]['answer'] = d;
        },
      );
      //   // If contributoryCauses exists
      // if (this.props.route.params.data.justifications[0].contributoryCauses) {
      //   this.setState({
      //     countributoryCauses: this.props.route.params.data.justifications[0]
      //       .contributoryCauses[0],
      //     rootCauses: this.props.route.params.data.justifications[0]
      //       .rootCauses[0],
      //   });
      // }
      //   // Set the state of 5 whys Questions /Answers
      //   this.setState({
      //     fiveWhyQuestion: this.props.route.params.data.justifications[0]
      //       .justification[0].question,
      //     fiveWhyAnswer: this.props.route.params.data.justifications[0]
      //       .justification[0].answer,
      //     fiveWhytoggle: true,
      //   });
      // } else {
      //   this.setState({fiveWhytoggle: false});
    } else {
      this.setState({fiveWhytoggle: false});
    }
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
    this.setState({loading: true, errorModal: true});

    var liklihood = this.state.liklihood.filter(
      (d: any) => d.selected == true,
    )[0].value;
    var severity = this.state.severity.filter((d: any) => d.selected == true)[0]
      .value;

    if (this.state.fiveWhytoggle == true) {
      if (this.props.route.params.data.justification == undefined) {
        // create five why
        var obj = {
          justification: {
            question: this.state.fiveWhyQuestion,
            answer: this.state.fiveWhyAnswer,
            contributoryCauses: this.state.countributoryCauses,
            rootCauses: this.state.rootCauses,
          },
          project: this.state.projectId,
          report: this.props.route.params.data._id,
          user: this.state.user._id,
          date: moment().format('MM-DD-YYYY'),
        };

        createApi.createApi().createFiveWhy(obj);
      } else {
        // create justification
        var updatefiveWhy = {
          id: this.props.route.params.data.justification,
          justification: {
            question: this.state.fiveWhyQuestion,
            answer: this.state.fiveWhyAnswer,
          },
          contributoryCauses: this.state.countributoryCauses,
          rootCauses: this.state.rootCauses,
        };

        createApi.createApi().editFiveWhy(updatefiveWhy);
      }

      //   fiveWhyQuestion:
      // fiveWhyAnswer:
    }

    var update = {
      report: {
        _id: this.props.route.params.data._id /** done  */,
        created_by: this.props.route.params.data.created_by /** done */,
        sor_type: this.state.sor_type,
        details: this.state.observation /** done */,
        createdAt: Date.now() /** done */,
        occured_at: Date.now() /** done */,
        involved_persons: this.props.route.params.data
          .involved_persons /** done */,
        risk: {
          /** done */ severity: severity,
          likelihood: liklihood,
        },
        action_required: this.state.actionsAndRecommendations /** done */,
        location: this.props.route.params.data.location /** done */,
        submit_to: this.state.submitted_to.map((d: any) => d.email) /** done */,
        esclate_to:
          this.state.reAssignToArrTags.length == 0
            ? this.state.esclate_to.map((d: any) => d.email)
            : this.state.reAssignToArrTags.map((d: any) => d.email) /** done */,
        status: status /** done */,
        attachments: [] /** done */,
        comments: this.props.route.params.data.comments /** done */,
        updatedAt: Date.now() /** done */,
      },
      project: this.state.projectId,
    };

    createApi
      .createApi()
      .updateSor(update)
      .then((res) => {
        this.setState({loading: false, errorModal: false});

        if (res.status == 200) {
          setTimeout(() => {
            showMessage({
              message: 'SOR Report is sucessfully submitted',
              type: 'success',
              position: 'bottom',
            });
          }, 3000);
          this.props.navigation.goBack();
        }
      })
      .catch((err) => {});
  };

  // delete comment through commentId
  deleteComment = (comment: any) => {
    createApi
      .createApi()
      .delComment(comment[0]._id, this.props.route.params.data.comments)
      .then((res) => {
        if (res.status == 200) {
          this.state.comments.splice(this.state.editDiscardCommentIndex, 1);
          this.setState({editDelComment: false});
        }
      })
      .catch((err) => {});
  };

  // Add edit comment
  editComment = (comment: any) => {
    var data = {
      data: {
        email: comment.user.email,
        comment: comment.comment,
        date: moment().format('YYYY-MM-DD'),
        files: comment.attachments,
        is_comment: true,
      },
      comment_id: comment._id,
      comment_document_id: this.props.route.params.data.comments,
    };
    createApi
      .createApi()
      .editComment(data)
      .then((res) => {})
      .catch((err) => {});
  };

  // Get All Comments
  getAllComments = () => {
    // this.props.route.params.data.comments;

    console.log('this.props.route.params.data');
    console.log(this.props.route.params.data.comments);
    console.log('ahdjsadh');
    console.log(this.props.route.params.data._id);
    createApi
      .createApi()
      .getAllComents(
        this.props.route.params.data.comments,
        this.props.route.params.data._id,
      )
      .then((res: any) => {
        // console.log('comments ');
        // console.log(res.data);
        // AsyncStorage.getItem('involved_person').then((involveppl: any) => {
        // var involvedPersonss = JSON.parse(involveppl);

        for (let i = 0; i < res.data.data.all_comments.length; i++) {
          // for (let j = 0; j < involvedPersonss.length; j++) {
          // if (res.data.data.all_comments[i].user != null) {
          //   if (
          //     res.data.data.all_comments[i].user.email ==
          //     involvedPersonss[j].email
          //   ) {
          //     console.log(involvedPersonss[i]);
          //     res.data.data.all_comments[i].user = involvedPersonss[j];
          //   }
          // }
          // }
        }
        const sortedActivities = res.data.data.all_comments.sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        );

        console.log('all comments res.data.data.all_comment');
        console.log(res.data.data);
        this.setState({comments: sortedActivities});

        // this.state..sort(function(a, b){return a-b});
      });
    // })
    // .catch((err) => {});
  };

  // Add Comment
  addComment = (comment: string, attachment: any) => {
    this.setState({
      commentText: '',

      commentAttachment: [],
    });

    var data = {
      bucket: 'hns-codist',
      report: 'profile',
      fileType: ['image/png'],
      ext: ['png'],
    };

    createApi
      .createApi()
      .getFilesUrl(data)
      .then((res: any) => {
        // console.log(res.data);
        // RN
        console.log();
        // const blob = new Promise((resolve, reject) => {
        //   const xhr = new XMLHttpRequest();
        //   xhr.onload = function () {
        //     resolve(xhr.response); // when BlobModule finishes reading, resolve with the blob
        //   };
        //   xhr.onerror = function () {
        //     reject(new TypeError('Network request failed')); // error occurred, rejecting
        //   };
        //   xhr.responseType = 'blob'; // use BlobModule's UriHandler
        //   xhr.open('GET', attachment[0].url, true); // fetch the blob from uri in async mode
        //   xhr.send(null); // no initial data
        // });

        console.log('blob');
        // console.log(blob);

        createApi
          .createApi('', '', '', '', '', '', res.data[0].url)
          .uploadFile(attachment[0].base64, attachment[0].org)
          .then((d: any) => {
            console.log(d);
          });

        const options = {
          url: res.data[0].url,
          // path: blob,
          method: 'PUT',
          type: 'raw',
          maxRetries: 2, // set retry count (Android only). Default 2
          headers: {
            'content-type': attachment[0].orgType, // Customize content-type
          },
          notification: {
            enabled: true,
          },
          useUtf8Charset: true,
        };

        // Upload.startUpload(options)
        //   .then((uploadId) => {
        //     console.log('Upload started');
        //     Upload.addListener('progress', uploadId, (data) => {
        //       console.log(`Progress: ${data.progress}%`);
        //     });
        //     Upload.addListener('error', uploadId, (data) => {
        //       console.log(`Error: ${data.error}%`);
        //     });
        //     Upload.addListener('cancelled', uploadId, (data) => {
        //       console.log(`Cancelled!`);
        //     });
        //     Upload.addListener('completed', uploadId, (data) => {
        //       // data includes responseCode: number and responseBody: Object
        //       console.log('Completed!');
        //     });
        //   })
        //   .catch((err) => {
        //     console.log('Upload error!', err);
        //   });
      });

    console.log(comment);
    console.log(attachment);
    AsyncStorage.getItem('email').then((email: any) => {
      createApi
        .createApi()
        .getUser(email)
        .then((user: any) => {
          var comments = {
            data: {
              user: user.data.data._id,
              comment: comment,
              date: Date.now(),
              files: [],
              is_comment: true,
            },
            comment_document_id: this.props.route.params.data.comments,
          };

          // this.state.commentAttachment
          createApi
            .createApi()
            .createComment(comments)
            .then((res: any) => {
              var map = [...this.state.comments];
              map.push({
                date: Date.now(),
                comment: comment,
                files: [],
                _id: res.data.data,
                user: {
                  name: user.data.data.name,
                  email: user.data.data.email,
                  _id: user.data.data._id,
                  img_url: user.data.data.img_url,
                },
                is_comment: true,
              });

              this.setState({comments: map});
            });
        });
    });
  };
  // // Save aas draft
  // saveAsDraft = () => {
  //   this.setState({loading: true});

  //   var liklihood = this.state.liklihood.filter(
  //     (d: any) => d.selected == true,
  //   )[0].value;
  //   var severity = this.state.severity.filter((d: any) => d.selected == true)[0]
  //     .value;

  //   if (this.state.fiveWhytoggle == true) {
  //     if (this.props.route.params.data.justification == undefined) {
  //       // create five why
  //       var obj = {
  //         justification: {
  //           question: this.state.fiveWhyQuestion,
  //           answer: this.state.fiveWhyAnswer,
  //           contributoryCauses: this.state.countributoryCauses,
  //           rootCauses: this.state.rootCauses,
  //         },
  //         project: this.state.projectId,
  //         report: this.props.route.params.data._id,
  //         user: this.state.user._id,
  //         date: moment().format('MM-DD-YYYY'),
  //       };

  //       createApi.createApi().createFiveWhy(obj);
  //     } else {
  //       // create justification
  //       var updatefiveWhy = {
  //         id: this.props.route.params.data.justification,
  //         justification: {
  //           question: this.state.fiveWhyQuestion,
  //           answer: this.state.fiveWhyAnswer,
  //         },
  //         contributoryCauses: this.state.countributoryCauses,
  //         rootCauses: this.state.rootCauses,
  //       };

  //       createApi.createApi().editFiveWhy(updatefiveWhy);
  //     }

  //     //   fiveWhyQuestion:
  //     // fiveWhyAnswer:
  //   }

  //   var update = {
  //     report: {
  //       _id: this.props.route.params.data._id /** done  */,
  //       created_by: this.props.route.params.data.created_by /** done */,
  //       details: this.state.observation /** done */,
  //       createdAt: Date.now() /** done */,
  //       occured_at: moment().format('YYYY-MM-DD') /** done */,
  //       involved_persons: this.props.route.params.data
  //         .involved_persons /** done */,
  //       risk: {
  //         /** done */ severity: severity,
  //         likelihood: liklihood,
  //       },
  //       action_required: this.state.actionsAndRecommendations /** done */,
  //       location: this.props.route.params.data.location /** done */,
  //       submit_to: this.state.submitted_to.map((d: any) => d.email) /** done */,
  //       esclate_to:
  //         this.state.reAssignToArrTags.length == 0
  //           ? this.state.esclate_to.map((d: any) => d.email)
  //           : this.state.reAssignToArrTags.map((d: any) => d.email) /** done */,
  //       status: 1 /** done */,
  //       attachments: [] /** done */,
  //       comments: this.props.route.params.data.comments /** done */,
  //       updatedAt: Date.now() /** done */,
  //     },
  //     project: this.state.projectId,
  //   };

  //   createApi
  //     .createApi()
  //     .updateSor(update)
  //     .then((res) => {
  //       this.setState({loading: false});
  //       if (res.status == 200) {
  //         this.props.navigation.goBack();
  //       }
  //       // this.props.reduxActions.getAllSors('6038cf8472762b29b1bed1f3', [
  //       //   1,
  //       //   2,
  //       //   3,
  //       //   4,
  //       //   5,
  //       // ]);
  //       // this.props.navigation.navigate('ViewAllSOr');
  //     })
  //     .catch((err) => {});
  // };

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

  getFilesFromServer = (attach?: any) => {
    console.log(attach);

    var dta = attach.map((d) => `report/${d}`);

    console.log(dta);

    var data = {
      bucket: 'hns-codist',
      report: dta,
    };

    createApi
      .createApi()
      .getFileApi(data)
      .then((d: any) => {
        console.log(d.data[0]);
        for (let i = 0; i < d.data.length; i++) {
          console.log(d.data[i]);
          if (
            attach[i].split('.')[1] == 'png' ||
            attach[i].split('.')[1] == 'jpeg' ||
            attach[i].split('.')[1] == 'jpg'
          ) {
            this.state.attachments.push({
              type: 'photo',
              upload: '',
              name: attach[i],
              url: d.data[i],
            });

            this.setState({ })
          } else if (attach[i].split('.')[1] == 'pdf') {
            this.state.attachments.push({
              type: 'pdf',
              upload: '',
              name: attach[i],
              url: d.data[i],
            });
            this.setState({ })
          } else if (
            attach[i].split('.')[1] == 'docx' ||
            attach[i].split('.')[1] == 'doc'
            ) {
              this.state.attachments.push({
                type: 'pdf',
                upload: '',
                name: attach[i],
                url: d.data[i],
              });
              this.setState({ })
            } else if (attach[i].split('.')[1] == 'xlsx') {
              this.state.attachments.push({
                type: 'xlsx',
                upload: '',
                name: attach[i],
                url: d.data[i],
              });
              this.setState({ })
            }
        }
      });

    console.log(this.state.attach);
  };

  // imgCap = (str: string, arr: Array<Object>) => {
  //   if (str == 'upload') {
  //     imagePicker()
  //       .then((res: any) => {
  //         arr.push({id: 24, name: 'John Doe', photo: res.uri});

  //         this.setState({photoModal: false});
  //       })
  //       .catch((err) => {
  //         this.setState({photoModal: false});
  //       });
  //   } else {
  //     cameraCapture()
  //       .then((res: any) => {
  //         arr.push({id: 24, name: 'John Doe', photo: res.uri});

  //         this.setState({photoModal: false});
  //       })
  //       .catch((err) => {
  //         this.setState({photoModal: false});
  //       });
  //   }
  // };
  // Document Attachments
  openDoc = async (attach: Array<Object>) => {
    try {
      var res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
        copyTo: 'cachesDirectory',
      });
      // DocType(res, this.state.attachments).then((res) => {
      //   this.setState({});
      // });

      console.log('asdasd');
      console.log(res);

      res.map((d, i) => {
        if (d.type.split('/')[0] == 'image') {
          console.log('imagesdasds');
          attach.splice(0, 0, {
            type: 'photo',
            orgType: d.type,
            upload: 'self',
            name: d.name,
            url: d.uri,
          });

          // ifstream.bufferSize;
        } else if (d.type.split('/')[1] == 'pdf') {
          attach.splice(0, 0, {
            type: 'pdf',
            upload: 'self',
            orgType: d.type,
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
            orgType: d.type,
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
                <Text style={styles.title}>Observation Summary</Text>
              </View>
            </View>
          </View>

          <Animated.View
            style={[styles.content, {marginTop: this.state.contentAnim}]}>
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
                  {moment(this.state.time).format('MMM DD, YYYY LT')}
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
                  {this.props.route.params.data.location}
                </Text>
              </View>
            </View>
            {/* Line  */}

            <View style={styles.lineheight} />
            <View style={styles.obserContainer}>
              <Text style={styles.observationDate}>
                On {moment(this.state.time).format('MMM DD, YYYY')} at{' '}
                {moment(this.state.time).format('LT')}
              </Text>
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
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: wp(3.5),
                    fontFamily: fonts.SFuiDisplayLight,
                  }}>
                  Involved Person:{' '}
                </Text>
                <Text style={{fontSize: wp(3.5)}}>
                  {this.state.involved_person[0].name}
                </Text>
              </View>
            </View>
            {/* Line  */}
            <View style={styles.lineheight} />
            {/* <View style={styles.subContainer}>
              {this.state.submitted_to.length == 0 ? null : (
                <View style={styles.submittedTo}>
                  <Text style={styles.subText}>Submitted to : </Text>
                  <Text style={styles.obvText}>
                    {this.state.submitted_to[0].name}
                  </Text>
                </View>
              )}

              {this.state.esclate_to.length == 0 ? null : (
                <View style={styles.observerTo}>
                  <Text style={styles.obvText}>Observer : </Text>
                  <Text style={styles.obvText}>
                    {this.props.route.params.data.created_by.split('@')[0]}
                  </Text>
                </View>
              )}
            </View> */}
            {/* <View style={styles.involveNortify}> */}
            {/* Notified To Section */}
            {/* <View style={styles.notifiedSec}>
                <Text style={styles.notifyPText}>Esclate to : </Text>
                {this.state.esclate_to.map((d: involved_persons, i: number) => {
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
                })}
                {this.state.esclate_to.length < 6 ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.esclate_to.length < 6) {
                        this.setState({
                          notifiedAndInv: 1,
                          photoArr: this.state.notifiedPerson,
                          IsaddInvAndNotifiedUser: true,
                          involvedAndNotifiedUserType: 'Esclate',
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
            {/* <View style={styles.notifiedSec}>
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
            </View> */}
            {/* Risk */}
            <View style={styles.risk}>
              {/* <Text style={styles.riskText}>
                Risk{' '}
                <Text style={styles.riskttle}>(Severity x Likelihood)</Text>
              </Text> */}

              {/* Potiential Risk */}
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
                      {this.state.potientialRisk}-{' '}
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

              {this.state.selectedRisk == false ? (
                <View>
                  <Chart
                    liklihood={this.state.liklihood}
                    severity={this.state.severity}
                    style={{marginTop: wp(3)}}
                    onPress={(v: object) => {}}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => this.setState({selectedRisk: false})}>
                  {/* <View style={styles.riskIcon}>
                    <Text style={styles.riskIconText}>
                      {this.props.route.params.data.risk.likelihood *
                        this.props.route.params.data.risk.severity}
                    </Text>
                  </View> */}

                  <View
                    style={[styles.potentialRiskContainer, {marginTop: wp(3)}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={[
                          styles.actualRiskheading,
                          {fontFamily: fonts.SFuiDisplaySemiBold},
                        ]}>
                        Actual Risk
                      </Text>
                      <Text style={styles.systemDefinedtext}>(Calculated)</Text>
                    </View>
                    <View
                      style={[
                        styles.badgeActualRisk,
                        this.props.route.params.data.risk.likelihood *
                          this.props.route.params.data.risk.severity <
                        7
                          ? {
                              borderColor: colors.green,
                              backgroundColor: colors.green,
                            }
                          : this.props.route.params.data.risk.likelihood *
                              this.props.route.params.data.risk.severity <
                            14
                          ? {
                              borderColor: colors.riskIcons.orrange,
                              backgroundColor: colors.riskIcons.orrange,
                            }
                          : {
                              borderColor: colors.error,
                              backgroundColor: colors.error,
                            },
                      ]}>
                      <Text
                        style={[
                          styles.potentialRiskBadgeContainerText,
                          this.props.route.params.data.risk.likelihood *
                            this.props.route.params.data.risk.severity <
                          7
                            ? {color: colors.secondary}
                            : this.props.route.params.data.risk.likelihood *
                                this.props.route.params.data.risk.severity <
                              14
                            ? {color: colors.secondary}
                            : {color: colors.secondary},
                        ]}>
                        {this.props.route.params.data.risk.likelihood *
                          this.props.route.params.data.risk.severity}
                        -{' '}
                        {this.props.route.params.data.risk.likelihood *
                          this.props.route.params.data.risk.severity <
                        7
                          ? 'Low'
                          : this.props.route.params.data.risk.likelihood *
                              this.props.route.params.data.risk.severity <
                            14
                          ? 'Medium'
                          : 'High'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
            {/* five WHY Questionaries */}
            {/* Line  */}
            {this.props.route.params.data.sor_type == 'near miss' && (
              <>
                <View style={styles.lineheight} />
                <View style={styles.fiveWhyContainer}>
                  <View style={styles.fiveWhyHeadingContainer}>
                    <Text style={styles.investigationReqtext}>
                      Investigation Required
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        // if (this.state.fiveWhytoggle == true) {
                        //   this.setState({fiveWhytoggle: false});
                        // } else {
                        //   if (this.state.reportIdInvestigation === '') {
                        //     var bodyInitial = {
                        //       report: {
                        //         created_by: this.state.user.email,
                        //         comments: '',
                        //         status: 1,
                        //       },
                        //       project: '607820d5724677561cf67ec5',
                        //     };
                        //     createApi
                        //       .createApi()
                        //       .createSorInit(bodyInitial)
                        //       .then((res: any) => {
                        //         this.setState({
                        //           reportIdInvestigation: res.data.data.report_id,
                        //         });
                        //         this.setState({fiveWhytoggle: true});
                        //       })
                        //   } else {
                        //     this.setState({fiveWhytoggle: true});
                        //   }
                        // }
                        this.setState({
                          fiveWhytoggle: !this.state.fiveWhytoggle,
                        });
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
                  {/* countributoryCauses : "",
      rootCauses : "" */}
                  {this.state.fiveWhytoggle == true ? (
                    <FiveWhy
                      onChangeCountributory={(e: any) =>
                        this.setState({countributoryCauses: e})
                      }
                      onChangeRiskCause={(e: any) =>
                        this.setState({rootCauses: e})
                      }
                      contributoryCauses={this.state.countributoryCausesD}
                      rootCauses={this.state.rootCausesD}
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
              </>
            )}

            {/* Line  */}
            <View style={styles.lineheight} />
            {/* Actions / recommendations */}
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>Action / Recommendation</Text>
              {/* <Text style={styles.sugForYouText}>Suggested for you</Text> */}
              {this.props.route.params.data.action_required == undefined ? (
                <Text style={styles.nosuchActionsAndRecommendations}>
                  No such Actions / Recommendations
                </Text>
              ) : (
                <View>
                  {/* {this.state.actionsAndRecommendations.map(
                    (d: actions, i: number) => (
                      <TouchableOpacity
                        onPress={() => {
                          var data = [...this.state.actionsAndRecommendations];
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
                            <View style={{position: 'absolute', right: wp(3)}}>
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
                  )} */}

                  {this.state.actionsAndRecommendations.map(
                    (d: any, i: number) => (
                      <TouchableOpacity
                        onPress={() => {
                          var data = [...this.state.actionsAndRecommendations];
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
                        key={i}
                        style={[
                          styles.suggestedActionsContainer,
                          d.is_complete == true
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
                    ),
                  )}
                </View>
              )}
            </View>
            {/* submit actions and recommendations  */}
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
            {/* Attachments / Images or docs */}
            {/* Line  */}
            <View style={styles.lineheight} />
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
            {/* Line  */}
            <View style={styles.lineheight} />
            {/* Initialize and Submitted to options */}
            <View style={styles.initializeAndSubmittedTo}>
              {/* initialize by */}
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.initializeByAndSubmittedToHeading}>
                  Initiated By:
                </Text>
                <Text style={styles.initializeByAndSubmitedToAnswer}>
                  {this.props.route.params.data.created_by}
                </Text>
              </View>
              {/* submitted to */}
              <View style={{flexDirection: 'row', marginTop: wp(2)}}>
                <Text style={styles.initializeByAndSubmittedToHeading}>
                  Submitted To:
                </Text>
                <Text style={styles.initializeByAndSubmitedToAnswer}>
                  {this.state.submitted_to[0].name}
                </Text>
              </View>
              {/* REASSIGNED to  */}
              <View style={{marginTop: wp(4)}}>
                <Text style={styles.sbBtnText}>Re-assign to </Text>
                {this.state.reAssignToArrTags.length < 1 ? (
                  <>
                    <View
                      style={[
                        styles.optnselector,
                        // this.state.selectedInputIndex == 5
                        //   ? {borderColor: colors.green}
                        //   : null,
                      ]}>
                      <TextInput
                        // onFocus={() => this.setState({selectedInputIndex: 5})}
                        underlineColorAndroid="transparent"
                        onChangeText={(v: any) => {
                          if (v === '') {
                            this.setState({
                              reAssignToArr: [],
                              reassignToText: v,
                            });
                          } else {
                            this.setState({
                              reAssignToArr: searchInSuggestions(
                                v.toLowerCase(),
                                this.state.involvedPerson,
                              ),
                              reassignToText: v,
                            });
                          }
                        }}
                        placeholder={'Select or Type Name'}
                        style={styles.optnselectorText}
                        value={this.state.reassignToText}
                      />
                    </View>

                    {this.state.reAssignToArr.length != 0 ? (
                      <View>
                        <View style={styles.involveSuggestCont}>
                          {this.state.reAssignToArr.map(
                            (d: involved_persons, i: number) => (
                              <TouchableOpacity
                                key={i}
                                onPress={() => {
                                  this.setState({
                                    reassignToText: '',
                                    reAssignToArr: [],
                                  });

                                  if (
                                    this.state.reAssignToArr.filter(
                                      (v: involved_persons) => v == d,
                                    ).length != 0
                                  ) {
                                    this.state.reAssignToArrTags.push(d);
                                  } else {
                                    return null;
                                  }
                                }}
                                style={[
                                  styles.involvePsuggCont,
                                  this.state.reAssignToArr.length == i + 1
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
                                  <Text style={{fontSize: wp(2)}}>
                                    {d.email}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            ),
                          )}
                        </View>
                      </View>
                    ) : null}
                  </>
                ) : null}
                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                  <Tags
                    onClose={(d: any) => {
                      this.setState({
                        reAssignToArrTags: this.state.reAssignToArrTags.filter(
                          (v: any) => v !== d,
                        ),
                      });
                    }}
                    tags={this.state.reAssignToArrTags}
                  />
                </View>
              </View>

              {/* ESCLATED TO  */}
              <View>
                <Text style={styles.sbBtnText}>Esclated to </Text>
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
                        this.setState({esclateTo: v, exclateToArr: []});
                      } else {
                        this.setState({
                          exclateToArr: searchInSuggestions(
                            v.toLowerCase(),
                            this.state.involvedPerson,
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
                                this.state.exclateToArr.filter(
                                  (v: involved_persons) => v == d,
                                ).length != 0
                              ) {
                                this.state.esclate_to.push(d);
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
                              <Text style={{fontSize: wp(2)}}>{d.email}</Text>
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
                        esclate_to: this.state.esclate_to.filter(
                          (v: any) => v !== d,
                        ),
                      });
                    }}
                    tags={this.state.esclate_to}
                  />
                </View>
              </View>
            </View>
            {/* Line
            <View style={styles.lineheight} /> */}
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
            {/* <View style={{width: wp(90), height: wp(50)}}>
              <Image
                source={images.map}
                style={[GlStyles.images, {borderRadius: wp(3)}]}
                resizeMode={'cover'}
              />
            </View> */}
            {/* comments sections */}
            <View style={styles.commentsSections}>
              {this.state.comments.map((d: any, i: number) => {
                return (
                  <View>
                    <TouchableOpacity
                      onLongPress={() => {
                        if (d.is_comment == true) {
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
                        }
                      }}
                      style={styles.userComments}>
                      {d.user == '' ? null : (
                        <Avatar
                          // containerStyle={{position: 'absolute', top: wp(0)}}
                          size={wp(6)}
                          rounded
                          source={{
                            uri:
                              d.user.img_url == undefined
                                ? 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                                : d.user.img_url,
                          }}
                        />
                      )}

                      <View style={styles.commentUser}>
                        <Text style={styles.userCommentName}>
                          {d.user.name == undefined
                            ? this.state.user.name
                            : d.user.name}
                        </Text>
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
                {/* <Avatar
                  containerStyle={{
                    marginRight: wp(2),
                    marginTop: wp(4),
                  }}
                  size={wp(6)}
                  rounded
                  source={{
                    uri: this.state.user.img_url,
                  }}
                /> */}

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
                    onChange={(e) => {
                      // mentionComment

                      if (filterLocation(e.nativeEvent.text) != null) {
                        this.setState({
                          commentsSugg: searchInSuggestions(
                            filterLocation(e.nativeEvent.text)[0].split('@')[1],
                            this.state.involvedPerson,
                          ),
                          commentMentionReplace: filterLocation(
                            e.nativeEvent.text,
                          )[0],
                        });
                      }

                      this.setState({commentText: e.nativeEvent.text});
                    }}
                    placeholder={'Your comment here '}
                  />
                  <View
                    style={{
                      // top: wp(2.7),
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

                          this.addComment(
                            this.state.commentText,
                            this.state.commentAttachment,
                          );
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
              {/* User suggestions  */}
              {this.state.commentsSugg.length !== 0 ? (
                <View style={styles.commentSuggContainer}>
                  {this.state.commentsSugg.map(
                    (d: involved_persons, i: number) => (
                      <View key={i}>
                        <TouchableOpacity
                          onPress={() => {
                            // this.setState({
                            //   commentText: this.state.commentText.concat(
                            //     d.name,
                            //   ),
                            // });
                            this.setState({
                              commentText: this.state.commentText.replace(
                                this.state.commentMentionReplace,
                                d.name,
                              ),
                              commentsSugg: [],
                            });
                            // this.state.involvePersonTags.push(d);
                          }}
                          style={[
                            styles.commentPSuggCont,
                            this.state.commentsSugg.length == i + 1
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

              {/* Comments Attachments */}
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
              <TouchableOpacity
                onPress={() => this.onSubmitUpdateSor(1)}
                style={styles.saveAsDraftContainer}>
                <Text style={styles.saveAsDraftText}>Save as Draft</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.onSubmitUpdateSor(2)}
                style={styles.saveAsSubmitContainer}>
                <Text style={styles.saveAsSubmitText}>Submit</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: wp(10),
                marginTop: wp(3),
              }}>
              <TouchableOpacity
                onPress={() => this.onSubmitUpdateSor(1)}
                style={styles.saveAsDraftContainer}>
                <Text style={styles.saveAsDraftText}>Preview</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  AsyncStorage.getItem('email').then((email) => {
                    if (email == this.props.route.params.data.created_by) {
                      this.onSubmitUpdateSor(5);
                    } else {
                      this.onSubmitUpdateSor(3);
                    }
                  });
                }}
                style={[
                  styles.saveAsSubmitContainer,
                  {backgroundColor: colors.green},
                ]}>
                <Text style={[styles.saveAsSubmitText]}>Mark as Complete</Text>
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
        {/* Add Involved and Submitted to Users  */}

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
            // this.deleteComment(
            //   this.state.comments.findIndex(this.state.editDiscardCommentIndex),
            // );
            this.deleteComment(
              e.filter(
                (d: any, i: number) => i == this.state.editDiscardCommentIndex,
              ),
            );

            // this.state.comments.splice(this.state.editDiscardCommentIndex, 1);

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

            this.editComment(
              this.state.comments[this.state.editDiscardCommentIndex],
            );
            this.setState({editDelComment: false});
          }}
        />
        <FlashMessage ref="myLocalFlashMessage" />

        {this.state.loading ? (
          <Model
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
          </Model>
        ) : null}

        {/* 
        <Model
          animationIn={'bounceInUp'}
          animationOut={'bounceOutDown'}
          animationInTiming={1000}
          animationOutTiming={1000}
          isVisible={this.state.loading}
          onBackdropPress={() => this.setState({loading: false})}>



        </Model> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewSOR);

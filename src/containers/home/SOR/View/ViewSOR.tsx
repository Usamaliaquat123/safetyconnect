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
import {Icon, Avatar, ThemeConsumer} from 'react-native-elements';
import {colors, GlStyles, animation, images, fonts} from '@theme';
import RNFetchBlob from 'rn-fetch-blob';
import Upload from 'react-native-background-upload';
import {Card, ListCard} from '@components';
import {View_sor, notified, riskxSeverityxliklihood, createApi} from '@service';
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
  classifySor,
  filterInvolvedPerson,
  filterAndMappingPersons,
  downloadFile,
  filterLocation,
  getSorData,
  fileuploader,
  getCurrentProject,
} from '@utils';
import {copilot, walkthroughable, CopilotStep} from 'react-native-copilot';

import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {involved_persons, actions, actionsDashboard} from '@typings';
import * as reduxActions from '../../../../store/actions/listSorActions';

const WalkthroughableText = walkthroughable(Text);
const WalkthroughableTouchableOpacity = walkthroughable(TouchableOpacity);
const WalkthroughableView = walkthroughable(View);
const WalkthroughableInput = walkthroughable(TextInput);
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
      sor: {},
      user: {},
      time: this.props.route.params.data.occured_at,
      imageViewer: false,
      images: [],
      photoArr: [],
      selectedInput: 0,
      commentText: '',
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
      allBtnsEnabled: true,
      actionsAndRecommendations: this.props.route.params.data.action_required,
      // popup Assigners
      addAssigners: false,
      involveAndNotifiedUsersName: '',
      IsaddInvAndNotifiedUser: false,
      involvedAndNotifiedUserType: 'involved',
      fileloading: false,
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
      esclate_to: [],

      editInvolvedAndEsclatedPersons: false,
      involvePersonsSelected: false,

      // Loading
      loading: false,

      AllUsers: [],
      isCounterInvolved: false,
      // Five WHY
      fiveWhytoggle: true,
      reportIdInvestigation: '',

      // Potiential Risk
      potientialRisk: 9,
      // Esclated to
      exclateToArr: [],
      fiveWhyQuestion: [],
      fiveWhyAnswer: [],
      repeatedSors: [],
      fiveWHYdata: [],
      contributoryCauses: '',
      rootCauses: '',
      keyFindingss: '',
      keyFindings: '',
      commentAttachmentLoading: false,
      // Reassign to
      reAssignToArr: [],
      exclateToTags: [],
      reAssignToArrTags: [],
      projectName: '',
      commentMentionReplace: '',
      projectId: '',
      closed: false,
      excludingSubmitCreatedByUsers: [],
    };

    this.animation = React.createRef();
    this.photoAnim = React.createRef();

    this.fileNotSupported = React.createRef();
  }

  componentDidMount = () => {
    this.props.start(false, this.scrollView);
    if (this.props.route.params.data.esclate_to != undefined) {
      this.setState({esclate_to: this.props.route.params.data.esclate_to});
    }
    // var excludingSubmitCreatedByUsers = [];

    console.log('this.props.route.params.data');
    console.log(this.props.route.params.data);
    if (this.props.route.params.data.closed == true) {
      this.setState({closed: true});
    }
    getCurrentProject().then((currentProj: any) => {
      this.setState({projectId: currentProj});

      this.getAllRepeatedSors(
        this.props.route.params.data.repeatedSor,
        currentProj,
      );

      createApi
        .createApi()
        .getProject({projectid: currentProj})
        .then((res: any) => {
          console.log(res);
          this.setState({
            projectName: res.data.data.project_name,
            involvedPerson: res.data.data.involved_persons,
          });

          // console.log('res.data.data.involved_persons');
          // console.log(res.data.data.involved_persons);
          // console.log(this.props.route.params.data.involved_persons);

          var data: Array<any> = [];
          // filterInvolvedPerson(this.props.route.params.data.involved_persons,res.data.data.involved_persons, []).then(res => console.log(res)).catch(err => con)
          this.props.route.params.data.involved_persons.map((d: any) => {
            if (
              res.data.data.involved_persons.filter((i: any) => i.email == d)
                .length == 0
            ) {
              createApi
                .createApi()
                .getUser(d)
                .then((res: any) => {
                  if (res.data.message === 'no user exists') {
                    this.state.involvedPerson.push({
                      name: d,
                      email: d,
                      img_url:
                        'https://dummyimage.com/600x400/ffffff/000000&text=@',
                    });
                  } else {
                    this.state.involvedPerson.push({
                      name: res.data.data.name,
                      img_url: res.data.data.img_url,
                      email: res.data.data.email,
                    });
                  }
                })
                .catch((err: any) => {});
            } else {
              this.state.involvedPerson.push(
                res.data.data.involved_persons.filter(
                  (i: any) => i.email == d,
                )[0],
              );
            }

            // this.setState({});
          });

          console.log(this.state.involvedPerson);

          // this.setState({involvedPerson: data});
          // this.setState({
          //   excludingSubmitCreatedByUsers: this.state.involvedPerson,
          // });
          // AsyncStorage.getItem('email').then((email: any) => {
          //   this.state.excludingSubmitCreatedByUsers.map(
          //     (d: any, i: number) => {
          //       // const element = notifiedToAndInvolved[i];

          //       if (d.email == this.props.route.params.data.created_by) {
          //         this.state.excludingSubmitCreatedByUsers.splice(i, 1);
          //       }
          //       if (d.email == this.props.route.params.data.submit_to[0]) {
          //         this.state.excludingSubmitCreatedByUsers.splice(i, 1);
          //       }
          //     },
          //   );

          //   if (
          //     this.state.excludingSubmitCreatedByUsers.filter(
          //       (d) => d.email == email,
          //     )
          //   ) {
          //     this.setState({allBtnsEnabled: true});
          //   } else {
          //     this.setState({allBtnsEnabled: false});
          //   }
          // });

          // this.mappingInvolved(
          //   res.data.data.involved_persons,
          //   this.props.route.params.data.involved_persons[0],
          // );

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
    this.mappingMapping(
      this.props.route.params.data.risk.severity,
      this.props.route.params.data.risk.likelihood,
    );

    console.log('this.state.esclate_to');
    console.log(this.state.esclate_to);
    console.log('this.state.involved ');
    console.log(this.state.involvedPerson);
  };

  getAllRepeatedSors = async (e: any, projectid: any) => {
    var data = [];
    var iteration = e.length;

    for (let i = 0; i < e.length; i++) {
      const {data} = await createApi.createApi().getSors(projectid, e[i]);
      const {data: res} = data;
      this.setState(
        (prevState) => {
          return {
            ...prevState,
            repeatedSors: prevState.repeatedSors.concat(res.report[0]),
          };
        },
        () => {},
      );
    }
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

      // console.log('sdsdsds');
      // console.log(
      //   this.props.route.params.data.justifications[0].contributoryCauses,
      // );
      this.setState({
        contributoryCauses: this.props.route.params.data.justifications[0]
          .contributoryCauses,
        rootCauses: this.props.route.params.data.justifications[0].rootCauses,
        keyFindingss: this.props.route.params.data.justifications[0]
          .keyFindings,
        // contributoryCauses: this.props.route.params.data.justifications[0]
        //   .contributoryCauses,
        // rootCauses: this.props.route.params.data.justifications[0].rootCauses,
        // rootCauses: this.state.rootCauses,
      });
      this.setState({
        contributoryCauses: this.props.route.params.data.justifications[0]
          .contributoryCauses,
        rootCauses: this.props.route.params.data.justifications[0].rootCauses,
        keyFindingss: this.props.route.params.data.justifications[0]
          .keyFindings,
        // contributoryCauses: this.props.route.params.data.justifications[0]
        //   .contributoryCauses,
        // rootCauses: this.props.route.params.data.justifications[0].rootCauses,
        // rootCauses: this.state.rootCauses,
      });

      this.setState({});
      //   // If contributoryCauses exists
      // if (this.props.route.params.data.justifications[0].contributoryCauses) {
      //   this.setState({
      //     countributoryCauses: this.props.route.params.data.justifications[0]
      //       .contributoryCauses[0],
      //     rootCauses: this.props.route.params.data.justifications[0]
      //       .rootCauses[0],
      //   });
      // }
      console.log(this.props.route.params.data);
      //   // Set the state of 5 whys Questions /Answers
      this.setState({
        fiveWhyQuestion: this.props.route.params.data.justifications[0]
          .justification.question,
        fiveWhyAnswer: this.props.route.params.data.justifications[0]
          .justification.answer,
        fiveWhytoggle: true,
      });
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
    console.log(this.state.actionsAndRecommendation);
    this.setState({loading: true, errorModal: true});
    var liklihood = this.state.liklihood.filter(
      (d: any) => d.selected == true,
    )[0].value;
    var severity = this.state.severity.filter((d: any) => d.selected == true)[0]
      .value;

    console.log('sdsds');
    var update = {
      report: {
        _id: this.props.route.params.data._id /** done  */,
        created_by: this.props.route.params.data.created_by /** done */,
        sor_type: this.state.sor_type,
        details: this.state.observation /** done */,
        createdAt: Date.now() /** done */,
        occurred_at: Date.now() /** done */,
        involved_persons: this.props.route.params.data
          .involved_persons /** done */,
        risk: {
          /** done */ severity: severity,
          likelihood: liklihood,
          category:
            severity * liklihood < 7
              ? `low`
              : severity * liklihood < 14
              ? `medium`
              : 'high',
        },
        repeatedSor: this.props.route.params.data.repeatedSor,
        justification: this.props.route.params.data.justification,
        action_required: this.state.actionsAndRecommendations /** done */,
        location: this.props.route.params.data.location /** done */,
        submit_to:
          this.state.reAssignToArrTags.length == 0
            ? this.state.submitted_to
            : this.state.reAssignToArrTags.map((d) => d.email) /** done */,
        escalate_to: this.state.esclate_to,
        // this.state.reAssignToArrTags.length == 0
        // : this.state.reAssignToArrTags.map((d: any) => d.email) /** done */,
        // status: this.state.esclate_to.length == 0 ? status : 3 /** done */,
        attachments: this.state.attachments.map((d) => d.name) /** done */,
        comments: this.props.route.params.data.comments /** done */,
        status: this.state.esclate_to.length == 0 ? status : 3,
        updatedAt: Date.now() /** done */,
      },
      project: this.state.projectId,
      // user:
      updated_by: {
        email: this.state.user.email,
        _id: this.state.user._id,
      },
    };

    console.log(update);

    createApi
      .createApi()
      .updateSor(update)
      .then((res) => {
        console.log(res);
        console.log(this.state.fiveWhytoggle);

        if (res.status == 200) {
          // add five why
          if (this.state.fiveWhytoggle == true) {
            this.setState({loading: false, errorModal: false});
            // if five is not added previosly

            if (this.props.route.params.data.justifications.length == 0) {
              // create five why
              var obj = {
                justification: {
                  question: this.state.fiveWhyQuestion,
                  answer: this.state.fiveWhyAnswer,
                },
                contributoryCauses: this.state.contributoryCauses,
                rootCauses: this.state.rootCauses,
                project: this.state.projectId,
                report: this.props.route.params.data._id,
                user: this.state.user._id,
                date: moment().format('MM-DD-YYYY'),
              };

              createApi
                .createApi()
                .createFiveWhy(obj)
                .then((res: any) => {
                  console.log('updated five why');
                  console.log(res);
                  setTimeout(() => {
                    this.props.navigation.goBack();
                  }, 3000);
                  showMessage({
                    message: 'SOR Report is sucessfully updated',
                    type: 'success',
                    position: 'bottom',
                  });
                });
            } else {
              //update five why
              var updatefiveWhy = {
                justification: {
                  question: this.state.fiveWhyQuestion,
                  answer: this.state.fiveWhyAnswer,
                },
                project: this.state.projectId,
                contributoryCauses: this.state.contributoryCauses,
                rootCauses: this.state.rootCauses,
                keyFindings: this.state.keyFindings,
                report: this.props.route.params.data._id,
                user: this.state.user._id,
                date: moment().format('MM-DD-YYYY'),
              };

              console.log('updatefiveWhy');
              console.log(updatefiveWhy);

              createApi
                .createApi()
                .createFiveWhy(updatefiveWhy)
                .then((res) => {
                  showMessage({
                    message: 'SOR Report is sucessfully updated',
                    type: 'success',
                    position: 'bottom',
                  });
                  setTimeout(() => {
                    this.props.navigation.goBack();
                  }, 3000);
                });
            }

            //   fiveWhyQuestion:
            // fiveWhyAnswer:
          } else {
            this.setState({loading: false, errorModal: false});
            setTimeout(() => {
              showMessage({
                message: 'SOR Report is sucessfully updated',
                type: 'success',
                position: 'bottom',
              });
            }, 3000);
            this.props.navigation.goBack();
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
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

    createApi
      .createApi()
      .getAllComents(
        this.props.route.params.data.comments,
        this.props.route.params.data._id,
      )
      .then((res: any) => {
        // AsyncStorage.getItem('involved_person').then((involveppl: any) => {
        // var involvedPersonss = JSON.parse(involveppl);
        console.log(res);
        for (let i = 0; i < res.data.data.all_comments.length; i++) {
          var rs = res.data.data.all_comments[i].files.map(
            (d) => (d = `report/${d}`),
          );

          // var types = res.data.data.all_comments[i].files.map(
          //   (d: any) => (d = d.split('.')[1]),
          // );
          var dta = {
            bucket: 'hns-codist',
            report: rs,
          };

          console.log(dta);

          createApi
            .createApi()
            .getPublicPhotos(dta)
            .then((imgUrl: any) => {
              console.log('imgUrl');
              console.log(imgUrl);
              var obj = {};
              for (
                let k = 0;
                k < res.data.data.all_comments[i].files.length;
                k++
              ) {
                if (
                  res.data.data.all_comments[i].files[k].split('.')[1] ==
                    'jpeg' ||
                  res.data.data.all_comments[i].files[k].split('.')[1] == 'png'
                ) {
                  var data = {
                    name: res.data.data.all_comments[i].files[k],
                    type: 'image',
                    uri: imgUrl.data[k],
                  };

                  res.data.data.all_comments[i].files[k] = data;
                  this.setState({});
                }

                //     res.data.data.all_comments[i].files[k]
              }
            });

          //  res.data.data.all_comments

          // if (types == 'jpeg' || types == 'png' || types == 'jpg') {
          //   obj = {
          //     name: res.data.data.all_comments[i].files,
          //     type: 'image',
          //     uri: imgUrl[0],
          //   };
          // } else {
          //   obj = {
          //     name: res.data.data.all_comments[i].files,
          //     type: 'image',
          //     uri: imgUrl[0],
          //   };
          // }

          // for (let j = 0; j < involvedPersonss.length; j++) {
          // if (res.data.data.all_comments[i].user != null) {
          //   if (
          //     res.data.data.all_comments[i].user.email ==
          //     involvedPersonss[j].email
          //   ) {
          //     res.data.data.all_comments[i].user = involvedPersonss[j];
          //   }
          // }
          // }
        }
        const sortedActivities = res.data.data.all_comments.sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        );

        this.setState({comments: sortedActivities});
        // this.setState({});
        console.log('comments');
        console.log(this.state.comments);
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
              files: attachment.map((d: any) => d.name),
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
                files: attachment,
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

  mapViewSorPhoto = () => {
    View_sor.user.Attachments.map((d, i) => {
      if (d.type == 'photo') {
        this.state.images.push({url: d.url});
      }
    });
  };

  fileAndImageCapturer = (attach: Array<string>) => {
    /*
    /*
     * Image object Map to this
     *
     *      type: 'video',
     *      upload: 'self',
     *      name: d.name,
     *      url: d.uri,
     */

    // var mapped = imageAndVideoObjectMap(attachments);

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
              type: 'doc',
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

  // getFilesFromServer = (attach?: any) => {};

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
  openDoc = async (attach: Array<Object>, commentAttach? = false) => {
    try {
      var res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // DocType(res, this.state.attachments).then((res) => {
      //   this.setState({});
      // });

      console.log(res);

      if (res.type == 'image/jpeg' || res.type == 'image/png') {
        res['orgType'] = res.type;
        res.type = 'image';
      } else {
        if (
          res.name.split('.')[1] == 'docx' ||
          res.name.split('.')[1] == 'doc'
        ) {
          res['orgType'] = res.name.split('.')[1];
          res.type = 'doc';
        } else if (res.name.split('.')[1] == 'pdf') {
          res['orgType'] = res.name.split('.')[1];
          res.type = 'pdf';
        } else if (res.name.split('.')[1] == 'xlsx') {
          res['orgType'] = res.name.split('.')[1];
          res.type = 'xlsx';
        }
      }

      if (
        res.type == 'docx' ||
        res.type == 'doc' ||
        res.type == 'pdf' ||
        res.type == 'xlsx' ||
        res.type == 'image'
      ) {
        var imgData = {
          name: res.name,
          uri: res.uri,
          upload: '',
          type: res.type,
        };
        if (commentAttach == true) {
          this.setState({commentAttachmentLoading: true});
        } else {
          this.setState({fileLoading: true});
        }

        fileuploader(res.orgType, res.orgType, res.uri).then(
          (filename: any) => {
            imgData['name'] = filename;
            if (commentAttach == true) {
              this.setState({commentAttachmentLoading: false});
            } else {
              this.setState({fileLoading: false});
            }
            var data = {
              bucket: 'hns-codist',
              report: [`report/${filename}`],
            };

            createApi
              .createApi()
              .getFileApi(data)
              .then((d: any) => {
                imgData['uri'] = d.data[0];
              });
            attach.splice(0, 0, imgData);
            console.log('attach');
            console.log(attach);
            this.setState({});
          },
        );
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
      <Animated.View style={[styles.container]}>
        <ScrollView
          ref={(ref) => (this.scrollView = ref)}
          showsVerticalScrollIndicator={false}>
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

          <Animated.View style={[styles.content]}>
            {/* Observation Details */}
            <CopilotStep
              text="Observation detail"
              order={2}
              name="copObservationDetail">
              <WalkthroughableView style={styles.observationDcontent}>
                {/* Observation ID */}
                <View style={styles.observationIdContainer}>
                  <Text style={styles.observationIDText}>Observation ID:</Text>
                  <Text style={styles.observationIDAns}>112233</Text>
                </View>
                {/* Observation Type */}
                <View style={styles.observationTypeContainer}>
                  <Text style={styles.observationTypeText}>
                    Observation Type:
                  </Text>
                  <View style={styles.observationTypeAns}>
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
                <View style={styles.reportedOnContainer}>
                  <Text style={styles.reportedOnText}>Reported on:</Text>
                  <Text style={styles.reportedOnAns}>
                    {moment(this.state.time).format('MMM DD, YYYY LT')}
                  </Text>
                </View>
                {/* Project */}
                <View style={styles.projectContainer}>
                  <Text style={styles.projectText}>Project:</Text>
                  <Text style={styles.projectAns}>
                    {this.state.projectName}
                  </Text>
                </View>
                {/* Location */}
                <View style={styles.locationContainer}>
                  <Text style={styles.locationText}>Location:</Text>
                  <Text style={styles.locationAns}>
                    {this.props.route.params.data.location}
                  </Text>
                </View>
              </WalkthroughableView>
            </CopilotStep>

            {/* Line  */}

            <View style={styles.lineheight} />

            <CopilotStep
              text="Observation Details with involved users "
              order={3}
              name="copObsdetailInvolvedUsers">
              <WalkthroughableView style={styles.obserContainer}>
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
                {this.state.involvedPerson.length != 0 && (
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.involvedPersonContainertext}>
                      Involved Person:{' '}
                    </Text>
                    <Text style={styles.involvedPersonText}>
                      {this.state.involvedPerson.length > 1 ? (
                        <>
                          {this.state.isCounterInvolved ? (
                            <View style={{flexDirection: 'column'}}>
                              {this.state.involvedPerson.map((d) => (
                                <Text style={{flexDirection: 'column'}}>
                                  {d.name}
                                </Text>
                              ))}
                            </View>
                          ) : (
                            <Text>
                              {' '}
                              {this.state.involvedPerson.slice(0, 1)[0].name}
                              {'   '}
                              <TouchableOpacity
                                onPress={() =>
                                  this.setState({
                                    isCounterInvolved: !this.state
                                      .isCounterInvolved,
                                  })
                                }>
                                <Text
                                  style={{
                                    marginLeft: wp(1),
                                    fontWeight: 'bold',
                                    color: colors.primary,
                                    fontSize: wp(3),
                                  }}>
                                  {this.state.involvedPerson.length - 1} more
                                </Text>
                              </TouchableOpacity>
                            </Text>
                          )}
                        </>
                      ) : (
                        <></>
                        // this.state.involvedPerson.map((d) => d.name).join(',')
                      )}
                      {/* {this.state.involvedPerson.map((d) => d.name).join(',')} */}
                    </Text>
                  </View>
                )}
              </WalkthroughableView>
            </CopilotStep>
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
              <CopilotStep
                text="Potiential Risk (System Defined) "
                order={4}
                name="copPotientialRisk">
                <WalkthroughableView>
                  {this.state.potientialRisk == 0 ? null : (
                    <View style={styles.potentialRiskContainer}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
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
                </WalkthroughableView>
              </CopilotStep>
              {/* Actual Risk */}

              <CopilotStep text="Actual Risk " order={5} name="copActualrisk">
                <WalkthroughableView>
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
                      <View
                        style={[
                          styles.potentialRiskContainer,
                          {marginTop: wp(3)},
                        ]}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={[
                              styles.actualRiskheading,
                              {fontFamily: fonts.SFuiDisplaySemiBold},
                            ]}>
                            Actual Risk
                          </Text>
                          <Text style={styles.systemDefinedtext}>
                            (Calculated)
                          </Text>
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
                </WalkthroughableView>
              </CopilotStep>
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
                  {this.state.fiveWhytoggle == true ? (
                    <FiveWhy
                      onChangeCountributory={(e: any) =>
                        this.setState({contributoryCauses: e})
                      }
                      isViewSor={true}
                      onChangeRiskCause={(e: any) =>
                        this.setState({rootCauses: e})
                      }
                      keyFindings={(e: any) => {
                        console.log(e);

                        this.setState({keyFindings: e});
                      }}
                      keyFindingss={
                        this.props.route.params.data.justifications[0]
                          .keyFindings
                      }
                      contributoryCauses={this.state.contributoryCauses}
                      contributoryCausesD={
                        this.props.route.params.data.justifications[0]
                          .contributoryCauses
                      }
                      rootCausesD={
                        this.props.route.params.data.justifications[0]
                          .rootCauses
                      }
                      rootCauses={this.state.rootCauses}
                      data={this.state.fiveWHYdata}
                      fiveWhyQuestions={(q: Array<string>) => {
                        this.setState({fiveWhyQuestion: q});
                      }}
                      fiveWhyAnswer={(a: Array<string>) => {
                        console.log(this.state.keyFindings);
                        this.setState({fiveWhyAnswer: a});
                      }}
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

            {this.state.sor_type != 'positive' ? (
              <CopilotStep
                text="Actions and recommendations"
                order={6}
                name="copactionAndrecommendations">
                <WalkthroughableView>
                  <View style={styles.actionContainer}>
                    <Text style={styles.actionText}>
                      Action / Recommendation
                    </Text>
                    {this.props.route.params.data.action_required ==
                    undefined ? (
                      <Text style={styles.nosuchActionsAndRecommendations}>
                        No such Actions / Recommendations
                      </Text>
                    ) : (
                      <View>
                        {this.state.actionsAndRecommendations.map(
                          (d: any, i: number) => (
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

                                this.setState({
                                  actionsAndRecommendations: data,
                                });
                              }}
                              onLongPress={() => {
                                var submitto = this.props.route.params.data
                                  .submit_to;
                                var created_by = this.props.route.params.data
                                  .created_by;
                                var esclate_to = this.props.route.params.data
                                  .esclate_to;
                                // var members = this.state.submitto.concat(
                                //   this.state.assignSuppervisor,
                                // );

                                var members = [];

                                console.log(
                                  '44448372871837218371283721837128371283712837218371',
                                );
                                console.log(this.props.route.params.data);
                                members.push(
                                  this.props.route.params.data.submit_to[0],
                                );

                                members.push(
                                  this.props.route.params.data.created_by,
                                );

                                // if (this.state.user.email == d.assigned_to) {
                                this.setState({
                                  allActionsEdit: d,

                                  SuggestionPop: true,
                                  allActionsEditIndex: i,
                                  newActions: false,
                                  submitToAndObserverEmails: members,
                                });
                                // }
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
                              <View
                                style={{flexDirection: 'row', width: wp(84)}}>
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
                          var members = [];
                          members.push(
                            this.props.route.params.data.submit_to[0],
                          );

                          members.push(this.props.route.params.data.created_by);
                          this.setState({
                            allActionsEdit: {
                              is_complete: false,
                              is_selected: false,
                              content: this.state.actionsAndRecommendationText,
                              assigned_to: [],
                              date: moment().format('YYYY-MM-DD'),
                              status: 'InProgress',
                              category: 'Elimination',
                              // actionsAndRecommendationText :"",
                            },
                            submitToAndObserverEmails: members,
                            // ne
                            SuggestionPop: true,
                            newActions: true,
                          });
                        }
                      }}
                      style={styles.arrowRightActionsAndRecommendations}>
                      <Icon
                        size={wp(4)}
                        name="arrowright"
                        type="antdesign"
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                  </View>
                </WalkthroughableView>
              </CopilotStep>
            ) : null}

            {/* Attachments / Images or docs */}

            {/* Line  */}
            <View style={styles.lineheight} />
            <CopilotStep text="SOR attachments" order={7} name="copAttachments">
              <WalkthroughableView style={styles.attachmentsContainer}>
                <Text style={styles.attachmentsFont}>Attachments</Text>
                {this.state.fileLoading == true ? (
                  <View style={{alignSelf: 'center'}}>
                    <LottieView
                      autoPlay={true}
                      style={{width: wp(30)}}
                      source={animation.profileimage}
                      loop={true}
                    />
                  </View>
                ) : (
                  <View>
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
                                    onPress={() => {
                                      if (d.upload != 'self') {
                                        this.photoAnim.play();
                                        downloadFile(d.uri, d.type)
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
                            } else {
                              return (
                                <View>
                                  {d.type != 'image' ? (
                                    <View style={styles.attachFileContainer}>
                                      <View
                                        style={{
                                          width: '60%',
                                          height: '60%',
                                          alignSelf: 'center',
                                          marginTop: wp(4),
                                        }}>
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
                                          style={[GlStyles.images]}
                                          resizeMode={'contain'}
                                        />
                                      </View>
                                      <Text style={styles.attchFileText}>
                                        {d.name.substring(0, 10)}.../.{d.type}
                                      </Text>
                                      <View
                                        style={
                                          styles.attachmentDownloadContainer
                                        }>
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
                                  ) : null}
                                </View>
                              );
                            }
                          })}
                        </View>
                      </View>
                    )}
                  </View>
                )}

                {this.state.attachments.length < 6 && (
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.attachments.length < 6) {
                        this.openDoc(this.state.attachments, false);
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
                    <Text style={styles.aaddNewAttachmentText}>
                      Add New Attachments
                    </Text>
                  </TouchableOpacity>
                )}
              </WalkthroughableView>
            </CopilotStep>

            {/* Line  */}
            <View style={styles.lineheight} />
            {/* Initialize and Submitted to options */}
            <View style={styles.initializeAndSubmittedTo}>
              {/* initialize by */}
              <CopilotStep
                text="Report who is created"
                order={8}
                name="copactionAndrecommendations">
                <WalkthroughableView style={{flexDirection: 'row'}}>
                  <Text style={styles.initializeByAndSubmittedToHeading}>
                    Initiated By:
                  </Text>
                  <Text style={styles.initializeByAndSubmitedToAnswer}>
                    {this.props.route.params.data.created_by}
                  </Text>
                </WalkthroughableView>
              </CopilotStep>
              {/* submitted to */}
              <CopilotStep
                text="Report was submitted to "
                order={9}
                name="copReportWasSubmitTo">
                <WalkthroughableView
                  style={{flexDirection: 'row', marginTop: wp(2)}}>
                  <Text style={styles.initializeByAndSubmittedToHeading}>
                    Submitted To:
                  </Text>
                  <Text style={styles.initializeByAndSubmitedToAnswer}>
                    {this.state.submitted_to[0]}
                  </Text>
                </WalkthroughableView>
              </CopilotStep>
              {/* REASSIGNED to  */}
              <CopilotStep
                text="Report want to resassign someone "
                order={10}
                name="copReportReAssignedTo">
                <WalkthroughableView style={{marginTop: wp(4)}}>
                  <Text style={styles.sbBtnText}>Re-assign to </Text>
                  {this.state.reAssignToArrTags.length < 1 ? (
                    <>
                      <View style={[styles.optnselector]}>
                        <TextInput
                          onFocus={() => {
                            this.setState({
                              reAssignToArr: searchInSuggestions(
                                '',
                                this.state.involved_person,
                              ),
                            });
                          }}
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
                                  this.state.involved_person,
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
                </WalkthroughableView>
              </CopilotStep>
              {/* ESCLATED TO  */}
              <CopilotStep
                text="Esclated to report "
                order={11}
                name="copEsclatedTo">
                <WalkthroughableView>
                  <Text style={styles.sbBtnText}>Esclated to </Text>
                  <View
                    style={[
                      styles.optnselector,
                      this.state.selectedInputIndex == 5
                        ? {borderColor: colors.green}
                        : null,
                    ]}>
                    <TextInput
                      onFocus={() =>
                        this.setState({
                          selectedInputIndex: 5,
                          exclateToArr: searchInSuggestions(
                            '',
                            this.state.involved_person,
                          ),
                        })
                      }
                      underlineColorAndroid="transparent"
                      onChangeText={(v: any) => {
                        if (v === '') {
                          this.setState({esclateTo: v, exclateToArr: []});
                        } else {
                          this.setState({
                            exclateToArr: searchInSuggestions(
                              v.toLowerCase(),
                              this.state.involved_person,
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
                                this.setState({
                                  esclateTo: '',
                                  exclateToArr: this.state.exclateToArr.filter(
                                    (item: any) => {
                                      return item !== d;
                                    },
                                  ),
                                });
                                if (
                                  this.state.exclateToArr.filter(
                                    (v: involved_persons) => v == d,
                                  ).length != 0
                                ) {
                                  console.log(d);
                                  // console.log(this.state.esclate_to);
                                  this.state.esclate_to.push(d.email);
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
                      type={'esclatedTotags'}
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
                </WalkthroughableView>
              </CopilotStep>
              {/* Repeated sors */}

              {this.state.repeatedSors.length != 0 && (
                <View>
                  <Text
                    style={{
                      fontSize: wp(3.7),
                      marginBottom: wp(3),
                      fontFamily: fonts.SFuiDisplayBold,
                    }}>
                    Similar Observations
                  </Text>

                  {this.state.repeatedSors.slice(0, 3).map((d, i) => (
                    <View style={{marginBottom: wp(3), alignSelf: 'center'}}>
                      <Card
                        key={i}
                        // type={'all'}
                        data={d}
                        onPress={(d: actionsDashboard) =>
                          this.props.navigation.navigate('ViewSOR', {
                            data: d,
                          })
                        }
                        name={d.created_by}
                        date={d.occurred_on}
                        risk={d.risk.severity * d.risk.likelihood}
                        viewPortWidth={80}
                        observation={d.details}
                        classify={d.sor_type}
                        iconConf={classifySor.find(
                          (e: any) => e.title == d.sor_type,
                        )}
                        location={d.location}
                        style={{width: wp(80)}}
                        user1={d.user1}
                        user2={d.user2}
                      />
                    </View>
                  ))}
                </View>
              )}
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
            <CopilotStep
              text="Comments of the report "
              order={12}
              name="copComments">
              <WalkthroughableView style={styles.commentsSections}>
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
                      {d.files.length != 0 ? (
                        <ScrollView
                          style={{marginBottom: wp(3), marginLeft: wp(8)}}
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}>
                          {d.files.map((f: any, i: number) => (
                            <View
                              style={[
                                styles.AttchimageContainer,
                                {
                                  backgroundColor: colors.secondary,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                },
                              ]}>
                              {f.type == 'image' ? (
                                <Image
                                  source={{
                                    uri: f.uri,
                                  }}
                                  style={[
                                    GlStyles.images,
                                    {borderRadius: wp(5)},
                                  ]}
                                  resizeMode={'cover'}
                                />
                              ) : (
                                <View>
                                  <Image
                                    source={
                                      f.type == 'pdf'
                                        ? images.pdf
                                        : f.type == 'doc'
                                        ? images.doc
                                        : f.type == 'text'
                                        ? images.text
                                        : f.type == 'doc'
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
                              filterLocation(e.nativeEvent.text)[0].split(
                                '@',
                              )[1],
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
                        onPress={() =>
                          this.openDoc(this.state.commentAttachment, true)
                        }
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
                  <View>
                    {this.state.commentAttachmentLoading == true ? (
                      <View style={{alignSelf: 'center'}}>
                        <LottieView
                          autoPlay={true}
                          style={{width: wp(30)}}
                          source={animation.profileimage}
                          loop={true}
                        />
                      </View>
                    ) : (
                      <>
                        <ScrollView
                          horizontal={true}
                          style={{marginLeft: wp(6.7)}}
                          showsHorizontalScrollIndicator={false}>
                          {this.state.commentAttachment.map(
                            (d: any, i: number) => (
                              <View
                                style={{
                                  marginLeft: wp(2),
                                  marginTop: wp(3),
                                  marginBottom: wp(5),
                                }}>
                                {d.type == 'image' ? (
                                  <View style={styles.AttchimageContainer}>
                                    <Image
                                      source={{
                                        uri: d.uri,
                                      }}
                                      style={[
                                        GlStyles.images,
                                        {borderRadius: wp(5)},
                                      ]}
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
                                        {d.name.split('.')[0].substring(0, 10)}
                                        ... {d.name.split('.')[1]}
                                      </Text>

                                      <TouchableOpacity
                                        onPress={() => {
                                          var arr = [
                                            ...this.state.commentAttachment,
                                          ].filter((j) => j != d);
                                          this.setState({
                                            commentAttachment: arr,
                                          });
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
                            ),
                          )}
                        </ScrollView>
                      </>
                    )}
                  </View>
                ) : (
                  <View style={{marginLeft: wp(5)}}>
                    <Text style={[styles.attchFileText]}>
                      Uploaded files will be appear here .
                    </Text>
                  </View>
                )}
              </WalkthroughableView>
            </CopilotStep>

            {this.state.allBtnsEnabled ? (
              <>
                {/* Submit btns  */}
                <View style={styles.saveAsDraftAndSubmitBtns}>
                  {!this.state.closed && (
                    <TouchableOpacity
                      onPress={() => {
                        console.log('submit');
                        if (this.state.fiveWhytoggle == true) {
                          console.log('line 2566');
                          console.log(this.state.fiveWhyQuestion);
                          if (this.state.fiveWhyQuestion.length == 5) {
                            this.onSubmitUpdateSor(1);
                            console.log('line 2570');
                          } else {
                            console.log('line 2572');
                            this.setState({
                              errorModal: true,
                              errHeadingText: 'Minimum 5 why ',
                              errDesText: 'minimum 5 why should be added..!',
                            });
                          }
                        } else {
                          console.log('line 2580');
                          this.onSubmitUpdateSor(1);
                        }
                      }}
                      style={styles.saveAsDraftContainer}>
                      <Text style={styles.saveAsDraftText}>Save as Draft</Text>
                    </TouchableOpacity>
                  )}
                  {this.state.closed == false && (
                    <TouchableOpacity
                      onPress={() => {
                        if (this.state.fiveWhytoggle == true) {
                          if (this.state.fiveWhyQuestion.length == 5) {
                            this.onSubmitUpdateSor(2);
                          } else {
                            this.setState({
                              errorModal: true,
                              errHeadingText: 'Minimum 5 why ',
                              errDesText: 'minimum 5 why should be added..!',
                            });
                          }
                        } else {
                          this.onSubmitUpdateSor(2);
                        }
                      }}
                      style={styles.saveAsSubmitContainer}>
                      <Text style={styles.saveAsSubmitText}>Submit</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={styles.previewAndMarkAsCompleteBtns}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Preview', {
                        data: this.props.route.params.data,
                      })
                    }
                    style={styles.saveAsDraftContainer}>
                    <Text style={styles.saveAsDraftText}>Preview</Text>
                  </TouchableOpacity>

                  {this.state.closed == false && (
                    <TouchableOpacity
                      onPress={() => {
                        AsyncStorage.getItem('email').then((email) => {
                          // console.log('')
                          // console.log(
                          //   this.props.route.params.data.action_required,
                          // );

                          if (
                            this.state.actionsAndRecommendations.map(
                              (d: any) => d.status == 'In Progress',
                            ).length != 0
                          ) {
                            // Some validations is left

                            if (
                              this.state.actionsAndRecommendations.filter(
                                (d: any) => d.justification.content !== '',
                              )
                            ) {
                              this.setState({
                                // loading: true,
                                errorModal: true,
                                errHeadingText: 'Actions validations ',
                                errDesText: 'Add the justification',
                              });
                            } else {
                              this.setState({
                                // loading: true,
                                errorModal: true,
                                errHeadingText: 'Actions validations ',
                                errDesText:
                                  'Actions should be completed or rejected',
                              });
                            }
                          } else {
                            if (
                              email == this.props.route.params.data.created_by
                            ) {
                              if (this.state.fiveWhytoggle == true) {
                                if (this.state.fiveWhyQuestion.length == 5) {
                                  this.onSubmitUpdateSor(5);
                                } else {
                                  this.setState({
                                    errorModal: true,
                                    errHeadingText: 'Minimum 5 why ',
                                    errDesText:
                                      'minimum 5 why should be added..!',
                                  });
                                }
                              } else {
                                this.onSubmitUpdateSor(5);
                              }
                            } else {
                              if (this.state.fiveWhytoggle == true) {
                                if (this.state.fiveWhyQuestion.length == 5) {
                                  this.onSubmitUpdateSor(3);
                                } else {
                                  this.setState({
                                    errorModal: true,
                                    errHeadingText: 'Minimum 5 why ',
                                    errDesText:
                                      'minimum 5 why should be added..!',
                                  });
                                }
                              } else {
                                this.onSubmitUpdateSor(3);
                              }
                            }
                          }

                          // this.props.route.params.data.action_required.filter(
                          //   (d) => d.justification.content === '',
                          // );
                        });
                      }}
                      style={[
                        styles.saveAsSubmitContainer,
                        {backgroundColor: colors.green},
                      ]}>
                      <Text style={[styles.saveAsSubmitText]}>
                        Mark as Complete
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </>
            ) : null}
          </Animated.View>
        </ScrollView>

        {/* Edit Assigners modal */}
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
        {/* Edit Involved and Submitted to Users  */}

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

        {/* Image Viewer Modal */}
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
        {/*
         *
         * @ Edit Actions and Recommendations :Options *
         * desc: Acrions popup that allow us to edit or delete actions
         */}
        {this.state.SuggestionPop == true && (
          <SuggestionsPop
            suggestedUsers={this.state.involved_person}
            onClose={() =>
              this.setState({SuggestionPop: !this.state.SuggestionPop})
            }
            newAct={this.state.newActions}
            currentUser={this.state.user}
            allSuggestions={this.state.actionsAndRecommendations}
            submitToAndObserverEmails={this.state.submitToAndObserverEmails}
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
          openDoc={() => this.openDoc(this.state.editAttachedCommentArr, false)}
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

        {/* {this.state.loading ? ( */}
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
        {/* ) : null} */}
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
var copViewSor = copilot({
  // style: {}
  verticalOffset: 24,
  animated: true,
  overlay: 'svg',
})(ViewSOR);
export default connect(mapStateToProps, mapDispatchToProps)(copViewSor);

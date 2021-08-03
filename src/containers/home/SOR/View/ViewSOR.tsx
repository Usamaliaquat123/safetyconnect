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
  filterAndMappingPersons,
  downloadFile,
  filterLocation,
  getSorData,
  fileuploader,
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
      sor: {},
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
      allBtnsEnabled: true,
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
      repeatedSors: [],
      fiveWHYdata: [],
      countributoryCauses: '',
      countributoryCausesD: '',
      rootCauses: '',
      keyFindingss: '',
      keyFindings: '',
      rootCausesD: '',
      // Reassign to
      reAssignToArr: [],
      exclateToTags: [],
      reAssignToArrTags: [],
      projectName: '',
      commentMentionReplace: '',
      projectId: '',
      excludingSubmitCreatedByUsers: [],
    };

    this.animation = React.createRef();
    this.photoAnim = React.createRef();

    this.fileNotSupported = React.createRef();
  }

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

      this.setState({
        countributoryCauses: this.props.route.params.data.justifications[0]
          .contributoryCauses,
        rootCauses: this.props.route.params.data.justifications[0].rootCauses,
        keyFindingss: this.props.route.params.data.justifications[0]
          .keyFindings,
      });

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
        },
        repeatedSor: this.props.route.params.data.repeatedSor,
        justification: this.props.route.params.data.justification,
        action_required: this.state.actionsAndRecommendations /** done */,
        location: this.props.route.params.data.location /** done */,
        submit_to:
          this.state.reAssignToArrTags.lendgth == 0
            ? this.state.submitted_to
            : this.state.reAssignToArrTags.map((d) => d.email) /** done */,
        escalate_to: this.state.esclate_to,
        // this.state.reAssignToArrTags.length == 0
        // : this.state.reAssignToArrTags.map((d: any) => d.email) /** done */,
        status: this.state.esclate_to.length == 0 ? status : 3 /** done */,
        attachments: this.state.attachments.map((d) => d.name) /** done */,
        comments: this.props.route.params.data.comments /** done */,
        updatedAt: Date.now() /** done */,
      },
      project: this.state.projectId,
      updated_by: this.state.user,
    };

    createApi
      .createApi()
      .updateSor(update)
      .then((res) => {
        this.setState({loading: false, errorModal: false});
        if (res.status == 200) {
          // add five why
          if (this.state.fiveWhytoggle == true) {
            // if five is not added previosly

            if (this.props.route.params.data.justifications.length == 0) {
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

              createApi
                .createApi()
                .createFiveWhy(obj)
                .then((res: any) => {
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
                id: this.props.route.params.data.justification,
                justification: {
                  question: this.state.fiveWhyQuestion,
                  answer: this.state.fiveWhyAnswer,
                },

                contributoryCauses: [{category: 'sds', subCategory: ['sdsd']}],
                rootCauses: [{category: 'sds', subCategory: ['sdsd']}],
              };

              createApi
                .createApi()
                .editFiveWhy(updatefiveWhy)
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

          createApi
            .createApi()
            .getPublicPhotos(dta)
            .then((imgUrl: any) => {
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
        this.setState({});

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
        this.setState({fileLoading: true});

        fileuploader(
          res.orgType,
          res.type == 'doc' || res.type == 'docx'
            ? res.orgType
            : res.orgType.split('/')[1],
          res.uri,
        ).then((filename: any) => {
          imgData['name'] = filename;

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

          this.setState({});
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
        <Text>asdsd</Text>
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

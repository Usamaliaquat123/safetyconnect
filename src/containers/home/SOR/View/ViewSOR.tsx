import React, {useState, useEffect, useRef} from 'react';

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
  getCurrentOrganization,
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

const ViewSOR = (props: ViewSORProps) => {
  const [sor, setSor] = useState({});
  const [user, setuser] = useState({});
  const [time, settime] = useState(props.route.params.data.occurred_at);
  const [imageViewer, setimageViewer] = useState(false);
  const [images, setimages] = useState([]);
  const [photoArr, setphotoArr] = useState([]);
  const [selectedInput, setselectedInput] = useState(0);
  const [commentText, setcommentText] = useState('');
  const [sor_type, setsor_type] = useState(props.route.params.data.sor_type);
  const [observation, setobservation] = useState(
    props.route.params.data.details,
  );
  const [date, setdate] = useState(props.route.params.data.occurred_at);

  const [submitToAndObserverEmails, setsubmitToAndObserverEmails] = useState();
  const [comments, setcomments] = useState([]);
  const [suggestedUsers, setsuggestedUsers] = useState([]);
  const [involvedPerson, setinvolvedPerson] = useState([]);
  const [notifiedPerson, setnotifiedPerson] = useState([]);
  const [commentsSugg, setcommentsSugg] = useState([]);
  const [attachments, setattachments] = useState([]);
  const [allBtnsEnabled, setallBtnsEnabled] = useState(true);
  const [errDesText, seterrDesText] = useState('');
  const [actionsAndRecommendations, setactionsAndRecommendations] = useState(
    props.route.params.data.action_required,
  );
  const [addAssigners, setaddAssigners] = useState(false);
  const [isMarkAsComplete, setisMarkAsComplete] = useState(false);

  const [
    involveAndNotifiedUsersName,
    setinvolveAndNotifiedUsersName,
  ] = useState('');
  const [IsaddInvAndNotifiedUser, setIsaddInvAndNotifiedUser] = useState(false);
  const [
    involvedAndNotifiedUserType,
    setinvolvedAndNotifiedUserType,
  ] = useState('involved');
  const [fileloading, setfileloading] = useState(false);
  const [commentAttachment, setcommentAttachment] = useState([]);
  const [
    addInvolvedandNotifiedUsers,
    setaddInvolvedandNotifiedUsers,
  ] = useState([]);
  const [errorModal, seterrorModal] = useState(false);
  const [selectedRisk, setselectedRisk] = useState(true);
  const [liklihood, setliklihood] = useState(riskxSeverityxliklihood.liklihood);
  const [severity, setseverity] = useState(riskxSeverityxliklihood.severity);
  const [invPhoto, setinvPhoto] = useState('');
  const [notifiedAndInv, setnotifiedAndInv] = useState(0);

  const [errHeadingText, seterrHeadingText] = useState('');

  const [editDelComment, seteditDelComment] = useState(false);
  const [editAttachedCommentArr, seteditAttachedCommentArr] = useState([]);
  const [EditcommentText, setEditcommentText] = useState('');
  const [editDiscardComment, seteditDiscardComment] = useState('');
  const [editDiscardCommentIndex, seteditDiscardCommentIndex] = useState(0);
  const [selectedInputIndex, setselectedInputIndex] = useState();
  const [SuggestionPop, setSuggestionPop] = useState(false);
  const [allActionsEdit, setallActionsEdit] = useState([]);
  const [newActions, setnewActions] = useState(false);
  const [reassignToText, setreassignToText] = useState('');
  const [allActionsEditIndex, setallActionsEditIndex] = useState(0);
  const [
    actionsAndRecommendationText,
    setactionsAndRecommendationText,
  ] = useState('');
  const [submitted_to, setsubmitted_to] = useState(
    props.route.params.data.submit_to,
  );

  const [esclate_to, setesclate_to] = useState([]);
  const [
    editInvolvedAndEsclatedPersons,
    seteditInvolvedAndEsclatedPersons,
  ] = useState(false);
  const [involvePersonsSelected, setinvolvePersonsSelected] = useState(false);
  const [loading, setloading] = useState(false);
  const [AllUsers, setAllUsers] = useState([]);

  const [isCounterInvolved, setisCounterInvolved] = useState(false);
  const [fiveWhytoggle, setfiveWhytoggle] = useState(false);
  const [reportIdInvestigation, setreportIdInvestigation] = useState('');
  const [fiveWhyKeyFindings, setfiveWhyKeyFindings] = useState('');
  const [fiveWhyKeyrootCauses, setfiveWhyKeyrootCauses] = useState([]);
  const [
    fiveWhyKeycontributoryCauses,
    setfiveWhyKeycontributoryCauses,
  ] = useState([]);
  const [potientialRisk, setpotientialRisk] = useState(9);

  const [exclateToArr, setexclateToArr] = useState([]);
  const [fiveWhyQuestion, setfiveWhyQuestion] = useState([]);
  const [fiveWhyAnswer, setfiveWhyAnswer] = useState([]);
  const [repeatedSors, setrepeatedSors] = useState([]);
  const [fiveWHYdata, setfiveWHYdata] = useState([]);
  const [contributoryCauses, setcontributoryCauses] = useState('');

  const [rootCauses, setrootCauses] = useState('');
  const [keyFindingss, setkeyFindingss] = useState('');
  const [keyFindings, setkeyFindings] = useState('');
  const [commentAttachmentLoading, setcommentAttachmentLoading] = useState(
    false,
  );
  const [reAssignToArr, setreAssignToArr] = useState([]);

  const [exclateToTags, setexclateToTags] = useState([]);
  const [reAssignToArrTags, setreAssignToArrTags] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [commenFileLoading, setcommenFileLoading] = useState(true);
  const [orgId, setorgId] = useState('');
  const [commentMentionReplace, setcommentMentionReplace] = useState('');
  const [projectId, setprojectId] = useState('');
  const [closed, setclosed] = useState(false);
  const [
    excludingSubmitCreatedByUsers,
    setexcludingSubmitCreatedByUsers,
  ] = useState([]);

  //   const animation = useRef();
  //   const photoAnim = useRef();
  //   const fileNotSupported = useRef();
  useEffect(() => {
    // this.props.start(false, this.scrollView);
    if (props.route.params.data.esclate_to != undefined) {
      setesclate_to(props.route.params.data.esclate_to);
    }
    // var excludingSubmitCreatedByUsers = [];

    setpotientialRisk(
      props.route.params.data.potential_risk.likelihood *
        props.route.params.data.potential_risk.severity,
    );

    if (
      props.route.params.data.submit_to[0] == user.email &&
      props.route.params.data.created_by == user.email
    ) {
      setclosed(true);
    } else {
      setclosed(false);
    }

    getCurrentOrganization().then((orgId) => setorgId(orgId));

    getCurrentProject().then((currentProj: any) => {
      setprojectId(currentProj);
      getAllRepeatedSors(props.route.params.data.repeatedSor, currentProj);

      // New Involved usersSuggestions
      props.route.params.data.involved_persons.map((d: any) => {
        createApi
          .createApi()
          .getUser(d)
          .then((res: any) => {
            involvedPerson.push({
              name: res.data.data.name,
              img_url: res.data.data.img_url,
              email: res.data.data.email,
            });
          });
      });

      // Old involved person idea

      AsyncStorage.getItem('email').then((email: any) => {
        createApi
          .createApi()
          .getUser(email)
          .then((user: any) => {
            createApi
              .createApi()
              .getProject(currentProj, user.data.data._id)
              .then((res: any) => {
                setProjectName(res.data.data.project_name);
                setinvolvedPerson(res.data.data.involved_persons);
              })
              .catch((err) => {});
          });
      });
    });

    // Get user and save it on state
    AsyncStorage.getItem('email').then((email: any) => {
      createApi
        .createApi()
        .getUser(email)
        .then((user: any) => {
          setuser(user.data.data);

          if (user.email == props.route.params.data.created_by) {
            setisMarkAsComplete(true);
          } else if (user.email == props.route.params.data.submit_to[0]) {
            setisMarkAsComplete(true);
          } else {
            setisMarkAsComplete(false);
          }
        });
    });

    getFiveWHY();
    mappingMapping(
      props.route.params.data.risk.severity,
      props.route.params.data.risk.likelihood,
    );
    getAllComments();
    // this.props.route.params.data.action_required
    for (let i = 0; i < props.route.params.data.action_required.length; i++) {
      props.route.params.data.action_required[i]['date'] = moment(
        props.route.params.data.action_required[i].date,
      ).format('YYYY-MM-DD');
    }

    props.route.params.data.action_required.forEach((v) => delete v.default);

    fileAndImageCapturer(props.route.params.data.attachments, false);
    mapViewSorPhoto();
    mappingMapping(
      props.route.params.data.risk.severity,
      props.route.params.data.risk.likelihood,
    );
  }, []);

  // FIVE WHY
  const getFiveWHY = () => {
    // Question map and them push

    console.log('props.route.params.data.justification');
    console.log(props.route.params.data.justification);

    // if (this.props.route.params.data.justification != null) {
    createApi
      .createApi()
      .getFiveWhy(props.route.params.data.justification)
      .then((res: any) => {
        if (res.data.success) {
          console.log('Five why data');
          console.log(res.data.data);
          res.data.data.justification.question.map((d, i) => {
            fiveWHYdata.push({question: d});
          });
          //   // Answer map and then push
          res.data.data.justification.answer.map((d, i) => {
            fiveWHYdata[i]['answer'] = d;
          });

          var just = [];

          props.route.params.data.justification = [];
          // this.props.route.params.data.justification.push({});
          props.route.params.data.justification.push({
            justification: res.data.data.justification,
            keyFindings: res.data.data.keyFindings,
            rootCauses: res.data.data.rootCauses,
            contributoryCauses: res.data.data.contributoryCauses,
            // date : res.data.data.date,
          });

          setfiveWhyQuestion(res.data.data.justification.question);
          setfiveWhyAnswer(res.data.data.justification.answer);
          setfiveWhyKeyFindings(res.data.data.keyFindings);
          setfiveWhyKeyrootCauses(res.data.data.rootCauses);
          setfiveWhyKeycontributoryCauses(res.data.data.contributoryCauses);
          setfiveWhytoggle(true);
        } else {
          setfiveWhytoggle(false);
        }
      });
    // } else {
    // console.log('asdjaskdajskdasjkdsajkdajskjskd');
    // this.setState({fiveWhytoggle: false});
    // }
  };

  // get alll repeated sors
  const getAllRepeatedSors = async (e: any, projectid: any) => {
    var data = [];
    var iteration = e.length;

    for (let i = 0; i < e.length; i++) {
      const {data}: any = await createApi.createApi().getSors(projectid, e[i]);
      const {data: res} = data;

      console.log('props.route.params.data');
      console.log(props.route.params.data);
      setrepeatedSors((prevState: any) => {
        // console.log('prevState state hahdadhja on line 363');
        console.log(prevState);
        // return {...prevState.repeatedSors.concat(res.report[0])};
      });
    }
  };

  const mappingMapping = (sev: number, lik: number) => {
    liklihood.map((d: any, i: number) => {
      if (sev == d.value) {
        d.selected = true;
      } else {
        d.selected = false;
      }
    });
    severity.map((d: any, i: number) => {
      if (lik == d.value) {
        d.selected = true;
      } else {
        d.selected = false;
      }
    });
    // this.setState({});
  };

  // get all comments
  const getAllComments = () => {
    // this.props.route.params.data.comments;

    createApi
      .createApi()
      .getAllComents(
        props.route.params.data.comments,
        props.route.params.data._id,
      )
      .then((res: any) => {
        // AsyncStorage.getItem('involved_person').then((involveppl: any) => {
        // var involvedPersonss = JSON.parse(involveppl);

        const sortedActivities = res.data.data.all_comments.sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        );

        setcomments(sortedActivities);
        // this.setState({});
        // this.openDoc();

        comments.map((comment: any, i: number) => {
          console.log('comment hai ye');
          console.log(comment);
          createApi
            .createApi()
            .getUser(comment.user.email)
            .then((res: any) => {
              comments[i].user['name'] = res.data.data.name;
            });
        });

        // this.fileAndImageCapturer(d.files, true);
        getFilesOfComments(comments);
      });
    // })
    // .catch((err) => {});
  };

  // get all comments of files
  const getFilesOfComments = (comments: Array<any>) => {
    comments.map((attach: any) => {
      if (attach.files.length != 0) {
        var attchf = attach.files;
        attach = attach.files;
        var dta = attach.map((d: any) => `report/${d}`);
        var data = {
          bucket: 'hns-codist',
          report: dta,
        };

        createApi
          .createApi()
          .getFileApi(data)
          .then((d: any) => {
            for (let i = 0; i < d.data.length; i++) {
              var index = d.data[i].split('?')[0].split('/').length - 1;

              var name = d.data[i].split('?')[0].split('/')[index];
              if (
                attach[i].split('.')[1] == 'png' ||
                attach[i].split('.')[1] == 'jpeg' ||
                attach[i].split('.')[1] == 'jpg'
              ) {
                attach[i] = {};
                attach[i]['type'] = 'image';
                attach[i]['upload'] = '';
                attach[i]['name'] = name;
                attach[i]['uri'] = d.data[i];
              } else if (attach[i].split('.')[1] == 'pdf') {
                attach[i] = {};
                attach[i]['type'] = 'pdf';
                attach[i]['upload'] = '';
                attach[i]['name'] = name;
                attach[i]['uri'] = d.data[i];
              } else if (
                attach[i].split('.')[1] == 'docx' ||
                attach[i].split('.')[1] == 'doc'
              ) {
                attach[i] = {};
                attach[i]['type'] = 'doc';
                attach[i]['upload'] = '';
                attach[i]['name'] = name;
                attach[i]['uri'] = d.data[i];
              } else if (attach[i].split('.')[1] == 'xlsx') {
                attach[i] = {};
                attach[i]['type'] = 'xlsx';
                attach[i]['upload'] = '';
                attach[i]['name'] = name;
                attach[i]['uri'] = d.data[i];
              }
            }
          });
      }
    });
  };

  //

  // onsubmit update sor
  const onSubmitUpdateSor = async (status?: number) => {
    setloading(true);
    seterrorModal(true);

    if (sor_type === 'positive') {
      var liklihood = liklihood.filter((d: any) => d.selected == true)[0].value;
      var severity = severity.filter((d: any) => d.selected == true)[0].value;
    }

    var update = {
      report: {
        _id: props.route.params.data._id /** done  */,
        created_by: props.route.params.data.created_by /** done */,
        sor_type: sor_type,
        details: observation /** done */,
        createdAt: Date.now() /** done */,
        occurred_at: Date.now() /** done */,
        involved_persons: props.route.params.data.involved_persons /** done */,
        risk: {
          severity: sor_type == 'positive' ? severity : 0,
          likelihood: sor_type == 'positive' ? liklihood : 0,
          category:
            sor_type === 'positive'
              ? severity * liklihood < 3
                ? `low`
                : severity * liklihood < 14
                ? `medium`
                : 'high'
              : 'low',
        },
        repeatedSor: props.route.params.data.repeatedSor,
        justification: props.route.params.data.justification,
        action_required: actionsAndRecommendations /** done */,
        location: props.route.params.data.location /** done */,
        submit_to:
          reAssignToArrTags.length == 0
            ? submitted_to
            : reAssignToArrTags.map((d) => d.email) /** done */,
        escalate_to: esclate_to,
        // this.state.reAssignToArrTags.length == 0
        // : this.state.reAssignToArrTags.map((d: any) => d.email) /** done */,
        // status: this.state.esclate_to.length == 0 ? status : 3 /** done */,
        attachments: attachments.map((d) => d.name) /** done */,
        comments: props.route.params.data.comments /** done */,
        status: esclate_to.length == 0 ? status : 3,
        updatedAt: Date.now() /** done */,
      },
      project: projectId,
      // user:
      updated_by: {
        email: user.email,
        _id: user._id,
      },
    };

    if (fiveWhytoggle == true) {
      var obj = {
        justification: {
          question: fiveWhyQuestion,
          answer: fiveWhyAnswer,
        },
        keyFindings: fiveWhyKeyFindings,
        contributoryCauses: fiveWhyKeycontributoryCauses,

        rootCauses: fiveWhyKeyrootCauses,
        project: projectId,
        report: props.route.params.data._id,
        user: user._id,
        date: moment().format('MM-DD-YYYY'),
      };

      console.log(obj);
      createApi
        .createApi()
        .createFiveWhy(obj)
        .then((res: any) => {
          console.log(res.data);

          update['report']['justification'] = res.data.data._id;
          createApi
            .createApi()
            .updateSor(update)
            .then((res) => {
              if (res.status == 200) {
                setloading(false);
                seterrorModal(false);
                setTimeout(() => {
                  showMessage({
                    message: 'SOR Report is sucessfully updated',
                    type: 'success',
                    position: 'bottom',
                  });
                }, 1000);
                props.navigation.goBack();
              }
            });
        });

      console.log(update);
    } else {
      createApi
        .createApi()
        .updateSor(update)
        .then((res) => {
          if (res.status == 200) {
            setloading(false);
            seterrorModal(false);
            setTimeout(() => {
              showMessage({
                message: 'SOR Report is sucessfully updated',
                type: 'success',
                position: 'bottom',
              });
            }, 1000);
            props.navigation.goBack();
          }
        });
    }
  };

  // delete comment through commentId
  const deleteComment = (comment: any) => {
    createApi
      .createApi()
      .delComment(comment[0]._id, props.route.params.data.comments)
      .then((res) => {
        if (res.status == 200) {
          comments.splice(editDiscardCommentIndex, 1);
          seteditDelComment(false);
        }
      })
      .catch((err) => {});
  };

  // Add edit comment
  const editComment = (comment: any) => {
    var data = {
      data: {
        email: comment.user.email,
        comment: comment.comment,
        date: moment().format('YYYY-MM-DD'),
        files: comment.attachments,
        is_comment: true,
      },
      comment_id: comment._id,
      comment_document_id: props.route.params.data.comments,
    };
    createApi
      .createApi()
      .editComment(data)
      .then((res) => {})
      .catch((err) => {});
  };

  //
  const mapViewSorPhoto = () => {
    View_sor.user.Attachments.map((d, i) => {
      if (d.type == 'photo') {
        images.push({url: d.url});
      }
    });
  };

  // Add Comment
  const addComment = (comment: string, attachment: any) => {
    setcommentText('');
    setcommentAttachment([]);
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
            comment_document_id: props.route.params.data.comments,
          };

          // this.state.commentAttachment

          createApi
            .createApi()
            .createComment(comments)
            .then((res: any) => {
              var map = [...comments];
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

              setcomments(map);
            });
        });
    });
  };

  // file and image capturee
  const fileAndImageCapturer = (attach: Array<string>, comments: boolean) => {
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
            attachments.push({
              type: 'image',
              upload: '',
              name: attach[i],
              uri: d.data[i],
            });
          } else if (attach[i].split('.')[1] == 'pdf') {
            attachments.push({
              type: 'pdf',
              upload: '',
              name: attach[i],
              uri: d.data[i],
            });
          } else if (
            attach[i].split('.')[1] == 'docx' ||
            attach[i].split('.')[1] == 'doc'
          ) {
            attachments.push({
              type: 'doc',
              upload: '',
              name: attach[i],
              uri: d.data[i],
            });
          } else if (attach[i].split('.')[1] == 'xlsx') {
            attachments.push({
              type: 'xlsx',
              upload: '',
              name: attach[i],
              uri: d.data[i],
            });
          }
        }
      });
  };

  // Document Attachments
  const openDoc = async (attach: Array<Object>, commentAttach? = false) => {
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
        if (commentAttach == true) {
          setcommentAttachmentLoading(true);
        } else {
          setfileloading(true);
        }

        fileuploader(res.orgType, res.orgType, res.uri, orgId).then(
          (filename: any) => {
            imgData['name'] = filename;
            if (commentAttach == true) {
              setcommentAttachmentLoading(false);
            } else {
              setfileloading(false);
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
          },
        );
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  return (
    <Animated.View style={[styles.container]}>
      <ScrollView
        // ref={(ref) => (scrollView = ref)}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headertle}>
            <Icon
              onPress={() => props.navigation.goBack()}
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
                    {sor_type != 'lsr' ? (
                      <View>
                        {sor_type != 'near miss' ? (
                          <Icon
                            size={wp(3)}
                            name={
                              sor_type == 'lsr'
                                ? 'aperture'
                                : sor_type == 'positive'
                                ? 'check-circle'
                                : sor_type == 'concern'
                                ? 'warning'
                                : sor_type == 'near miss'
                                ? 'centercode'
                                : 'frowno'
                            }
                            type={
                              sor_type == 'lsr'
                                ? 'ionicon'
                                : sor_type == 'positive'
                                ? 'font-awesome-5'
                                : sor_type == 'concern'
                                ? 'antdesign'
                                : sor_type == 'near miss'
                                ? 'font-awesome-5'
                                : 'antdesign'
                            }
                            color={
                              sor_type == 'lsr'
                                ? colors.classify_sor_btns.lsr
                                : sor_type == 'positive'
                                ? colors.classify_sor_btns.positive
                                : sor_type == 'concern'
                                ? colors.classify_sor_btns.concern
                                : sor_type == 'near miss'
                                ? colors.classify_sor_btns.nearmiss
                                : 'frowno'
                            }
                          />
                        ) : null}
                      </View>
                    ) : null}

                    {sor_type == 'lsr' ? (
                      <View style={{width: wp(7), height: wp(7)}}>
                        <Image
                          source={images.lsr}
                          style={[GlStyles.images, {tintColor: colors.text}]}
                        />
                      </View>
                    ) : null}
                    {sor_type == 'near miss' ? (
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
                        sor_type == 'lsr'
                          ? {color: colors.classify_sor_btns.lsr}
                          : sor_type == 'positive'
                          ? {color: colors.classify_sor_btns.positive}
                          : sor_type == 'concern'
                          ? {color: colors.classify_sor_btns.concern}
                          : sor_type == 'near miss'
                          ? {color: colors.classify_sor_btns.nearmiss}
                          : null,
                      ]}>
                      {capitalizeFirstLetter(sor_type)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Reported on  */}
              <View style={styles.reportedOnContainer}>
                <Text style={styles.reportedOnText}>Reported on:</Text>
                <Text style={styles.reportedOnAns}>
                  {moment(time).format('MMM DD, YYYY LT')}
                </Text>
              </View>
              {/* Project */}
              <View style={styles.projectContainer}>
                <Text style={styles.projectText}>Project:</Text>
                <Text style={styles.projectAns}>{projectName}</Text>
              </View>
              {/* Location */}
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>Location:</Text>
                <Text style={styles.locationAns}>
                  {props.route.params.data.location}
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
                On {moment(time).format('MMM DD, YYYY')} at{' '}
                {moment(time).format('LT')}
              </Text>
              <Text style={[styles.observationDate, {fontSize: wp(2.8)}]}>
                It was observed that
              </Text>
              <View>
                <TextInput
                  multiline={true}
                  value={observation}
                  onChange={(e) => {
                    setobservation(e.nativeEvent.text);
                    settime(Date.now());
                  }}
                  style={styles.observationText}
                />
              </View>
              {involvedPerson.length != 0 && (
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.involvedPersonContainertext}>
                    Involved Person:{' '}
                  </Text>
                  <Text style={styles.involvedPersonText}>
                    {involvedPerson.length > 1 ? (
                      <>
                        {isCounterInvolved ? (
                          <View style={{flexDirection: 'column'}}>
                            {involvedPerson.map((d) => (
                              <Text style={{flexDirection: 'column'}}>
                                {d.name}
                              </Text>
                            ))}
                          </View>
                        ) : (
                          <Text
                            style={{
                              fontSize: wp(3),
                              // marginTop: wp(-10),
                              fontFamily: fonts.SFuiDisplayMedium,
                            }}>
                            {involvedPerson.slice(0, 1)[0].name}
                            <TouchableOpacity
                              onPress={() => {
                                setisCounterInvolved(!isCounterInvolved);
                              }}>
                              <Text
                                style={{
                                  marginLeft: wp(1),
                                  fontWeight: 'bold',
                                  color: colors.primary,
                                  fontSize: wp(3),
                                }}>
                                {involvedPerson.length - 1} more
                              </Text>
                            </TouchableOpacity>
                          </Text>
                        )}
                      </>
                    ) : (
                      <Text>{involvedPerson.map((d: any) => d.name)}</Text>
                    )}
                  </Text>
                </View>
              )}
            </WalkthroughableView>
          </CopilotStep>
          {/* Line  */}
          {sor_type !== 'positive' && <View style={styles.lineheight} />}
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

          {sor_type !== 'positive' && (
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
                  {potientialRisk == 0 ? null : (
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
                          potientialRisk < 7
                            ? {borderColor: colors.green}
                            : potientialRisk < 14
                            ? {borderColor: colors.riskIcons.orrange}
                            : {borderColor: colors.error},
                        ]}>
                        <Text
                          style={[
                            styles.potentialRiskBadgeContainerText,
                            potientialRisk < 7
                              ? {color: colors.green}
                              : potientialRisk < 14
                              ? {color: colors.riskIcons.orrange}
                              : {color: colors.error},
                          ]}>
                          {potientialRisk}-{' '}
                          {potientialRisk < 7
                            ? 'Low'
                            : potientialRisk < 14
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
                  {selectedRisk == false ? (
                    <View>
                      <Chart
                        liklihood={liklihood}
                        severity={severity}
                        style={{marginTop: wp(3)}}
                        onPress={(v: object) => {}}
                      />
                    </View>
                  ) : (
                    <TouchableOpacity onPress={() => setselectedRisk(false)}>
                      <View
                        style={[
                          styles.potentialRiskContainer,
                          {marginTop: wp(3)},
                        ]}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
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
                            props.route.params.data.risk.likelihood *
                              props.route.params.data.risk.severity <
                            7
                              ? {
                                  borderColor: colors.green,
                                  backgroundColor: colors.green,
                                }
                              : props.route.params.data.risk.likelihood *
                                  props.route.params.data.risk.severity <
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
                              props.route.params.data.risk.likelihood *
                                props.route.params.data.risk.severity <
                              7
                                ? {color: colors.secondary}
                                : props.route.params.data.risk.likelihood *
                                    props.route.params.data.risk.severity <
                                  14
                                ? {color: colors.secondary}
                                : {color: colors.secondary},
                            ]}>
                            {props.route.params.data.risk.likelihood *
                              props.route.params.data.risk.severity}
                            -{' '}
                            {props.route.params.data.risk.likelihood *
                              props.route.params.data.risk.severity <
                            7
                              ? 'Low'
                              : props.route.params.data.risk.likelihood *
                                  props.route.params.data.risk.severity <
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
          )}

          {/* five WHY Questionaries */}
          {/* Line  */}
          {props.route.params.data.sor_type == 'near miss' && (
            <>
              <View style={styles.lineheight} />
              <View style={styles.fiveWhyContainer}>
                <View style={styles.fiveWhyHeadingContainer}>
                  <Text style={styles.investigationReqtext}>
                    Investigation Required
                  </Text>
                </View>
                {fiveWhytoggle == false ? (
                  <></>
                ) : (
                  <FiveWhy
                    onChangeCountributory={(e: any) =>
                      setfiveWhyKeycontributoryCauses(e)
                    }
                    isViewSor={true}
                    onChangeRiskCause={(e: any) => setfiveWhyKeyrootCauses(e)}
                    keyFindings={(e: any) => {
                      setfiveWhyKeyFindings(e);
                    }}
                    keyFindingss={fiveWhyKeyFindings}
                    contributoryCauses={contributoryCauses}
                    contributoryCausesD={fiveWhyKeycontributoryCauses}
                    rootCausesD={fiveWhyKeyrootCauses}
                    rootCauses={rootCauses}
                    data={fiveWHYdata}
                    fiveWhyQuestions={(q: Array<string>) => {
                      setfiveWhyQuestion(q);
                    }}
                    fiveWhyAnswer={(a: Array<string>) => {
                      setfiveWhyAnswer(a);
                    }}
                    reportId={reportIdInvestigation}
                    userId={user._id}
                    containerStyle={{marginTop: wp(3)}}
                  />
                )}
              </View>
            </>
          )}

          {/* Line  */}
          <View style={styles.lineheight} />
          {/* Actions / recommendations */}

          {sor_type != 'positive' ? (
            <CopilotStep
              text="Actions and recommendations"
              order={6}
              name="copactionAndrecommendations">
              <WalkthroughableView>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>Action / Recommendation</Text>
                  {props.route.params.data.action_required == undefined ? (
                    <Text style={styles.nosuchActionsAndRecommendations}>
                      No such Actions / Recommendations
                    </Text>
                  ) : (
                    <View>
                      {actionsAndRecommendations.map((d: any, i: number) => (
                        <TouchableOpacity
                          // onPress={() => {
                          //   var data = [
                          //     ...this.state.actionsAndRecommendations,
                          //   ];
                          //   if (d.is_complete == true) {
                          //     data[i].is_complete = false;
                          //   } else {
                          //     data[i].is_complete = true;
                          //   }

                          //   this.setState({
                          //     actionsAndRecommendations: data,
                          //   });
                          // }}
                          onPress={() => {
                            var submitto = props.route.params.data.submit_to;
                            var created_by = props.route.params.data.created_by;
                            var esclate_to = props.route.params.data.esclate_to;
                            // var members = this.state.submitto.concat(
                            //   this.state.assignSuppervisor,
                            // );

                            var members = [];

                            members.push(props.route.params.data.submit_to[0]);

                            members.push(props.route.params.data.created_by);
                            var data = [...actionsAndRecommendations];
                            data[i].is_complete = true;

                            // if (this.state.user.email == d.assigned_to) {
                            setallActionsEdit(d);
                            setactionsAndRecommendations(data);
                            setSuggestionPop(true);
                            setallActionsEditIndex(i);
                            setnewActions(false);
                            setsubmitToAndObserverEmails(members);

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
                      ))}
                    </View>
                  )}
                </View>

                <View
                  style={[
                    styles.addActionAndRecommendation,
                    notifiedAndInv == 3
                      ? {borderColor: colors.green}
                      : {borderColor: colors.lightGrey},
                  ]}>
                  <TextInput
                    onFocus={() => setnotifiedAndInv(3)}
                    maxLength={500}
                    onChangeText={(e) => setactionsAndRecommendationText(e)}
                    value={actionsAndRecommendationText}
                    multiline={true}
                    style={styles.textaddActionContainer}
                    placeholder={'Add action / recommendation here'}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      // this.submitActionsAndRecommendations(
                      //   this.state.actionsAndRecommendationText,
                      // );
                      if (actionsAndRecommendationText !== '') {
                        var members = [];
                        members.push(props.route.params.data.submit_to[0]);

                        members.push(props.route.params.data.created_by);
                        setallActionsEdit({
                          is_complete: true,
                          is_selected: false,
                          content: actionsAndRecommendationText,
                          assigned_to: [],
                          // actionsAndRecommendationText: '',
                          dueDate: moment().format('YYYY-MM-DD'),
                          status: 'InProgress',
                          category: 'Elimination',
                        });
                        setactionsAndRecommendationText('');
                        setsubmitToAndObserverEmails(members);
                        setSuggestionPop(true);
                        setnewActions(true);
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
              {fileloading == true ? (
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
                  {attachments.length == 0 ? (
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
                        {attachments.map((d: any, i: number) => {
                          if (d.type == 'image') {
                            return (
                              <TouchableOpacity
                                onPress={() => setimageViewer(true)}
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
                                      // this.photoAnim.play();
                                      downloadFile(d.uri, d.type)
                                        .then((res: any) => {})
                                        .catch((err) => {});
                                    }
                                  }}
                                  style={styles.lottieDownloadContainer}>
                                  <LottieView
                                    style={{width: wp(11)}}
                                    source={animation.download}
                                    loop={false}
                                  />

                                  {d.upload == 'self' ? (
                                    <TouchableOpacity
                                      style={{marginRight: wp(3)}}
                                      onPress={() => {
                                        var arr = [...attachments].filter(
                                          (b) => b != d,
                                        );
                                        setattachments(arr);
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
                                            console.log(d);
                                            // this.photoAnim.play();
                                            downloadFile(d.uri, d.type)
                                              .then((res: any) => {})
                                              .catch((err) => {});
                                          }
                                        }}>
                                        <LottieView
                                          //   ref={(animation) => {
                                          //     animation = animation;
                                          //   }}
                                          style={{width: wp(15)}}
                                          source={animation.download}
                                          loop={false}
                                        />
                                      </TouchableOpacity>

                                      {d.upload == 'self' ? (
                                        <TouchableOpacity
                                          onPress={() => {
                                            var arr = [...attachments].filter(
                                              (b) => b != d,
                                            );
                                            setattachments(arr);
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
              {props.route.params.data.closed == false && (
                <>
                  {attachments.length < 6 && (
                    <TouchableOpacity
                      onPress={() => {
                        if (attachments.length < 6) {
                          openDoc(attachments, false);
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
                </>
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
                  {props.route.params.data.created_by}
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
                  {submitted_to[0]}
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
                {reAssignToArrTags.length < 1 ? (
                  <>
                    <View style={[styles.optnselector]}>
                      <TextInput
                        onFocus={() => {
                          setreAssignToArr(
                            searchInSuggestions('', involvedPerson),
                          );
                        }}
                        underlineColorAndroid="transparent"
                        onChangeText={(v: any) => {
                          if (v === '') {
                            setreAssignToArr([]);
                            setreassignToText(v);
                          } else {
                            setreAssignToArr(
                              searchInSuggestions(
                                v.toLowerCase(),
                                involvedPerson,
                              ),
                            );
                            setreassignToText(v);
                          }
                        }}
                        placeholder={'Select or Type Name'}
                        style={styles.optnselectorText}
                        value={reassignToText}
                      />
                    </View>

                    {reAssignToArr.length != 0 ? (
                      <View>
                        <View style={styles.involveSuggestCont}>
                          {reAssignToArr.map(
                            (d: involved_persons, i: number) => (
                              <TouchableOpacity
                                key={i}
                                onPress={() => {
                                  setreassignToText('');
                                  setreAssignToArr([]);

                                  if (
                                    reAssignToArr.filter(
                                      (v: involved_persons) => v == d,
                                    ).length != 0
                                  ) {
                                    reAssignToArrTags.push(d);
                                  } else {
                                    return null;
                                  }
                                }}
                                style={[
                                  styles.involvePsuggCont,
                                  reAssignToArr.length == i + 1
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
                      setreAssignToArrTags(
                        reAssignToArrTags.filter((v: any) => v !== d),
                      );
                    }}
                    tags={reAssignToArrTags}
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
                    selectedInputIndex == 5
                      ? {borderColor: colors.green}
                      : null,
                  ]}>
                  <TextInput
                    onFocus={() => {
                      setselectedInputIndex(5);
                      setexclateToArr(searchInSuggestions('', involvedPerson));
                    }}
                    underlineColorAndroid="transparent"
                    onChangeText={(v: any) => {
                      if (v === '') {
                        setesclateTo(v);
                        setexclateToArr([]);
                      } else {
                        setexclateToArr(
                          searchInSuggestions(v.toLowerCase(), involvedPerson),
                        );
                        setesclateTo(v);
                      }
                    }}
                    placeholder={'Select or Type Name'}
                    style={styles.optnselectorText}
                    value={esclate_to}
                  />
                </View>

                {exclateToArr.length != 0 ? (
                  <View>
                    <View style={styles.involveSuggestCont}>
                      {exclateToArr.map((d: involved_persons, i: number) => (
                        <TouchableOpacity
                          key={i}
                          onPress={() => {
                            setexclateToArr(
                              exclateToArr.filter((item: any) => {
                                return item !== d;
                              }),
                            );

                            setesclate_to('');
                            if (
                              exclateToArr.filter(
                                (v: involved_persons) => v == d,
                              ).length != 0
                            ) {
                              esclate_to.push(d.email);
                            } else {
                              return null;
                            }
                          }}
                          style={[
                            styles.involvePsuggCont,
                            exclateToArr.length == i + 1
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
                            <Text style={{fontSize: 2}}>{d.email}</Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ) : null}
                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                  <Tags
                    type={'esclatedTotags'}
                    onClose={(d: any) => {
                      setesclate_to(esclate_to.filter((v: any) => v !== d));
                    }}
                    tags={esclate_to}
                  />
                </View>
              </WalkthroughableView>
            </CopilotStep>
            {/* Repeated sors */}

            {repeatedSors.length != 0 && (
              <View>
                <Text
                  style={{
                    fontSize: wp(3.7),
                    marginBottom: wp(3),
                    fontFamily: fonts.SFuiDisplayBold,
                  }}>
                  Similar Observations
                </Text>

                {repeatedSors.slice(0, 3).map((d, i) => (
                  <View style={{marginBottom: wp(3), alignSelf: 'center'}}>
                    <Card
                      key={i}
                      // type={'all'}
                      data={d}
                      onPress={(d: actionsDashboard) => {
                        d['closed'] = false;
                        props.navigation.push('ViewSOR', {
                          data: d,
                        });
                      }}
                      isView={true}
                      name={d.created_by}
                      date={d.occurred_at}
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
              {comments.map((d: any, i: number) => {
                return (
                  <View>
                    <TouchableOpacity
                      onLongPress={() => {
                        if (d.is_comment == true) {
                          if (d.attachments != undefined) {
                            seteditAttachedCommentArr(d.attachments);
                          } else {
                            seteditAttachedCommentArr([]);
                          }

                          seteditDiscardComment(d.comment);
                          seteditDiscardCommentIndex(i);
                          seteditDelComment(true);
                        }
                      }}
                      style={styles.userComments}>
                      {d?.user == '' ? null : (
                        <Avatar
                          // containerStyle={{position: 'absolute', top: wp(0)}}
                          size={wp(6)}
                          rounded
                          source={{
                            uri:
                              d.user.img_url == undefined ||
                              d.user?.img_url == null
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
                                style={[GlStyles.images, {borderRadius: wp(5)}]}
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

                            <Text
                              style={{
                                fontSize: wp(2),
                                position: 'absolute',
                                fontFamily: fonts.SFuiDisplayMedium,
                                bottom: wp(3),
                              }}>
                              {f.name}
                            </Text>
                            <TouchableOpacity
                              onPress={() => {
                                console.log('teradata');
                                console.log(f.uri);
                                downloadFile(f.uri, f.name)
                                  .then((res) => {})
                                  .catch((err) => {});
                                // var arr = [
                                //   ...this.state.commentAttachment,
                                // ].filter((j) => j != d);
                                // this.setState({commentAttachment: arr});
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
                    notifiedAndInv == 4
                      ? {borderColor: colors.green}
                      : {borderColor: colors.lightGrey},
                  ]}>
                  <TextInput
                    onFocus={() => setnotifiedAndInv(4)}
                    style={{fontSize: wp(3), width: wp(50)}}
                    multiline={true}
                    value={commentText}
                    onChangeText={(e) => {
                      // mentionComment

                      if (filterLocation(e) != null) {
                        setcommentsSugg(
                          searchInSuggestions(
                            filterLocation(e)[0].split('@')[1],
                            involvedPerson,
                          ),
                        );
                        setcommentMentionReplace(filterLocation(e)[0]);
                      }

                      setcommentText(e);
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
                      onPress={() => openDoc(commentAttachment, true)}
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
                        if (
                          commentText != '' ||
                          commentAttachment.length != 0
                        ) {
                          // var map = [...this.state.comments];

                          addComment(commentText, commentAttachment);
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
              {commentsSugg.length !== 0 ? (
                <View style={styles.commentSuggContainer}>
                  {commentsSugg.map((d: involved_persons, i: number) => (
                    <View key={i}>
                      <TouchableOpacity
                        onPress={() => {
                          // this.setState({
                          //   commentText: this.state.commentText.concat(
                          //     d.name,
                          //   ),
                          // });
                          setcommentText(
                            commentText.replace(commentMentionReplace, d.name),
                          );
                          setcommentsSugg([]);

                          // this.state.involvePersonTags.push(d);
                        }}
                        style={[
                          styles.commentPSuggCont,
                          commentsSugg.length == i + 1
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
                  ))}
                </View>
              ) : null}

              {/* Comments Attachments */}
              {commentAttachmentLoading == true ? (
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
                  {commentAttachment.length != 0 ? (
                    <View>
                      <>
                        <ScrollView
                          horizontal={true}
                          style={{marginLeft: wp(6.7)}}
                          showsHorizontalScrollIndicator={false}>
                          {commentAttachment.map((d: any, i: number) => (
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
                                      var arr = [...commentAttachment].filter(
                                        (j) => j != d,
                                      );

                                      setcommentAttachment(arr);
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
                                      style={{
                                        width: wp(10),
                                        height: wp(10),
                                      }}
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
                                        var arr = [...commentAttachment].filter(
                                          (j) => j != d,
                                        );
                                          setcommentAttachment(arr);,
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
                      </>
                    </View>
                  ) : (
                    <View style={{marginLeft: wp(5)}}>
                      <Text style={[styles.attchFileText]}>
                        Uploaded files will be appear here .
                      </Text>
                    </View>
                  )}
                </>
              )}
            </WalkthroughableView>
          </CopilotStep>

          {allBtnsEnabled ? (
            <>
              {/* Submit btns  */}
              <View style={styles.saveAsDraftAndSubmitBtns}>
                {props.route.params.data.status != 2 && (
                  <>
                    {props.route.params.data.closed == false && (
                      <>
                        {!closed && (
                          <TouchableOpacity
                            onPress={() => {
                              if (fiveWhytoggle == true) {
                                if (fiveWhyQuestion.length == 5) {
                                  onSubmitUpdateSor(1);
                                } else {
                                  seterrorModal(true);
                                  seterrHeadingText('Minimum 5 why ');
                                  seterrDesText(
                                    'minimum 5 why should be added..!',
                                  );
                                }
                              } else {
                                onSubmitUpdateSor(1);
                              }
                            }}
                            style={styles.saveAsDraftContainer}>
                            <Text style={styles.saveAsDraftText}>
                              Save as Draft
                            </Text>
                          </TouchableOpacity>
                        )}
                      </>
                    )}
                  </>
                )}

                {props.route.params.data.closed == false && (
                  <>
                    {!closed && (
                      <TouchableOpacity
                        onPress={() => {
                          if (fiveWhytoggle == true) {
                            if (fiveWhyQuestion.length == 5) {
                              onSubmitUpdateSor(2);
                            } else {
                              seterrorModal(true);
                              seterrHeadingText('Minimum 5 why ');
                              seterrDesText('minimum 5 why should be added..!');
                            }
                          } else {
                            onSubmitUpdateSor(2);
                          }
                        }}
                        style={styles.saveAsSubmitContainer}>
                        <Text style={styles.saveAsSubmitText}>Submit</Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </View>
              <View style={styles.previewAndMarkAsCompleteBtns}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Preview', {
                      data: props.route.params.data,
                    });
                  }}
                  style={styles.saveAsDraftContainer}>
                  <Text style={styles.saveAsDraftText}>Preview</Text>
                </TouchableOpacity>

                {props.route.params.data.closed == false && (
                  <>
                    {isMarkAsComplete && (
                      <>
                        <TouchableOpacity
                          onPress={() => {
                            AsyncStorage.getItem('email').then((email) => {
                              console.log();
                              if (
                                actionsAndRecommendations.filter(
                                  (d: any) => d.status == 'In Progress',
                                ).length != 0
                              ) {
                                // Some validations is left

                                if (
                                  actionsAndRecommendations.filter(
                                    (d: any) => d.justification.content !== ' ',
                                  )
                                ) {
                                  console.log('completed yahoo');

                                  // t
                                  console.log('justification');
                                  console.log(actionsAndRecommendations);
                                  seterrorModal(true);
                                  seterrHeadingText('Actions validations ');
                                  seterrDesText('Add the justification');
                                } else {
                                  seterrorModal(true);
                                  seterrHeadingText('Actions validations ');
                                  seterrDesText(
                                    'Actions should be completed or rejected',
                                  );
                                }
                              } else {
                                if (
                                  email == props.route.params.data.created_by
                                ) {
                                  if (fiveWhytoggle == true) {
                                    if (fiveWhyQuestion.length == 5) {
                                      onSubmitUpdateSor(5);
                                    } else {
                                      seterrorModal(true);
                                      seterrHeadingText('Minimum 5 why');
                                      seterrDesText(
                                        'minimum 5 why should be added..!',
                                      );
                                    }
                                  } else {
                                    onSubmitUpdateSor(5);
                                  }
                                } else {
                                  if (fiveWhytoggle == true) {
                                    if (fiveWhyQuestion.length == 5) {
                                      onSubmitUpdateSor(4);
                                    } else {
                                      seterrorModal(true);
                                      seterrHeadingText('Minimum 5 why ');
                                      seterrDesText(
                                        'minimum 5 why should be added..!',
                                      );
                                    }
                                  } else {
                                    onSubmitUpdateSor(4);
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
                      </>
                    )}
                  </>
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
        isVisible={addAssigners}
        onBackdropPress={() => setaddAssigners(false)}>
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
                <TouchableOpacity onPress={() => {}}>
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
        isVisible={IsaddInvAndNotifiedUser}
        onBackdropPress={() => setIsaddInvAndNotifiedUser(false)}>
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
              {involvedAndNotifiedUserType == 'involved'
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
                selectedInput == 1
                  ? {borderColor: colors.green}
                  : {borderColor: colors.text},
              ]}
              onFocus={() => setselectedInput(1)}
              multiline={true}
              value={involveAndNotifiedUsersName}
              onChange={(v: any) => {
                setaddInvolvedandNotifiedUsers(
                  searchInSuggestions(v.nativeEvent.text, involvedPerson),
                );
                setinvolveAndNotifiedUsersName(v.nativeEvent.text);
              }}
              placeholder={'Type your name / email ...'}
            />

            {addInvolvedandNotifiedUsers.length != 0 ? (
              <View style={styles.involveSuggestCont}>
                {addInvolvedandNotifiedUsers.map(
                  (d: involved_persons, i: number) => (
                    <TouchableOpacity
                      key={i}
                      onPress={() => {
                        setinvolveAndNotifiedUsersName(d.email);
                        setinvPhoto(d.img_url);
                        setaddInvolvedandNotifiedUsers([]);
                      }}
                      style={[
                        styles.involvePsuggCont,
                        addInvolvedandNotifiedUsers.length == i + 1
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
                if (involveAndNotifiedUsersName !== '') {
                  if (involvedAndNotifiedUserType == 'involved') {
                    involvedPerson.push({
                      _id: Date.now(),
                      email: involveAndNotifiedUsersName,
                      name: involveAndNotifiedUsersName.split('@')[0],
                      img_url:
                        invPhoto === ''
                          ? `https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png`
                          : invPhoto,
                    });
                  } else {
                    notifiedPerson.push({
                      _id: Date.now(),
                      email: involveAndNotifiedUsersName,
                      name: involveAndNotifiedUsersName.split('@')[0],
                      img_url:
                        invPhoto === ''
                          ? `https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png`
                          : invPhoto,
                    });
                  }
                  setIsaddInvAndNotifiedUser(false);
                  setinvolveAndNotifiedUsersName('');
                  setinvPhoto('');
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
      <Modal visible={imageViewer} transparent={true}>
        <TouchableOpacity
          onPress={() => setimageViewer(false)}
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
          imageUrls={images}
        />
      </Modal>
      {/*
       *
       * @ Edit Actions and Recommendations :Options *
       * desc: Acrions popup that allow us to edit or delete actions
       */}
      {SuggestionPop == true && (
        <SuggestionsPop
          suggestedUsers={involvedPerson}
          onClose={() => {
            actionsAndRecommendations[allActionsEditIndex].selected = false;
            setSuggestionPop(!SuggestionPop);
            actionsAndRecommendations[allActionsEditIndex].is_complete = false;
          }}
          isView={false}
          newAct={newActions}
          currentUser={user}
          allSuggestions={actionsAndRecommendations}
          submitToAndObserverEmails={submitToAndObserverEmails}
          isOpen={SuggestionPop}
          suggestions={allActionsEdit}
          save={(d: any) => {
            if (newActions == true) {
              actionsAndRecommendations.push(d);
            } else {
              actionsAndRecommendations[allActionsEditIndex] = d;
            }
            // this.state.actionsAndRecommendations.push(d)
            setSuggestionPop(false);
          }}
          discard={() => {
            setactionsAndRecommendations(
              actionsAndRecommendations.filter((d: any) => d != allActionsEdit),
            );
            setSuggestionPop(false);
          }}
        />
      )}
      {/*
       *
       * @Comment
       * :Options * desc: comment popup that allow us to edit or delete comments
       */}
      <CommentPop
        onClose={() => seteditDelComment(!editDelComment)}
        editDiscardComment={editDiscardComment}
        commentIndex={editDiscardCommentIndex}
        isOpen={editDelComment}
        openDoc={() => openDoc(editAttachedCommentArr, false)}
        attachments={editAttachedCommentArr}
        comments={comments}
        commentTextString={EditcommentText}
        commentTextStringOnChange={(e: string) => seteditDiscardComment(e)}
        deleteAttachment={(e: string) => {
          seteditAttachedCommentArr(e);
        }}
        discardComment={(e: any) => {
          // this.deleteComment(
          //   this.state.comments.findIndex(this.state.editDiscardCommentIndex),
          // );
          deleteComment(
            e.filter((d: any, i: number) => i == editDiscardCommentIndex),
          );

          // this.state.comments.splice(this.state.editDiscardCommentIndex, 1);

          seteditDelComment(false);
        }}
        submitComment={(e: any) => {
          comments[editDiscardCommentIndex]['comment'] = editDiscardComment;
          comments[editDiscardCommentIndex]['date'] = Date.now();
          comments[editDiscardCommentIndex][
            'attachments'
          ] = editAttachedCommentArr;

          editComment(comments[editDiscardCommentIndex]);
          seteditDelComment(false);
        }}
      />
      {/* <FlashMessage ref="myLocalFlashMessage" /> */}

      {/* {this.state.loading ? ( */}
      <Model
        isVisible={errorModal}
        onBackdropPress={() => {
          seterrorModal(false);
          setloading(false);
        }}>
        {loading == true ? (
          <LottieView
            autoPlay={true}
            style={{width: wp(90)}}
            source={animation.loading}
            loop={true}
          />
        ) : (
          <View style={styles.modelContainer}>
            <View>
              <Text style={styles.errHeadPop}>{errHeadingText}</Text>
              <Text style={styles.errEmailPassDesc}>{errDesText}</Text>
              {/* <Text style={styles.plzTryAgain}>Please try again later.</Text> */}
            </View>
          </View>
        )}
      </Model>
      {/* ) : null} */}
    </Animated.View>
  );
};

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

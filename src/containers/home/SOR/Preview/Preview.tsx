import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
  RefreshControl,
  PanResponder,
  Image,
  TextInput,
} from 'react-native';
import moment from 'moment';

import {createApi, Create_sor, submitted} from '@service';
import {Icon, Avatar} from 'react-native-elements';
import {colors, fonts, animation, images, GlStyles} from '@theme';
import {AllSorDTO} from '@dtos';
import {connect} from 'react-redux';
import styles from './styles';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../../../../store/actions/listSorActions';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp} from '@react-navigation/native';
import {
  classifySor,
  filterAndMappingPersons,
  mapAllProjects,
  capitalizeFirstLetter,
  writeHtmlToPdf,
  downloadFile,
  getCurrentProject,
} from '@utils';

import {Card, ListCard} from '@components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import {createApi} from '@service';
// import {Storage} from 'aws-amplify';

// import jwtDecode from 'jwt-decode';
import {Isor, involved_persons, orgnaization} from '@typings';
// import {  } from "";
type PreviewNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'Preview'
>;
type PreviewRouteProp = RouteProp<StackNavigatorProps, 'Preview'>;
// Project Id
export interface ViewAllProps {
  route: PreviewRouteProp;
  navigation: PreviewNavigationProp;
  reduxActions: any;
  reduxState: AllSorDTO;
  // initial: AllSorDTO;
  initialList: any;
}

export class Preview extends React.Component<ViewAllProps, any> {
  constructor(props: ViewAllProps) {
    super(props);
    this.state = {
      sor_type: 'concern',
      prisk:
        this.props.route.params.data.potential_risk?.likelihood *
        this.props.route.params.data.potential_risk?.severity,

      risk:
        this.props.route.params.data.risk.likelihood *
        this.props.route.params.data.risk.severity,
      createdByName: '',
      projectName: '',
      attachments: [],
      involvedperson: [],
      projectId: '',
      questionAndAnswers: [],
      fivewhy: [],
    };
  }

  // Print sor
  printSor = async () => {
    let options = {
      html: `<h1>PDF TEST</h1>`,
      fileName: 'test',
      directory: 'Documents',
    };

    var pdf = `
    <HTML>
    <HEAD>
    <META http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <TITLE>pdf-html</TITLE>
    <META name="generator" content="BCL easyConverter SDK 5.0.252">
    <STYLE type="text/css">
    
    body {margin-top: 0px;margin-left: 0px;}
    
    #page_1 {position:relative; overflow: hidden;margin: 32px 0px 32px 0px;padding: 0px;border: none;width: 1123px;height: 1524px;}
    #page_1 #id1_1 {border:none;margin: 12px 0px 0px 0px;padding: 0px;border:none;width: 1123px;overflow: hidden;}
    #page_1 #id1_2 {border:none;margin: 655px 0px 0px 40px;padding: 0px;border:none;width: 1083px;overflow: hidden;}
    #page_1 #id1_2 #id1_2_1 {float:left;border:none;margin: 21px 0px 0px 0px;padding: 0px;border:none;width: 142px;overflow: hidden;}
    #page_1 #id1_2 #id1_2_2 {float:left;border:none;margin: 0px 0px 0px 0px;padding: 0px;border:none;width: 941px;overflow: hidden;}
    
    #page_1 #p1dimg1 {position:absolute;top:0px;left:40px;z-index:-1;width:1027px;height:1524px;}
    #page_1 #p1dimg1 #p1img1 {width:1027px;height:1524px;}
    
    #page_1 #p1inl_img1 {position:relative;width:15px;height:15px;}
    #page_1 #p1inl_img2 {position:relative;width:15px;height:15px;}
    
    
    
    #page_2 {position:relative; overflow: hidden;margin: 32px 0px 32px 40px;padding: 0px;border: none;width: 1083px;height: 1524px;}
    #page_2 #id2_1 {float:left;border:none;margin: 1503px 0px 0px 0px;padding: 0px;border:none;width: 142px;overflow: hidden;}
    #page_2 #id2_2 {float:left;border:none;margin: 13px 0px 0px 0px;padding: 0px;border:none;width: 941px;overflow: hidden;}
    
    #page_2 #p2dimg1 {position:absolute;top:0px;left:0px;z-index:-1;width:1021px;height:1524px;}
    #page_2 #p2dimg1 #p2img1 {width:1021px;height:1524px;}
    
    #page_2 #p2inl_img1 {position:relative;width:15px;height:15px;}
    #page_2 #p2inl_img2 {position:relative;width:15px;height:15px;}
    
    
    
    .dclr {clear:both;float:none;height:1px;margin:0px;padding:0px;overflow:hidden;}
    
    .ft0{font: 19px 'Arial';color: #112565;line-height: 22px;}
    .ft1{font: 14px 'Arial';color: #112565;line-height: 16px;}
    .ft2{font: 14px 'Arial';color: #212529;line-height: 16px;}
    .ft3{font: 16px 'Arial';line-height: 18px;}
    .ft4{font: 14px 'Arial';color: #9e9e9e;line-height: 16px;}
    .ft5{font: 1px 'Arial';line-height: 1px;}
    .ft6{font: bold 7px 'Arial';line-height: 7px;}
    .ft7{font: 16px 'Arial';color: #555555;line-height: 18px;}
    .ft8{font: 14px 'Arial';color: #3498db;line-height: 16px;}
    .ft9{font: 5px 'Arial';color: #ffffff;line-height: 6px;}
    .ft10{font: 1px 'Arial';line-height: 5px;}
    .ft11{font: 14px 'Arial';color: #212529;margin-left: 4px;line-height: 16px;}
    .ft12{font: 6px 'Arial';color: #212529;line-height: 6px;}
    .ft13{font: 6px 'Arial';color: #9e9e9e;line-height: 6px;}
    .ft14{font: 7px 'Arial';color: #9e9e9e;line-height: 7px;}
    
    .p0{text-align: right;padding-right: 62px;margin-top: 0px;margin-bottom: 0px;}
    .p1{text-align: left;padding-left: 48px;margin-top: 99px;margin-bottom: 0px;}
    .p2{text-align: left;padding-left: 48px;margin-top: 3px;margin-bottom: 0px;}
    .p3{text-align: left;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}
    .p4{text-align: left;padding-left: 50px;margin-top: 35px;margin-bottom: 0px;}
    .p5{text-align: left;padding-left: 50px;margin-top: 7px;margin-bottom: 0px;}
    .p6{text-align: left;padding-left: 1px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}
    .p7{text-align: left;padding-left: 45px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}
    .p8{text-align: left;padding-left: 50px;margin-top: 55px;margin-bottom: 0px;}
    .p9{text-align: left;padding-left: 50px;margin-top: 5px;margin-bottom: 0px;}
    .p10{text-align: left;padding-left: 54px;margin-top: 56px;margin-bottom: 0px;}
    .p11{text-align: left;padding-left: 226px;margin-top: 10px;margin-bottom: 0px;}
    .p12{text-align: left;padding-left: 55px;margin-top: 4px;margin-bottom: 0px;}
    .p13{text-align: left;padding-left: 54px;margin-top: 51px;margin-bottom: 0px;}
    .p14{text-align: left;padding-left: 54px;margin-top: 7px;margin-bottom: 0px;}
    .p15{text-align: left;margin-top: 0px;margin-bottom: 0px;}
    .p16{text-align: left;margin-top: 1448px;margin-bottom: 0px;}
    
    .td0{padding: 0px;margin: 0px;width: 146px;vertical-align: bottom;}
    .td1{padding: 0px;margin: 0px;width: 241px;vertical-align: bottom;}
    .td2{padding: 0px;margin: 0px;width: 145px;vertical-align: bottom;}
    .td3{padding: 0px;margin: 0px;width: 485px;vertical-align: bottom;}
    .td4{border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 146px;vertical-align: bottom;}
    .td5{border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 241px;vertical-align: bottom;}
    .td6{border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 145px;vertical-align: bottom;}
    .td7{border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 485px;vertical-align: bottom;}
    .td8{padding: 0px;margin: 0px;width: 173px;vertical-align: bottom;}
    .td9{padding: 0px;margin: 0px;width: 214px;vertical-align: bottom;}
    .td10{padding: 0px;margin: 0px;width: 77px;vertical-align: bottom;}
    .td11{padding: 0px;margin: 0px;width: 144px;vertical-align: bottom;}
    .td12{padding: 0px;margin: 0px;width: 218px;vertical-align: bottom;}
    
    .tr0{height: 29px;}
    .tr1{height: 43px;}
    .tr2{height: 20px;}
    .tr3{height: 40px;}
    .tr4{height: 45px;}
    .tr5{height: 5px;}
    .tr6{height: 6px;}
    
    .t0{width: 1017px;margin-left: 50px;margin-top: 46px;font: 14px 'Arial';color: #9e9e9e;}
    .t1{width: 609px;margin-left: 50px;margin-top: 16px;font: 16px 'Arial';}
    .t2{width: 603px;margin-left: 54px;margin-top: 29px;font: 6px 'Arial';color: #212529;}
    
    </STYLE>
    </HEAD>
    
    <BODY>
    <DIV id="page_1">
    <DIV id="p1dimg1">
    </DIV>
    
    
    <DIV class="dclr"></DIV>
    <DIV id="id1_1">
    <img src="https://user-images.githubusercontent.com/33973828/131846448-ca935765-2906-42cf-bd27-46b81354a8c1.png" width="25%" style="margin-left: 3%;"/>
    <P style="    font-size: 14px;" class="p0 ft0">https://app.safety.connect.ai</P>
    <P style="font-size: 32px;font-weight: bold;" class="p1 ft1">Observation Summary</P>
    <P style="        font-size: 14px;
    margin-top: 13px;
    margin-left: 4px;"class="p2 ft2">Project ID: ${this.state.projectId}</P>
    <TABLE cellpadding=0 cellspacing=0 class="t0">
    <TR>
      <TD  class="tr0 td0"><P style="    font-size: 15px;
        font-weight: bold;" class="p3 ft3">Project:</P></TD>
      <TD class="tr0 td1"><P class="p3 ft4">${this.state.projectName}</P></TD>
      <TD  class="tr0 td0"><P  class="tr0 td2"><P style="    font-size: 15px;
        font-weight: bold;" class="p3 ft3">Location:</P></TD>
      <TD class="tr0 td3"><P class="p3 ft4">${
        this.props.route.params.data.location
      }</P></TD>
    </TR>
    <TR>
      <TD  class="tr1 td0"><P  class="tr0 td0"><P style="    font-size: 15px;
        font-weight: bold;" class="p3 ft3">Occurred On:</P></TD>
      <TD class="tr1 td1"><P class="p3 ft4">${moment(
        this.props.route.params.data.occurred_at,
      ).format('llll')}</P></TD>
      <TD class="tr1 td2"><P  class="tr0 td0"><P style="    font-size: 15px;
        font-weight: bold;" class="p3 ft3">Reported On:</P></TD>
      <TD class="tr1 td3"><P class="p3 ft4">${
        this.props.route.params.data.occurred_at
      }</P></TD>
    </TR>
    <TR>
      
      <!-- <TD class="tr2 td4"><P class="p3 ft5">&nbsp;</P></TD> -->
      <!-- <TD class="tr2 td5"><P class="p3 ft5">&nbsp;</P></TD> -->
      <!-- <TD class="tr2 td6"><P class="p3 ft5">&nbsp;</P></TD> -->
      <!-- <TD class="tr2 td7"><P class="p3 ft5">&nbsp;</P></TD> -->
    </TR>
    </TABLE>
    <hr  style="margin-top: 24px"/>
    <P style="    font-size: 19px;
    margin-bottom: 14px;" class="p4 ft6">Observation Details</P>
    <P style="font-size: 14px;" class="p5 ft7">On ${moment(
      this.props.route.params.data.occurred_at,
    ).format('llll')} ${this.props.route.params.data.details}</P>
    <TABLE cellpadding=0 cellspacing=0 class="t1">
    <TR>
      <TD class="tr0 td8"><P style="font-size: 14px;"  class="p3 ft3">Observation Type:</P></TD>
      <TD class="tr0 td9"><P style="font-size: 16px;"  class="p6 ft8">${
        this.props.route.params.data.sor_type
      }</P></TD>
      <TD class="tr0 td2"><P style="font-size: 14px;"  class="p3 ft3">Status:</P></TD>
      <TD class="tr0 td10"><P style="font-size: 13px;"  class="p3 ft4">In Progress</P></TD>
    </TR>
    <TR>
      <TD class="tr3 td8"><P style="font-size: 14px;" class="p3 ft3">Potential Risk:</P></TD>
        
        <TD style="font-size: 12px;" rowspan=2 class="tr4 td9">
          <div  style="${
            this.state.prisk < 6
              ? 'background-color: #4BA735;'
              : this.state.prisk < 14
              ? 'background-color: #FF9900;'
              : 'background-color: #F14030;'
          }
          padding: 20px;
          width: 100px;
          margin-top: 10%;
          border-radius: 24px;">
            <P style="color: #ffffff;
            font-size: 14px;
            text-align: center;" class="p3 ft9">
            
           ${
             this.state.prisk < 6
               ? 'low'
               : this.state.prisk < 14
               ? 'Medium'
               : 'High'
           }
            
            </P>
          </div>
          
          </TD>
      <TD class="tr3 td2"><P style="font-size: 14px;"  class="p3 ft3">Actual Risk:</P></TD>
    
    
      <TD style="font-size: 12px;" rowspan=2 class="tr4 td10">
        <div style="${
          this.state.risk < 6
            ? 'background-color: #4BA735;'
            : this.state.risk < 14
            ? 'background-color: #FF9900;'
            : 'background-color: #F14030;'
        }
        padding: 20px;
        width: 100px;
        border-radius: 24px;">
          <P style="color: #ffffff;
          font-size: 14px;
          text-align: center;" class="p3 ft9">
          ${
            this.state.risk < 6
              ? 'low'
              : this.state.risk < 14
              ? 'Medium'
              : 'High'
          }</P>
        </div>
        
        </TD>
      <!-- <TD rowspan=2 class="tr4 td10"><P class="p7 ft9">High</P></TD> -->
    </TR>
    
    <TR>
      <TD class="tr5 td8"><P class="p3 ft10">&nbsp;</P></TD>
      <TD class="tr5 td2"><P class="p3 ft10">&nbsp;</P></TD>
    </TR>
    </TABLE>
    <div style="margin-top: 10px;"></div>
    <hr style=" margin-top: 26px" />
    
    <P style="font-size: 19px;
    margin-top: 22px;
    margin-bottom: 18px;" class="p8 ft6">Actions & Recommendations</P>
    ${this.props.route.params.data.action_required.map(
      (d, i) =>
        ` <P class="p5 ft2"><SPAN class="ft2">${
          i + 1
        }.</SPAN><SPAN class="ft11">${d.content}</SPAN></P>`,
    )}
   

  ${
    this.props.route.params.data.justifications.length != 0 &&
    `  
  <!-- Five why -->
  <hr style=" margin-top: 26px" />
  <P style="font-size: 19px;
  margin-top: 22px;
  margin-bottom: 18px;" class="p8 ft6">Five WHY</P>
  
  
  ${this.state.questionAndAnswers.map(
    (d: any, i: number) =>
      `<P class="p5 ft2"><SPAN class="ft2">Q.</SPAN><SPAN class="ft11">${d.question}</SPAN></P>
    <P class="p5 ft2"><SPAN class="ft2">A.</SPAN><SPAN class="ft11">${d.answer}</SPAN></P>`,
  )}
  
  
  
  <!-- Key Findings -->
  <P style="font-size: 19px;
  margin-top: 22px;
  margin-bottom: 18px;" class="p8 ft6">Key findings</P>
  
  <P class="p5 ft2"><SPAN class="ft2"></SPAN><SPAN class="ft11">${
    this.props.route.params.data.justifications[0].keyFindings
  }</SPAN></P>
  
  <!-- Root causes -->
  <P style="font-size: 19px;
  margin-top: 22px;
  margin-bottom: 18px;" class="p8 ft6">Root Causes</P>
  ${this.props.route.params.data.justifications[0].rootCauses.map(
    (d: any, i: number) =>
      `<P class="p5 ft2"><SPAN class="ft2">*</SPAN><SPAN class="ft11">${d.category}</SPAN></P>
      <P class="p5 ft2"><SPAN class="ft2">-</SPAN><SPAN class="ft11">${d.subCategory[0]}</SPAN></P>
     
      `,
  )}
  
  <!-- Contributory causes -->
  <P style="font-size: 19px;
  margin-top: 22px;
  margin-bottom: 18px;" class="p8 ft6">Contributory Causes</P>
  ${this.props.route.params.data.justifications[0].contributoryCauses.map(
    (d: any, i: number) =>
      `<P class="p5 ft2"><SPAN class="ft2">*</SPAN><SPAN class="ft11">${d.category}</SPAN></P>
    <P class="p5 ft2"><SPAN class="ft2">-</SPAN><SPAN class="ft11">${d.subCategory[0]}</SPAN></P>
   `,
  )}
  
  
  `
  }



    
    <hr style="    margin-top: 20px;" />
    <P  style="font-size: 21px;
    margin-left: 54px;
    margin-top: 30px;"class=" ft6">People</P>
    <TABLE cellpadding=0 cellspacing=0 class="t2">
    
    
    
    <TR>
      <TD  class="tr6 td11"><P style="font-size: 13px;" class="p3 ft12">Initiated By</P></TD>
      <TD class="tr6 td1"><P style="font-size: 12px;"  class="p3 ft13">${
        this.props.route.params.data.created_by
      }</P></TD>
      <TD class="tr6 td12"><P style="font-size: 12px;    margin-top: 29px;" class="p3 ft12">Area Supervisor <SPAN  style="font-size: 12px;" class="ft13">syed Test</SPAN></P></TD>
    </TR>
    </TABLE>
    <P class="p11 ft4">syed Test</P>
    <P style="font-size: 13px;
    margin-top: -11px;" class="p12 ft12">Involved Persons</P>
    
    <hr style="font-size: 30px;" />
    
    <P style="font-size: 19px;
    margin-left: 53px;" class="ft6">Attachments</P>
    ${
      this.props.route.params.data.attachments.length != 0
        ? `
      ${this.props.route.params.data.attachments.map(
        (d: any, i: number) =>
          ` <P style="font-size: 12px;" class="p14 ft4">${i + 1} . ${d}</P>`,
      )}
      
      `
        : ` <P style="font-size: 12px;" class="p14 ft4">No files uploaded yet</P>`
    }
    </DIV>
    <DIV id="id1_2">
    <DIV id="id1_2_1">
    <P class="p15 ft14">Contact us at</P>
    </DIV>
    <DIV id="id1_2_2">
    <P class="p15 ft0">hello@safetyconnect.ai </P>
    </DIV>
    </DIV>
    </DIV></DIV>
    </BODY>
    </HTML>
    
    
    `;

    writeHtmlToPdf(pdf, 'test').then((res) => {
      console.log(res);
    });
    // console.log(file.filePath);
    // alert(file.filePath);
  };
  componentDidMount = () => {
    // this.props.route.
    console.log('this.props.route.params.data');
    console.log(this.props.route.params.data);
    var data = [];

    if (this.props.route.params.data?.justifications.length != 0) {
      this.props.route.params.data.justifications[0].justification.question.map(
        (d: any) => {
          data.push({question: d});
        },
      );

      this.props.route.params.data.justifications[0].justification.answer.map(
        (d: any, i: number) => {
          data[i]['answer'] = d;
        },
      );
    }

    this.setState({questionAndAnswers: data});

    // this.props.route.params.data.justifications[0].justification.question.map(
    //   (d: any) => {
    // this.setState({  fiveWhy: [ question: d]});
    // this.setState({
    //   fiveWhy: this.props.route.params.data.justifications[0].justification
    //     .question,
    // });
    // },
    // );

    console.log('this.state.fiveWhy');
    console.log(this.state.fiveWhy);

    // this.props.route.params.data.justifications[0].justification.answer.map(
    //   (d: any, i: number) => {
    //     this.state.fiveWhy[i]['answer'] = d;
    //   },
    // );

    console.log('this.state.fiveWhy');
    console.log(this.state.fiveWhy);
    createApi
      .createApi()
      .getUser(this.props.route.params.data.created_by)
      .then((user: any) => {
        this.setState({createdByName: user.data.data.name});
        getCurrentProject().then((currentProj: any) => {
          this.setState({projectId: currentProj});
          createApi
            .createApi()
            .getProject(currentProj, user.data.data._id)
            .then((res: any) => {
              this.setState({
                projectName: res.data.data.project_name,
              });

              this.setState({
                involvedperson: res.data.data.involved_persons,
              });

              // this.props.route.params.data.involved_persons.map((d) => {
              //   this.state.involvedperson.push(
              //     res.data.data.involved_persons.filter(
              //       (i: any) => i.email == d,
              //     )[0],
              //   );

              //   this.setState({});
              // });

              this.getAllAttachments(this.props.route.params.data.attachments);
            });
        });
      });
  };

  // get All Attachments
  getAllAttachments = (attach: any) => {
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
              type: 'pdf',
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

  render() {
    return (
      <View style={{backgroundColor: colors.secondary, flex: 1}}>
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

          <View style={styles.content}>
            {/* Observation Details */}
            <View
              style={{
                marginTop: wp(3),
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
                    fontFamily: fonts.SFuiDisplayBold,
                    fontSize: wp(3),
                    width: '50%',
                  }}>
                  Observation ID:
                </Text>
                <Text
                  style={{
                    // marginLeft: wp(10),
                    width: '50%',
                    fontFamily: fonts.SFuiDisplayMedium,
                    fontSize: wp(3),
                  }}>
                  112233
                </Text>
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
                    fontFamily: fonts.SFuiDisplayBold,
                    fontSize: wp(3),
                  }}>
                  Reported on:
                </Text>
                <Text
                  style={{
                    width: '50%',
                    fontFamily: fonts.SFuiDisplayMedium,
                    fontSize: wp(3),
                  }}>
                  {moment(this.props.route.params.data.occured_at).format(
                    'MMM DD, YYYY LT',
                  )}
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
                    fontFamily: fonts.SFuiDisplayBold,
                    fontSize: wp(3),
                  }}>
                  Project:
                </Text>
                <Text
                  style={{
                    width: '50%',
                    fontFamily: fonts.SFuiDisplayMedium,
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
                    fontFamily: fonts.SFuiDisplayBold,
                    fontSize: wp(3),
                  }}>
                  Location:
                </Text>
                <Text
                  style={{
                    width: '50%',
                    fontFamily: fonts.SFuiDisplayMedium,
                    fontSize: wp(3),
                  }}>
                  {this.props.route.params.data.location}
                </Text>
              </View>
            </View>
            {/* Line  */}

            <View style={styles.lineheight} />

            {/* Observation Details */}
            <View style={{padding: wp(3)}}>
              <Text
                style={{fontSize: wp(4), fontFamily: fonts.SFuiDisplayBold}}>
                Observation Details
              </Text>
              {/* Date  */}
              <Text
                style={{fontSize: wp(3), fontFamily: fonts.SFuiDisplayLight}}>
                On {moment().format('MMMM Do YYYY, h:mm')}
              </Text>
              {/* Observation */}
              <Text
                style={{
                  fontSize: wp(3),
                  fontFamily: fonts.SFuiDisplayLight,
                }}>
                {this.props.route.params.data.details}
              </Text>

              {/*   Observation details */}
              <View style={{marginTop: wp(2)}}>
                {/* Observation type */}
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      width: '50%',
                      fontSize: wp(3),
                      fontFamily: fonts.SFuiDisplayBold,
                    }}>
                    Observation Type
                  </Text>
                  {/* Obs type */}

                  <View
                    style={{
                      width: '50%',
                    }}>
                    <TouchableOpacity style={styles.classittleicon}>
                      {this.props.route.params.data.sor_type != 'lsr' ? (
                        <View>
                          {this.props.route.params.data.sor_type !=
                          'near miss' ? (
                            <Icon
                              size={wp(3)}
                              name={
                                this.props.route.params.data.sor_type == 'lsr'
                                  ? 'aperture'
                                  : this.props.route.params.data.sor_type ==
                                    'positive'
                                  ? 'check-circle'
                                  : this.props.route.params.data.sor_type ==
                                    'concern'
                                  ? 'warning'
                                  : this.props.route.params.data.sor_type ==
                                    'near miss'
                                  ? 'centercode'
                                  : 'frowno'
                              }
                              type={
                                this.props.route.params.data.sor_type == 'lsr'
                                  ? 'ionicon'
                                  : this.props.route.params.data.sor_type ==
                                    'positive'
                                  ? 'font-awesome-5'
                                  : this.props.route.params.data.sor_type ==
                                    'concern'
                                  ? 'antdesign'
                                  : this.props.route.params.data.sor_type ==
                                    'near miss'
                                  ? 'font-awesome-5'
                                  : 'antdesign'
                              }
                              color={
                                this.props.route.params.data.sor_type == 'lsr'
                                  ? colors.classify_sor_btns.lsr
                                  : this.props.route.params.data.sor_type ==
                                    'positive'
                                  ? colors.classify_sor_btns.positive
                                  : this.props.route.params.data.sor_type ==
                                    'concern'
                                  ? colors.classify_sor_btns.concern
                                  : this.props.route.params.data.sor_type ==
                                    'near miss'
                                  ? colors.classify_sor_btns.nearmiss
                                  : 'frowno'
                              }
                            />
                          ) : null}
                        </View>
                      ) : null}

                      {this.props.route.params.data.sor_type == 'lsr' ? (
                        <View style={{width: wp(7), height: wp(7)}}>
                          <Image
                            source={images.lsr}
                            style={[GlStyles.images, {tintColor: colors.text}]}
                          />
                        </View>
                      ) : null}
                      {this.props.route.params.data.sor_type == 'near miss' ? (
                        <View style={{width: wp(5), height: wp(5)}}>
                          <Image
                            source={images.nearMiss}
                            style={GlStyles.images}
                          />
                        </View>
                      ) : null}
                      <Text
                        style={[
                          styles.clasifyT,
                          this.props.route.params.data.sor_type == 'lsr'
                            ? {color: colors.classify_sor_btns.lsr}
                            : this.props.route.params.data.sor_type ==
                              'positive'
                            ? {color: colors.classify_sor_btns.positive}
                            : this.props.route.params.data.sor_type == 'concern'
                            ? {color: colors.classify_sor_btns.concern}
                            : this.props.route.params.data.sor_type ==
                              'near miss'
                            ? {color: colors.classify_sor_btns.nearmiss}
                            : null,
                        ]}>
                        {capitalizeFirstLetter(
                          this.props.route.params.data.sor_type,
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* Observation status */}
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: wp(1),
                    marginBottom: wp(1),
                  }}>
                  <Text
                    style={{
                      width: '50%',

                      fontSize: wp(3),
                      fontFamily: fonts.SFuiDisplayBold,
                    }}>
                    Status
                  </Text>
                  <Text
                    style={{
                      fontSize: wp(2.7),
                      opacity: 0.5,
                      fontFamily: fonts.SFuiDisplayMedium,
                    }}>
                    {this.props.route.params.data.status == 1
                      ? 'Draft'
                      : this.props.route.params.data.status == 2
                      ? 'In Progress'
                      : this.props.route.params.data.status == 3
                      ? 'Esclated To'
                      : this.props.route.params.data.status == 4
                      ? 'Pending Closure'
                      : this.props.route.params.data.status == 5
                      ? 'Closed'
                      : '--'}
                  </Text>
                </View>
                {/* potiential risk */}
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: wp(1),
                    marginBottom: wp(1),
                  }}>
                  <Text
                    style={{
                      width: '50%',
                      fontSize: wp(3),
                      fontFamily: fonts.SFuiDisplayBold,
                    }}>
                    Potiential Risk
                  </Text>
                  {/* Potitential risk */}
                  <View
                    style={[
                      styles.riskCapacity,
                      this.state.prisk < 6
                        ? {backgroundColor: colors.green}
                        : this.state.prisk < 14
                        ? {backgroundColor: colors.yellow}
                        : {backgroundColor: colors.error},
                    ]}>
                    <Text style={styles.riskCapacityText}>
                      {this.state.prisk < 6
                        ? `${this.state.prisk}-low`
                        : this.state.prisk < 14
                        ? `${this.state.prisk}-Medium`
                        : `${this.state.prisk}-High`}
                    </Text>
                  </View>
                </View>
                {/* Actual risk */}
                <View style={{flexDirection: 'row', marginBottom: wp(3)}}>
                  <Text
                    style={{
                      fontSize: wp(3),
                      width: '50%',
                      fontFamily: fonts.SFuiDisplayBold,
                    }}>
                    Actual Risk
                  </Text>
                  {/* Actual Risk */}
                  <View
                    style={[
                      styles.riskCapacity,
                      this.state.risk < 6
                        ? {backgroundColor: colors.green}
                        : this.state.risk < 14
                        ? {backgroundColor: colors.yellow}
                        : {backgroundColor: colors.error},
                    ]}>
                    <Text style={styles.riskCapacityText}>
                      {this.state.risk < 6
                        ? `${this.state.risk}-low`
                        : this.state.risk < 14
                        ? `${this.state.risk}-Medium`
                        : `${this.state.risk}-High`}
                    </Text>
                  </View>
                </View>

                {/* Five why   */}
                {this.props.route.params.data.justifications.length != 0 && (
                  <View style={styles.lineheight} />
                )}

                {this.props.route.params.data.justifications.length != 0 && (
                  <>
                    {this.props.route.params.data.action_required.length !=
                      0 && (
                      <>
                        <View style={{marginTop: wp(3), marginBottom: wp(3)}}>
                          <Text
                            style={{
                              fontSize: wp(4),
                              fontFamily: fonts.SFuiDisplayBold,
                            }}>
                            Five why{' '}
                          </Text>

                          <View style={{flexDirection: 'row'}}>
                            <View style={{flexDirection: 'column'}}>
                              {this.state.questionAndAnswers.map(
                                (d: any, i: number) => (
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                      // justifyContent: 'space-between',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: wp(3),
                                        fontFamily: fonts.SFuiDisplayMedium,
                                      }}>
                                      Q. {i + 1}. {d.question}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: wp(3),
                                        opacity: 0.5,
                                        fontFamily: fonts.SFuiDisplayMedium,
                                      }}>
                                      A. {i + 1}. {d.answer}
                                    </Text>
                                  </View>
                                ),
                              )}
                            </View>
                            {/* <View
                              style={{
                                flexDirection: 'column',
                                marginLeft: wp(20),
                              }}>
                              {this.props.route.params.data.justifications[0].justification.answer.map(
                                (d: any, i: number) => (
                                 
                                ),
                              )}
                            </View> */}
                          </View>
                        </View>
                        {/* Key findings */}
                        <View style={{marginBottom: wp(2)}}>
                          <Text
                            style={{
                              fontSize: wp(3),
                              fontFamily: fonts.SFuiDisplayBold,
                            }}>
                            Key Findings
                          </Text>
                          <Text style={{fontSize: wp(3)}}>
                            {
                              this.props.route.params.data.justifications[0]
                                .keyFindings
                            }
                          </Text>
                        </View>
                        {/* Root Causes */}
                        <View>
                          <Text
                            style={{
                              fontSize: wp(3),
                              fontFamily: fonts.SFuiDisplayBold,
                            }}>
                            Root Causes
                          </Text>
                          {this.props.route.params.data.justifications[0].rootCauses.map(
                            (d: any) => (
                              <>
                                <Text
                                  style={{
                                    fontSize: wp(3),
                                    fontFamily: fonts.SFuiDisplayMedium,
                                  }}>
                                  * {d.category}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: wp(3),
                                    marginLeft: wp(3),
                                    fontFamily: fonts.SFuiDisplayLight,
                                    opacity: 0.5,
                                  }}>
                                  {d.subCategory[0]}
                                </Text>
                              </>
                            ),
                          )}
                        </View>
                        {/* Contributory Causes */}
                        <View style={{marginBottom: wp(5)}}>
                          <Text
                            style={{
                              fontSize: wp(3),
                              fontFamily: fonts.SFuiDisplayBold,
                            }}>
                            Contributory Causes
                          </Text>
                          {this.props.route.params.data.justifications[0].contributoryCauses.map(
                            (d: any) => (
                              <>
                                <Text
                                  style={{
                                    fontSize: wp(3),
                                    fontFamily: fonts.SFuiDisplayMedium,
                                  }}>
                                  * {d.category}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: wp(3),
                                    marginLeft: wp(3),
                                    fontFamily: fonts.SFuiDisplayLight,
                                    opacity: 0.5,
                                  }}>
                                  {d.subCategory[0]}
                                </Text>
                              </>
                            ),
                          )}
                        </View>
                      </>
                    )}
                  </>
                )}

                {/* Actions and recommendations */}
                {this.props.route.params.data.action_required.length != 0 && (
                  <View style={styles.lineheight} />
                )}

                {this.props.route.params.data.action_required.length != 0 && (
                  <>
                    <View style={{marginTop: wp(3), marginBottom: wp(3)}}>
                      <Text
                        style={{
                          fontSize: wp(4),
                          fontFamily: fonts.SFuiDisplayBold,
                        }}>
                        Actions and Recommendations{' '}
                      </Text>

                      {this.props.route.params.data.action_required.map(
                        (d, i) => (
                          <Text
                            style={{
                              fontSize: wp(3),
                              fontFamily: fonts.SFuiDisplayMedium,
                            }}>
                            {i + 1}. {d.content}
                          </Text>
                        ),
                      )}
                    </View>
                  </>
                )}

                {/* Line  */}

                <View style={styles.lineheight} />
                {/* Line  */}

                {/* People */}
                <View style={{marginTop: wp(3), marginBottom: wp(3)}}>
                  <Text
                    style={{
                      fontSize: wp(4),
                      fontFamily: fonts.SFuiDisplayBold,
                    }}>
                    People
                  </Text>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontSize: wp(3),
                          fontFamily: fonts.SFuiDisplayBold,
                          marginRight: wp(30),
                        }}>
                        Initiated By :{' '}
                      </Text>
                      <Text
                        style={{
                          fontSize: wp(3),
                          fontFamily: fonts.SFuiDisplayMedium,
                        }}>
                        {' '}
                        {this.state.createdByName}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontSize: wp(3),
                          fontFamily: fonts.SFuiDisplayBold,
                          marginRight: wp(23),
                        }}>
                        Area Supervisor :{' '}
                      </Text>
                      <Text
                        style={{
                          fontSize: wp(3),
                          fontFamily: fonts.SFuiDisplayMedium,
                        }}>
                        {' '}
                        --
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontSize: wp(3),
                          fontFamily: fonts.SFuiDisplayBold,
                          marginRight: wp(21),
                          flexWrap: 'wrap',
                        }}>
                        Involved Persons :{' '}
                      </Text>
                      <Text
                        style={{
                          fontSize: wp(3),
                          fontFamily: fonts.SFuiDisplayMedium,
                        }}>
                        {' '}
                        {this.state.involvedperson.map((d) => d.name).join(',')}
                      </Text>
                    </View>
                  </View>
                </View>

                {this.state.attachments.length != 0 && (
                  <View style={styles.lineheight} />
                )}

                {this.state.attachments.length != 0 && (
                  <View>
                    <View style={{marginTop: wp(3), marginBottom: wp(3)}}>
                      <Text
                        style={{
                          fontSize: wp(4),
                          fontFamily: fonts.SFuiDisplayBold,
                        }}>
                        Attachments
                      </Text>
                    </View>
                    {/* All Attachments */}
                    <View style={{marginTop: wp(1), marginBottom: wp(5)}}>
                      {this.state.attachments.map((d: any, i: number) => (
                        <View>
                          {/* {d.type != 'image' ? ( */}
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
                                    : d.type == 'image'
                                    ? images.imageIcon
                                    : null
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
                                    // this.photoAnim.play();
                                    downloadFile(d.uri, d.type)
                                      .then((res: any) => {
                                        console.log(res);
                                      })
                                      .catch((err) => {});
                                  }
                                }}>
                                <Icon
                                  name={'clouddownload'}
                                  type={'antdesign'}
                                  color={colors.text}
                                  containerStyle={{
                                    opacity: 0.5,
                                    marginTop: wp(3),
                                    marginRight: wp(3),
                                  }}
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
                          {/* // ) : null} */}
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                <TouchableOpacity
                  onPress={() => this.printSor()}
                  style={{
                    padding: wp(4),
                    backgroundColor: colors.green,
                    borderRadius: wp(3),
                  }}>
                  <Text
                    style={{
                      fontSize: wp(3.4),
                      fontFamily: fonts.SFuiDisplayBold,
                      color: colors.secondary,
                      textAlign: 'center',
                    }}>
                    Print
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: AllSorDTO) => ({
  reduxState: state.allSors,
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Preview);

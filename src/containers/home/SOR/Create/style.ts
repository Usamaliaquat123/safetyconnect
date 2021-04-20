// import { colors } from './../../../../theme/colors';
import {StyleSheet} from 'react-native';
import {colors, fonts} from '@theme';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.primary},
  // Header
  header: {
    padding: wp(7),
    paddingLeft : wp(3),
    paddingTop: wp(5),
    paddingBottom: wp(5),
    backgroundColor: colors.primary,
  },
  title: {
    marginTop : wp(1),
    fontFamily: fonts.SFuiDisplayBold,
    fontSize: wp(4),
    marginLeft: wp(3),
    color: colors.secondary,
    // fontWeight: 'bold',
  },
  underScrore: {
    backgroundColor: colors.green,
    width: wp(6),
    marginLeft: wp(5),
    padding: wp(0.5),
    borderRadius: 10,
  },
  headertle: {flexDirection: 'row'},
  headerSelect: {
    marginTop: wp(10),
    flexDirection: 'row',
    // alignContent: 'stretch',
    position: 'relative',
    justifyContent: 'space-between',
    width: wp(100),
  },

  hselectort: {color: colors.secondary, fontWeight: 'bold', fontSize: wp(3)},
  selectorBox: {
    color: colors.secondary,
    fontSize: wp(3),
    textAlignVertical: 'top',
    padding: wp(0),
  },
  rightSelector: {flexDirection: 'row', marginRight: wp(12)},
  leftSelector: {flexDirection: 'row'},
  selector: {
    paddingLeft: 3,
    width: wp(22),
  },

  selectProjectLocationContainer : {
    paddingLeft : wp(3),
    paddingRight : wp(3),
    marginBottom : wp(5),
    marginTop : wp(5),
    // justifyContent : "space-evenly",
    flexDirection : "row",
  },
  selectProjectContainer : {

  },
  selectProjHead : {
    fontSize :wp(4),
    opacity : .6,
    fontFamily  : fonts.SFuiDisplayMedium
  },
  selectlocationHead: {
    fontSize: wp(4),
    opacity: .6,
    fontFamily: fonts.SFuiDisplayMedium
  },
  selectProj: {
    marginTop: wp(2),
    alignItems: "center",
    paddingLeft: wp(5),
    paddingRight: wp(5),
    borderWidth: wp(0.4),
    paddingTop: wp(3),
    paddingBottom: wp(3),
    borderColor: colors.textOpa,
    borderRadius: wp(1),
    flexDirection: "row",
  },
  downIcon : {
    marginLeft  :wp(7),

   opacity : .7
  },
  projName : {
    fontSize : wp(3),
    opacity : .7,
    fontFamily : fonts.SFuiDisplayMedium
  },
  locaName  : {
    fontSize : wp(3),
    opacity : .7,
    fontFamily : fonts.SFuiDisplayMedium
  },
  selectLocation : {
    marginTop : wp(2),
    alignItems : "center",
    paddingLeft : wp(5),
    paddingRight : wp(5),
    borderWidth : wp(0.4),
    paddingTop : wp(3),
    paddingBottom : wp(3),
    borderColor :colors.textOpa,
    borderRadius : wp(1),
    flexDirection : "row"
  },
  selectLocationContainer : {
    marginLeft : wp(6),
  },
  slctContainer: {
    position: 'absolute',
    top: wp(5),
    zIndex: 10,
    left: wp(13),
    backgroundColor: colors.secondary,
    // padding: wp(5),
    paddingLeft: wp(2),
    paddingRight: wp(2),
    paddingTop: wp(1),
    paddingBottom: wp(1),
    width: wp(22),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  itemH: {
    color: 'black',
    fontSize: wp(3),
    padding: wp(1),
  },
  avatarView: {
    position: 'absolute',
    right: 0,
  },

  // Content
  content: {
    // padding: wp(5),
    backgroundColor: colors.secondary,
  },

  observationDetail: {
    borderRadius: wp(5),
    padding: wp(4),
    borderColor: colors.text,
    borderWidth: wp(0.3),
  },
  observationT: {
    fontSize: wp(5),
    padding: wp(5),
    fontFamily: fonts.SFuiDisplaySemiBold,

    paddingBottom: wp(2.5),
    paddingLeft: wp(0),
    color: colors.text,
  },
  obserttle: {
    // fontWeight: 'bold',
    color: colors.text,
    fontFamily: fonts.SFuiDisplayBold,
    fontSize: wp(3.4),
  },
  lineheight: {
    height: wp(0.5),
    backgroundColor: colors.darkLightGrey,
  },
  observationDetailsContainer : {
    paddingLeft : wp(3),
    paddingRight : wp(3),
    paddingBottom : wp(5)
  },
  obInput: {borderBottomWidth: 0},
  obInputText: {
    fontSize: wp(4),
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplayMedium,
    // color: colors.text,
    opacity: 0.5,
  },
  obText: {fontWeight: 'bold', fontSize: 12},
  // SUGGESTIONS
  suggHeading: {
    fontSize: wp(3.4),
    marginTop: wp(8),
    color: colors.text,
    fontStyle: 'italic',
  },
  sugContainer: {
    marginTop: wp(2),
    marginBottom: wp(3),
  },
  sugItm: {
    marginTop: wp(2),
    marginBottom: wp(2),
    padding: wp(3),
    backgroundColor: colors.lightBlue,
    borderRadius: wp(5),
  },
  sugItmTxt: {
    fontSize: wp(3.5),
    color: colors.text,
  },
  // Classify SOR
  clasSorContainer: {
  paddingLeft : wp(3),
  paddingRight : wp(3),
  paddingBottom : wp(4),
  },
  clasSorHeading: {
    fontSize: wp(5),
    fontFamily: fonts.SFuiDisplaySemiBold,

    // fontWeight: 'bold',
    marginTop: wp(7),
    marginBottom: wp(2),
  },
    clasSorBtnCont: {
    borderRadius: wp(1),
    borderWidth: wp(0.3),
    // padding: wp(),
    paddingTop : wp(4),
    paddingBottom : wp(4),
    marginTop: wp(3),
    // alignSelf: 'stretch',
    width: wp(42),
    margin: wp(1),
    // justifyContent: 'center',
  },
  clasSorBtnV: {
    flexDirection: "row",

    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent:"space-between",
  },
  clasSorBtnWrap: {flexDirection : "row",justifyContent : "center", alignContent : "center"},
  clasSorBtnTtl: {
    textAlign: 'center',
    fontSize: wp(3),
    // marginTop: wp(2),
    marginLeft: wp(1),
  },
  // Involve Person
  involvePContainer: {
    marginTop: wp(5),
    paddingLeft  :wp(3),
    paddingRight : wp(3)
  },
  involvePText: {
    // fontWeight: 'bold',
    // color: colors.text,
    fontFamily: fonts.SFuiDisplayMedium,
    fontSize: wp(3),
  },
  involvePTextOtional: {
    fontStyle: 'italic',
    fontWeight: 'normal',
    fontFamily: fonts.SFuiDisplayThin,
    fontSize: wp(2.5),
  },
  involvePInput: {
    marginTop: wp(2),
    borderColor: colors.text,
    borderWidth: wp(0.3),
    padding: wp(2),
    paddingLeft: wp(4),
    paddingRight: wp(4),
    borderRadius: wp(3),
    fontSize: wp(3.5),
    color: colors.text,
  },
  involveSuggestCont: {
    borderColor: colors.green,
    borderRadius: wp(3),
    padding: wp(3),
    borderWidth: wp(0.3),
    marginTop: wp(1),
  },
  involvePsuggCont: {
    borderColor: colors.textOpa,
    borderBottomWidth: wp(0.1),
    paddingTop: wp(3),
    paddingBottom: wp(3),
    alignItems: 'center',
    flexDirection: 'row',
  },
  involvePSt: {
    fontSize: wp(3),
  },

  // Potiential Risk
  potentialRiskContainer : {
    flexDirection : "row",
   justifyContent : "space-between"
  },
  potientialRiskHeading : {
    color: colors.text,
    fontSize: wp(5),

    opacity : .6,
    // marginTop: wp(10),
    marginRight: wp(2),
    fontFamily: fonts.SFuiDisplaySemiBold,
  },
  riskContainer : {
    marginTop : wp(5),
    paddingLeft : wp(3),
    paddingRight : wp(3)
  },
  systemDefinedtext : { 
    fontSize : wp(3),
    fontFamily: fonts.SFuiDisplayMedium,
    opacity : .6,

  },  
  potentialRiskBadgeContainerText : {
    fontSize  :wp(3),
    fontFamily : fonts.SFuiDisplayMedium,
    
  },
  badgePotientialRisk : {
    borderWidth : wp(0.6),
    paddingLeft : wp(3),
    paddingRight : wp(3),
    paddingTop  :wp(1),
    borderRadius : wp(10),
    paddingBottom : wp(1)
  },

  RiskHeading: {
    // fontWeight: 'bold',
    color: colors.text,
    fontSize: wp(5),
    // marginTop: wp(10),
    marginRight: wp(2),
    fontFamily: fonts.SFuiDisplayBold,
  },
  uploadBorder: {
    borderRadius: wp(5),
    padding: wp(5),
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: wp(0.5),
    marginTop: wp(3),
    paddingLeft: wp(15),
    paddingRight: wp(15),
  },
  uplaodText: {
    fontWeight: 'bold',
    fontSize: wp(3),
    marginTop: wp(2),
    textAlign: 'center',
    color: colors.text,
  },
  uploadBIcmTxt: {
    paddingLeft: wp(5),
    paddingRight: wp(5),
    opacity: 0.5,
  },
  uplaodBtn: {
    padding: wp(3),
    marginTop: wp(3),
    paddingLeft: wp(15),
    paddingRight: wp(15),
    borderWidth: wp(0.3),
    borderRadius: wp(3),
    borderColor: colors.primary,
    alignItems: 'center',
  },
  uploadfileText: {
    fontSize: wp(3),
    color: colors.primary,
  },
  // Actions/ Recommendations
  actionsRecHeading: {
    fontSize: wp(5),
    color: colors.text,
    fontFamily : fonts.SFuiDisplaySemiBold
  },
  actionContainer: {
    marginTop: wp(5),
    paddingLeft : wp(3),
    paddingRight : wp(3)
  },
  actionInput: {
    marginTop: wp(2),
    borderWidth: wp(0.1),
    padding: wp(2),
    paddingLeft: wp(4),
    paddingRight: wp(4),
    borderRadius: wp(3),
    fontSize: wp(3.5),
    color: colors.text,
  },

  sbBtnText: {fontSize: wp(3), fontWeight: 'bold', color: colors.text},
  optnToggleContainer: {marginTop: wp(10)},
  optnselector: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: wp(2),
    marginBottom: wp(3),
    borderWidth: wp(0.2),
    borderRadius: wp(3),
    padding: wp(1),
    // paddingBottom: wp(0),
    borderColor: colors.text,
  },
  optnselectorText: {
    textAlignVertical: 'center',
    fontSize: wp(3),
    padding: wp(1),
    color: colors.text,
    width: wp(80),
  },
  slctSEContainer: {
    // position: 'absolute',
    // top: wp(20),
    // zIndex: wp(1),
    backgroundColor: colors.secondary,
    // padding: wp(5),
    paddingLeft: wp(2),
    paddingRight: wp(2),
    paddingTop: wp(1),
    paddingBottom: wp(1),
    marginBottom: wp(2),
    // width: wp(80),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  seitemH: {
    borderBottomWidth: wp(0.1),
    borderColor: colors.textOpa,
    color: colors.text,
    fontSize: wp(3),
    padding: wp(3),
  },
  submitsorbtn: {
    padding: wp(5),
    marginTop: wp(6),
    alignItems: 'center',
    borderColor: colors.primary,
    borderWidth: wp(0.1),
    borderRadius: wp(3),
  },
  submitsorbtntxt: {
    fontSize: wp(3),
    color: colors.primary,
    fontWeight: 'bold',
  },
  submitsorbtnSb: {
    padding: wp(5),
    marginTop: wp(3),
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderWidth: wp(0.1),
    borderRadius: wp(3),
  },
  submitsorbtnSbtxt: {
    fontSize: wp(3),
    color: colors.secondary,
    fontWeight: 'bold',
  },
  errHeadPop: {
    fontSize: wp(4),
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.error,
  },
  errEmailPassDesc: {
    marginTop: wp(2),
    textAlign: 'center',
    fontSize: wp(3),
    color: colors.text,
  },
  plzTryAgain: {
    textAlign: 'center',
    fontSize: wp(3),
    color: colors.text,
  },
  modelContainer: {
    backgroundColor: colors.secondary,
    padding: wp(10),
    borderRadius: wp(5),
  },

  actionText: {fontSize: wp(3.5), fontWeight: 'bold', color: colors.primary},
  sugForYouText: {
    fontSize: wp(3),
    color: colors.text,
    fontWeight: 'bold',
    marginTop: wp(1),
  },
  actionRecomCon: {
    padding: wp(3),
    marginTop: wp(3),
    borderRadius: wp(4),
  },
  obvTextAction: {
    // fontWeight: 'bold',
    fontSize: wp(3.3),
    marginTop: wp(3),
    color: colors.primary,
  },
  subAss: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: wp(3),
  },
  subAssText: {
    // fontWeight: 'bold',
    fontSize: wp(2.8),
    opacity: 0.5,
  },
  subAssuser: {
    // marginLeft: wp,
    // fontStyle: 'italic',
  },
  textaddActionContainer: {
    width: wp(70),
    fontSize: wp(3.5),
  },
  addActionAndRecommendation: {
    borderWidth: wp(0.3),
    borderRadius: wp(3),
    marginTop: wp(3),
    paddingLeft: wp(1),
    borderColor: colors.lightGrey,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusARText: {
    color: colors.text,
    opacity: 0.8,
    fontSize: wp(3),
    marginLeft: wp(3),
  },
  actionTypeElemAsdmin: {
    fontSize: wp(2.7),
    opacity: 0.5,
  },
  nosuchActionsAndRecommendations: {
    marginTop: wp(3),
    fontSize: wp(3),
    opacity: 0.5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveAsDraftContainer: {
    width: wp(45),
    borderColor: colors.primary,
    borderWidth: wp(0.3),
    padding: wp(4),
    marginRight: wp(3),
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveAsDraftText: {
    color: colors.primary,
    fontSize: wp(3),
  },
  saveAsSubmitText: {
    fontSize: wp(3),
    color: colors.secondary,
  },
  saveAsSubmitContainer: {
    width: wp(45),
    backgroundColor: colors.primary,
    padding: wp(4),
    justifyContent: 'center',
    borderRadius: wp(4),
    alignItems: 'center',
  },
});

export default styles;

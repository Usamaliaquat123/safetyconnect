import {StyleSheet} from 'react-native';
import {colors, fonts} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
// Observation Details

observationsDetailsContainer :  {

},
observationIdContainer : {
  flexDirection  :"row"

},

observationIdTitle  : {
  fontSize : wp(3.7),
  opacity : .6,
  fontFamily : fonts.SFuiDisplaySemiBold
},
observationIdAns : {
  fontSize : wp(3.7),
 opacity : .6,
  fontFamily : fonts.SFuiDisplayMedium
},
observationTypeContainer :{ 

flexDirection  :"row"

},
observationTypettle : {
   fontSize : wp(3.7),
   opacity : .6,
   fontFamily : fonts.SFuiDisplaySemiBold
},

reportedOnContainer : {
  flexDirection : "row",

},
reportedOnText : {
fontSize : wp(3.7),
opacity : .6,
fontFamily: fonts.SFuiDisplaySemiBold
},
reportedOnAns : {
  marginLeft : wp(4),
  fontSize : wp(3.7),
  opacity : .6,
  fontFamily : fonts.SFuiDisplayMedium
},
projectNameContainer :  {
    flexDirection  :"row",

},
projectNameTitle:  {
  fontSize  :wp(3.7),
  opacity: .6,
  fontFamily  :fonts.SFuiDisplayMedium
},

projectNameAns : {
  fontSize : wp(3.7),
  fontFamily :fonts.SFuiDisplayMedium,
opacity : .6
},
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  header: {
    padding: wp(3),
    // paddingRight: wp(7),
    paddingLeft: wp(5),
    paddingTop : wp(7),
    // flex: 1,
    backgroundColor: colors.primary,
  },
  title: {
    marginTop: wp(1),
    fontSize: wp(4),
    marginLeft: wp(3),
    color: colors.secondary,
    fontWeight: 'bold',
  },
  underScrore: {
    backgroundColor: colors.green,
    width: wp(6),
    marginLeft: wp(5),
    padding: wp(0.5),
    borderRadius: 10,
  },
  avatarView: {
    position: 'absolute',
    right: 0,
  },

  headertle: {flexDirection: 'row'},
  content: {
    flex: 1,
    // flex: 3,
    // marginTop: wp(80),

    backgroundColor: colors.secondary,
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    // padding: wp(8),
    // paddingLeft: wp(5),
    // paddingRight: wp(5),
    paddingTop: wp(8),
    paddingBottom: wp(8),
    // height: wp(150),
  },
  clasifyT: {
    fontSize: wp(3.5),
    // marginTop: wp(1),
    fontFamily : fonts.SFuiDisplayLight,
    marginLeft: wp(2),
    color: colors.text,
  },
  classittleicon: {
    flexDirection: 'row',
    marginLeft  : wp(5),
    alignItems : "center"
  },
  contentPadding: {
    paddingLeft: wp(5),
    paddingRight: wp(5),
  },
  obserContainer: {marginTop: wp(3)},
  observationText: {
    fontWeight: '800',
    color: colors.primary,

    fontSize: wp(3.5),
  },
  observationDate: {
    fontSize: wp(2.7),
    fontWeight: '500',
    color: colors.text,
    opacity: 0.5,
    marginTop: wp(1),
  },
  subContainer: {
    flexDirection: 'row',
    marginTop: wp(3),
  },
  submittedTo: {
    flexDirection: 'row',
  },
  observerTo: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
  subText: {
    fontSize: wp(3),
    color: colors.text,
    fontFamily: fonts.SFuiDisplayMedium,
  },
  obvText: {
    fontSize: wp(3),
    color: colors.text,
  },
  tabs: {marginTop: wp(5)},
  involveNortify: {
    marginTop: wp(10),
  },
  notifiedSec: {
    marginTop: wp(2),
    flexDirection: 'row',
  },
  invpText: {
    fontSize: wp(3.2),
    marginTop: wp(1),
    marginRight: wp(10),
  },
  notifyPText: {
    fontSize: wp(3.2),
    marginTop: wp(1),
    // marginRight: wp(5),
  },
  addCircle: {
    borderRadius: wp(10),
    // padding:  wp(),
    width: wp(8),
    justifyContent: 'center',
    height: wp(8),
    backgroundColor: colors.primary,
    marginLeft: wp(4),
  },
  addPopupCircle: {
    borderRadius: wp(10),
    // padding:  wp(),
    width: wp(12),
    justifyContent: 'center',
    height: wp(12),
    backgroundColor: colors.primary,
    marginLeft: wp(4),
  },
  tabsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },

  iconNametbs: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  obname: {
    fontSize: wp(3.4),
    color: colors.primary,
    marginTop: wp(1),
    marginLeft: wp(2),
  },
  obType: {
    fontSize: wp(3),
    fontWeight: 'bold',
    marginTop: wp(4),
  },
  tbsCont: {
    backgroundColor: colors.Viewcont,
    padding: wp(5),
    // width: wp(43),
    // alignSelf: 'stretch',
    width: wp('42%'),
    margin: wp(1),
    alignItems: 'center',
    borderRadius: wp(3),
  },
  // Risk x Siverty
  risk: {
    marginTop: wp(5),
  },
  riskText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: wp(3.4),
  },
  riskttle: {
    fontStyle: 'italic',
    fontSize: wp(3),
    color: colors.primary,
  },
  riskIcon: {
    margin: wp(2),
    backgroundColor: colors.riskIcons.orrange,
    borderRadius: wp(1.3),
    padding: wp(5),
  },
  riskIconText: {
    position: 'absolute',
    top: wp(2.5),
    left: wp(2.5),
    fontWeight: 'bold',
    fontSize: wp(4),
  },
  // action & recommendation
  actionContainer: {marginTop: wp(5)},
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
  inProgrssText: {
    fontSize: wp(3.4),
    color: colors.text,
    fontWeight: 'bold',
    opacity: 0.5,
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
  statusARText: {
    color: colors.text,
    opacity: 0.8,
    fontSize: wp(3),
    marginLeft: wp(3),
  },
  attachmentsContainer: {
    marginTop: wp(5),
    marginBottom: wp(10),

    // flexWrap: 'wrap',
    // flexDirection: 'row',
    // alignSelf: 'center',
  },
  AttchimageContainer: {
    width: wp(43),
    height: wp(30),
    borderRadius: wp(3),
    margin: wp(1),
  },
  attachFileContainer: {
    padding: wp(5),
    borderRadius: wp(3),
    marginTop: wp(3),
    backgroundColor: colors.lightBlue,
    // justifyContent: 'space-between',
    flexDirection: 'row',
  },
  attchFileText: {
    fontSize: wp(2.7),
    fontStyle: 'italic',
    color: colors.text,
    opacity: 0.7,
    marginLeft: wp(5),
    marginTop: wp(2),
  },
  actionTypeElemAsdmin: {
    fontSize: wp(2.7),
    opacity: 0.5,
  },
  involveSuggestCont: {
    borderColor: colors.green,
    borderRadius: wp(3),
    padding: wp(3),
    borderWidth: wp(0.3),
    marginTop: wp(1),
  },
  commentSuggContainer: {
    borderColor: colors.darkLightGrey,
    borderRadius: wp(3),
    padding: wp(2),
    borderWidth: wp(0.3),
    marginTop: wp(1),
    marginLeft: wp(7),
    marginRight: wp(3),
  },
  involvePSt: {
    fontSize: wp(3),
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
  commentPSuggCont: {
    borderColor: colors.textOpa,
    borderBottomWidth: wp(0.1),
    paddingTop: wp(1),
    paddingBottom: wp(3),
    alignItems: 'center',
    flexDirection: 'row',
  },
  involvePsuggCont: {
    borderColor: colors.textOpa,
    borderBottomWidth: wp(0.1),
    paddingTop: wp(3),
    paddingBottom: wp(3),
    alignItems: 'center',
    flexDirection: 'row',
  },
  textaddActionContainer: {
    width: wp(70),
    fontSize: wp(3.5),
  },
  // comments sections
  commentsSections: {
    marginTop: wp(4),
    backgroundColor: colors.lightBlue,
    padding: wp(4),
    paddingLeft: wp(6),
  },
  userComments: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: wp(3),
    // alignItems: 'center',
  },
  userCommentName: {
    fontSize: wp(3),
    color: colors.text,
    opacity: 0.7,
    fontFamily: fonts.SFuiDisplayBold,
  },
  usercomment: {
    fontFamily: fonts.SFuiDisplayLight,
    fontSize: wp(2.7),
    width: wp(50),
  },
  commentUser: {
    // flexDirection: "row",
    // marginTop: wp(0.7),
    marginLeft: wp(2),
  },
  dateComments: {
    position: 'absolute',
    right: wp(3),
    top: 0,
  },
  dateTextComment: {
    fontSize: wp(2.7),
    fontFamily: fonts.SFuiDisplayLight,
    opacity: 0.5,
  },
  commentTextInput: {
    width: wp(80),
    backgroundColor: colors.secondary,
    borderRadius: wp(4),
    alignItems: 'center',
    borderWidth: wp(0.2),
    // padding: wp(1),
    flexDirection: 'row',
    paddingLeft: wp(3),
    borderColor: colors.lightGrey,
  },

  // model for pictup images
  takeaPhotoContainer: {
    marginTop: wp(10),

    flexDirection: 'row',
  },
  selectText: {
    opacity: 0.5,
    textAlignVertical: 'top',
    fontWeight: 'bold',
  },
  lottieDownloadContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: wp(-2),
    top: wp(2),
    zIndex: wp(1),
  },
  attachmentsFont: {
    fontSize: wp(3),
    fontWeight: 'bold',
  },
  youdonthaveAnyAttachments: {
    fontSize: wp(3),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: wp(5),
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

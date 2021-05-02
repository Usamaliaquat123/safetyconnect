import {StyleSheet, Dimensions, Platform} from 'react-native';
import {colors, fonts} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  header: {
    padding: wp(5),
    paddingRight: wp(7),
    paddingLeft: wp(7),
    flex: 1,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: wp(4),
    marginLeft: wp(3.5),
    color: colors.secondary,
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplaySemiBold,
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
    marginTop: wp(2),
    marginLeft: wp(11),
    flexDirection: 'row',
    // alignContent: 'stretch',
    justifyContent: 'space-between',
    width: wp(100),
  },
  plzTryAgain: {
    textAlign: 'center',
    fontSize: wp(3),
    marginLeft: wp(2),
    fontWeight: 'bold',
    // padding: wp(3),
    color: colors.text,
  },
  errEmailPassDesc: {
    marginTop: wp(2),
    marginLeft: wp(2),

    textAlign: 'center',
    fontSize: wp(3),
    // padding: wp(3),
    fontWeight: 'bold',

    color: colors.text,
  },
  modelContainer: {
    backgroundColor: colors.secondary,
    padding: wp(10),
    borderRadius: wp(5),
  },
  content: {
    flex: 1,
    // maxHeight: '100%',
    // marginBottom: wp(10),
    // height: '100%',
    // paddingBottom: wp(60),
    backgroundColor: colors.secondary,
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
  },
  errHeadPop: {
    fontSize: wp(4),
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.primary,
  },
  hselectort: {color: colors.secondary, fontWeight: 'bold', fontSize: wp(3)},
  selectorBox: {
    color: colors.secondary,
    fontSize: wp(3.4),
    fontWeight: 'bold',
    // letterSpacing: wp(0.2),
  },
  rightSelector: {flexDirection: 'row', marginRight: wp(12)},
  leftSelector: {flexDirection: 'row'},
  selector: {
    paddingLeft: 3,
    width: wp(20),
  },

  slctContainer: {
    position: 'absolute',
    top: wp(5),
    // zIndex: wp(5),
    // left: wp(13),
    backgroundColor: colors.secondary,
    // padding: wp(5),
    paddingLeft: wp(2),
    paddingRight: wp(2),
    paddingTop: wp(1),
    paddingBottom: wp(1),
    // width: wp(22),
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,

    // elevation: 3,
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
  // cards
  notifiedTextContaienr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: wp(10),
    paddingRight: wp(5),
    marginBottom: wp(3),
  },
  notifiedText: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: colors.primary,
  },
  cardConatiner: {
    marginLeft: wp(5),
    marginBottom: wp(5),
    marginRight: wp(1),
  },
  // draft
  draftTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: wp(8),
    paddingRight: wp(5),
    marginBottom: wp(3),
  },
  draftText: {
    fontSize: wp(3.5),
    fontWeight: 'bold',
    color: colors.primary,
  },
  draftCardContainer: {
    // marginLeft: wp(1),
    marginBottom: wp(5),
    // marginRight: wp(1),
  },
  // submite
  submitTextContaienr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: wp(3),
    paddingLeft: wp(6),
    paddingRight: wp(12),
  },
  submitText: {
    fontSize: wp(3.4),
    fontWeight: 'bold',
    color: colors.primary,
  },
  submitCardContainer: {
    marginLeft: wp(1),
    marginBottom: wp(5),
    marginRight: wp(7),
  },

  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: wp(3),
  },
  listDraftText: {
    fontSize: wp(4),
    // fontWeight: 'bold',
    color: colors.primary,
    fontFamily: fonts.SFuiDisplayBold,
    marginTop: wp(-1),
    marginLeft: wp(5),
  },
  listViewContent: {
    marginTop: wp(5),
    marginLeft: wp(3),
  },
  filterHeader: {
    position: 'absolute',
    right: wp(4),
    flexDirection: 'row',
    marginTop: wp(-1),
  },
  filterText: {
    paddingLeft: wp(1),
    fontSize: wp(3),
    marginTop: wp(0.6),
    color: colors.primary,
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplayBold,
  },
  inProgressTop: {
    paddingBottom: wp(5),
    marginTop: wp(5),
    paddingLeft: wp(3),
    paddingRight: wp(3),
  },
  closedTop: {
    paddingLeft: wp(3),
    marginTop: wp(5),

    paddingRight: wp(3),
  },

  lineheight: {
    height: wp(0.7),
    backgroundColor: colors.darkLightGrey,
  },
  nonReport: {
    justifyContent: 'center',
    height: wp(140),
  },
  nonReportText: {
    textAlign: 'center',
    fontSize: wp(3),
    opacity: 0.5,
  },
  noncreate: {
    textAlign: 'center',
    fontSize: wp(3),
    opacity: 0.5,
  },
  noneCreatetext: {
    textAlign: 'center',
    fontSize: wp(3),
    fontWeight: 'bold',
    opacity: 0.7,
    color: colors.primary,
  },

  searchbarContainer: {
    backgroundColor: colors.secondary,
    padding: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  filerText: {
    fontSize: wp(4),
    fontFamily: fonts.SFuiDisplayMedium,
    marginLeft: wp(3),
    color: colors.primary,
    marginRight: wp(3),
  },
  optnselectorText: {
    fontSize: wp(4),
    width: wp(52),
    fontFamily: fonts.SFuiDisplayMedium,
  },
  searchContainer: {
    // padding: wp(3),
    alignItems: 'center',
    width: wp(68),
    height: wp(13),
    flexDirection: 'row',
    borderWidth: wp(0.5),
    paddingLeft: wp(3),
    borderRadius: wp(1),
    borderColor: colors.darkLightGrey,
  },

  // Lottie files loading container
  lottiefilesLoading: {
    alignSelf: 'center',
    marginTop: wp(40),
    marginBottom: wp(40),
  },
  // loading text
  loadingtext: {
    fontSize: wp(3),
    opacity: 0.5,
    textAlign: 'center',
    marginTop: wp(-5),
  },
});

export default styles;

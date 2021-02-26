import {StyleSheet, Dimensions, Platform} from 'react-native';
import {colors} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  header: {
    padding: wp(5),
    paddingRight: wp(7),
    paddingLeft: wp(7),
    // flex: 1,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: wp(3.5),
    marginLeft: wp(5),
    color: colors.secondary,
    // fontWeight: 'bold',
    fontFamily: 'SFuiDisplayBlack',
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
  content: {
    // flex: 1,
    // height: hp(100),
    backgroundColor: colors.secondary,
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
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
    fontSize: wp(4),
    fontWeight: 'bold',
    color: colors.primary,
  },
  draftCardContainer: {
    marginLeft: wp(1),
    marginBottom: wp(5),
    marginRight: wp(1),
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
    fontSize: wp(4),
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
    fontSize: wp(3.4),
    // fontWeight: 'bold',
    color: colors.text,
    fontFamily: 'SFuiDisplayBold',
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
    // fontWeight: 'bold',
    fontFamily: 'SFuiDisplayBold',
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
    height: wp(2),
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
});

export default styles;

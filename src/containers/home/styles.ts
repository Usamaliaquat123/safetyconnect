import {StyleSheet} from 'react-native';
import {colors, fonts} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  avatarView: {
    // position: 'absolute',
    // right: 0,
    flexDirection: 'row',
  },
  iconImages: {
    width: wp(12),
    height: wp(12),
  },
  orgLogo: {
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(3),
    padding: wp(2),
  },
  orgLogoPng: {width: wp(10), height: wp(10)},

  headertle: {flexDirection: 'row'},
  underScrore: {
    backgroundColor: colors.green,
    width: wp(6),
    marginLeft: wp(3),
    padding: wp(0.5),
    borderRadius: 10,
  },
  header: {
    padding: wp(7),
    paddingLeft: wp(4),
    paddingTop: wp(7),
    paddingBottom: wp(7),
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: wp(3.6),
    fontFamily: fonts.SFuiDisplayMedium,
    marginLeft: wp(3),
    color: colors.secondary,
  },
  orgTitle: {
    fontSize: wp(5),
    marginLeft: wp(3),
    fontFamily: fonts.SFuiDisplaySemiBold,
    color: colors.secondary,
    fontWeight: 'bold',
  },

  content: {
    // padding: wp(5),
    // backgroundColor: colors.darkLightGrey,
    backgroundColor: '#F6F6F6',
    // flex: 2,

    // marginTop: wp(80),
    // borderTopLeftRadius: wp(4),
    // borderTopRightRadius: wp(4),
  },

  // Content

  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',

    padding: wp(5),
    backgroundColor: colors.secondary,
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
  },
  item: {
    backgroundColor: '#F0F7ED',
    borderRadius: wp(5),
    padding: wp(7),
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(25),
  },
  itemText: {
    fontSize: wp(3),
    fontFamily: fonts.SFuiDisplayMedium,
    textAlign: 'center',
    flexWrap: 'wrap',
    marginTop: wp(1.4),
    width: wp(20),
  },
  badge: {
    borderRadius: wp(10),
    alignItems: 'center',
    width: wp(2),
    position: 'absolute',
    top: wp(-2),
    right: wp(1),
    padding: wp(2),
    justifyContent: 'center',
    backgroundColor: colors.error,
  },
  badgeText: {
    position: 'absolute',
    fontSize: wp(2),
    color: colors.secondary,
  },
  recentActivity: {
    marginTop: wp(2),
    // padding: wp(5),
    // paddingTop: wp(5),
    paddingBottom: wp(5),
    backgroundColor: colors.secondary,
  },
  perfStats: {
    marginTop: wp(1.5),
    paddingBottom: wp(10),
    // padding: wp(5),
    backgroundColor: colors.secondary,
  },
  actHeading: {
    fontSize: wp(4),
    fontFamily: fonts.SfuiDisplayHeavy,
    color: 'black',
  },
  recentlyHead: {
    alignItems: 'center',
    // padding: wp(3),
    paddingLeft: wp(5),
    paddingRight: wp(5),
    paddingBottom: wp(1),
    backgroundColor: '#F6F6F6',
    flexDirection: 'row',
  },
  viewAll: {
    fontSize: wp(3.3),
    position: 'absolute',
    right: wp(0),
  },
  tabs: {
    // justifyContent: 'center',
    marginTop: wp(2),
    marginBottom: wp(2),
    flexDirection: 'row',
  },
  tab: {
    borderWidth: wp(0.1),
    // borderRadius: wp(2.2),÷
    // paddingTop: wp(2),
    // paddingBottom: wp(2),
    // paddingRight: wp(8),
    // paddingLeft: wp(8),
    width: wp(27),
    height: wp(9),
    alignItems: 'center',
    borderColor: colors.textOpa,

    justifyContent: 'center',
  },
  tabText: {
    position: 'absolute',
    // top: wp(2),
    fontSize: wp(3),
    opacity: 0.5,
    color: colors.text,
    // color: '#CBCBCB',
  },
  tabsContent: {
    marginTop: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContent: {
    fontSize: wp(3.2),
  },
  guideColors: {
    flexDirection: 'row',
    marginTop: wp(5),
    // justifyContent: 'center',
    alignItems: 'center',
  },
  swatch: {
    width: wp(2.5),
    alignSelf: 'center',
    marginRight: wp(1.5),
    height: wp(2.5),
    backgroundColor: colors.error,
    borderRadius: wp(10),
  },
  guideitem: {
    // padding: wp(3),
    flexDirection: 'row',
  },
  guideText: {
    fontSize: wp(3),
  },

  nonReport: {
    justifyContent: 'center',
    height: wp(140),
  },
  nonReportText: {
    textAlign: 'center',
    fontSize: wp(2.5),
    opacity: 0.5,
  },
  noncreate: {
    textAlign: 'center',
    fontSize: wp(2.5),
    opacity: 0.5,
  },
  noneCreatetext: {
    textAlign: 'center',
    fontSize: wp(2.5),
    fontWeight: 'bold',
    opacity: 0.7,
    color: colors.primary,
  },
  modelContainer: {
    backgroundColor: colors.secondary,
    padding: wp(10),
    borderRadius: wp(5),
  },
  errEmailPassDesc: {
    // marginTop: wp(2),
    marginRight: wp(5),
    textAlign: 'center',
    fontSize: wp(3),
    // padding: wp(3),
    fontWeight: 'bold',

    color: colors.text,
  },

  errHeadPop: {
    fontSize: wp(4),
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.primary,
  },
  plzTryAgain: {
    textAlign: 'center',
    fontSize: wp(3),
    marginLeft: wp(2),
    // padding: wp(3),
    fontFamily: fonts.SFuiDisplayBold,
    color: colors.primary,
  },
});

export default styles;

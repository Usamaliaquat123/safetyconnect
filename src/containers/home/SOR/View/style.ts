import {StyleSheet} from 'react-native';
import {colors} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {color} from 'react-native-reanimated';
import {withOrientation} from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    padding: wp(5),
    paddingRight: wp(7),
    paddingLeft: wp(7),
    flex: 1,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: wp(4),
    marginLeft: wp(5),
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
    // flex: 3,
    marginTop: wp(5),
    backgroundColor: colors.secondary,
    borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
    padding: wp(8),
    paddingLeft: wp(5),
    paddingRight: wp(5),
    // height: wp(150),
  },
  clasifyT: {
    fontSize: wp(4),
    fontWeight: 'bold',
    marginTop: wp(1),
    marginLeft: wp(2),
    color: colors.primary,
  },
  classittleicon: {
    flexDirection: 'row',
  },
  obserContainer: {marginTop: wp(3)},
  observationText: {
    fontWeight: 'bold',
    color: colors.text,
    fontSize: wp(5),
  },
  observationDate: {
    fontSize: wp(3),
    fontWeight: 'bold',
    color: colors.text,
    opacity: 0.5,
    marginTop: wp(2),
  },
  tabs: {marginTop: wp(5)},
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
    fontSize: wp(3.4),
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
    fontSize: wp(4),
  },
  riskttle: {
    fontStyle: 'italic',
    fontSize: wp(3),
    color: colors.primary,
  },
  riskIcon: {
    margin: wp(2),
    backgroundColor: colors.riskIcons.orrange,
    borderRadius: wp(5),
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
  actionText: {fontSize: wp(4), fontWeight: 'bold', color: colors.primary},
  actionRecomCon: {
    padding: wp(7),
    marginTop: wp(3),
    borderRadius: wp(4),
    backgroundColor: colors.lightBlue,
  },
  inProgrssText: {
    fontSize: wp(3.4),
    color: colors.text,
    fontWeight: 'bold',
    opacity: 0.5,
  },
  obvTextAction: {
    fontWeight: 'bold',
    fontSize: wp(3.5),
    marginTop: wp(3),
    color: colors.primary,
  },
  subAss: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: wp(3),
  },
  subAssText: {
    fontWeight: 'bold',
    fontSize: wp(3),
    // opacity: 0.5,
  },
  subAssuser: {
    // marginLeft: wp,
    // fontStyle: 'italic',
  },
  attachmentsContainer: {
    marginTop: wp(5),
    marginBottom: wp(10),
    // flexWrap: 'wrap',
    // flexDirection: 'row',
    // alignSelf: 'center',
  },
  AttchimageContainer: {
    width: wp(40),
    height: wp(30),
    borderRadius: wp(5),
    margin: wp(1),
  },
  attachFileContainer: {
    padding: wp(5),
    borderRadius: wp(5),
    backgroundColor: colors.lightBlue,
    // justifyContent: 'space-between',
    flexDirection: 'row',
  },
  attchFileText: {
    fontSize: wp(3),
    color: colors.text,
    opacity: 0.7,
    marginLeft: wp(5),
    marginTop: wp(1),
  },
});

export default styles;

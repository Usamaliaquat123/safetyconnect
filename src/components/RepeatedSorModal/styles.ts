import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors, fonts} from '@theme';
const styles = StyleSheet.create({
  container: {
    padding: wp(5),
    flex: 1,
    paddingTop: wp(0),
    paddingBottom: wp(0),
    borderRadius: wp(1),
    backgroundColor: colors.secondary,
  },
  headingContainer: {
    marginTop: wp(5),
    fontSize: wp(3.7),
    fontFamily: fonts.SFuiDisplayBold,
    // textAlign: 'center',
    // ,        fontWeight: "bold"
  },
  containerCard: {
    // backgroundColor: colors.lightBlue,
    padding: wp(3),
    borderRadius: wp(5),
    marginBottom: wp(5),
  },
  cardHeadng: {
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplayBold,
    color: colors.primary,
    fontSize: wp(3.4),
  },
  cardConatiner: {
    // marginLeft: wp(5),
    // backgroundColor: colors.secondary,
    marginBottom: wp(5),
    // marginRight: wp(1),
  },
  containerStyleOfFiledTick: {
    top: wp(-1),
    position: 'absolute',
    right: wp(2),
  },
  containerStyleOfNotTick: {
    opacity: 0.6,
    position: 'absolute',
    right: wp(2),
    top: wp(-1),
  },
  bottomBtns: {
    marginTop: wp(2),
    flexDirection: 'row',
    padding: wp(3),
    alignContent: 'center',
    marginBottom: wp(10),
  },
  skipBtn: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  submitBtn: {
    // backgroundColor: colors.primary,
    padding: wp(4),
    paddingLeft: wp(10),
    borderRadius: wp(3),
    paddingRight: wp(10),
    position: 'absolute',
    right: wp(3),
  },
  subBtnText: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: wp(3),
  },
});

export default styles;

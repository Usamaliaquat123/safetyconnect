import {StyleSheet} from 'react-native';
import {colors} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  header: {
    padding: wp(7),
    paddingLeft: wp(4),
    paddingTop: wp(5),
    paddingBottom: wp(5),
    backgroundColor: colors.primary,
  },
  headertle: {flexDirection: 'row'},
  underScrore: {
    backgroundColor: colors.green,
    width: wp(6),
    marginLeft: wp(3),
    padding: wp(0.5),
    borderRadius: 10,
  },
  orgTitle: {
    // fontSize: wp(5),
    // marginLeft: wp(3),
    // color: colors.secondary,
    fontWeight: 'bold',
    fontSize: wp(3.5),
    marginLeft: wp(5),
    color: colors.secondary,
    // fontWeight: 'bold',
    fontFamily: 'SFuiDisplayBlack',
  },
  orgLogo: {
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(3),
    padding: wp(2),
  },
  content: {
    paddingBottom: wp(5),
    backgroundColor: colors.secondary,
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
  },
  recentlyText: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default styles;

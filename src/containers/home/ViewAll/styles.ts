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
    paddingTop: wp(7),
    paddingBottom: wp(7),
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
    fontSize: wp(5),
    marginLeft: wp(3),
    color: colors.secondary,
    fontWeight: 'bold',
  },
  orgLogo: {
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(3),
    padding: wp(2),
  },
  content: {
    // padding: wp(5),
    backgroundColor: colors.darkLightGrey,
    // paddingTop: wp(3),
    // flex: 2,
    // marginTop    : wp(80),
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

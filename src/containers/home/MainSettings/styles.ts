import {StyleSheet} from 'react-native';
import {colors} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {fonts} from '@theme';
const styles = StyleSheet.create({
  headertle: {flexDirection: 'row', alignItems: 'center'},
  underScrore: {
    backgroundColor: colors.green,
    width: wp(6),
    marginLeft: wp(3),
    padding: wp(0.5),
    borderRadius: 10,
  },
  header: {
    padding: wp(7),
    paddingTop: wp(4),
    paddingBottom: wp(4),
    backgroundColor: colors.primary,
  },
  content: {
    padding: wp(5),
    backgroundColor: colors.secondary,
    flex: 1,
    // flex: 2,
    // marginTop: wp(80),
    // borderTopLeftRadius: wp(8),
    // borderTopRightRadius: wp(8),
  },
  title: {
    fontSize: wp(4),
    marginLeft: wp(3),
    color: colors.secondary,
    fontFamily: fonts.SFuiDisplayBold,
  },
});

export default styles;

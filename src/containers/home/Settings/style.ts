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
  title: {
    fontSize: wp(4),
    marginLeft: wp(3),
    color: colors.secondary,
    fontFamily: fonts.SFuiDisplayBold,
  },
  inputContainer: {
    marginTop: wp(2),
    borderColor: colors.primary,
    borderWidth: wp(0.2),
    paddingLeft: wp(3),

    borderRadius: wp(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitsorbtnSb: {
    padding: wp(5),
    // width: wp(45),
    borderColor: colors.green,
    marginTop: wp(6),
    alignItems: 'center',
    backgroundColor: colors.green,
    borderWidth: wp(0.3),
    borderRadius: wp(3),
  },
  submitsorbtnSbtxt: {
    fontSize: wp(4),
    color: colors.secondary,
    fontFamily: fonts.SFuiDisplayBold,
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
  authInputs: {
    fontSize: wp(3),
    width: wp(70),
    fontFamily: fonts.SFuiDisplayMedium,
  },
});

export default styles;

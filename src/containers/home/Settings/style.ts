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
    padding: wp(3),
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
  errEmailPassDesc: {
    marginTop: wp(2),
    textAlign: 'center',
    fontSize: wp(3),
    color: colors.text,
  },

  errHeadPop: {
    fontSize: wp(4),
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.error,
  },
  plzTryAgain: {
    textAlign: 'center',
    fontSize: wp(3),
    color: colors.text,
  },
  modelContainer: {
    backgroundColor: colors.secondary,
    padding: wp(10),
    borderRadius: wp(5),
  },
  content: {
    padding: wp(5),
    backgroundColor: colors.secondary,
    flex: 1,
    // flex: 2,
    // marginTop: wp(80),
    // borderTopLeftRadius: wp(8),
    // borderTopRightRadius: wp(8),
  }, // Lottie files loading container
  lottiefilesLoading: {
    alignSelf: 'center',
    marginTop: wp(40),
    marginBottom: wp(40),
  },
  involvePSt: {
    fontSize: wp(2.7),
    opacity: 0.5,
    fontFamily: fonts.SFuiDisplayLight,
  },
  involvePsuggCont: {
    borderColor: colors.textOpa,
    borderBottomWidth: wp(0.1),
    paddingTop: wp(3),
    paddingBottom: wp(3),
    alignItems: 'center',
    flexDirection: 'row',
  },
  involveSuggestCont: {
    borderColor: colors.text,
    borderRadius: wp(3),
    padding: wp(3),
    borderWidth: wp(0.2),
    marginTop: wp(1),
  },
  // loading text
  loadingtext: {
    fontSize: wp(3),
    opacity: 0.5,
    textAlign: 'center',
    marginTop: wp(-5),
  },
  authInputs: {
    fontSize: wp(3),
    width: wp(70),
    fontFamily: fonts.SFuiDisplayMedium,
  },
});

export default styles;

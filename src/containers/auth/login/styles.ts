import {colors, fonts} from '@theme';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  header: {
    padding: wp(7),
    paddingTop: wp(1),
    paddingBottom: wp(3),
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
    width: wp(3),
    marginLeft: wp(5),
    padding: wp(0.5),
    borderRadius: 10,
  },
  headertle: {flexDirection: 'row'},
  //  content
  content: {
    flex: 1,
    padding: wp(5),
    backgroundColor: colors.secondary,
  },
  headingContainer: {
    fontSize: wp(5),
    color: colors.primary,
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplayBold,
  },
  inputsContainer: {
    marginTop: wp(7),
  },
  emailTextContainer: {
    fontSize: wp(3),
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplayMedium,
  },
  inputContainer: {
    marginTop: wp(2),
    borderColor: colors.text,
    borderWidth: wp(0.4),
    paddingLeft: wp(3),
    padding: wp(3),
    borderRadius: wp(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  passTextContainer: {
    marginTop: wp(4),
    fontSize: wp(3),
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplayMedium,
  },
  authInputs: {
    fontSize: wp(3),
    width: wp(70),
    fontFamily: fonts.SFuiDisplayMedium,
  },
  forgetPassText: {
    fontSize: wp(3),
    color: colors.green,
    fontWeight: 'bold',
    opacity: 0.7,
    marginTop: wp(2),
  },
  eyeIconContainer: {
    position: 'absolute',
    right: wp(3),
  },
  signinText: {
    fontSize: wp(3.5),
    fontFamily: fonts.SFuiDisplayMedium,
    color: colors.secondary,
  },
  signinTextGoogle: {
    fontSize: wp(3.4),
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplayMedium,
    color: colors.text,
  },
  siginBtnContainer: {
    flexDirection: 'row',
    marginTop: wp(2),
    alignSelf: 'center',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(90),
    padding: wp(4),
    borderRadius: wp(1),
  },
  siginwithGoogle: {
    marginTop: wp(5),
    alignSelf: 'center',
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(90),
    padding: wp(3),
    flexDirection: 'row',
    borderWidth: wp(0.3),
    borderColor: colors.text,
    borderRadius: wp(1),
  },
  orContainer: {
    marginTop: wp(5),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  line: {
    width: wp(40),
    borderTopWidth: wp(0.1),
    marginTop: wp(2.3),
  },
  orText: {
    fontSize: wp(3.8),
    opacity: 0.5,
    marginLeft: wp(3),
    marginRight: wp(3),
  },
  dontHaveAccount: {
    textAlign: 'center',
    fontSize: wp(3),
    color: colors.text,
    fontFamily: fonts.SFuiDisplayMedium,
    // opacity: 0.7,
    marginTop: wp(18),
  },
  passwordError: {
    fontSize: wp(3),
    color: colors.text,
    opacity: 0.7,
    marginTop: wp(1),
  },
  createNewAccount: {
    color: colors.primary,
    // opacity: 0.7,
    fontSize: wp(3.4),

    // fontWeight: 'bold',

    fontFamily: fonts.SFuiDisplayBold,
    textAlign: 'center',
  },
  createnewaccountContainer: {
    // marginTop: wp(3),
    // width: wp(30),
    // height: wp(10),
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
});

export default styles;

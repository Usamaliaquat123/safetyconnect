import {StyleSheet} from 'react-native';
import {colors, fonts} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    padding: wp(7),
    paddingTop: wp(5),
    paddingBottom: wp(5),
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: wp(4.4),
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
  headingContent: {
    fontSize: wp(3.4),
    color: colors.text,
    fontFamily: fonts.SFuiDisplaySemiBold,
    opacity: 0.5,
  },
  headingContainer: {
    fontSize: wp(4.5),
    color: colors.primary,
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplayBold,
  },
  inputsContainer: {
    // alignSelf: 'center',

    marginTop: wp(4),
  },
  emailTextContainer: {
    fontSize: wp(3),
    fontFamily: fonts.SFuiDisplayMedium,
  },
  inputContainer: {
    marginTop: wp(2),
    borderColor: colors.textOpa,
    borderWidth: wp(0.4),
    paddingLeft: wp(3),

    borderRadius: wp(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  passTextContainer: {
    marginTop: wp(4),
    fontSize: wp(3.5),
    fontWeight: 'bold',
  },
  authInputs: {
    fontSize: wp(3),
    width: wp(100),
  },
  signinText: {
    fontSize: wp(3.4),
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplaySemiBold,
    color: colors.secondary,
  },
  signinTextGoogle: {
    fontSize: wp(3.4),
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplaySemiBold,
    color: colors.text,
  },
  signinWithApple: {
    fontSize: wp(3.4),
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplaySemiBold,
    color: colors.text,
  },
  siginBtnContainer: {
    marginTop: wp(10),
    alignSelf: 'center',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
    padding: wp(4),
    flexDirection: 'row',
    borderWidth: wp(0.2),
    borderColor: colors.text,
    borderRadius: wp(1),
  },
  signUpWithApple: {
    marginTop: wp(4),
    alignSelf: 'center',
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(90),
    padding: wp(4),
    flexDirection: 'row',
    borderWidth: wp(0.2),
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
    opacity: 0.7,
    fontFamily: fonts.SFuiDisplaySemiBold,
    marginTop: wp(3),
  },
  createNewAccount: {
    color: colors.primary,
    // opacity: 0.7,
    fontSize: wp(3),
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplaySemiBold,
    textAlign: 'center',
  },
  createnewaccountContainer: {
    marginTop: wp(1),
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
  imgContainerOfSocialAccounts: {
    width: wp(5),
    height: wp(5),
    marginRight: wp(3),
  },
  errorloadingContent: {
    backgroundColor: colors.secondary,
    padding: wp(5),
    alignContent: 'center',
    borderRadius: wp(3),
  },
});

export default styles;

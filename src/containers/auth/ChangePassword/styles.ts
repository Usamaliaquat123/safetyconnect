import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors, fonts} from '@theme';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    padding: wp(5),
  },
  header: {
    padding: wp(1),
    paddingTop: wp(5),
    paddingBottom: wp(5),
    // backgroundColor: colors.primary,
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

  headingContainer: {
    fontSize: wp(5),
    color: colors.primary,
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplayBold,
  },
  inputsContainer: {
    // marginTop: wp(),
  },
  emailTextContainer: {
    fontSize: wp(3.5),
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: wp(2),
    borderColor: colors.text,
    borderWidth: wp(0.3),
    opacity: 0.5,
    paddingLeft: wp(3),
    borderRadius: wp(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  passTextContainer: {
    marginTop: wp(3),
    fontSize: wp(3.5),
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplayMedium,
  },
  authInputs: {
    fontSize: wp(3),
    fontFamily: fonts.SFuiDisplayMedium,
    width: wp(80),
  },
  signinText: {
    fontSize: wp(4),
    fontFamily: fonts.SFuiDisplayMedium,
    color: colors.secondary,
  },
  signinTextGoogle: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: colors.primary,
  },
  selectText: {
    opacity: 0.5,
    fontSize: wp(3),
    // textAlignVertical: 'top',
    fontWeight: 'bold',
    width: wp(80),
  },
  headingPra: {
    fontSize: wp(3.4),
    opacity: 0.5,
    fontFamily: fonts.SFuiDisplayMedium,
  },
  nameinputContainer: {
    marginTop: wp(1),
    // borderColor: colors.green,
    borderWidth: wp(0.3),
    paddingLeft: wp(3),
    padding: wp(4),
    borderRadius: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingParaEmail: {
    fontSize: wp(3.4),
    opacity: 9,
    fontFamily: fonts.SfuiDisplayHeavy,
  },
  siginBtnContainer: {
    marginTop: wp(10),
    alignSelf: 'center',
    flexDirection: 'row',
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
    width: wp(70),
    padding: wp(4),
    flexDirection: 'row',
    borderWidth: wp(0.2),
    borderColor: colors.primary,
    borderRadius: wp(3),
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
    fontSize: wp(3.4),
    opacity: 0.5,
    color: colors.text,
    // opacity: 0.5,
    // marginTop: wp(1.5),
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplayMedium,
  },
  createNewAccount: {
    color: colors.text,
    opacity: 0.7,
    fontSize: wp(3.4),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  createnewaccountContainer: {
    marginTop: wp(3),
  },
  eyeIconContainer: {
    position: 'absolute',
    right: wp(3),
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

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors, fonts} from '@theme';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'transparent',
    marginLeft: wp(7),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: wp(7),
    marginRight: wp(7),
  },
  header: {
    padding: wp(7),
    paddingTop: wp(5),
    paddingBottom: wp(5),
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: wp(4),
    // marginLeft: wp(2),
    color: colors.secondary,
    fontWeight: 'bold',
  },
  underScrore: {
    backgroundColor: colors.green,
    width: wp(3),
    // marginLeft: wp(5),
    padding: wp(0.5),
    borderRadius: 10,
  },
  headertle: {flexDirection: 'row'},
  //  content
  content: {
    // height: hp(100),
    padding: wp(5),

    paddingBottom: hp(5),
    backgroundColor: colors.secondary,
    borderRadius: wp(2),
  },
  headingContainer: {
    fontSize: wp(4.5),
    color: colors.green,
    fontFamily: fonts.SFuiDisplayBold,
  },
  inputsContainer: {
    marginTop: wp(7),
  },
  emailTextContainer: {
    fontSize: wp(3.5),
    fontFamily: fonts.SFuiDisplaySemiBold,
  },
  inputContainer: {
    marginTop: wp(2),
    flexWrap: 'wrap',
    borderColor: colors.textOpa,
    borderWidth: wp(0.3),
    paddingLeft: wp(3),
    borderRadius: wp(2),
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  passTextContainer: {
    marginTop: wp(4),
    fontSize: wp(3.5),
    fontWeight: 'bold',
  },
  authInputs: {
    height: wp(30),
    fontSize: wp(3),
    textAlignVertical: 'top',
    // width: wp(80),
    paddingTop: wp(3),
  },
  signinText: {
    fontSize: wp(4),
    fontFamily: fonts.SFuiDisplaySemiBold,
    color: colors.secondary,
  },
  signinTextGoogle: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: colors.primary,
  },
  siginBtnContainer: {
    marginTop: wp(5),
    alignSelf: 'center',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(60),
    padding: wp(4),
    borderRadius: wp(3),
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
    textAlign: 'center',
    fontSize: wp(3),
    fontWeight: 'bold',
    color: colors.text,
    marginTop: wp(3),
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

  inviteppleText: {
    marginLeft: wp(3),
    fontSize: wp(3.5),
    color: colors.primary,
    fontFamily: fonts.SFuiDisplayMedium,
  },
  subheading: {
    fontSize: wp(3.5),
    fontFamily: fonts.SFuiDisplayMedium,
    opacity: 0.5,
  },
  involvePsuggCont: {
    borderColor: colors.textOpa,
    borderBottomWidth: wp(0.1),
    paddingTop: wp(2),
    paddingBottom: wp(2),
    alignItems: 'center',
    flexDirection: 'row',
  },
  involvePSt: {
    fontFamily: fonts.SFuiDisplayMedium,
    fontSize: wp(3),
  },
  involveSuggestCont: {
    borderColor: colors.textOpa,
    borderRadius: wp(2),
    padding: wp(3),
    borderWidth: wp(0.3),
    marginTop: wp(1),
  },
  projSuggCount: {
    borderColor: colors.textOpa,
    borderRadius: wp(2),
    padding: wp(1),
    borderWidth: wp(0.3),
    marginTop: wp(1),
  },

  // Modal error

  modelContainer: {
    backgroundColor: colors.secondary,
    padding: wp(10),
    borderRadius: wp(5),
  },
  errHeadPop: {
    fontSize: wp(4),
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.error,
  },
  errEmailPassDesc: {
    marginTop: wp(2),
    textAlign: 'center',
    fontSize: wp(3),
    color: colors.text,
  },
  plzTryAgain: {
    textAlign: 'center',
    fontSize: wp(3),
    color: colors.text,
  },
});

export default styles;

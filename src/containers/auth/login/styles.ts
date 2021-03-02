import {colors, fonts} from '@theme';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    padding: wp(7),
    paddingTop: wp(5),
    paddingBottom: wp(5),
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
    height: hp(100),
    padding: wp(5),
    backgroundColor: colors.secondary,
    borderTopLeftRadius: wp(3),
    borderTopRightRadius: wp(3),
  },
  headingContainer: {
    fontSize: wp(4),
    color: colors.primary,
    fontWeight: 'bold',
  },
  inputsContainer: {
    marginTop: wp(7),
  },
  emailTextContainer: {
    fontSize: wp(3),
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: wp(2),
    borderColor: colors.text,
    borderWidth: wp(0.4),
    paddingLeft: wp(3),

    borderRadius: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  passTextContainer: {
    marginTop: wp(4),
    fontSize: wp(3),
    fontWeight: 'bold',
  },
  authInputs: {
    fontSize: wp(3),
    width: wp(70),
  },
  forgetPassText: {
    fontSize: wp(3),
    color: colors.primary,
    fontWeight: 'bold',
    opacity: 0.7,
    marginTop: wp(5),
  },
  eyeIconContainer: {
    position: 'absolute',
    right: wp(3),
  },
  signinText: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: colors.secondary,
  },
  signinTextGoogle: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: colors.primary,
  },
  siginBtnContainer: {
    marginTop: wp(10),
    alignSelf: 'center',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(70),
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
    padding: wp(3),
    flexDirection: 'row',
    borderWidth: wp(0.3),
    borderColor: colors.primary,
    borderRadius: wp(2),
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
    marginTop: wp(3),
  },
  passwordError: {
    fontSize: wp(3),
    color: colors.error,
    opacity: 0.7,
    marginTop: wp(2),
  },
  createNewAccount: {
    color: colors.primary,
    opacity: 0.7,
    fontSize: wp(3.4),

    fontWeight: 'bold',
    textAlign: 'center',
  },
  createnewaccountContainer: {
    marginTop: wp(3),
    // width: wp(30),
    // height: wp(10),
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

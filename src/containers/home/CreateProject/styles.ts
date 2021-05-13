import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors, fonts} from '@theme';
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
    // height:hp(100),
    padding: wp(5),
    paddingBottom: hp(20),
    backgroundColor: colors.secondary,
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
  },
  headingContainer: {
    fontSize: wp(5),
    color: colors.primary,
    fontFamily: fonts.SFuiDisplayBold,
  },
  inputsContainer: {
    marginTop: wp(4),
  },
  emailTextContainer: {
    // marginTop: wp(3),
    marginRight: wp(1),
    fontSize: wp(3.5),
    fontFamily: fonts.SFuiDisplayBold,
    color: colors.text,
  },
  inputContainer: {
    marginTop: wp(2),
    borderColor: colors.green,
    borderWidth: wp(0.3),
    paddingLeft: wp(3),
    borderRadius: wp(3),
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
    width: wp(80),
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
    marginTop: wp(10),
    alignSelf: 'center',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(90),
    padding: wp(4),
    // paddingLeft: wp(20),
    // paddingRight: wp(20),
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
});

export default styles;

import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {fonts} from '@theme';
import {colors} from '@theme';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
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
  content: {
    padding: wp(5),
    paddingBottom: hp(20),
    backgroundColor: colors.secondary,
  },
  orContainer: {
    marginTop: wp(5),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  signinTextGoogle: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: colors.primary,
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
  headingContainer: {
    fontSize: wp(5),
    marginTop: wp(3),
    color: colors.primary,
    fontFamily: fonts.SFuiDisplaySemiBold,
  },
  dontHaveAccount: {
    textAlign: 'center',
    fontSize: wp(3.2),
    color: colors.text,
    opacity: 0.7,
    marginTop: wp(1),
  },
  authInputs: {
    fontSize: wp(3),
    width: wp(70),
    fontFamily: fonts.SFuiDisplayMedium,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: wp(3),
  },
  passwordError: {
    fontSize: wp(3),
    color: colors.text,
    opacity: 0.7,
    marginTop: wp(1),
  },
  inputContainer: {
    marginTop: wp(2),
    borderColor: colors.text,
    borderWidth: wp(0.4),
    paddingLeft: wp(3),

    borderRadius: wp(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  dtHaveContainer: {
    marginTop: wp(8),
  },
  signinText: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
    color: colors.secondary,
  },

  passTextContainer: {
    marginTop: wp(4),
    fontSize: wp(3),
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplayMedium,
  },
});

export default styles;

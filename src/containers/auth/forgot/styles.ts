import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors, fonts} from '@theme';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
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
    height: hp(100),
    padding: wp(5),
    paddingBottom: hp(20),
    backgroundColor: colors.secondary,
    borderTopLeftRadius: wp(3),
    borderTopRightRadius: wp(3),
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
  signinText: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
    color: colors.secondary,
  },
  headingContainer: {
    fontSize: wp(4),
    color: colors.primary,
    fontWeight: 'bold',
  },
  headingCotent: {
    fontSize: wp(3.8),
    color: colors.text,
    opacity: 0.5,
    fontFamily: fonts.SFuiDisplayMedium,
  },
  inputsContainer: {
    marginTop: wp(7),
  },
  authInputs: {
    fontSize: wp(3),
    width: wp(100),
  },
  emailTextContainer: {
    fontSize: wp(3.5),
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: wp(2),
    borderColor: colors.green,
    borderWidth: wp(0.4),
    paddingLeft: wp(3),
    borderRadius: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  dontHaveAccount: {
    textAlign: 'center',
    fontSize: wp(3.2),
    color: colors.primary,
    opacity: 0.7,
    marginTop: wp(1),
  },
  dtHaveContainer: {
    marginTop: wp(8),
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
  errEmailPassDesc: {
    marginTop: wp(2),
    textAlign: 'center',
    fontSize: wp(3),
    color: colors.text,
  },
});

export default styles;

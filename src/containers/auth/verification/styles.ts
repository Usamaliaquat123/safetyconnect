import {StyleSheet} from 'react-native';
import {colors} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {fonts} from '@theme';
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
    paddingBottom: hp(20),
    backgroundColor: colors.secondary,
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
  },
  headingContainer: {
    fontSize: wp(4.5),
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplaySemiBold,
    // fontWeight: ,
  },
  signinText: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: colors.secondary,
  },
  signinTextGoogle: {
    fontSize: wp(3.5),
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
    width: wp(90),
    padding: wp(4),
    flexDirection: 'row',
    borderWidth: wp(0.2),
    borderColor: colors.primary,
    borderRadius: wp(1),
  },
  orContainer: {
    marginTop: wp(5),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  detailContainer: {
    // marginTop: wp(3),
    opacity: 0.6,
    fontSize: wp(3),
    width: wp(80),
    color: colors.text,
    textAlign: 'center',
    flexWrap: 'wrap',
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
    marginTop: wp(20),
  },
  createNewAccount: {
    color: colors.primary,
    fontSize: wp(3.4),
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplayBold,
    textAlign: 'center',
  },
  createnewaccountContainer: {
    marginTop: wp(1),
  },
  containerVerifyText: {
    marginTop: wp(10),
    marginBottom: wp(10),
  },
});
export default styles;

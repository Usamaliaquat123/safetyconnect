import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '@theme';
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
  headertle: {flexDirection: 'row'},
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
  headingContainer: {
    fontSize: wp(4),
    textAlign: 'center',
    color: colors.primary,
    fontWeight: 'bold',
  },
  dtHaveContainer: {
    marginTop: wp(8),
  },
  signinText: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
    color: colors.secondary,
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
  dontHaveAccount: {
    textAlign: 'center',
    fontSize: wp(3.2),
    color: colors.primary,
    opacity: 0.7,
    marginTop: wp(1),
  },
  content: {
    height: hp(100),
    padding: wp(5),
    paddingBottom: hp(20),
    backgroundColor: colors.secondary,
    borderTopLeftRadius: wp(3),
    borderTopRightRadius: wp(3),
  },
});

export default styles;

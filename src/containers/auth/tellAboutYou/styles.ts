import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors, fonts} from '@theme';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
    backgroundColor: colors.secondary,
  },

  headingPara: {
    fontSize: wp(3.4),
    opacity: 0.5,
    fontFamily: fonts.SFuiDisplayMedium,
  },
  headingParaEmail: {
    fontSize: wp(3.4),
    opacity: 9,
    fontFamily: fonts.SFuiDisplaySemiBold,
  },
  headertle: {flexDirection: 'row'},
  //  content
  // content: {
  //   height: hp(100),
  //   padding: wp(5),
  //   paddingBottom: hp(20),
  //   backgroundColor: colors.secondary,
  //   borderTopLeftRadius: wp(3),
  //   borderTopRightRadius: wp(3),
  // },
  headingContainer: {
    fontSize: wp(5),
    color: colors.primary,
    fontFamily: fonts.SFuiDisplaySemiBold,
  },
  inputsContainer: {
    marginTop: wp(8),
  },
  emailTextContainer: {
    fontSize: wp(3.4),
    marginTop: wp(5),
    opacity: 0.7,
    fontFamily: fonts.SFuiDisplayMedium,
  },
  passwordWarning: {
    marginTop: wp(2),
    fontSize: wp(3.4),
    color: colors.text,
    opacity: 0.5,
    fontFamily: fonts.SFuiDisplayMedium,
  },
  inputContainer: {
    marginTop: wp(1),
    borderColor: colors.green,
    borderWidth: wp(0.3),
    paddingLeft: wp(3),
    padding: wp(4),
    borderRadius: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectText: {
    opacity: 0.5,
    fontSize: wp(3),
    // textAlignVertical: 'top',
    fontWeight: 'bold',
    width: wp(80),
  },
  passTextContainer: {
    fontSize: wp(3.5),
    fontWeight: 'bold',
  },
  authInputs: {
    fontSize: wp(4),
  },
  signinText: {
    fontSize: wp(4),
    color: colors.secondary,
    fontFamily: fonts.SFuiDisplayMedium,
  },
  signinTextGoogle: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: colors.primary,
  },
  siginBtnContainer: {
    flexDirection: 'row',
    marginTop: wp(10),
    alignSelf: 'center',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(90),
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
    fontSize: wp(3.5),
    color: colors.text,
    opacity: 0.5,
    marginTop: wp(3),
    fontWeight: 'bold',
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
  // image upload container
  imageUploadContainer: {
    alignItems: 'center',
    marginTop: wp(3),
  },
  imagenotuploadContainer: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: wp(5),
  },
  uploadPicText: {
    textAlign: 'center',
    fontSize: wp(3),
    color: colors.text,
    opacity: 0.5,
    fontWeight: 'bold',
  },

  imagenotUpoad: {
    backgroundColor: '#F0F8EE',
    borderRadius: wp(20),
    width: wp(32),
    height: wp(32),
  },
  // modal configuration

  takeaPhotoModal: {
    fontSize: wp(4),
    fontWeight: 'bold',
    marginLeft: wp(10),
  },
  takeaPhotoContainer: {
    marginTop: wp(10),

    flexDirection: 'row',
  },
  avatarPencil: {},
  involvePSt: {
    fontSize: wp(3),
  },
  involvePsuggCont: {
    borderColor: colors.textOpa,
    borderBottomWidth: wp(0.1),
    paddingTop: wp(3),
    paddingBottom: wp(3),
    alignItems: 'center',
    flexDirection: 'row',
  },
  involveSuggestCont: {
    borderColor: colors.green,
    borderRadius: wp(3),
    padding: wp(3),
    borderWidth: wp(0.3),
    marginTop: wp(1),
  },
});

export default styles;

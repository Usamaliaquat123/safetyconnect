import {StyleSheet} from 'react-native';
import {colors, fonts} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  circleSelect: {
    borderRadius: wp(5),
    // padding: wp(2),
    justifyContent: 'center',
    width: wp(3.5),
    marginTop: wp(2),
    marginLeft: wp(5),
    height: wp(3.5),
    backgroundColor: colors.error,
  },
  content: {
    // flex: 2,
    flex: 1,
    backgroundColor: colors.secondary,
    // borderTopLeftRadius: wp(8),
    // borderTopRightRadius: wp(8),
    // padding: wp(8),
    paddingTop: wp(4),
  },
  conversationContainer: {
    // marginTop: wp(1),
  },
  ttleConversation: {
    fontFamily: fonts.SFuiDisplayBold,
    color: colors.text,
    fontSize: wp(3.5),
    marginBottom: wp(2),
  },
  line: {
    borderWidth: wp(0.1),
    // width: wp(100),
    opacity: 0.5,
    borderColor: colors.textOpa,
  },
  authInputs: {
    fontSize: wp(2.8),
    width: wp(70),
    fontFamily: fonts.SFuiDisplayMedium,
  },
  inputContainer: {
    marginTop: wp(3),
    borderWidth: wp(0.2),
    paddingLeft: wp(3),
    borderRadius: wp(2),
    borderColor: colors.textOpa,
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitsorbtnSbtxt: {
    fontSize: wp(3.5),
    color: colors.secondary,
    fontFamily: fonts.SFuiDisplayBold,
  },
  submitsorbtnSb: {
    padding: wp(3),
    // width: wp(45),
    borderColor: colors.primary,
    marginTop: wp(6),
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderWidth: wp(0.3),
    borderRadius: wp(2),
  },
});

export default styles;

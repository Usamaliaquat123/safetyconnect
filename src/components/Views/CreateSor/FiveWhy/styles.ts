import {StyleSheet} from 'react-native';
import {fonts, colors} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  fiveWhyContainer: {},
  keyfindingsText: {
    fontSize: wp(4),
    fontFamily: fonts.SFuiDisplaySemiBold,
  },
  keyfindingsContiner: {
    marginTop: wp(4),
  },
  keyfindingsInputContiner: {
    borderWidth: wp(0.2),
    borderRadius: wp(2),
    height: wp(25),
    marginTop: wp(2),
  },
  keyfindingsInput: {
    borderBottomWidth: 0,

    padding: wp(3),
    fontFamily: fonts.SFuiDisplayMedium,

    fontSize: wp(3.4),
  },
  conduct5whyanaHeading: {
    fontSize: wp(4),
    fontFamily: fonts.SFuiDisplaySemiBold,
  },
  qInputContainer: {
    borderWidth: wp(0.2),
    fontSize: wp(3),
    borderRadius: wp(2),
    padding: wp(3),
    fontFamily: fonts.SFuiDisplaySemiBold,
  },
  aInputContain: {
    borderWidth: wp(0.2),
    borderRadius: wp(2),
    height: wp(30),
    marginTop: wp(2),
  },
  aInputContainer: {
    borderBottomWidth: 0,

    padding: wp(3),
    fontFamily: fonts.SFuiDisplayLight,

    fontSize: wp(3),
  },
  questionandAnswerContainer: {
    marginTop: wp(3),
  },
  addQuestionbtn: {
    width: wp(35),
    borderRadius: wp(2),
    backgroundColor: colors.primary,
    alignItems: 'center',
    padding: wp(3),
    marginTop: wp(3),
  },
  addQuestionText: {
    textAlign: 'center',
    color: colors.secondary,
    fontSize: wp(3.5),
    fontFamily: fonts.SFuiDisplayMedium,
  },
});

export default styles;

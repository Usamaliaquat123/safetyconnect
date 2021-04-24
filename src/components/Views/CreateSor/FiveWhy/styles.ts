import {StyleSheet} from 'react-native';
import {fonts, colors} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  fiveWhyContainer: {},

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

  // KeyFindings
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

  //   View Five why
  viewWhyContainer: {
    marginTop: wp(2),
  },
  viewCountWhy: {
    opacity: 0.5,
    fontSize: wp(3.5),
    fontFamily: fonts.SFuiDisplayMedium,
  },
  viewQuestion: {
    fontSize: wp(3.7),
    borderBottomWidth: 0,
    width: wp(80),
    textAlignVertical: 'top',
    padding: 0,
    // paddingBottom: wp(-2),
    fontFamily: fonts.SFuiDisplaySemiBold,
  },
  viewAnswer: {
    opacity: 0.5,
    borderBottomWidth: 0,
    width: wp(80),
    marginTop: wp(-2),
    textAlignVertical: 'top',
    padding: 0,
    paddingVertical: 0,
    fontSize: wp(3.3),
    fontFamily: fonts.SFuiDisplayMedium,
  },
});

export default styles;

import {StyleSheet} from 'react-native';
import {fonts} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  conduct5whyanaHeading: {
    fontSize: wp(4),
    fontFamily: fonts.SFuiDisplaySemiBold,
  },
  qInputContainer: {
    borderWidth: wp(0.2),
    fontSize: wp(3),
    borderRadius: wp(2),
    padding: wp(3),
  },
  aInputContainer: {
    borderRadius: wp(2),
    marginTop: wp(2),
    padding: wp(3),
    borderWidth: wp(0.2),
    fontSize: wp(3),
  },
  questionandAnswerContainer: {
    marginTop: wp(3),
  },
});

export default styles;

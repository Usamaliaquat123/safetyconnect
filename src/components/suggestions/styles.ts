import {StyleSheet} from 'react-native';
import {colors, fonts} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  actionSuggHeading: {
    fontSize: wp(3),
    marginTop: wp(5),
    fontFamily: fonts.SFuiDisplayMedium,
    color: colors.text,
    fontStyle: 'italic',
  },
  ActionSugContainer: {
    marginTop: wp(2),
    marginBottom: wp(3),
  },
  ActionsugItm: {
    marginTop: wp(2),
    marginBottom: wp(2),
    padding: wp(3),
    backgroundColor: colors.lightBlue,
    borderRadius: wp(5),
  },
  ActionsugItmTxt: {
    fontSize: wp(3),
    fontFamily: fonts.SFuiDisplayLight,

    color: colors.text,
  },
});

export default styles;

import {StyleSheet} from 'react-native';
import {colors} from '@theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  actionSuggHeading: {
    fontSize: wp(3.4),
    marginTop: wp(5),
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
    fontSize: wp(3.5),
    color: colors.text,
  },
});

export default styles;

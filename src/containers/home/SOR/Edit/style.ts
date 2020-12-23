// import { colors } from './../../../../theme/colors';
import {StyleSheet} from 'react-native';
import {colors} from '@theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.primary},
  header: {
    padding: wp(5),
  },
  title: {fontSize: wp(3), color: colors.secondary},
  headertle: {},
  content: {},
});

export default styles;

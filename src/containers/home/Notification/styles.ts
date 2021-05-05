import {StyleSheet} from 'react-native';
import {colors, fonts} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  // Header
  header: {
    padding: wp(5),
    paddingRight: wp(7),
    paddingLeft: wp(7),
    flex: 1,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: wp(4),
    marginLeft: wp(3.5),
    color: colors.secondary,
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplaySemiBold,
  },
  headertle: {flexDirection: 'row', justifyContent: 'space-between'},
  arrowTtleContainer: {
    flexDirection: 'row',
  },
  notificationIconAvatar: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  // contant
  content: {},
});

export default styles;

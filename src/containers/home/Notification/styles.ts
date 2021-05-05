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
    alignItems: 'center',
    flexDirection: 'row',
  },
  notificationIconAvatar: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  // contant
  content: {},
  //   Notification badge
  badge: {
    borderRadius: wp(10),
    alignItems: 'center',
    width: wp(2),
    position: 'absolute',
    top: wp(-2),
    right: wp(1),
    padding: wp(2),
    justifyContent: 'center',
    backgroundColor: colors.error,
  },
  badgeText: {
    position: 'absolute',
    fontSize: wp(2),
    color: colors.secondary,
  },
});

export default styles;

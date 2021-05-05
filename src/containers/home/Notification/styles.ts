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

  lineheight: {
    height: wp(0.7),
    backgroundColor: colors.darkLightGrey,
  },
  notificationContainer: {
    paddingTop: wp(3),
    paddingBottom: wp(3),
    paddingLeft: wp(5),
    paddingRight: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationContent: {
    paddingLeft: wp(3),
  },
  notificationDes: {
    fontSize: wp(3),
    fontFamily: fonts.SFuiDisplayMedium,
  },
  notifyDate: {
    fontSize: wp(3),
    fontFamily: fonts.SFuiDisplaySemiBold,
    opacity: 0.5,
  },
  allNotificationsText: {
    paddingLeft: wp(4),
    fontSize: wp(4),
    marginBottom: wp(3),
    marginTop: wp(3),
    fontFamily: fonts.SFuiDisplayBold,
  },
});

export default styles;

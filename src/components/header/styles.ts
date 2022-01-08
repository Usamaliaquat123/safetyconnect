import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '@theme';
const styles = StyleSheet.create({
  headertle: {flexDirection: 'row'},

  header: {
    padding: wp(5),
    // paddingTop: wp
    paddingRight: wp(7),
    paddingLeft: wp(1),
    flex: 1,
    backgroundColor: colors.secondary,
  },
  title: {
    fontSize: wp(3.8),
    marginLeft: wp(5),
    color: colors.primary,
    fontWeight: 'bold',
  },
  underScrore: {
    backgroundColor: colors.green,
    width: wp(6),
    marginLeft: wp(5),
    padding: wp(0.5),
    // borderRadius: 10,
  },
  avatarView: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: wp(3),
    paddingRight: wp(3),
    paddingBottom: wp(1),
    borderRadius: wp(2),
    paddingTop: wp(1),
    position: 'absolute',
    backgroundColor: colors.green,
    right: 0,
  },
});

export default styles;

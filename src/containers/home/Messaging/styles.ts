import {StyleSheet} from 'react-native';
import {colors} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  headertle: {flexDirection: 'row'},

  header: {
    padding: wp(5),
    paddingRight: wp(7),
    paddingLeft: wp(7),
    flex: 1,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: wp(4),
    marginLeft: wp(5),
    color: colors.secondary,
    fontWeight: 'bold',
  },
  underScrore: {
    backgroundColor: colors.green,
    width: wp(6),
    marginLeft: wp(5),
    padding: wp(0.5),
    borderRadius: 10,
  },
  avatarView: {
    position: 'absolute',
    right: 0,
  },
  content: {
    flex: 2,

    backgroundColor: colors.secondary,
    borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
    padding: wp(8),
    paddingLeft: wp(5),
    paddingRight: wp(5),
  },
});

export default styles;

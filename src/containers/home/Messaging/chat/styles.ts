import {StyleSheet} from 'react-native';
import {colors} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  header: {
    padding: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.textOpa,
    borderBottomWidth: wp(0.4),
  },
  containerAvatar: {
    marginLeft: wp(4),
  },
  headRightIcon: {
    position: 'absolute',
    right: wp(5),
    left: wp(80),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  userNameText: {
    marginLeft: wp(4),
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  exitUser: {},
  userAddIcon: {
    // marginRight: wp(10),
  },
});

export default styles;

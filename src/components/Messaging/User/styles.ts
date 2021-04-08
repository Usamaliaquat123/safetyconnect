import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '@theme';
const styles = StyleSheet.create({
  userContainer: {
    marginBottom: wp(3),
    paddingLeft: wp(2),
    marginTop: wp(3),
    flexDirection: 'row',
  },
  containerAvatar: {
    marginRight: wp(2),
  },
  name: {
    justifyContent: 'center',
    marginTop: wp(2),
    fontSize: wp(3.5),
    color: colors.text,
  },
  isonline: {
    position: 'absolute',
    backgroundColor: colors.green,
    borderRadius: wp(5),
    padding: wp(1.3),
    right: wp(2),
    bottom: wp(0),
  },
  circle: {
    borderRadius: wp(5),
    // padding: wp(2),
    justifyContent: 'center',
    width: wp(5),
    marginTop: wp(2),
    marginLeft: wp(5),
    height: wp(5),
    backgroundColor: colors.error,
  },
  textNumber: {
    color: colors.secondary,
    fontSize: wp(3),
    alignSelf: 'center',
    position: 'absolute',
  },
});

export default styles;

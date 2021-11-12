import {StyleSheet} from 'react-native';
import {withPause} from 'react-native-redash';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '@theme';
const styles = StyleSheet.create({
  searchInput: {
    fontSize: wp(3),
    fontWeight: 'bold',
    width: wp(60),
    color: colors.text,
  },
  containerSearch: {
    borderColor: colors.textOpa,
    borderRadius: wp(3),
    borderWidth: wp(0.3),
    flexDirection: 'row',
    // padding: wp(1),
    paddingLeft: wp(5),
    // borderRadius: wp(4),
  },
  iconStyle: {
    marginRight: wp(1),
    justifyContent: 'center',
    //   marginTop: wp(2),
  },
});

export default styles;

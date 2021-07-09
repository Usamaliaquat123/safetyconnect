import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors, fonts} from '@theme';
const styles = StyleSheet.create({
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
  headertle: {flexDirection: 'row'},
  leftSelector: {flexDirection: 'row'},
  headerSelect: {
    marginTop: wp(2),
    marginLeft: wp(11),
    flexDirection: 'row',
    // alignContent: 'stretch',
    justifyContent: 'space-between',
    width: wp(100),
  },
  content: {
    flex: 1,
    // maxHeight: '100%',
    // marginBottom: wp(10),
    // height: '100%',
    // paddingBottom: wp(60),
    backgroundColor: colors.secondary,
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
  },
});

export default styles;

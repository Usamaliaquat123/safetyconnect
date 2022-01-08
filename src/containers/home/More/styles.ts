import {StyleSheet} from 'react-native';
import {colors, fonts} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  avatarView: {
    // position: 'absolute',
    // right: 0,
    flexDirection: 'row',
  },

  headertle: {flexDirection: 'row'},
  underScrore: {
    backgroundColor: colors.green,
    width: wp(4),
    marginLeft: wp(3),
    padding: wp(0.5),
    borderRadius: 10,
  },
  header: {
    padding: wp(5),
    paddingTop: wp(7),
    paddingBottom: wp(5),
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: wp(4),
    marginLeft: wp(3),
    color: colors.secondary,
    fontWeight: 'bold',
  },

  content: {
    padding: wp(5),
    backgroundColor: colors.secondary,
    flex: 1,
    // flex: 2,
    // marginTop: wp(80),
    // borderTopLeftRadius: wp(8),
    // borderTopRightRadius: wp(8),
  },

  username: {
    marginLeft: wp(3),
    fontSize: wp(4),

    fontWeight: 'bold',
  },
  organizations: {fontSize: wp(3), marginLeft: wp(3), opacity: 0.5},

  itemIcon: {
    width: wp(9),
    height: wp(9),
  },
  itemText: {
    alignSelf: 'center',
    fontSize: wp(3),
    fontFamily: fonts.SFuiDisplayMedium,
    opacity: 0.5,
    marginLeft: wp(2),
  },
  containerOfItem: {
    marginTop: wp(4),
  },
});

export default styles;

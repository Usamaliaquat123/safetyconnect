import {StyleSheet} from 'react-native';
import {colors, fonts} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {pow} from 'react-native-reanimated';
const styles = StyleSheet.create({
  headertle: {flexDirection: 'row'},
  underScrore: {
    backgroundColor: colors.green,
    width: wp(6),
    marginLeft: wp(3),
    padding: wp(0.5),
    borderRadius: 10,
  },
  createdByYou: {
    marginTop: wp(2),
    padding: wp(5),
    backgroundColor: colors.secondary,
  },
  header: {
    padding: wp(7),
    paddingLeft: wp(4),
    paddingTop: wp(7),
    paddingBottom: wp(7),
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: wp(3.6),
    marginLeft: wp(3),
    color: colors.secondary,
  },
  orgTitle: {
    fontSize: wp(5),
    marginLeft: wp(3),
    color: colors.secondary,
    fontWeight: 'bold',
  },
  orgLogo: {
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(3),
    padding: wp(2),
  },
  orgLogoPng: {width: wp(10), height: wp(10)},

  content: {
    // padding: wp(5),
    backgroundColor: colors.darkLightGrey,

    // flex: 2,

    // marginTop: wp(80),
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
  },

  //   content
  recentlyAssigned: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',

    padding: wp(5),
    backgroundColor: colors.secondary,
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
  },
  searchContrainer: {
    borderWidth: wp(0.3),
    borderRadius: wp(3),
    width: wp(90),
    marginTop: wp(-1.5),
    paddingLeft: wp(5),
    borderColor: colors.lightGrey,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    // marginTop: wp(-3),
    fontSize: wp(3),

    borderBottomWidth: wp(0),
  },
  recentlyContent: {
    marginTop: wp(5),
  },
  recentlyText: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: colors.primary,
  },
  recentlyHeader: {
    flexDirection: 'row',
  },
  viewAll: {
    position: 'absolute',
    right: wp(0),
    fontSize: wp(3.4),
  },
  recentlyContentItem: {
    marginTop: wp(2),
  },
});

export default styles;

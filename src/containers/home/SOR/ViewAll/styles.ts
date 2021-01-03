import {StyleSheet} from 'react-native';
import {colors} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
  headertle: {flexDirection: 'row'},
  headerSelect: {
    marginTop: wp(10),
    flexDirection: 'row',
    // alignContent: 'stretch',
    justifyContent: 'space-between',
    width: wp(100),
  },

  hselectort: {color: colors.secondary, fontWeight: 'bold', fontSize: wp(3)},
  selectorBox: {color: colors.secondary, fontSize: wp(3)},
  rightSelector: {flexDirection: 'row', marginRight: wp(12)},
  leftSelector: {flexDirection: 'row'},
  selector: {
    paddingLeft: 3,
    width: wp(20),
  },

  slctContainer: {
    position: 'absolute',
    top: wp(5),
    zIndex: 1,
    left: wp(13),
    backgroundColor: colors.secondary,
    // padding: wp(5),
    paddingLeft: wp(2),
    paddingRight: wp(2),
    paddingTop: wp(1),
    paddingBottom: wp(1),
    width: wp(22),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  itemH: {
    color: 'black',
    fontSize: wp(3),
    padding: wp(1),
  },
  avatarView: {
    position: 'absolute',
    right: 0,
  },

  // content
  cardContainer: {
    width: wp(70),
    borderRadius: wp(3),
    padding: wp(5),
    // borderWidth: wp(0.1),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    marginBottom: wp(10),
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardtime: {
    fontSize: wp(3),
    fontWeight: 'bold',
    color: colors.text,
  },
  cardDate: {
    fontSize: wp(3),
    color: colors.text,
    fontWeight: 'bold',
  },
  cardbadge: {
    backgroundColor: colors.riskIcons.yellow,
    padding: wp(5),
    marginRight: wp(1),
    justifyContent: 'center',
    marginTop: wp(-2),
    alignSelf: 'center',
    borderRadius: wp(10),
  },
  cardBadgeText: {
    fontSize: wp(3),
    fontWeight: 'bold',
    position: 'absolute',
    alignSelf: 'center',
  },
  cardTitle: {
    fontSize: wp(4),
    color: colors.primary,
    // fontWeight: 'bold',
  },
  cardBottom: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cardLocation: {
    flexDirection: 'row',
  },
  cardBorderText: {
    fontSize: wp(3),
    color: colors.text,
  },
  cardRisk: {
    flexDirection: 'row',
  },
});

export default styles;

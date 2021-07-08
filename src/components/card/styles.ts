import {StyleSheet, Platform, Dimensions} from 'react-native';
import {colors, fonts} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function dp(percentage: any) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.25;
const slideWidth = dp(80);
const itemHorizontalMargin = dp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = wp(1);

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardtime: {
    fontSize: wp(3),
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplayMedium,
    opacity: 0.5,
    color: colors.text,
  },
  cardDate: {
    fontSize: wp(3),
    color: colors.text,
    fontWeight: 'bold',
  },

  cardBottom: {
    // justifyContent: ,
    // flexDirection: 'row',
    width: wp(80) - wp(20),
    // marginTop: wp(10),
    position: 'absolute',
    bottom: wp(3),
    alignSelf: 'center',
    // left: wp(2),
  },
  cardLocation: {
    flexDirection: 'row',
  },
  cardBorderText: {
    fontSize: wp(3),
    color: colors.text,
    opacity: 0.5,
    fontFamily: fonts.SFuiDisplayMedium,
  },
  cardRisk: {
    flexDirection: 'row',
  },
  cardbadge: {
    backgroundColor: colors.riskIcons.yellow,
    padding: wp(4),
    marginRight: wp(1),
    justifyContent: 'center',
    marginTop: wp(-2),
    alignSelf: 'center',
    left: wp(30),
    borderRadius: wp(2),
    position: 'absolute',
    top: wp(1),
  },
  cardBadgeText: {
    fontSize: wp(3),
    fontWeight: 'bold',
    position: 'absolute',
    alignSelf: 'center',
  },
  cardTitle: {
    fontSize: wp(3),
    color: colors.text,
    opacity: 0.5,
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplayMedium,
    marginTop: wp(2),
  },
  imageContainer: {
    padding: wp(5),
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    shadowColor: '#C3C9DB',
    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.22,
    backgroundColor: '#F8F9FF',

    elevation: 2,
    borderRadius: entryBorderRadius,
    //   borderTopLeftRadius: entryBorderRadius,
    // borderTopRightRadius: entryBorderRadius,
    // borderBottomLeftRadius: entryBorderRadius,
    // borderBottomRightRadius: entryBorderRadius,
  },
  radiusMaskEven: {
    backgroundColor: '#1a1917',
  },
  // shadow: {
  //   position: 'absolute',
  //   top: 0,
  //   left: itemHorizontalMargin,
  //   right: itemHorizontalMargin,
  //   bottom: 0,
  //   borderRadius: entryBorderRadius,
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 30,
  //   },
  //   // shadowOpacity: 0.50,
  //   shadowRadius: 2.22,

  //   elevation: 1,
  // },

  userAndlocationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userNameEmail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  riskCapacity: {
    borderRadius: wp(4),
    padding: wp(1),
    width: wp(20),
    alignItems: 'center',
    backgroundColor: colors.error,
  },
  slideInnerContainer: {
    alignSelf: 'center',
    width: itemWidth,
    height: slideHeight,
    // backgroundColor: '#F8F9FF',
    paddingHorizontal: itemHorizontalMargin,
    // backgroundColor: colors.secondary
    // paddingBottom: wp(10), // needed for shadow
  },
  riskCapacityText: {
    fontSize: wp(3),
    color: colors.secondary,
  },
});

export default styles;

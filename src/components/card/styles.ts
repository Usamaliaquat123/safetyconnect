import {StyleSheet, Platform, Dimensions} from 'react-native';
import {colors} from '@theme';
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

const entryBorderRadius = 15;

const styles = StyleSheet.create({
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

  cardBottom: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: wp(7),
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
  cardbadge: {
    backgroundColor: colors.riskIcons.yellow,
    padding: wp(5),
    marginRight: wp(1),
    justifyContent: 'center',
    marginTop: wp(-2),
    alignSelf: 'center',
    left: wp(30),
    borderRadius: wp(10),
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
    fontSize: wp(3.6),
    color: colors.primary,
    fontWeight: 'bold',
    marginTop: wp(8),
  },
  imageContainer: {
    padding: wp(5),
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    // backgroundColor: colors.textOpa,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
  },
  radiusMaskEven: {
    backgroundColor: '#1a1917',
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 0,
    borderRadius: entryBorderRadius,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 0.5,

    elevation: 6,
  },
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18, // needed for shadow
  },
});

export default styles;

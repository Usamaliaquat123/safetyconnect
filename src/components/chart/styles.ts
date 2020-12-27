import {StyleSheet} from 'react-native';
import {colors} from '@theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  rowCont: {
    flexDirection: 'row',
    marginTop: wp(1),
    // marginBottom: wp(3),
    // justifyContent: 'space-between',
  },
  circle: {
    backgroundColor: colors.riskIcons.yellow,
    padding: wp(7),
    marginRight: wp(1),
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: wp(10),
  },
  circleOpa: {
    marginRight: wp(1),
    padding: wp(7),
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: wp(10),
  },
  circleText: {
    fontSize: wp(3),
    fontWeight: 'bold',
    position: 'absolute',
    alignSelf: 'center',
  },
  ruler: {
    color: colors.riskIcons.lightGreen,
  },
  likelihoodText: {
    transform: [{rotate: '-90deg'}],
    fontSize: wp(3.5),
    alignSelf: 'center',
    left: wp(-10),
    position: 'absolute',
    color: colors.textOpa,
    fontWeight: 'bold',
  },
  severityText: {
    position: 'absolute',
    top: wp(12),
    color: colors.textOpa,
    fontWeight: 'bold',
    fontSize: wp(3.5),
    textAlign: 'center',
  },
});

export default styles;

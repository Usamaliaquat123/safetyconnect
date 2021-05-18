import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '@theme';
const styles = StyleSheet.create({
  addNewContainer: {
    position: 'absolute',
    zIndex: wp(2),
    top: wp(-9),
    backgroundColor: colors.primary,
    borderRadius: wp(10),
    padding: wp(4),
  },
  addNewText: {
    marginLeft: wp(2.1),
    marginTop: wp(8),
    fontSize: wp(3),
  },
  containerOfIcon: {
    marginTop: wp(1),
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  auditReportText: {
    paddingLeft: wp(2),
    fontSize: wp(3),
    fontWeight: 'bold',
    textAlign: 'center',
  },

  createNewpopcontaienr: {
    backgroundColor: colors.secondary,
    borderRadius: wp(3),
    padding: wp(5),
  },
  createNewText: {
    paddingLeft: wp(2),
    fontSize: wp(3),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  newsorContainer: {
    padding: wp(3),
    backgroundColor: colors.lightGreen,
    width: wp(12),
    height: wp(12),
    borderRadius: wp(3),
  },
  incidentContaineR: {
    padding: wp(3),
    backgroundColor: colors.lightGreen,
    width: wp(12),
    height: wp(12),
    borderRadius: wp(3),
  },
  auditAndReportContainer: {
    padding: wp(3),
    backgroundColor: colors.lightGreen,
    width: wp(12),
    height: wp(12),
    borderRadius: wp(3),
  },
});

export default styles;

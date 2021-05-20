import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '@theme';
const styles = StyleSheet.create({
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
    width: wp(90),
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    // marginLeft: wp(7),
    justifyContent: 'center',
    alignSelf: 'center',
    // marginTop: wp(7),
    // marginRight: wp(7),
  },
  newsorContainer: {
    padding: wp(3),
    backgroundColor: colors.lightGreen,
    width: wp(12),
    height: wp(12),
    borderRadius: wp(3),
  },
  createNewText: {
    paddingLeft: wp(2),
    fontSize: wp(3),
    fontWeight: 'bold',
    // textAlign: 'center',
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

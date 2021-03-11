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
    top: wp(-7),
    backgroundColor: colors.primary,
    borderRadius: wp(10),
    padding: wp(4),
  },
  addNewText: {
    marginLeft: wp(2.2),
    marginTop: wp(10),
    fontSize: wp(3),
  },
  containerOfIcon: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  auditReportText: {
    paddingLeft: wp(2),
    fontSize: wp(3),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;

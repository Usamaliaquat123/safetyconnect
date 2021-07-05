import {StyleSheet} from 'react-native';
import {colors, fonts} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  content: {
    flex: 1,
    // maxHeight: '100%',
    // marginBottom: wp(10),
    // height: '100%',
    // paddingBottom: wp(60),
    padding: wp(3),
    backgroundColor: colors.secondary,
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
  },
  htitle: {
    fontSize: wp(4),
    fontFamily: fonts.SFuiDisplayMedium,
  },

  observationType: {},
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  risk: {marginTop: wp(3)},
  location: {marginTop: wp(3)},
  status: {marginTop: wp(3)},
  initiator: {marginTop: wp(3)},
  fromDate: {},
  toDate: {},
  header: {
    padding: wp(5),
    paddingRight: wp(7),
    paddingLeft: wp(7),
    flex: 1,
    backgroundColor: colors.primary,
  },
  dataContainer: {
    marginTop: wp(2),
    borderWidth: wp(0.1),
    borderRadius: wp(1),
    padding: wp(3),
  },
  datacontainerText: {
    marginBottom: wp(1),
    fontSize: wp(3),
  },
  title: {
    fontSize: wp(3.5),
    marginLeft: wp(3.5),
    color: colors.secondary,
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplayBold,
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp(3),
    borderWidth: wp(0.2),
  },
  leftSelector: {flexDirection: 'row'},
  selectedContent: {
    opacity: 0.5,
  },
  headertle: {flexDirection: 'row'},
  headerSelect: {
    marginTop: wp(2),
    marginLeft: wp(11),
    flexDirection: 'row',
    // alignContent: 'stretch',
    justifyContent: 'space-between',
    width: wp(100),
  },
});

export default styles;

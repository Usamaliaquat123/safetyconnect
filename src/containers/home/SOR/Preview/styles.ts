import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors, fonts} from '@theme';
const styles = StyleSheet.create({
  header: {
    padding: wp(5),
    paddingRight: wp(7),
    paddingLeft: wp(7),
    flex: 1,
    backgroundColor: colors.primary,
  },
  clasifyT: {
    fontSize: wp(2.7),
    marginTop: wp(1),
    marginLeft: wp(2),
    color: colors.text,

    fontFamily: fonts.SFuiDisplayLight,
  },

  AttchimageContainer: {
    width: wp(43),
    height: wp(30),
    borderRadius: wp(3),
    margin: wp(1),
  },
  attchFileText: {
    fontSize: wp(2.7),
    fontStyle: 'italic',
    color: colors.text,
    opacity: 0.7,
    marginLeft: wp(5),
    marginTop: wp(2),
  },
  attachFileContainer: {
    padding: wp(5),
    borderRadius: wp(3),
    marginTop: wp(3),
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    // justifyContent: 'space-between',
    flexDirection: 'row',
  },
  lottieDownloadContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: wp(-2),
    top: wp(2),
    zIndex: wp(1),
  },

  classittleicon: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  lineheight: {
    height: wp(0.5),
    backgroundColor: colors.darkLightGrey,
  },
  riskCapacity: {
    borderRadius: wp(4),
    padding: wp(1),
    width: wp(20),
    alignItems: 'center',
    backgroundColor: colors.error,
  },
  riskCapacityText: {
    fontSize: wp(2.7),
    color: colors.secondary,
  },

  title: {
    fontSize: wp(4),
    marginLeft: wp(3.5),
    color: colors.secondary,
    // fontWeight: 'bold',
    fontFamily: fonts.SFuiDisplaySemiBold,
  },
  headertle: {flexDirection: 'row'},
  leftSelector: {flexDirection: 'row'},
  headerSelect: {
    marginTop: wp(2),
    marginLeft: wp(11),
    flexDirection: 'row',
    // alignContent: 'stretch',
    justifyContent: 'space-between',
    width: wp(100),
  },
  content: {
    flex: 1,
    // maxHeight: '100%',
    // marginBottom: wp(10),
    // height: '100%',
    // paddingBottom: wp(60),
    backgroundColor: colors.secondary,
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
  },
});

export default styles;

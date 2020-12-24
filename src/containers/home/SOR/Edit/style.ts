// import { colors } from './../../../../theme/colors';
import {StyleSheet} from 'react-native';
import {colors} from '@theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from 'react-native-reanimated';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.primary},
  // Header
  header: {
    padding: wp(5),
    paddingRight: wp(7),
    paddingLeft: wp(7),
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
    zIndex: wp(1),
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

  // Content
  content: {
    padding: wp(10),
    backgroundColor: colors.secondary,
    flex: 2,
    borderTopLeftRadius: wp(10),
    borderTopRightRadius: wp(10),
  },
  cnHeading: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: wp(4),
  },
  observationDetail: {
    borderRadius: wp(5),
    padding: wp(4),
    borderColor: colors.green,
    borderWidth: wp(0.3),
  },
  observationT: {
    fontWeight: 'bold',
    fontSize: wp(3.4),
    padding: wp(5),
    paddingBottom: wp(2.5),
    paddingLeft: wp(0),
    color: colors.text,
  },
  obserttle: {
    fontWeight: 'bold',
    fontSize: wp(3.4),
  },
  obInput: {borderBottomWidth: 0},
  obInputText: {fontSize: 15, fontWeight: 'bold'},
  obText: {fontWeight: 'bold', fontSize: 12},
  suggHeading: {
    fontSize: wp(3.4),
    marginTop: wp(5),
    color: colors.text,
  },
  sugContainer: {
    marginTop: wp(5),
    marginBottom: wp(5),
  },
  sugItm: {
    marginTop: wp(2),
    marginBottom: wp(2),
    padding: wp(3),
    backgroundColor: colors.lightBlue,
    borderRadius: wp(5),
    // paddingRight: wp(5),
    // paddingLeft: wp(5),
  },
  sugItmTxt: {
    fontSize: wp(3.5),
    color: colors.text,
  },
});

export default styles;

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
  // OBSERVATION
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
  obInputText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.text,
    opacity: 0.5,
  },
  obText: {fontWeight: 'bold', fontSize: 12},
  // SUGGESTIONS
  suggHeading: {
    fontSize: wp(3.4),
    marginTop: wp(8),
    color: colors.text,
    fontStyle: 'italic',
  },
  sugContainer: {
    marginTop: wp(2),
    marginBottom: wp(3),
  },
  sugItm: {
    marginTop: wp(2),
    marginBottom: wp(2),
    padding: wp(3),
    backgroundColor: colors.lightBlue,
    borderRadius: wp(5),
  },
  sugItmTxt: {
    fontSize: wp(3.5),
    color: colors.text,
  },
  // Classify SOR
  clasSorContainer: {},
  clasSorHeading: {
    fontSize: wp(3),
    fontWeight: 'bold',
    marginTop: wp(7),
    marginBottom: wp(2),
  },
  clasSorBtnCont: {
    borderRadius: wp(5),
    borderWidth: wp(0.3),
    padding: wp(5),
    marginTop: wp(1),
    alignSelf: 'stretch',
    width: wp('38%'),
    margin: wp(1),
    // justifyContent: 'center',
  },
  clasSorBtnV: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  clasSorBtnWrap: {flexDirection: 'row', alignSelf: 'center'},
  clasSorBtnTtl: {
    textAlign: 'center',
    fontSize: wp(3),
    marginTop: wp(0.5),
    marginLeft: wp(1),
  },
  // Involve Person
  involvePContainer: {
    marginTop: wp(5),
  },
  involvePText: {
    fontWeight: 'bold',
    color: colors.text,
    fontSize: wp(3),
  },
  involvePTextOtional: {
    fontStyle: 'italic',
    fontWeight: 'normal',
  },
  involvePInput: {
    marginTop: wp(2),
    borderColor: colors.green,
    borderWidth: wp(0.3),
    padding: wp(2),
    paddingLeft: wp(4),
    paddingRight: wp(4),
    borderRadius: wp(3),
    fontSize: wp(3.5),
    color: colors.text,
  },
  involveSuggestCont: {
    borderColor: colors.green,
    borderRadius: wp(3),
    padding: wp(3),
    borderWidth: wp(0.3),
    marginTop: wp(1),
  },
  involvePsuggCont: {
    borderColor: colors.textOpa,
    borderBottomWidth: wp(0.1),
    paddingTop: wp(3),
    paddingBottom: wp(3),
    alignItems: 'center',
    flexDirection: 'row',
  },
  involvePSt: {
    fontSize: wp(3),
  },
});

export default styles;

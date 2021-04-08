import {StyleSheet} from 'react-native';
import {colors} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  content: {
    flex: 2,

    backgroundColor: colors.secondary,
    borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
    padding: wp(8),
    paddingLeft: wp(5),
    paddingRight: wp(5),
  },
  conversationContainer: {
    marginTop: wp(5),
  },
  ttleConversation: {
    fontWeight: 'bold',
    color: colors.text,
    fontSize: wp(4),
    marginBottom: wp(3.5),
  },
  line: {
    borderWidth: wp(0.1),
    borderColor: colors.textOpa,
  },
});

export default styles;

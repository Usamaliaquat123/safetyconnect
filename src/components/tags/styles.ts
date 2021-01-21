
import { StyleSheet } from 'react-native';
import { colors } from '@theme';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container : {
        backgroundColor: colors.lightBlue,
    borderRadius: wp(3),
    padding: wp(3),
    marginTop: wp(1),
    marginBottom: wp(1),
    flexDirection: "row",
    marginRight: wp(1),
    alignItems: "center"

    },
    tagsText : {
        fontSize: wp(3),
        color: colors.primary,
        marginRight: wp(4)
    },

    containerIcon:  {
        borderRadius: wp(15),
        backgroundColor: "#707070",

    },
    crossIcon: {
        position: "absolute",

    }


})


export default styles
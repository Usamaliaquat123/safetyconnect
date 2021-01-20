
import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { colors } from "@theme";
const styles = StyleSheet.create({
    container : {
        padding: wp(5),
        flex: 1,
        paddingTop: wp(0),
        paddingBottom: wp(0),
        borderRadius: wp(5),
        backgroundColor: colors.secondary
    },
    headingContainer : {
        marginTop: wp(5),
        fontSize: wp(5),
        textAlign: "center"
,        fontWeight: "bold"
    },
    containerCard: {
        backgroundColor: colors.lightBlue,
        padding: wp(3),
        borderRadius: wp(3),
        marginTop: wp(5)

    },
    cardHeadng:  {
        fontWeight: "bold",
        color: colors.primary,
        fontSize: wp(4)
    },
    cardConatiner: {
        // marginLeft: wp(5),
        // backgroundColor: colors.secondary,
        marginBottom: wp(5),
        // marginRight: wp(1),
      },

})


export default styles
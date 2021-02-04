
import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { colors } from "@theme";

const styles =  StyleSheet.create({

    attachmentsContainer: {
        marginTop: wp(5),
        marginBottom: wp(10),
      },
      AttchimageContainer: {
        width: wp(43),
        height: wp(30),
        borderRadius: wp(3),
        margin: wp(1),
      },    
      commentTextInput: {
        width: wp(80),
        backgroundColor: colors.secondary,
        borderRadius: wp(4),
        alignItems: "center",
        borderWidth : wp(0.2),
        // padding: wp(1),
        flexDirection: "row",
        paddingLeft: wp(3),
       borderColor: colors.lightGrey 
      },
})

export default styles
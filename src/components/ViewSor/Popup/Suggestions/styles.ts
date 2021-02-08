
import { StyleSheet } from 'react-native';
import { colors } from "@theme";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
const styles = StyleSheet.create({
    containerPopup:  {
        backgroundColor: colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(8),
        paddingTop: wp(5),
        paddingLeft: wp(1),
        paddingRight: wp(1),
        paddingBottom: wp(5),
    },
    containerText:  {
        // justifyContent: "space-between",
        flexDirection: "row",
        marginTop: wp(3)
      },
      containerTextString:  {
          
        fontSize: wp(3.5),
        fontWeight: 'bold',
        marginBottom: wp(3),
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
      textInputPopup : {
        fontSize: wp(3), width: wp(50)
      },
      pickerIcon: {
        top: wp(2.7),
        position: 'absolute',
        right: wp(3),
        flexDirection: 'row',
      },
      pickerIconStyle: { 
        backgroundColor: colors.lightBlue,
                    padding: wp(2),
                    marginRight: wp(2),
                    borderRadius: wp(3),
      },
})


export default styles
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'

const { height, width } = Dimensions.get('window');


const ConfirmModal = ({title, btn1, btn2, onPress1, onPress2}) => {
  return (
    <View style={styles.modalBackground}>
        <Text style={styles.text}>
            {title}
        </Text>
        <View style={styles.modalBtnContainer}>
            <Pressable onPress={onPress1} style={styles.modalBtn}>
                    <Text  style={styles.modalBtnText}> {btn1} </Text>
            </Pressable>

            <Pressable onPress={onPress2} style={styles.modalBtn}> 
                    <Text style={styles.modalBtnText}> {btn2} </Text> 
            </Pressable>
        </View>
    </View>
  )
}

export default ConfirmModal

const styles = StyleSheet.create({
    text:{
        color:"white",
        marginTop: 10,
        fontSize:15,
        fontWeight:"bold"
    },
    modalBackground: {
        flex: 1,
        height: "100%",
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo semitransparente
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2, // Asegúrate de que sea mayor que el de las categorías
      },
    modalBtnContainer: {
        flexDirection: "row",
        marginTop: 10,
        gap: 45,
        zIndex: 1,
      },
      modalBtn:{
        backgroundColor: colors.color2,
        padding: 5,
        borderRadius:8,
      },
      modalBtnText:{
        color:"white"
      }
})
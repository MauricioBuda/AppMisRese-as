import { Pressable, StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React from 'react'

const { height, width } = Dimensions.get('window');

const PresentacionApp = ({closeModal}) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>"Mis reseñas" es una app para los que deseen llevar un registro de sus experiencias. Puede ser desde un libro leído, o una película vista; hasta una cerveza que se pruebe, o un destino que se visite. Toda la información queda guardada en la nube, por lo que una vez que te generas la cuenta, no hay manera de que se pierda. Así por ejemplo, si pasa mucho tiempo y volves a algún bar, vas a saber que tragos te habían gustado, o si tenés que recomendar algo a un amigo, vas a tener todo catalogado en tu app! Vas a poder dividir las experiencias por categorías, a cada una asignarle una nota y foto, y también una observación (como fecha, lugar, precio, etc). Cualquier crítica o sugerencia no dudes en contactarnos a mauricio.ariel.buda@gmail.com 😊 </Text>
      <Pressable onPress={closeModal} style={styles.btnContainer}>
        <Text style={styles.btnText}>Aceptar</Text>
      </Pressable>
    </ScrollView>
  )
}

export default PresentacionApp

const styles = StyleSheet.create({
    container:{
        position:"absolute",
        zIndex:2,
        top:45,
        right:"5%",
        padding:10,
        width:"90%",
        backgroundColor:"#b7cfe0DD",
        borderRadius:8,
    },
    text:{
        textAlign:"center",
        fontSize: width * 0.048,
        fontFamily:"Playfair",
    },
    btnContainer:{
        alignItems:"center",
        marginTop:25,
        backgroundColor:"#648095",
        width:"60%",
        marginHorizontal:"20%",
        paddingVertical:10,
        borderRadius:10
    },
    btnText:{
        fontSize: width * 0.05,
        color:"white",
        fontWeight:"bold"
    }
})
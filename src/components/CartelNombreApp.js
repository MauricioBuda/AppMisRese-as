import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CartelNombreApp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mis Reseñas</Text>
    </View>
  )
}

export default CartelNombreApp

const styles = StyleSheet.create({
container:{
    position:"absolute",
    top:10,
    left:10,
    marginBottom:55,
    backgroundColor:"#f3666644",
    borderRadius:8,
    padding:10
},
text:{
    fontSize:20,
    fontFamily:"Playfair"
}
})
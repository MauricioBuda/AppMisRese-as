import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'
import { useNavigation } from '@react-navigation/native'

const EmptyList = ({title, button, funcion}) => {

const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Pressable  
          onPress={title==="¡Todavìa no hay ítems en esta categoría!"? funcion: ()=>navigation.navigate(funcion)}
          style={styles.containerButton}
      >
        <Text style={styles.button}>{button}</Text>
      </Pressable>
    </View>
  )
}

export default EmptyList

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        flex:1,
        alignItems: "center"
    },
    text:{
        fontSize:25,
        fontFamily: "Playfair",
    },
    containerButton:{
        marginTop:25,
        padding:10,
        backgroundColor: colors.color3,
        borderRadius:6,
    },
    button:{
        fontSize:20,
        fontFamily: "Josefin",
        width:180,
        textAlign:"center"
    }
    
})
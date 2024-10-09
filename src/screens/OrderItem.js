import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'

const OrderItem = ({item}) => {
  return (
    <View style={styles.container}>

        <Image
            source={item.thumbnail ? 
                    {uri:item.thumbnail}
                    :
                    null}
            resizeMode='cover'
            style={styles.image}
        />
        <View style={styles.textContainer}>
            <Text style={styles.text}>{item.title}   (x {item.quantity})</Text>
            <Text style={styles.text}>US$ {item.price*item.quantity}</Text>
        </View>

    </View>
  )
}

export default OrderItem

const styles = StyleSheet.create({
    container:{
        margin:15,
        flexDirection:"row",
        gap:20,
        backgroundColor:colors.color3,
        padding:5,
        borderRadius:10
    },  
    image:{
        width:100,
        height:100,
        color:"black",
        borderRadius:12
    },
    textContainer:{
        justifyContent:"space-evenly",
    },
    text:{
        fontFamily:"Josefin",
        fontSize:18,
        color:"white",
        width:"90%"
    }
})
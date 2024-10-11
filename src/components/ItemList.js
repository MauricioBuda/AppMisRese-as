import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'

const ItemList = ({item}) => {
  return (
    <View>
        <Pressable style={styles.btnContainer}>
            <Text style={styles.text}>{item}</Text>
        </Pressable>
    </View>
  )
}

export default ItemList

const styles = StyleSheet.create({
    btnContainer:{
        width:"80%",
        marginHorizontal:"10%",
        backgroundColor:colors.color3,
        marginVertical: 15,
        borderRadius:8,
        padding:10,
    },
    text:{
        textAlign:"center"
    }
})
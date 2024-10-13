import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import React from 'react'
import { colors } from '../global/colors'
import AntDesign from '@expo/vector-icons/AntDesign';

const ItemList = ({item, itemId, functionDelete}) => {


  return (
    <View>
        <Pressable style={styles.container}>
            <Text style={styles.text}>{item}</Text>
            <AntDesign onPress={()=>functionDelete(itemId)} style={styles.btn} name="delete" size={30} color="black" />
        </Pressable>
    </View>
  )
}

export default ItemList

const styles = StyleSheet.create({
    container:{
        width:"80%",
        marginHorizontal:"10%",
        backgroundColor:colors.color3,
        marginVertical: 15,
        borderRadius:8,
        padding:10,
    },
    text:{
        textAlign:"left",
        padding: 5
    },
    btn:{
        position:"absolute",
        right:10,
        top: 6
    }
})
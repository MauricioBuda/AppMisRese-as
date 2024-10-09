import { FlatList, StyleSheet, View,Text} from 'react-native'
import  { useEffect, useState } from 'react'
import Search from '../components/Search'
import ProductItem from '../components/ProductItem'
import LoadingSpinner from '../components/LoadingSpinner'


const ItemListCategories = ({route}) => {

  // const {category} = route.params
  


  return (
    <View style={styles.container}>
      <Text>Prueba</Text>
    </View>
  )
}

export default ItemListCategories

const styles = StyleSheet.create({
  container:{
    width:"100%",
    marginBottom:100
  }
})
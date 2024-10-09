import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetOrderByUserQuery } from '../services/orders'
import OrderItem from './OrderItem'
import LoadingSpinner from '../components/LoadingSpinner'
import { colors } from '../global/colors'

const OrderDetail = ({route}) => {

    const {id, date} = route.params
    const localId = useSelector(state => state.auth.localId)
    const {data:order,isLoading} = useGetOrderByUserQuery({localId,orderId:id})

if(isLoading) return <LoadingSpinner/>

  return (
    <View>
      <Text style={styles.date}>Orden generada:  {date}</Text>
      <FlatList
      data={order.items}
      keyExtractor={item=>item.id}
      renderItem={({item})=> <OrderItem item={item} />}
      />
    </View>
  )
}

export default OrderDetail

const styles = StyleSheet.create({
  date:{
    textAlign:"center",
    marginTop:20,
    fontSize:22,
    fontFamily:"Josefin",
    color:colors.color2
  }
})
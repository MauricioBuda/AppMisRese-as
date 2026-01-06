import { StyleSheet, Text, View, FlatList } from 'react-native'
import OrderItem from '../components/OrderItem'
import {  useDeleteOrderMutation, useGetOrdersByUserQuery } from '../services/orders'
import LoadingSpinner from '../components/LoadingSpinner'
import { useSelector } from 'react-redux'
import EmptyList from '../components/EmptyList'
import SubmitButton from '../components/SubmitButton'
import { useEffect } from 'react'

const Orders = () => {

  const localId = useSelector(state => state.auth.localId)
  const [triggerUseDeleteOrderMutation] = useDeleteOrderMutation()

  const {data:orders,isLoading} = useGetOrdersByUserQuery(localId)


  if(isLoading) return <LoadingSpinner/>

  if(orders.length === 0){
    return <EmptyList title="¡En proceso!" button="Volver" funcion="HomeStack"/>
  }

  const deleteOrders = () => {
    triggerUseDeleteOrderMutation({localId})
  }

  return (
    <View>
      <FlatList
        style={styles.flat}
        data={orders}
        keyExtractor={(item)=> item.id}
        renderItem={({item})=> <OrderItem item={item}/>}
      />
      <View style={styles.buttonContainer}>
        <SubmitButton title="Eliminar todas las órdenes" onPress={deleteOrders}/>   
      </View>
      
    </View>
  )
}

export default Orders

const styles = StyleSheet.create({
  buttonContainer:{
    position:"absolute",
    top: "90%",
    width:"70%",
    marginHorizontal:"15%",
  },
  flat:{
    marginBottom:70
  }
})
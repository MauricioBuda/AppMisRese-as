import { StyleSheet, Text, View,FlatList, Pressable } from 'react-native'
import EmptyList from '../components/EmptyList'
import { useEffect } from 'react'
import CartItem from '../components/CartItem'
import { colors } from '../global/colors'
import { useDispatch, useSelector } from 'react-redux'
import { usePostOrderMutation } from '../services/orders'
import { clearCart } from '../features/cart/cartSlice'

const Cart = ({navigation}) => {

  const cart = useSelector(state => state.cart)
  const localId = useSelector(state => state.auth.localId)
  const [triggerPostOrder] = usePostOrderMutation()
  const dispatch = useDispatch()


  const handleAddOrder = () => {
    const createdAt = new Date().toLocaleString()
    const order = {
      ...cart,
      createdAt
    }
    triggerPostOrder({localId,order})
    dispatch(clearCart())
    navigation.navigate("OrdersStack")

  }


  if(cart.total === 0) return <EmptyList title="¡En proceso!" button="Volver" funcion="HomeStack"/>
  


  return (
    <View style={styles.container}>
      <FlatList
      data={cart.items}
      keyExtractor={item => item.id}
      renderItem={({item})=> <CartItem item={item}/> }
      />
      <View style={styles.containerConfirm}>
      <Text style={styles.total}>Total: US$ {cart.total} </Text>
        <Pressable onPress={handleAddOrder}>
          <Text style={styles.textConfirm}>Confirmar</Text>
        </Pressable>

      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
    container:{
        justifyContent:"space-between",
        flex:1
    },
    containerConfirm:{
      backgroundColor: colors.color1,
      padding: 20,
      flexDirection:"row",
      justifyContent:"space-between",
      marginBottom: 10,
    },
    total:{
      fontSize:20,
      fontWeight:"bold",
      color:"white"
    },
    textConfirm:{
      color: "white",
      fontSize:20,
      backgroundColor:colors.color2,
      padding: 5,
      borderRadius:5,
    }
})
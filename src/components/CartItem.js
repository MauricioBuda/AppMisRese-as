import { StyleSheet, Text, View, Pressable } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import { colors } from '../global/colors'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItemCart } from '../features/cart/cartSlice'



const CartItem = ({item}) => {

  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const handleDeleteItem = (id) => {
    dispatch(deleteItemCart({id}))
}



  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.price}> US$ {item.price} (X{item.quantity}) </Text>
      </View>


      <Pressable onPress={()=>handleDeleteItem(item.id)}>
          <Entypo name="trash" size={48} color="white" />
      </Pressable>
    </View>
  )
}

export default CartItem

const styles = StyleSheet.create({
    container:{
        width:"90%",
        marginHorizontal:"5%",
        backgroundColor:colors.color3,
        marginVertical:10,
        padding:20,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        borderRadius:3
    },
    containerText:{
        width:"70%",
        gap:5
    },
    title:{
        color:"white",
        fontSize:20
    },
    brand:{
        color:"white",
        fontSize:16
    },
    price:{
        color:"white",
        fontSize:16,
        fontWeight:"bold"
    }
})
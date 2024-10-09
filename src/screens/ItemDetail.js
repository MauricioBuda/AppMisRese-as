import { Image, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native'
import { useState } from 'react'
import { colors } from '../global/colors'
import { addItemCart } from '../features/cart/cartSlice'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useGetProductQuery } from '../services/shop'
import LoadingSpinner from '../components/LoadingSpinner'

const ItemDetail = ({route}) => {

  const {id} = route.params
  const {data:product,isLoading} = useGetProductQuery(id)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [count, setCount] = useState(1)

  const handleAddItemCart = () => {
      dispatch(addItemCart({...product, quantity:count}))
      navigation.navigate("CartStack")
      setCount(1)
  }
  
  const handleAddCount = () => {
    setCount(count + 1)
  }
  
  const handleRemoveCount = () => {
    if(count > 1){
      setCount(count - 1)
    }
  }

  if(isLoading) return <LoadingSpinner/>

  return (
    <ScrollView style={styles.container}>

      <Image
      style={styles.image}
      resizeMode='contain'
      source={{uri:product.thumbnail}} //puede ser también source={require("RUTA")}
      />
      <View style={styles.containerText}>
        <Text style={styles.title}> {product.title} </Text>
        <Text style={styles.description}> {product.description} </Text>
        <Text style={styles.price}> US$ {product.price} </Text>
      </View>

      <View style={styles.countContainer}>
        <Pressable onPress={handleRemoveCount} style={styles.PressableCount}>
          <Text style={styles.buttonCount}>-</Text>
        </Pressable>

        <Text style={styles.count}>{count}</Text>

        <Pressable onPress={handleAddCount}  style={styles.PressableCount}>
          <Text style={styles.buttonCount}>+</Text>
        </Pressable>
      </View>

      <Pressable onPress={handleAddItemCart} style={styles.button}>
        <Text style={styles.buttonConfirm}>Agregar al carrito</Text>
      </Pressable>

    </ScrollView>
  )
}

export default ItemDetail

const styles = StyleSheet.create({
    container:{
      width:"100",
      gap: 25
    },
    containerText:{
        marginHorizontal: "10%",
        gap: 25
    },
    image:{
        borderRadius: 15,
        width:"71%",
        height:280,
        marginTop: 25,
        marginHorizontal:"auto"
    },
    title:{
        width:"90%",
        marginHorizontal:"5%",
        textAlign:"center",
        fontSize: 25,
        fontFamily:"Josefin"
    },
    description:{
      textAlign:"center",
      fontFamily:"Playfair"
    },
    price:{
        width:"33%",
        marginHorizontal:"auto",
        fontWeight:"bold",
        textAlign:"center",
        fontSize:25
    },
    button:{
        width:"50%",
        marginHorizontal: "25%",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: colors.color3,
        height: 35,
        fontWeight:"bold",
        borderRadius: 5,
        fontSize:30,
    },
    countContainer:{
      flexDirection:"row",
      justifyContent:"center",
      marginVertical:30
    },
    count:{
      textAlign:"center",
      width:100,
      alignSelf:"center",
      fontSize:40
    },
    PressableCount:{
      alignSelf:"center",
      width:40,
      height:40,
    },
    buttonCount:{
      width:"100%",
      height:"100%",
      backgroundColor:colors.color1,
      borderRadius: 90,
      textAlign:"center",
      lineHeight:45,
      fontSize:35
    },
    buttonConfirm:{
      fontSize:20
    }
})
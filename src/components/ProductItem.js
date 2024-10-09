import { Image, Pressable, StyleSheet, Text, useWindowDimensions} from 'react-native'
import { colors } from '../global/colors'
import { useNavigation } from '@react-navigation/native'

const ProductItem = ({product}) => {

  const {width, height} = useWindowDimensions()
  const navigation = useNavigation()


  return (
    <Pressable style={styles.container} onPress={()=>navigation.navigate("Detail",{id:product.id})}>
      <Text style={[styles.title,width < 300 ? styles.titleMin: styles.titleMax]}>{product.title}</Text>
      <Image
        style={styles.image}
        resizeMode='cover'
        source={{uri:product.thumbnail}}
      />
    </Pressable>
  )
}

export default ProductItem

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.color3,
        marginVertical:10,
        flexDirection:"row",
        alignItems:"center",
        padding:8,
        width:"90%",
        marginHorizontal:"5%",
        gap:10,
        borderRadius:6
    },
    title:{
        width:"70%",
        color:"white",
        fontFamily:"Josefin"
    },
    titleMin:{
      fontSize:14
    },
    titleMax:{
      fontSize:20
    },
    image:{
        minWidth:60,
        width:"20vw",
        maxWidth:150,
        minHeight:60,
        height:"20vw",
        maxHeight:150,
        borderRadius:6
    }
})
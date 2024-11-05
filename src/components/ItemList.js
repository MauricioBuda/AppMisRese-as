import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import { useEffect, useState } from 'react'
import React from 'react'
import { colors } from '../global/colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ConfirmModal from './ConfirmModal';


const ItemList = ({name, image, itemId, categoryId, functionDelete}) => {

    const localId = useSelector(state => state.auth.localId)
    const navigation = useNavigation()
    const [deleteModal, setDeleteModal] = useState(false)

    
    // useEffect(()=>{
    //     console.log(image)
    //   },[])

    const handleDeleteModal = () => {
        setDeleteModal(!deleteModal)
      }

  return (
    <View>
        <Pressable onPress={() => navigation.navigate("Detail",{name: name, itemId: itemId, categoryId: categoryId})} style={styles.container}>
            <Text style={styles.text}>{name}</Text>
            <Image
                        source={image ? { uri: image } : require("../../assets/profile_default.png")}
                        resizeMode="cover"
                        style={styles.image}
            />
            <AntDesign onPress={handleDeleteModal} style={styles.btn} name="delete" size={30} color="black" />


            {
                deleteModal
                ?
                    <ConfirmModal title="¿Seguro? Se eliminará este ítem y todo su contenido" btn1="CANCELAR" btn2="ELIMINAR" onPress1={handleDeleteModal} onPress2={()=>functionDelete(itemId)}/>
                :
                    null
            }

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
    },
    image: {
        position:"absolute",
        right:60,
        top: 6,
        width: 32,
        height: 32,
        borderRadius: 90,
    }
})
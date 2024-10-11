import { Pressable, StyleSheet, Text, View,StatusBar,Platform, TextInput, Dimensions } from 'react-native'
import { useState } from 'react'
import { colors } from '../global/colors'
import { deleteSession } from '../db'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../features/auth/authSlice'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAddCategoryMutation } from '../services/users'
import { BlurView } from 'expo-blur';

const { height, width } = Dimensions.get('window');



const Header = ({title}) => {


  const dispatch = useDispatch()
  const idToken = useSelector(state => state.auth.idToken)
  const navigation = useNavigation()
  const route = useRoute()

  const localId = useSelector(state => state.auth.localId);
  const [triggerAddNewCategory] = useAddCategoryMutation();


  const [viewModal, setViewModal] = useState(false)
  const [newCategory, setNewCategory] = useState("")




  const onLogout = () =>{
    deleteSession()
    dispatch(clearUser())
  }




  const handleViewModal = () => {
    setViewModal(!viewModal)
  }




  const handleAddNewCategory = async () => {
    console.log(localId)
    await triggerAddNewCategory({ localId, category: { name: newCategory } })
    handleViewModal()
}






  return (
    <View style={styles.container}>
      {route.name === "Home"
          ?
            <Pressable onPress={handleViewModal} style={styles.iconAdd}>
                <MaterialIcons name="format-list-bulleted-add" size={35} color="white" />
            </Pressable>
          :
          null
      }





      {route.name !== "Home" && route.name !== "Login" && route.name !== "Register"? 
      <Pressable style={styles.icon} onPress={()=>navigation.goBack()}>
          <Ionicons name="arrow-undo-circle-outline" size={35} color="white" />
      </Pressable>
      :
      null
      } 




      <Text style={styles.text}>{title}</Text>
      {idToken  && 
      <Pressable onPress={onLogout} style={styles.logout}>
        <Ionicons name="exit-outline" size={35} color="white" />
      </Pressable>}





{
  viewModal
  ?
  <BlurView intensity={400} style={styles.modalContainer}>

  <TextInput
  style={styles.textInput}
  placeholder="Nombre de la categoria"
  onChangeText = {setNewCategory}
  autoFocus
  />

  <View style={styles.modalBtnContainer}>
      <Pressable onPress={handleViewModal} style={styles.modalBtn}>
        <Text  style={styles.modalBtnText}> Cancelar </Text>
      </Pressable>

      <Pressable onPress={handleAddNewCategory} style={styles.modalBtn}> 
        <Text style={styles.modalBtnText}> Agregar </Text> 
      </Pressable>
  </View>

</BlurView>
: 
null
}




    
    
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container:{
    marginTop:Platform.OS === "android" ? StatusBar.currentHeight:0,
    backgroundColor:colors.color2,
    width:"100%",
    height:80,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    position:"relative"
  },
  text:{
    fontSize:25,
    fontFamily:'Josefin',
    color:"white"
  },
  icon:{
    position:"absolute",
    left:20
  },
  logout:{
    position:"absolute",
    right:18,
  },
  iconAdd:{
    position:"absolute",
    left:22
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "80%", 
    left: "10%",
    top: height * 0.2,
    height: height * 0.3,
    padding: 20,
    borderRadius: 20, 
    overflow: "hidden", 
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
  },
  modalBtnContainer: {
    flexDirection: "row",
    marginTop: 30,
    gap: 45,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: "gray",
    width: "100%",
    marginBottom: 20,
    padding: 5
  },
  modalBtn:{
    backgroundColor: colors.color2,
    padding: 5,
    borderRadius:8,
  },
  modalBtnText:{
    color:"white"
  }
})
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ShadowWrapper from './ShadowWrapper';
import { colors } from '../global/colors';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAddItemInCategoryMutation, useDeleteCategoryMutation, useEditCategoryMutation } from '../services/users';
import { useSelector } from 'react-redux';
import ConfirmModal from './ConfirmModal';
import LoadingSpinner from './LoadingSpinner';


const Category = ({ item }) => {
  const navigation = useNavigation();
  const localId = useSelector(state => state.auth.localId);

  const [isEditing, setIsEditing] = useState(false)
  const [newNameCategory, setNewNameCategory] = useState(item.name)
  const [deleteModal, setDeleteModal] = useState(false)

  const [triggerChangeNameCategory] = useEditCategoryMutation()
  const [triggerDeleteCategory, {isLoading}] = useDeleteCategoryMutation()


  const handleEditNameCategory = () => {
    setIsEditing(!isEditing)
  }

  const confirmDeleteCategory = async () => {
    if (isLoading) return <LoadingSpinner/>
    await triggerDeleteCategory({localId, categoryId: item.id})
  }

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal)
  }

  const handleConfirmChangeCategoryName = () => {
    triggerChangeNameCategory({localId, categoryId: item.id, newName: newNameCategory})
    handleEditNameCategory()
  }



  return (
    <>
    <Pressable onPress={() => navigation.navigate("Products",{name:item.name, categoryId: item.id})}>
      <ShadowWrapper style={styles.container}>

        {
          isEditing?
                <TextInput
                value={newNameCategory}
                onChangeText= {setNewNameCategory}
                autoFocus
                />
          :
              <Text style={styles.text}>{item.name}</Text> 

        }

        <View style={styles.buttonsContainer}>
          <Pressable>
            <AntDesign 
            style={styles.btn} 
            name={isEditing?"checkcircleo": "edit"} 
            size={30} 
            color="black"
            onPress={isEditing ? handleConfirmChangeCategoryName : handleEditNameCategory}
            />
          </Pressable>

          <Pressable onPress={handleDeleteModal}>
            <AntDesign style={styles.btn} name="delete" size={30} color="black" />
          </Pressable>
        </View>

      </ShadowWrapper>
    </Pressable>


    {
      deleteModal
      ?
    <ConfirmModal title="¿Seguro? Se eliminará la categoría y todo su contenido" btn1="CANCELAR" btn2="ELIMINAR" onPress1={handleDeleteModal} onPress2={confirmDeleteCategory}/>
      :
      null
    }
    </>
  );
}

export default Category;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginHorizontal: "5%",
    backgroundColor: colors.color1,
    marginVertical: 10,
    padding: 18,
    justifyContent: "left",
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
  },
  text: {
    fontSize: 15,
    fontFamily: "Playfair",
    fontWeight: "bold",
    color: "white",
  },
  buttonsContainer: {
    flexDirection: "row",
    position: "absolute",
    right: 10,
    margin: 10
  },
  btn: {
    marginLeft: 20
  }
});

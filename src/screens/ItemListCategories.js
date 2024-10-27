import { FlatList, StyleSheet, View, Text, Pressable, TextInput, Dimensions} from 'react-native'
import { useEffect, useState } from 'react'
import { BlurView } from 'expo-blur';
import { colors } from '../global/colors'
import { useSelector } from 'react-redux'
import { useAddItemInCategoryMutation, useDeleteItemInCategoryMutation, useGetItemsFromCategoriesQuery } from '../services/users'
import ItemList from '../components/ItemList';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyList from '../components/EmptyList';

const { height, width } = Dimensions.get('window');

const ItemListCategories = ({route}) => {
  const { name, categoryId } = route.params
  const localId = useSelector(state => state.auth.localId)
  const [itemId, setItemId] = useState("")

  const [triggerAddNewItemInCategory] = useAddItemInCategoryMutation()
  const [triggerDeleteItemFromCategory] = useDeleteItemInCategoryMutation()
  
  // Aquí usas correctamente el hook para obtener los ítems de la categoría
  const { data: items = [], error, isLoading } = useGetItemsFromCategoriesQuery({ localId, categoryId });

  const [viewModal, setViewModal] = useState(false);
  const [newItem, setNewItem] = useState("");

  // useEffect(()=>{

  // },[items])

  const addNewItemInCategory = async () => {
    if (!newItem) return;  // Asegúrate de que haya un ítem para agregar
    try {
      await triggerAddNewItemInCategory({ localId, categoryId, newItem });
      setNewItem("");  // Limpiar el campo de texto después de agregar el ítem
      setViewModal(false);  // Cerrar el modal después de agregar
    } catch (error) {
      console.log("Error al agregar el ítem", error);
    }
  };

  const handleViewModal = () => {
    setViewModal(!viewModal);
  }

  const deleteItemInCategory = async (itemId) => {
    try {
      await triggerDeleteItemFromCategory({ localId, categoryId, itemId })
    } catch (error) {
      console.log("Error al eliminar el ítem:", error);
    }
  }


  if (isLoading) {
    return <LoadingSpinner/>
  }

  if (error) {
    return <Text>Error al cargar los items.</Text>;
  }


  return (
    <>
      {
        !items
        ?
          <EmptyList title="¡Todavìa no hay ítems en esta categoría!" button="Agregar el primer ítem" funcion={handleViewModal} />
        :
          <View style={styles.container}>

          {/* Mostrar los ítems obtenidos */}
          <FlatList
            data={Object.entries(items)}  // Convertir el objeto de ítems en un array
            keyExtractor={([key, item]) => key}
            renderItem={({ item }) => <ItemList name= {item[1].name} itemId={item[0]}  categoryId={categoryId} functionDelete={deleteItemInCategory}/>} // Renderizar el nombre del ítem
          />

        <Pressable onPress={handleViewModal} style={styles.btn}>
            <Text style={styles.btnText} >Agregar nuevo ítem en "{name}"</Text>
          </Pressable>
        </View>
      }

      {viewModal && (
        <BlurView intensity={400} style={styles.modalContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={`Nombre del nuevo item de "${name}"`}
            onChangeText={setNewItem}
            value={newItem}
            autoFocus
          />

          <View style={styles.modalBtnContainer}>
            <Pressable onPress={handleViewModal} style={styles.modalBtn}>
              <Text style={styles.modalBtnText}> Cancelar </Text>
            </Pressable>

            <Pressable onPress={addNewItemInCategory} style={styles.modalBtn}> 
              <Text style={styles.modalBtnText}> Agregar </Text> 
            </Pressable>
          </View>
        </BlurView>
      )}
    </>
  );
};

export default ItemListCategories;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 100
  },
  btn: {
    backgroundColor: colors.color1,
    minWidth: "60%",
    maxWidth:"80%",
    borderRadius: 8,
    marginVertical: 20,
    marginHorizontal: "auto",
    padding: 10
  },
  btnText: {
    textAlign: "center"
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "80%", 
    left: "10%",
    top: height * 0.1,
    height: height * 0.3,
    padding: 20,
    borderRadius: 20, 
    overflow: "hidden", 
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    zIndex: 10,  // Asegúrate de que el modal esté sobre otros elementos
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
  modalBtn: {
    backgroundColor: colors.color2,
    padding: 5,
    borderRadius: 8,
  },
  modalBtnText: {
    color: "white"
  }
});

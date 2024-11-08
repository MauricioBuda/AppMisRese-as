import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View, Dimensions} from 'react-native'
import { useState, useEffect } from 'react'
import { colors } from '../global/colors'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useGetItemInformationQuery, usePatchAddCalificationInItemInCategoryMutation, usePatchAddObservationInItemInCategoryMutation } from '../services/users'
import LoadingSpinner from '../components/LoadingSpinner'

const { height, width } = Dimensions.get('window');

const ItemDetail = ({route}) => {
  const localId = useSelector(state => state.auth.localId)

  const {name, itemId, categoryId} = route.params
  const {data: item, isLoading} = useGetItemInformationQuery({localId, categoryId, itemId})
  const [triggerChangeCalification] = usePatchAddCalificationInItemInCategoryMutation()
  const [triggerSaveObservation] = usePatchAddObservationInItemInCategoryMutation()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  
  const [obs, setObs] = useState(item?.observation? item.observation : "")
  const [count, setCount] = useState(1)
  const [viewCount, setViewCount] = useState(false)
  const [viewObs, setViewObs] = useState(false)

  useEffect(()=>{
    if(item){
      if(item.calification){
        setCount(item.calification)
      }
      if(item.observation){
        setObs(item.observation)
      }
    }

  },[item])

  const changeCalification = async () => {
    triggerChangeCalification({localId, categoryId, itemId, calification: count})
  }

  const changeObservation = async () => {
    triggerSaveObservation({localId, categoryId, itemId, observation: obs})
  }
  
  
  const handleAddCount = () => {
    if(count < 10){
      setCount(count + 0.5)
    }
  }
  
  const handleRemoveCount = () => {
    if(count > 1){
      setCount(count - 0.5)
    }
  }

  const handleViewCount = () => {
    setViewCount(!viewCount)
  }

  const handleViewObs = () => {
    setViewObs(!viewObs)
  }

  if(isLoading) return <LoadingSpinner/>


  return (
    <ScrollView style={styles.container}>

      <View>
        <Text style={styles.title}>{name}</Text>
      </View>



      <Pressable onPress={()=>navigation.navigate('FullImage', {image: item.image})}>
          <Image
                    source={item?.image ? { uri: item.image } : require("../../assets/pic.jpg")}
                    resizeMode="cover"
                    style={styles.image}
          />
      </Pressable>






      <View style={styles.countContainer}>
          {
            viewCount
              ?
                <Pressable onPress={handleRemoveCount} style={styles.PressableCount}>
                    <Text style={styles.buttonCount}>-</Text>
                </Pressable>
              :
              null
          }

            <Text style={[styles.count, {color: count === 1? "red" : count === 10? "green" : "black" }]}>
              {count}
            </Text>

          {
            viewCount
              ?
                <Pressable onPress={handleAddCount}  style={styles.PressableCount}>
                  <Text style={styles.buttonCount}>+</Text>
                </Pressable>
              :
                null
          }
      </View>





      <Pressable 
        onPress={()=>{
            handleViewCount()
            viewCount? changeCalification() : null
          }}
        style={styles.button}
        >
        <Text style={[styles.buttonConfirm, {fontWeight: viewCount? "bold" : null}]}>
          {viewCount ? "Guardar nota" : count === 0 ? "Agregar calificación" :  !viewCount? "Modificar nota" : null}
        </Text>
      </Pressable>




      
      <Pressable onPress={()=>navigation.navigate("SelectItemImage",{name, localId, itemId, categoryId})} style={styles.button}>
        <Text style={styles.buttonConfirm}> {item?.image ? "Modificar foto" : "Agregar foto" } </Text>
      </Pressable>

      <Pressable
          onPress={()=>{
            handleViewObs()
            viewObs? changeObservation() : null
          }}
          style={styles.button}
      >
        <Text style={[styles.buttonConfirm, {fontWeight: viewObs? "bold" : null}]}>{viewObs ? "Guardar observación" : item?.observation? "Modificar observación" : "Agregar observación"}</Text>
      </Pressable>




      {
        viewObs ?
          <View>
              <TextInput 
                  style={styles.input} 
                  multiline= {true}
                  placeholder= "Ejemplo: Precio, dirección, fecha, empresa, etc.."
                  onChangeText={setObs}
                  value={obs}
                  autoFocus
              />
            </View>
          :
          <View>
          <Text
              style={styles.obs} 
              multiline= {true}
            >
              {obs}
          </Text>
        </View>
      }

{/* <FullImage image={item?.image? item.image : null}/> */}


    </ScrollView>
  )
}

export default ItemDetail

const styles = StyleSheet.create({
  title:{
    textAlign:"center",
    marginVertical: 25,
    fontWeight:"bold",
    fontSize:30
  },
    container:{
      width:"100",
      gap: 25
    },
    button:{
        width:"60%",
        marginHorizontal: "20%",
        marginVertical: 15,
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
      marginVertical:10
    },
    count:{
      textAlign:"center",
      width:100,
      alignSelf:"center",
      fontSize:40,
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
      fontSize: width * 0.05
    },
    input:{
      borderWidth:1,
      marginVertical: 20,
      borderRadius: 8,
      width: "80%",
      marginHorizontal: "10%",
      paddingHorizontal: 10,
      paddingVertical: 5
    },
    obs:{
      textAlign:"center",
      marginVertical: 20,
      borderRadius: 8,
      width: "80%",
      marginHorizontal: "10%",
      paddingHorizontal: 10,
      paddingVertical: 5
    },
    image: {
      width: "50%",
      height: 150,
      marginHorizontal:"25%",
      borderRadius: 10,
  },
})
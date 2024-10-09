import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Locations from './Locations';
import SubmitButton from './SubmitButton';
import { usePutUserLocationMutation } from '../services/users';
import { useSelector } from 'react-redux';
import AntDesign from '@expo/vector-icons/AntDesign';

const ListLocations = ({ locations }) => {

    const localId = useSelector(state => state.auth.localId)
    const [triggerPutUserLocation] = usePutUserLocationMutation()

const deleteLocations= () => {
    const userLocation = {}
    triggerPutUserLocation({ localId, userLocation });
}

    return(
        <>
        
        {locations.length > 0?
                                <Text style={styles.text}> ↓ Direcciones anteriores ↓ </Text>
                    :
                        null
        }

        <FlatList
            scrollEnabled={false}
            style={styles.flat}
            data={locations}
            keyExtractor={item => item.id}
            renderItem={({item}) => <Locations item={item.address} /> }
        />

        {locations.length > 0?
                    <View style={styles.deleteContainer}>
                        <AntDesign style={styles.deleteIcon} name="delete" size={24} color="black" />
                        <SubmitButton title="Eliminar todas las direcciones"  onPress={deleteLocations} />
                    </View>
                    :
                        null
        }

        </>
    )
}

export default ListLocations;

const styles = StyleSheet.create({
  flat: {
    marginTop:30
  },
  text:{
    fontSize:25,
    fontFamily:"Playfair",
    textAlign:"center",
    marginTop:30
  },
  deleteContainer:{
    flexDirection:"row",
    alignItems:"center"
  },
  deleteIcon:{
    position:"absolute",
    left:50,
    zIndex:1
  }
})


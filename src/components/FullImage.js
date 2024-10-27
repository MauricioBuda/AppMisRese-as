import { StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'

const { height, width } = Dimensions.get('window');


const FullImage = ({route}) => {
    const {image} = route.params

  return (
    <Image
        source={{uri: image? image : null}}
        resizeMode="cover"
        style={styles.image}
    />
  )
}

export default FullImage

const styles = StyleSheet.create({
    image: {
        position:"absolute",
        width: width*0.95,
        height: height*0.78,
        borderRadius: 20,
        marginHorizontal: width*0.025,
        marginVertical: height*0.008
    }
})
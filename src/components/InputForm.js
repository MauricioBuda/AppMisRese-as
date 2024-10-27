import { StyleSheet, Text, View,TextInput } from 'react-native'

const InputForm = ({label,value,onChangeText,isSecure,error}) => {
  return (
    <View style={styles.inputContainer}>
        <Text style={styles.titleInput}>{label}</Text>
        <TextInput  
            value={value}  
            onChangeText={onChangeText} 
            style={styles.input}
            secureTextEntry={isSecure}
        />
        <View><Text style={styles.error}>{error ? error : ""} </Text></View>
    </View>
  )
}

export default InputForm

const styles = StyleSheet.create({
    inputContainer:{
        width:"100%"
    },
    input:{
        width:"90%",
        borderWidth:0,
        borderWidth:2,
        borderColor:"#00000077",
        padding:2,
        paddingLeft:10,
        fontFamily:"Josefin",
        fontSize:18,
        marginHorizontal:"5%",
        marginVertical:10,
        borderRadius:8,
        backgroundColor: "#d4b3b3BB",

      },
      titleInput:{
        width:"90%",
        marginHorizontal:"5%",
        fontSize:18,
        fontFamily:"Josefin",
        color:"black"
      },
      error:{
        fontSize:16,
        color:"red",
        fontFamily:"Josefin",
        fontStyle:"italic",
        marginHorizontal:20
      }
})
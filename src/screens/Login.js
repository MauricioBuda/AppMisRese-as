import { StyleSheet, Text, View,Pressable } from 'react-native'
import { colors } from '../global/colors'
import { useEffect, useState } from 'react'
import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton'
import { useLoginMutation } from '../services/auth'
import { setUser } from '../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { loginSchema } from '../validations/loginSchema'
import { deleteSession, insertSession } from '../db'
import AntDesign from '@expo/vector-icons/AntDesign';


const Login = ({navigation}) => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errorEmail,setErrorEmail] = useState("")
    const [errorPassword,setErrorPassword] = useState("")
    const [triggerLogin,{data,isSuccess,isError,error}] = useLoginMutation()
    const dispatch = useDispatch()
    const [viewPass, setViewPass] = useState(true)

    useEffect(()=>{
      if(isError) {
        setErrorEmail("email o contraseña invalida")
        setErrorPassword("email o contraseña invalida")
      }
    },[isError])


    const onSubmit = async () => {
        try {
          loginSchema.validateSync({email,password})
          const {data} = await triggerLogin({email,password})
          deleteSession()
          insertSession(data)
          dispatch(setUser({
            email:data.email,
            idToken:data.idToken,
            localId:data.localId
          }))
        } catch (error) {
          console.log(error)
          switch(error.path){
            case "email":
              setErrorEmail(error.message)
              setErrorPassword("")
              break
            case "password":
              setErrorPassword(error.message)
              setErrorEmail("")
              break
              default:
                break
          }
     
        }
    }


    const handleChangeViewPass = () => {
      setViewPass(!viewPass)
    }

  return (
    <View style={styles.main}>
        <View style={styles.container}>
            <InputForm
                style={styles.input}
                label="Email"
                value={email}
                onChangeText={(t) => setEmail(t)}
                isSecure={false}
                error={errorEmail}
            />
            <View style={styles.inputContainer}>
                <InputForm
                    style={styles.input}
                    label="Password"
                    value={password}
                    onChangeText={(t) => setPassword(t)}
                    isSecure={viewPass}
                    error={errorPassword}
                />
                <AntDesign onPress={handleChangeViewPass} style={styles.eye} name="eye" size={26} color="white" />
            </View>

            <View style={styles.confirmContainer}>
                <SubmitButton onPress={onSubmit} title="Iniciar Sesión"/>
            </View>
            <Text style={styles.sub}>¿No tenés una cuenta?</Text>
            <Pressable onPress={()=> navigation.navigate("Register")} >
                <Text style={styles.subLink}>Registro</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
      },
      container:{
        width:"90%",
        backgroundColor:colors.color1,
        gap:15,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:20
      },
      title:{
        fontSize:22,
        fontFamily:"Lobster"
      },
      sub:{
        fontSize:16,
        fontFamily:"Josefin",
        marginTop:15,
        color:"white"
      },
      subLink:{
        fontSize:16,
        fontFamily:"Josefin",
        color: colors.color2
      },
      inputContainer:{
        flexDirection:"row",
        alignItems:"center"
      },
      eye:{
        position:"absolute",
        right:25,
        top:30
      },
      confirmContainer:{
        borderWidth:1,
        borderColor:"white",
        borderRadius:60,
        padding:3
      }
})
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable, ImageBackground } from 'react-native'
import { colors } from '../global/colors'
import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton'
import { useRegisterMutation } from '../services/auth'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/auth/authSlice'
import { registerSchema } from '../validations/registerSchema'
import { deleteSession, insertSession } from '../db'
import AntDesign from '@expo/vector-icons/AntDesign';
import { URL_FIREBASE } from '../firebase/database'
import CartelNombreApp from '../components/CartelNombreApp'
import PresentacionApp from '../components/PresentacionApp'


const Register = ({navigation}) => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [errorEmail,setErrorEmail] = useState("")
    const [errorPassword,setErrorPassword] = useState("")
    const [errorConfirmPassword,setErrorConfirmPassword] = useState("")
    const [triggerRegister,{data,isSuccess,isError,error}] = useRegisterMutation()
    const dispatch = useDispatch()


    const [viewPass, setViewPass] = useState(true)
    const [viewConfirmPass, setViewConfirmPass] = useState(true)
    const [viewPresentacion, setViewPresentacion] = useState(false)





    useEffect(()=>{
      if(isError) {
        setErrorEmail("email existente")
      }
    },[isError])

    const defaultCategories = [
      { name: "Series" },
      { name: "Películas" },
      { name: "Cervezas" },
      { name: "Tragos" },
      { name: "Restaurantes" },
      { name: "Bares" },
      { name: "Libros" },
    ];



    const onSubmit = async () => {
      try {
        registerSchema.validateSync({email, password, confirmPassword});
        const {data} = await triggerRegister({email, password});
        
        // Borrar la sesión previa y guardar la nueva sesión
        deleteSession();
        insertSession(data);
        
        // Guardar el usuario en Redux
        dispatch(setUser({
          email: data.email,
          idToken: data.idToken,
          localId: data.localId
        }));
    
        // Guardar las categorías por defecto en la base de datos
        const categoriesToSave = defaultCategories.reduce((acc, category, index) => {
          acc[`category_${index}`] = category;
          return acc;
        }, {});
    
        await fetch(`${URL_FIREBASE}/users/${data.localId}/categories.json`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(categoriesToSave)
        });
    
      } catch (error) {
        console.log(error);
        // Manejar errores de validación
        switch(error.path) {
          case "email":
            setErrorEmail(error.message);
            setErrorPassword("");
            setErrorConfirmPassword("");
            break;
          case "password":
            setErrorEmail("");
            setErrorPassword(error.message);
            setErrorConfirmPassword("");
            break;
          case "confirmPassword":
            setErrorEmail("");
            setErrorPassword("");
            setErrorConfirmPassword(error.message);
            break;
        }
      }
    };




    const handleViewPresentacion = () => {
      setViewPresentacion(!viewPresentacion)
    }

    const handleChangeViewPass = () => {
      setViewPass(!viewPass)
    }

    const handleChangeViewConfirmPass = () => {
      setViewConfirmPass(!viewConfirmPass)
    }





  return (
    <ImageBackground 
      style={styles.main}
      source={require('./../../assets/FondoResenias.jpg')}
      resizeMode="contain"
    >


      <Pressable onPress={handleViewPresentacion} style={styles.questionIcon}>
          <AntDesign name="questioncircleo" size={30} color="black" />
      </Pressable>


      <CartelNombreApp/>

      {
          viewPresentacion 
          ?
            <PresentacionApp closeModal={handleViewPresentacion}/>
          :
          null
      }
        <View style={styles.container}>
            <InputForm
                label="Email"
                value={email}
                onChangeText={(t) => setEmail(t)}
                isSecure={false}
                error={errorEmail}
            />

            <View style={styles.inputContainer}>
                <InputForm
                    label="Contraseña"
                    value={password}
                    onChangeText={(t) => setPassword(t)}
                    isSecure={viewPass}
                    error = {errorPassword}
                />
                <AntDesign onPress={handleChangeViewPass} style={styles.eye} name="eye" size={26} color="white" />
            </View>
            <View style={styles.inputContainer}>
                <InputForm
                    label="Confirmar contraseña"
                    value={confirmPassword}
                    onChangeText={(t) => setConfirmPassword(t)}
                    isSecure={viewConfirmPass}
                    error={errorConfirmPassword}
                />
                <AntDesign onPress={handleChangeViewConfirmPass} style={styles.eye} name="eye" size={26} color="white" />
            </View>

            <View style={styles.registerContainer}>
                <SubmitButton onPress={onSubmit} title="Registrarme"/>
            </View>
            <Text style={styles.sub}>¿Ya tenés una cuenta?</Text>
            <Pressable onPress={()=> navigation.navigate("Login")} >
                <Text style={styles.subLink}>Incio de sesion</Text>
            </Pressable>
        </View>
    </ImageBackground>
  )
}

export default Register

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
      },
      questionIcon:{
        position:"absolute",
        top:12,
        right:5
      },
      container:{
        width:"90%",
        backgroundColor: "#d4b3b3BB",
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
        marginTop:15,
        fontSize:14,
        fontFamily:"Josefin",
        color:"white"
      },
      subLink:{
        fontSize:18,
        fontFamily:"Josefin",
        color:"blue",
        color: "#000000aa"
      },
      inputContainer:{
        flexDirection:"row",
        alignItems:"center",
      },
      eye:{
        position:"absolute",
        right:"7%",
        top:"39%"
      },
      registerContainer:{
        borderWidth:1,
        borderColor:"white",
        borderRadius:60,
        padding:3,
        backgroundColor: colors.color1
      }
})
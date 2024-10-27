import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import SubmitButton from '../components/SubmitButton';
import { useGetUserQuery, usePatchNameProfileMutation } from '../services/users';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from '../global/colors';

const MyProfile = ({ navigation }) => {
    const localId = useSelector(state => state.auth.localId);
    const [triggerChangeNameProfile] = usePatchNameProfileMutation();
    const { data: user, isLoading } = useGetUserQuery({ localId });

    // Estado para manejar la edición del nombre
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(user?.name || 'Ingrese nombre'); // Valor por defecto del nombre

    

useEffect(()=>{
    setNewName(user?.name? user.name : "Ingrese nuevo nombre")
},[user])


    if (isLoading) return <LoadingSpinner />;

    // Función para confirmar la edición del nombre
    const handleConfirmName = async () => {
        try {
            await triggerChangeNameProfile({ localId, name: newName });
            setIsEditing(false); // Salir del modo de edición
        } catch (error) {
            console.error('Error al actualizar el nombre', error);
        }
    };



    return (
        <View style={styles.container}>

        <Pressable onPress={()=>navigation.navigate('FullImage', {image: user.image})}>
                <Image
                    source={user.image ? 
                            { uri: user.image } 
                            : require("../../assets/profile_default.png")}
                    resizeMode='cover'
                    style={styles.image}
                />
        </Pressable>

            <View style={styles.userNameContainer}>
                {isEditing ? (
                    <TextInput
                        style={styles.nameInput}
                        value={newName}
                        onChangeText={setNewName}
                        autoFocus
                    />
                ) : (
                    <Text onPress={()=>setIsEditing(true)}  style={styles.name}>
                        {user.name ? user.name : 'Ingrese su nombre'}
                    </Text>
                )}

                <AntDesign
                    style={styles.editIcon}
                    name={isEditing ? "checkcircle" : "edit"} // Cambia el ícono según el estado
                    size={30}
                    color="black"
                    onPress={isEditing ? handleConfirmName : () => setIsEditing(true)}
                />
            </View>

            <View style={styles.buttonContainer}>
                <AntDesign
                    style={styles.cameraIcon}
                    name="camerao"
                    size={30}
                    color="black"
                />
                <SubmitButton
                    title={
                        user.image !== '' ? "Modificar imagen" : "Agregar imagen"
                    }
                    onPress={() => navigation.navigate("ImageSelector")}
                />
            </View>
        </View>
    );
};

export default MyProfile;

const styles = StyleSheet.create({
    container: {
        marginTop: 70,
        alignItems: 'center',
        gap: 50,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 90,
    },
    text: {
        fontFamily: 'Lobster',
        textAlign: 'center',
        color: colors.color2,
        fontSize: 18,
        marginHorizontal: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cameraIcon: {
        position: 'relative',
        left: 35,
        zIndex: 1,
    },
    userNameContainer: {
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'center',
    },
    name: {
        textAlign: 'center',
        fontFamily: 'Lobster',
        fontSize: 30,
    },
    nameInput: {
        textAlign: 'center',
        fontFamily: 'Lobster',
        fontSize: 30,
        borderBottomWidth: 1,
        borderBottomColor: colors.color2,
    },
    editIcon: {
        position: 'absolute',
        left: '100%',
    },
});

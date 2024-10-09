import { StyleSheet, Text, View, Image } from 'react-native';
import SubmitButton from '../components/SubmitButton';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { useGetUserQuery, usePatchImageProfileMutation } from '../services/users';
import { useSelector } from 'react-redux';
import AntDesign from '@expo/vector-icons/AntDesign';

const ImageSelector = ({ navigation }) => {
    const [image, setImage] = useState("");
    const [triggerAddImageProfile] = usePatchImageProfileMutation();
    const localId = useSelector(state => state.auth.localId);
    const { data: user } = useGetUserQuery({ localId });

    // Función para tomar una foto con la cámara
    const pickImage = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if (!granted) return;

        const result = await ImagePicker.launchCameraAsync({
            aspect: [9, 9],
            quality: 0.5,
            base64: true,
            allowsEditing: true,
        });

        if (result.canceled) return;
        setImage("data:image/jpg;base64," + result.assets[0].base64);
    };

    // Función para seleccionar una imagen desde la galería
    const pickImageFromGallery = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!granted) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            aspect: [9, 9],
            quality: 0.5,
            base64: true,
            allowsEditing: true,
        });

        if (result.canceled) return;
        setImage("data:image/jpg;base64," + result.assets[0].base64);
    };

    const confirmImage = () => {
        if (!image) {
            navigation.navigate("MyProfile");
        } else {
            triggerAddImageProfile({ image, localId });
            navigation.navigate("MyProfile");
        }
    };

    const canceleImage = () => {
        navigation.navigate("MyProfile");
    };

    const deleteImage = () => {
        setImage("");
        triggerAddImageProfile({ image, localId });
    };

    return (
        <View style={styles.container}>
            <Image
                source={image ? { uri: image } : user?.image ? { uri: user.image } : require("../../assets/profile_default.png")}
                resizeMode="cover"
                style={styles.image}
            />
            <View style={styles.buttonContainer}>
                <AntDesign style={styles.icon} name="camerao" size={30} color="black" />
                <SubmitButton title="Tomar Imagen" onPress={pickImage} />
            </View>
            <View style={styles.buttonContainer}>
                <AntDesign style={styles.icon} name="picture" size={30} color="black" />
                <SubmitButton title="Elegir desde Galería" onPress={pickImageFromGallery} />
            </View>
            <View style={styles.buttonContainer}>
                <AntDesign style={styles.icon} name="delete" size={30} color="black" />
                <SubmitButton title="Eliminar foto actual" onPress={deleteImage} />
            </View>
            <View style={styles.buttonContainer2}>
                <View style={styles.buttonContainerConfirm}>
                    <AntDesign style={styles.icon} name="closecircleo" size={30} color="black" />
                    <SubmitButton title="Cancelar" onPress={canceleImage} />
                </View>
                <View style={styles.buttonContainerConfirm}>
                    <AntDesign style={styles.icon} name="checkcircleo" size={30} color="black" />
                    <SubmitButton title="Confirmar" onPress={confirmImage} />
                </View>
            </View>
        </View>
    );
};

export default ImageSelector;

const styles = StyleSheet.create({
    container: {
        marginTop: 70,
        alignItems: "center",
        gap: 20,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 90,
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    buttonContainer2: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: "27%",
    },
    buttonContainerConfirm: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        position: "relative",
        left: 35,
        zIndex: 1,
    },
});

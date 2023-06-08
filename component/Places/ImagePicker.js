import { Alert, Button, Image, View, Text, StyleSheet } from "react-native";
import {PermissionStatus, launchCameraAsync, useCameraPermissions} from 'expo-image-picker'
import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

const ImagePicker = ({onImageTaken}) =>{

    const [camerPermissionInformation, requestPermission] = useCameraPermissions();
    const [pickedImage, setPicketImage] = useState();


    //Verify permissions
    const verifyPermission = async () =>{
        
        if(camerPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if(camerPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert("Insufficient Permisions !", "you need to grant camera permission to use this app.");
            return false;
        }

        return true;
    }

    //Image Taken
    const takeImageHandler = async () =>{
        const hasPermission = await verifyPermission();

        if(!hasPermission) return;

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5
        });
        
        if (!image.canceled) {
            setPicketImage(image.assets[0].uri);
            onImageTaken(image.assets[0].uri);
          }

        
    }

    let imagePreview = <Text>No image taken yet !</Text>
    if(pickedImage) imagePreview = <Image style={styles.image} source={{uri: pickedImage}}/>

    return(
        <View>
            <View style={styles.imageContainer}>{imagePreview}</View>
            <OutlinedButton icon="camera" onPress={takeImageHandler}> Take Image </OutlinedButton>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer:{
        width: '100%',
        height: 200,
        backgroundColor: Colors.accent500,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    image:{
        width: '100%',
        height:'100%'
    }
})

export default ImagePicker;
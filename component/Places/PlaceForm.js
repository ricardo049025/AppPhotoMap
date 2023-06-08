import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import {Colors} from '../../constants/colors';
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import {Place} from "../../model/place";

const PlaceForm = ({onCreatePlace}) =>{
    const [enteredTitle, setenteredTitle] = useState('');
    const [pickedLocation, setPickedLocation] = useState();
    const [selectedImage, setSelectedImage] = useState();

    const changeTitleHandler = (enteredText) =>{
        setenteredTitle(enteredText);
    }

    const takeImageHandler = (imageUri) =>{
        setSelectedImage(imageUri);
    }

    const pickLocationHandler = useCallback((location) =>{
        setPickedLocation(location);
    },[])
    
    const submitHandler = () =>{
        const placeData = new Place(enteredTitle,selectedImage,"195 W 48TH ST - BAYONNE, NJ", pickedLocation);
        onCreatePlace(placeData);
        
    }

    return(
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}/>
            </View>
            <ImagePicker onImageTaken={takeImageHandler}/>
            <LocationPicker onLocationPick={pickLocationHandler}/>
            <Button onPress={submitHandler}>Add Place</Button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form:{
        flex: 1,
        padding: 24
    },
    label:{
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500
    },
    input:{
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    }
})

export default PlaceForm;
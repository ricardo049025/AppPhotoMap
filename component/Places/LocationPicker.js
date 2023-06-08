import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import {getCurrentPositionAsync, useForegroundPermissions, PermissionStatus} from 'expo-location';
import { useEffect, useState } from "react";
import { getAddress, getMapPreview } from "../../util/location";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";

const LocationPicker = ({onLocationPick}) =>{
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
    const [pickedLocation, setPickedLocation] = useState();
    const isFocused = useIsFocused();
    
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() =>{
        
        if(isFocused && route.params){
            const mapPickedLocation = {lat: route.params.pickedLat, lng: route.params.pickedLng};
            setPickedLocation(mapPickedLocation);
        }
        
    },[route, isFocused])

    const verifyPermission = async() =>{
        if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if(locationPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert("Insufficient Permisions !", "you need to grant location permission to use this app.");
            return false;
        }

        return true;
    }

    const getLocationHandler = async () =>{
        const hasPermission = await verifyPermission();
        
        if(!hasPermission) return;

        const location = await getCurrentPositionAsync();

        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
    }

    const pickOnMapHandler = () =>{
        navigation.navigate("Map");
    }

    let locationPreview = <Text>No location picked yet.</Text>

    if(pickedLocation){
        locationPreview = (
            <Image style={styles.mapPreviewImage} source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}}/>
        )
    }
    
    useEffect(() =>{

        const handledLocation = async() =>{
            if(pickedLocation){
                //const address = getAddress(pickedLocation.lat, pickedLocation.lng);
                onLocationPick({...pickedLocation});
            }
        }
        
        handledLocation();
        
    },[pickedLocation,onLocationPick])

    return(
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlinedButton onPress={getLocationHandler} icon="location" >Locate User</OutlinedButton>
                <OutlinedButton onPress={pickOnMapHandler} icon="map">Pick on Map</OutlinedButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mapPreview:{
        width: '100%',
        height: 200,
        backgroundColor: Colors.accent500,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    actions:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    mapPreviewImage:{
        width: '100%',
        height: '100%'
    }
});

export default LocationPicker;
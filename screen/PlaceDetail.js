import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from '../component/UI/OutlinedButton';
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetail } from "../util/database";

const PlaceDetail = ({route, navigation}) =>{
    const selectedPlaceId = route.params.placeId;
    const [selectedPlace, setSelectedPlace] = useState();

    const viewMapHandler = () =>{
        navigation.navigate("Map",{
            initialLat: selectedPlace.location.lat,
            initialLng: selectedPlace.location.lng
        })
    }

    useEffect(() =>{
        
        const loadPlaceData = async() =>{
            const data  = await fetchPlaceDetail(selectedPlaceId);
            setSelectedPlace(data);
            navigation.setOptions({
                title: data.title
            })
        }

        loadPlaceData();

    },[selectedPlaceId]);

    if (!selectedPlace) 
        return  (<View>
                <Text>Loading place ... </Text>
            </View>)

    return(
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedPlace.imageUri}}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}> {selectedPlace.address}</Text>
                </View>
                <OutlinedButton icon="map" onPress={viewMapHandler}>View on Map</OutlinedButton>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen:{
        alignItems: 'center'
    },
    image:{
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressContainer:{
        padding: 20
    },
    address:{
        color: Colors.primary500,
        textAlign: 'center',
        fontSize: 16,

    }
});

export default PlaceDetail;
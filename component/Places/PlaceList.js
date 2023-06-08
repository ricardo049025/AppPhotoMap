import { FlatList, StyleSheet, View, Text} from "react-native"
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const PlaceList = ({places}) =>{

    const navigation = useNavigation();

    const onSelectedPlace = (id) =>{
        navigation.navigate("PlaceDetail",{
            placeId: id
        })
    }

    if(!places || places.length === 0) 
        return(
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText} >No places added yet - start adding some !</Text>
            </View>
        )

    return <FlatList style={styles.list} data={places} keyExtractor={(item) => item.id} renderItem={({item}) => <PlaceItem place={item} onSelect={onSelectedPlace.bind(this, item.id)}/>} />
}

const styles = StyleSheet.create({
    list:{
        margin: 24
    },
    fallbackContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fallbackText:{
        fontSize: 16,
        color: Colors.primary200
    }
})

export default PlaceList;
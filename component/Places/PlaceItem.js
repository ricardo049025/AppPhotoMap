import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "../../constants/colors";

const PlaceItem = ({place, onSelect}) =>{

    return (
        <TouchableOpacity style={styles.item} onPress={onSelect}>
            <Image style={styles.image} source={{uri: place.imageUri}}/>
            <View style={styles.info}>
                <Text style={styles.title}>{place.title}</Text>
                <Text style={styles.address}>{place.address}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: Colors.primary500,
        //Android
        elevation: 5,
        //IOS
        shadowColor: 'white',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3
    },
    image:{
        flex: 1,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        height: 100
    },
    info:{
        flex: 2,
        padding: 12
    },
    title:{
        fontWeight: "bold",
        fontSize: 18,
        color: Colors.gray700,
    },
    address:{
        fontSize: 18,
        color: Colors.gray700
    }
})

export default PlaceItem;
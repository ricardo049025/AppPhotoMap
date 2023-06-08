import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../../constants/colors";

const OutlinedButton = ({onPress,icon,children}) =>{
    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Ionicons style={styles.icon} name={icon} size={18} color={Colors.primary500}/>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin:4,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.primary500,
        color: Colors.primary500,
        flexDirection: 'row'
    },
    icon:{
        marginRight: 6
    },
    text:{
        color: Colors.primary500,
        fontWeight: 'bold'
    }
})

export default OutlinedButton;
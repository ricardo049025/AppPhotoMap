import {Ionicons} from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

const IconButton = ({name,size,color, onPress}) =>{
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Ionicons name={name} size={size} color={color} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default IconButton;
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/colors";

const Button = ({onPress, children}) =>{
    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        backgroundColor: Colors.primary800,
        borderRadius: 4,
        //Android
        elevation: 5,
        //IOS
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3
    },
    text:{
        textAlign: 'center',
        fontSize: 16,
        color: Colors.primary50
    }
});

export default Button;
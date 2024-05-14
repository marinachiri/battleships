import { TextInput, StyleSheet, Text } from 'react-native'
import { CustomInputProps } from '../types/types'

export default function CustomInput( props : CustomInputProps) {
    const { label, value, onValueChanged, inputType, secureText } = props;

    return (
        <div style={styles.itemContainer}>
            <Text>
                { label }
            </Text>
            <TextInput style={styles.input}
                       inputMode={inputType}
                       secureTextEntry={secureText}
                       onChangeText={onValueChanged}
                       value={value} />
        </div>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        borderWidth: 1,
        borderRadius: 6,
        height: 30,
        padding: 10
    }
});
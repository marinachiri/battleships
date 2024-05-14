import { StyleSheet, View, Button, Text } from 'react-native';
import { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, User } from "../types/types";
import CustomInput from '../components/CustomInput';
import { Endpoints } from '../constants/Endpoints';
import axios from "axios";

type NavigationProp = StackNavigationProp<
  RootStackParamList
>;

type Props = {
  navigation: NavigationProp;
};
function onRegister(email: string, password: string, setError: (error: string) => void, navigation: NavigationProp) {
    if (!email || !password) {
        setError('Email and password cannot be empty.');
        return;
    }
    axios.post(Endpoints.Register, {
        email: email,
        password: password
    })
    .then(function (response) {
        console.log('Registration success:', response);
        navigation.navigate("Login");
    })
    .catch(function (error) {
        console.log('Registration error:', error);
        if (error.response && error.response.status === 409) {
            setError('Email already in use. Please use a different email to register.');
        } else {
            setError('Registration failed. Please try again.');
        }
    });
}



export default function Register({ navigation }: Props) {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [error, setError] = useState('');

    return (
        <View style={styles.container}> 
            <CustomInput label="Email:"
                         secureText={false}
                         inputType="email"
                         onValueChanged={onChangeEmail}
                         value={email} />
            <CustomInput label="Password:"
                         inputType='text'
                         secureText={true}
                         onValueChanged={onChangePassword}
                         value={password} />
            <Button title="Register"
                    onPress={() => onRegister(email, password, setError, navigation)} />
            {error !== '' && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },
    errorText: {
        color: 'red', // Set the error message color to red
        marginTop: 10
    }
});

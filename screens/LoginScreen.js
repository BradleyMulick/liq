import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { AuthContext } from '../navigation/AuthProvider'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const { login } = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>


            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalization="none"
                autoCorrect={false}
            />
            <FormInput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />

            <FormButton
                buttonTitle="Sign In"
                onPress={() => login(email, password)}
            />

            {/* <TouchableOpacity style={styles.forgotButton} onPress={() => { }}>
                <Text style={styles.navButtonText}>Forgot Password</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.navButtonText}>Don't Have an account? CLICK HERE</Text>
            </TouchableOpacity>


        </View>
    )
}

export default LoginScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    navButtonText: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 20,
        marginTop: 10,
    }
})
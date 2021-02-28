import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { AuthContext } from '../navigation/AuthProvider'

const SignupScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    const { register, user } = useContext(AuthContext)



    return (
        <View style={styles.container}>
            <Text>Create An Account</Text>


            <FormInput
                labelValue={fullName}
                onChangeText={(userName) => setFullName(userName)}
                placeholderText="Full Name"
                iconType="user"
                keyboardType="default"
                autoCapitalization="none"
                autoCorrect={false}
            />
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
            {/* <FormInput
                labelValue={confirmPassword}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Confirm Password"
                iconType="lock"
                secureTextEntry={true}
            /> */}

            <FormButton
                buttonTitle="Sign In"
                onPress={() => register(email, password, user)}
            />
            {/* 
            <TouchableOpacity style={styles.forgotButton} onPress={() => { }}>
                <Text style={styles.navButtonText}>Forgot Password</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.navButtonText}>Have an account? sign in</Text>
            </TouchableOpacity>


        </View>
    )
}

export default SignupScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    forgotButton: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 20,
        marginTop: 10,
    }
})
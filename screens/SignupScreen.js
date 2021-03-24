import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native'
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
            <View style={styles.logoHolder}>
                <Image source={require('../assets/liquidMoney.png')} style={{ width: '100%', height: '100%' }} />
            </View>

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
            <View style={styles.button}>
                <FormButton
                    buttonTitle="Sign Up"
                    onPress={() => register(email, password, user)}

                />
            </View>

        </View>
    )
}

export default SignupScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#ebebeb'
    },
    logoHolder: {
        width: 300,
        height: 150
    },

    forgotButton: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 20,
        marginTop: 10,
    },

    button: {
        width: '70%',

    }
})
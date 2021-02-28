import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { AuthContext } from '../navigation/AuthProvider'
import FormButton from '../components/FormButton';


const ProfileScreen = () => {
    const { user, logout } = useContext(AuthContext)

    console.log({ user })
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Profile for {user.uid} </Text>
            <FormButton buttonTitle="Logout" onPress={() => logout()} />


        </View>
    )
}

export default ProfileScreen


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        color: '#333333'
    }
})
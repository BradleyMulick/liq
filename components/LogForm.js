import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import LogItem from './LogItem'



const LogForm = () => {
    const [userInput, setUserInput] = useState(0);
    const addTask = (userInput) => {
        let copy = [...allLogs];
        const date = new Date().toString()
        copy = [...copy, { id: allLogs.length + 1, task: userInput, complete: false, date: date }];
        setAllLogs(copy);
    }

    const handleChange = fluids => setUserInput(fluids)
    // const handleChange = (e) => {
    //     setUserInput(e.currentTarget.value)
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(userInput);
        setUserInput(0);

    }

    console.log(userInput)

    const plusIt = () => {
        setUserInput(userInput + 1)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Logs Form </Text>
            <TextInput
                value={userInput}
                style={styles.input}
                keyboardType='numeric'

                placeholder=""
                onChangeText={handleChange}
                onSubmitEditing={handleSubmit}
            ></TextInput>
            <TouchableOpacity onPress={plusIt} style={styles.button}>
                <Text style={styles.buttonText}>Clear & change your Fluid Max</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LogForm


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 36,
        width: '33%',
        height: 'auto',
        marginBottom: '30%',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 8,
    },
    text: {
        fontSize: 20,
        color: '#333333'
    },
    input: {
        fontSize: 48
    }
})
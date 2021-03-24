// import React, { useContext, useState } from 'react';
// import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
// import { AuthContext } from '../navigation/AuthProvider'
// import FormButton from '../components/FormButton';



import React, { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'


// import { useContext } from 'react/cjs/react.development';
import LogForm from '../components/LogForm';
import LogsList from '../components/LogsList';
import { LogsContext } from '../navigation/LogsProvider';
import sample from '../sample.json'



const StatScreen = () => {
    // const [toDoList, setToDoList] = useState([{
    //     "id": 1,
    //     "task": "Give dog a bath",
    //     "complete": true
    // }, {
    //     "id": 2,
    //     "task": "Do laundry",
    //     "complete": true
    // }]);

    const [allLogs, setAllLogs] = useContext(LogsContext)
    console.log("all logs stats page" + allLogs)


    return (
        <SafeAreaView>
            <ScrollView style={styles.scrollArea}>
                <View style={styles.container}>

                    <LogsList allLogs={allLogs} />


                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default StatScreen


const styles = StyleSheet.create({
    container: {

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',



    },
    scrollArea: {
        height: "90%",

    },
    text: {
        fontSize: 20,
        color: '#333333'
    }
})
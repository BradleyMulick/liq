import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native'
import Ion from 'react-native-vector-icons/Ionicons';

const Task = ({ todo }) => {
    return (

        <View style={styles.taskWrapper}>

            <Text style={styles.task}>{todo.date}</Text>
            <Text style={styles.task}>{todo.liquidType}</Text>
            <Ion name='water' size={30} color="#4facfe" />
            <Text style={styles.task}>{todo.task}mL</Text>

        </View>

    )
}

export default Task

const styles = StyleSheet.create({
    taskWrapper: {
        marginTop: '5%',
        flexDirection: 'row',
        borderColor: '#000',
        borderBottomWidth: 1.5,
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'stretch',
        minHeight: 40,
    },
    task: {
        paddingBottom: 20,
        paddingLeft: 10,
        marginTop: 6,
        width: 'auto',
        borderColor: '#F0F0F0',
        borderBottomWidth: 1,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
    }

})
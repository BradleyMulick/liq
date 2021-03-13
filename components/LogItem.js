import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

const Task = ({ todo }) => {
    return (
        <View style={styles.taskWrapper}>

            <Text style={styles.task}>{todo.task}{todo.date}</Text>

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
        width: '100%',
        alignItems: 'stretch',
        minHeight: 40,
    },
    task: {
        paddingBottom: 20,
        paddingLeft: 10,
        marginTop: 6,
        borderColor: '#F0F0F0',
        borderBottomWidth: 1,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
    }
})
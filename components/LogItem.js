import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native'
import Ion from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

const Task = ({ todo, handleDeleteTodo, id }) => {





    return (

        <View style={styles.taskWrapper}>

            <Text style={styles.task}>{todo.date}</Text>

            <Text style={styles.task}>{todo.liquidType}</Text>
            <Ion name='water' size={25} color="#4facfe" />
            <Text style={styles.task}>{todo.task}mL</Text>
            <TouchableOpacity
                onPress={handleDeleteTodo(id)}
            >
                <Icon name='trash-o' size={25} color="#4facfe" />
            </TouchableOpacity>
        </View>
    )
}

export default Task

const styles = StyleSheet.create({
    taskWrapper: {
        marginTop: '5%',
        flexDirection: 'row',

        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'stretch',
        minHeight: 40,
    },
    task: {
        paddingBottom: 10,
        paddingLeft: 10,
        alignItems: 'center',
        width: 'auto',

        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
    }

})
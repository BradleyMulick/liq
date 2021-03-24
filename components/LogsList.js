import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import LogItem from './LogItem'
import { LogsContext } from '../navigation/LogsProvider';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const LogsList = () => {
    const [allLogs, setAllLogs] = useContext(LogsContext)

    const [wholeList, setWholeList] = useState([])


    const [isEdit, setIsEdit] = useState(null)
    const [editText, setEditText] = useState('')


    console.log(allLogs + "allLogsss")

    const logList = () => {
        if (allLogs.length == 0) {
            setWholeList([])
            console.log("are you forreaaal")
        } else {
            setWholeList[allLogs]
            console.log("ALL ghoood")
        }
    }
    console.log(wholeList + "the whole ist" + allLogs)
    useEffect(() => {
        logList()
    }, [allLogs])

    const setForEdit = (index) => {

        if (isEdit !== index) {
            setIsEdit(index)
            setEditText(allLogs[index])
            console.log("im workinnnn yoooooo")
        }
        else {
            console.log("why we borkennnnn eherer")
        }
    }

    const setList = (text, index) => {
        allLogs[index] = text
        setAllLogs(allLogs)
        setIsEdit(null)
        setEditText('')


    }

    const handleDeleteTodo = (id) => e => {
        // let list = allLogs
        // list.splice(index, 1)
        // setAllLogs(list)
        setAllLogs(allLogs.filter(todo => todo.id !== id));
    }


    // const logList = (allLogs.map(todo => {
    //     return (
    //         <LogItem todo={todo} />
    //     )
    // }))
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Fluid Log</Text>
            {allLogs.length ? allLogs.map((todo, id) => {
                return (




                    <LogItem key={todo.key} id={todo.id} todo={todo} handleDeleteTodo={handleDeleteTodo} />


                )
            }) : <Text>No Logs!!</Text>}

        </View>
    )
}

export default LogsList

const styles = StyleSheet.create({
    container: {

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    text: {
        fontSize: 36,
        color: '#4facfe',
        fontWeight: 'bold'
    },
    itemInput: {
        color: 'yellow'
    }
})
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import LogItem from './LogItem'
import { LogsContext } from '../navigation/LogsProvider';

const LogsList = () => {
    const [allLogs, setAllLogs] = useContext(LogsContext)

    const [wholeList, setWholeList] = useState([])
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

    // const logList = (allLogs.map(todo => {
    //     return (
    //         <LogItem todo={todo} />
    //     )
    // }))
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Fluid Log</Text>
            {allLogs.length ? allLogs.map(todo => {
                return (
                    <LogItem todo={todo} />
                )
            }) : <Text>No Logs!!</Text>}

        </View>
    )
}

export default LogsList

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    text: {
        fontSize: 36,
        color: '#4facfe',
        fontWeight: 'bold'
    }
})
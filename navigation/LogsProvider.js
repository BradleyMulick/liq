import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
export const LogsContext = createContext()

import { useStateWithCallbackLazy } from 'use-state-with-callback';


export const LogsProvider = ({ children }) => {

    const [dailyTotal, setDailyTotal] = useState('')
    const [allLogs, setAllLogs] = useStateWithCallbackLazy([])
    const [retroLogs, setRetroLogs] = useState([])


    const readData = async () => {
        try {

            AsyncStorage.getItem("allTheLogs").then(data => {
                if (data !== null) {
                    setAllLogs(JSON.parse(data))
                    console.log(allLogs + "hi")
                }
            })

            // const logs = await AsyncStorage.getItem('allTheLogs')

            // const myItems = await JSON.parse(logs) || []
            // console.log(myItems + "meeeeeeeee")
            // if (allLogs != null) {

            //     setAllLogs(myItems)
            //     console.log("got the data babby" + allLogs)
            // } return
        } catch (e) {
            alert('Failed to fetch like a ho')
        }
    }
    useEffect(() => {
        // readData()
    }, [])



    return (
        <LogsContext.Provider
            value={[

                dailyTotal,
                setDailyTotal,
                allLogs,
                setAllLogs,

            ]}
        >
            { children}
        </LogsContext.Provider >
    )
}
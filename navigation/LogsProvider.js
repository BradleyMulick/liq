import React, { createContext, useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LogsContext = createContext()
const STORAGE_KEY = '@save_age'



export const LogsProvider = ({ children }) => {

    const [dailyTotal, setDailyTotal] = useState('')
    const [allLogs, setAllLogs] = useState([])
    const [everyLiquid, setEveryLiquid] = useState([
        { text: "Learn about React" },
        { text: "Meet friend for lunch" },
        { text: "Build really cool todo app" }
    ])


    const readData = async () => {
        try {
            const fluids = await AsyncStorage.getItem(STORAGE_KEY)

            if (fluids !== null) {

                setMaxFluids(fluids)
            }
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
                everyLiquid,
                setEveryLiquid
            ]}
        >
            { children}
        </LogsContext.Provider >
    )
}
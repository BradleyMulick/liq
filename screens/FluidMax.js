import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Button } from 'react-native'
import { AuthContext } from '../navigation/AuthProvider'
import { FluidContext } from '../navigation/FluidProvider'
import FormButton from '../components/FormButton';
import AsyncStorage from '@react-native-async-storage/async-storage';


const STORAGE_KEY = '@save_age'

const FluidMax = ({ navigation }) => {
    const [maxFluids, setMaxFluids] = useContext(FluidContext)
    // const [maxFluids, setMaxFluids] = useState('')
    const [text, setText] = useState('');




    const saveData = async () => {

        try {

            await

                AsyncStorage.setItem(STORAGE_KEY, maxFluids)
            alert('Fluid max changed')
        } catch (e) {
            alert('Failed to save the data to the storage')
        }
    }



    // const readData = async () => {
    //     try {
    //         const fluids = await AsyncStorage.getItem(STORAGE_KEY)

    //         if (fluids !== null) {

    //             setMaxFluids(fluids)
    //         }
    //     } catch (e) {
    //         alert('Failed to fetch the data from storage')
    //     }
    // }
    // useEffect(() => {
    //     readData()
    // }, [maxFluids])

    const clearStorage = async () => {
        try {
            // await AsyncStorage.clear()
            const keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys);
            setMaxFluids(0)
            alert('Fluid MAX cleared!')

        } catch (e) {
            alert('Failed to clear the async storage.')
        }
    }





    const onChangeText = fluids => setMaxFluids(fluids)

    const onSubmitEditing = () => {

        if (!maxFluids)
            return
        saveData(maxFluids)

        navigation.navigate('Home')



    }

    useEffect(() => {

    }, [])

    return (


        <View style={styles.container}>


            <View style={styles.header}>
                <Text style={styles.title}>Fluid Restrictions Settings</Text>
                <View style={styles.fluflu}>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        placeholder={text}
                        onChangeText={onChangeText}
                        onSubmitEditing={onSubmitEditing}
                    ></TextInput>

                    <Text style={styles.millers}>mL*</Text>
                </View>
                <Text >Current Fluid Max {maxFluids}mL*</Text>
                <Text style={styles.fluidDocWarning}>* Determine this number with your physician.</Text>

            </View>







            {/* <TextInput
                style={{ height: 40 }}
                placeholder="Type here to translate!"
                onChangeText={maxFluids => setMaxFluids(maxFluids)}
                defaultValue={maxFluids}
            />
            <Text style={{ padding: 10, fontSize: 42 }}>
                {maxFluids}
            </Text> */}
            <View style={styles.warning}>
                <Text style={styles.bigWarning}>WARNING</Text>
                <Text style={styles.warningInfo}>
                    This app is meant to be used as a guide and not for medical diagnosis.
                    All information provided is voluntary by the use and is in compliance and
                    and all  HIPPA regulations. By click the check box you agree to the terms and
                    services of this app.
                         </Text>

                <TouchableOpacity onPress={clearStorage} style={styles.button}>
                    <Text style={styles.buttonText}>Clear & change your Fluid Max</Text>
                </TouchableOpacity>
            </View>
        </View>




    )
}

export default FluidMax


const styles = StyleSheet.create({
    container: {

        flex: 1,

        padding: 20,
        paddingTop: 40,


    },
    text: {
        fontSize: 20,
        color: '#333333'
    },
    header: {
        flex: 1,

        alignItems: 'center',
        paddingTop: 40,
    },
    title: {
        fontSize: 24,
        width: '75%'
    },
    millers: {
        width: '25%',
        fontSize: 24
    },
    fluflu: {
        flexDirection: "row",
    },
    panel: {
        height: 50,
        backgroundColor: 'yellow',
        alignItems: 'center',
    },
    input: {
        width: "50%",
        height: 60,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 7,
        fontSize: 36,
        textAlign: 'right',
        padding: 10
    },
    fluidDocWarning: {
        fontSize: 16,
    },
    warning: {
        flex: 2,
        padding: 10,

        justifyContent: 'flex-end',
        alignItems: 'center',



    },
    button: {
        height: 50,
        width: '69%',
        backgroundColor: '#30c702',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,


    },
    buttonText: {

    },
    bigWarning: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'red'
    },
    warningInfo: {
        alignItems: 'center',
        textAlign: 'center',


    }
})

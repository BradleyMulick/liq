import React, { useContext, useEffect, useState } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { View, Text, StyleSheet, Button, FlatList, ScrollView, Alert, TouchableHighlight, Pressable, Modal, Image, TextInput, TouchableOpacity } from 'react-native'
import { AuthContext } from '../navigation/AuthProvider'
import { FluidContext } from '../navigation/FluidProvider'
import { LogsContext } from '../navigation/LogsProvider'
import FormButton from '../components/FormButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sample from '../sample.json'
import Icon from 'react-native-vector-icons/FontAwesome';
import Task from '../components/LogItem'
import LogForm from '../components/LogForm';





const HomeScreen = () => {
    const { user, logout } = useContext(AuthContext)
    const [modalVisible, setModalVisible] = useState(false);
    const [totalPerccy, setTotalPerccy] = useState('')

    const [fluidLevel, setFluidLevel] = useState(0);
    const [dailyTotal, setDailyTotal] = useState(0)

    const [allLiquids, setAllLiquids] = useState([])

    const [maxFluids, setMaxFluids] = useContext(FluidContext)

    const [liquidType, setLiquidType] = useState('')

    console.log(allLiquids + "thing 1")
    console.log(sample + " sample")

    const [allLogs, setAllLogs] = useContext(LogsContext)


    const saveLogs = async () => {
        try {
            console.log(allLogs.length + "save function")
            await AsyncStorage.setItem('allTheLogs', JSON.stringify(allLogs))
            setFluidLevel(0)

        } catch (e) {
            alert('Failed to save the logs to the storage')
        }
    }

    const handleChange = fluids => setFluidLevel(fluids)

    const handleAddTodo = () => {

        // if (value.length > 0) {
        //     setEveryAll([...everyAll, {
        //         text: value, key: Date.now(), checked:
        //             false
        //     }])
        //     setAllLogs(JSON.stringify(everyAll))
        //     console.log(allLogs + "yasssssssssss")
        //     setValue('')
        // }


        let copy = [...allLogs];
        const date = new Date().toString()
        copy = [...copy, { key: allLogs.length + 2, id: allLogs.length + 1, task: fluidLevel, complete: false, date: date }];
        setAllLogs(copy)
        alert('New Log added!')
        setModalVisible(!modalVisible)
    }

    const total = () => {
        setDailyTotal(parseInt(dailyTotal) + parseInt(fluidLevel))
    }

    const dailyDough = () => {
        const percenty = parseInt(dailyTotal) / parseInt(maxFluids)
        const totPercenty = percenty * 100
        console.log(totPercenty + "PERCENT")
        setTotalPerccy(totPercenty)
    }

    const increase = () => {
        setFluidLevel(parseInt(fluidLevel) + 1)
    }

    const decrease = () => {
        setFluidLevel(parseInt(fluidLevel) - 1)
    }


    const cancelLiq = () => {
        setFluidLevel(0)
        setModalVisible(!modalVisible)

    }


    const clearLiquids = () => {
        AsyncStorage.setItem("storedLiquid", JSON.stringify([])).then(() => {
            setAllLiquids([])

        })
    }



    const liquidTypeSetter = (prop) => {
        setModalVisible(true)
        setLiquidType(prop)
    }


    const loadTodo = () => {
        try {
            AsyncStorage.getItem("allTheLogs").then(data => {
                if (data !== null) {
                    setAllLogs(JSON.parse(data))
                    console.log(allLogs + "hi")
                }
            })
        } catch (e) {
            alert('Failed to fetch the data from storage')
        }
    }




    useEffect(() => {
        // addLog()
        loadTodo()
        // dailyDough()

        // getNotes()
    }, [])



    useEffect(() => {
        saveLogs()
        total()

    }, [allLogs])

    useEffect(() => {
        dailyDough()
    }, [dailyTotal])

    return (

        <View style={styles.container}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Text style={styles.modalText}>{liquidType}</Text>

                        <View style={styles.liquidAdd}>
                            <TouchableHighlight onPress={() => setFluidLevel(120)} underlayColor="white">
                                <View style={styles.row} >
                                    <Image source={{ uri: 'https://cdn5.vectorstock.com/i/1000x1000/87/14/simple-round-icon-coffee-cup-vector-13978714.jpg' }}
                                        style={{ width: "25%", height: "75%" }} />
                                    <Text >Small</Text>

                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => setFluidLevel(240)} underlayColor="white">
                                <View style={styles.row} >
                                    <Image source={{ uri: 'https://cdn5.vectorstock.com/i/1000x1000/87/14/simple-round-icon-coffee-cup-vector-13978714.jpg' }}
                                        style={{ width: "25%", height: "75%" }} />
                                    <Text>Medium</Text>


                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => setFluidLevel(360)} underlayColor="white">
                                <View style={styles.row} >
                                    <Image source={{ uri: 'https://cdn5.vectorstock.com/i/1000x1000/87/14/simple-round-icon-coffee-cup-vector-13978714.jpg' }}
                                        style={{ width: "25%", height: "75%" }} />
                                    <Text>Large</Text>


                                </View>
                            </TouchableHighlight>
                        </View>


                        <View style={styles.confirm2}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={increase}
                            >

                                <Image source={{ uri: 'https://www.iconpacks.net/icons/2/free-up-arrow-icon-3097-thumb.png' }}
                                    style={{ width: 50, height: 50 }} />
                            </Pressable>

                            {/* <Text style={styles.liquidSetter} >{fluidLevel}</Text> */}

                            <TextInput
                                keyboardType='numeric'
                                style={styles.liquidSetter}
                                placeholder="0"
                                onChangeText={handleChange}

                                onSubmitEditing={() => handleAddTodo(allLogs)}
                            > {fluidLevel}</TextInput>
                            {/* <LogForm addTask={addTask} /> */}
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={decrease}
                            >

                                <Image source={{ uri: 'https://static.thenounproject.com/png/59745-200.png' }}
                                    style={{ width: 50, height: 50 }} />
                            </Pressable>
                        </View>
                        <View style={styles.confirm2}>
                            <Pressable
                                style={styles.confirmButt}
                                onPress={() => handleAddTodo(allLogs)}
                            >
                                <Text style={styles.confirmText}>Confirm</Text>
                            </Pressable>
                        </View>
                        <View style={styles.confirm2}>
                            <Pressable
                                style={[styles.cancelButt, styles.buttonClose]}
                                onPress={() => cancelLiq()}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </Pressable>
                        </View>
                        <View style={styles.confirm2}>
                            <Pressable
                                style={[styles.buttonClose]}
                                onPress={() => clearLiquids()}
                            >
                                <Image source={{ uri: 'https://uxwing.com/wp-content/themes/uxwing/download/01-user_interface/red-x.png' }}
                                    style={{ width: 50, height: 50 }} />
                                <Text style={styles.textStyle}>Clear liquids</Text>
                            </Pressable>


                        </View>
                        <Icon name="glass" size={30} color="#900" />

                    </View>
                </View>
            </Modal>



            <View style={styles.icons}>
                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => liquidTypeSetter('COFFEE')} underlayColor="white">
                        <Image source={{ uri: 'https://newcastlebeach.org/images/coffee-icon-free-7.png' }}
                            style={{ width: "100%", height: "100%" }} />
                    </Pressable>
                </View>
                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => liquidTypeSetter('WINE1')} underlayColor="white">
                        <Image source={{ uri: 'https://img.icons8.com/pastel-glyph/2x/wine-glass.png' }}
                            style={{ width: "100%", height: "100%" }} />
                    </Pressable>
                </View>
                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => liquidTypeSetter('BEER1')} underlayColor="white">
                        <Image source={{ uri: 'http://simpleicon.com/wp-content/uploads/beer.png' }}
                            style={{ width: "100%", height: "100%" }} />
                    </Pressable>
                </View>
                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => liquidTypeSetter('SODA')} underlayColor="white">
                        <Image source={{ uri: 'https://i.pinimg.com/originals/d7/95/aa/d795aaaaa386c4f3a4252615f8673f5b.png' }}
                            style={{ width: "100%", height: "100%" }} />
                    </Pressable>
                </View>
                <View style={styles.box} onPress={() => setLiquidType('wine')}>
                    <Pressable onPress={() => liquidTypeSetter('WINNE 2')} underlayColor="white">
                        <Image source={{ uri: 'https://img.icons8.com/pastel-glyph/2x/wine-glass.png' }}
                            style={{ width: "100%", height: "100%" }} />
                    </Pressable>
                </View>
                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => liquidTypeSetter('BEER 2')} underlayColor="white">
                        <Image source={{ uri: 'http://simpleicon.com/wp-content/uploads/beer.png' }}
                            style={{ width: "100%", height: "100%" }} />
                    </Pressable>
                </View>

                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => liquidTypeSetter('CROSSSS')} underlayColor="white">
                        <Image source={{ uri: 'http://getdrawings.com/free-icon/medical-cross-icon-53.png' }}
                            style={{ width: "100%", height: "100%" }} />
                    </Pressable>
                </View>
                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => liquidTypeSetter('LOGGGGG')} underlayColor="white">
                        <Image source={{ uri: 'http://simpleicon.com/wp-content/uploads/list.png' }}
                            style={{ width: "100%", height: "100%" }} />
                    </Pressable>
                </View>

                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => liquidTypeSetter('wambulance')} underlayColor="white">
                        <Image source={{ uri: 'https://www.freeiconspng.com/thumbs/ambulance-icon/ambulance-icon-20.png' }}
                            style={{ width: "100%", height: "100%" }} />
                    </Pressable>
                </View>


            </View>
            <View style={styles.dailyTotalDisplay}>

                <Text style={styles.dailyTotalText}>{dailyTotal} / {maxFluids}</Text>
                <Text>{totalPerccy}%</Text>
            </View>
            <FormButton buttonTitle="Logout" onPress={() => logout()} />
        </View>

    )
}

export default HomeScreen


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {
        width: "50%",
        fontSize: 20,
        color: '#333333'
    },
    liquidAdd: {
        width: '100%',
        height: '33%',





    },

    icons: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        width: '90%',
        flexWrap: "wrap",
        height: '70%',
        borderColor: 'black',
        borderWidth: 1, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: .8,
        shadowRadius: 4,
        borderRadius: 4,
        margin: 10,
        paddingTop: '10%',
    },

    buttonz: {
        backgroundColor: 'black',
        height: 80,
        width: 80,
    },

    confirmButt: {
        width: '98%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'blue',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 7
    },

    confirmText: {
        fontSize: 48
    },

    cancelButt: {
        width: '98%',
        height: '100%',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
    },

    cancelText: {
        fontSize: 24
    },

    box: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'white',
        height: 110,
        width: '28%',
        margin: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: .4,
        shadowRadius: 4,

    },

    modalView: {
        margin: 40,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: "90%"
    },

    modalText: {
        fontSize: 36,
    },

    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 1,
        borderColor: 'black',


        width: '100%',
        height: '40%',


    },

    confirm: {
        width: '100%',
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        flexWrap: "wrap",
    },
    confirm2: {
        width: '100%',

        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: "row",
        flexWrap: "wrap",
    },

    inputerr: {

    },

    liquidSetter: {
        textAlign: 'center',
        fontSize: 36,
        width: '33%',
        height: 'auto',
        marginBottom: '30%',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 8,
    },

    dailyTotalDisplay: {
        height: 60,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: -30,

    },

    dailyTotalText: {
        fontSize: 24,
    }


})
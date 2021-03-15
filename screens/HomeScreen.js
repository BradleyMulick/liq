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
import Font5 from 'react-native-vector-icons/FontAwesome5';
import MatCom from "react-native-vector-icons/MaterialCommunityIcons"




import Task from '../components/LogItem'
import LogForm from '../components/LogForm';





const HomeScreen = () => {


    const typeOfFLuids = [
        {
            "name": "water",
            "icon": 'cup'
        },
        {
            "name": "beer",
            "icon": 'beer'
        },
        {
            "name": "wine",
            "icon": 'glass'
        }
    ]

    console.log(typeOfFLuids[1].icon)



    const { user, logout } = useContext(AuthContext)
    const [modalVisible, setModalVisible] = useState(false);

    const [allLiquids, setAllLiquids] = useState([])
    const [maxFluids] = useContext(FluidContext)

    const [allLogs, setAllLogs] = useContext(LogsContext)

    const [totalPerccy, setTotalPerccy] = useState('0%')
    const [fluidLevel, setFluidLevel] = useState(0);
    const [dailyTotal, setDailyTotal] = useState(0)
    const [todaysDate, setTodaysDate] = useState('')

    const [liquidType, setLiquidType] = useState('water')

    const saveLogs = async () => {
        try {
            console.log(allLogs.length + "save function")
            await AsyncStorage.setItem('allTheLogs', JSON.stringify(allLogs))
            setFluidLevel(0)

        } catch (e) {
            alert('Failed to save the logs to the storage')
        }
    }

    const showDate = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        Alert.alert(month + '/' + date + '/' + year);
        setTodaysDate(month + '/' + date + '/' + year);
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
        copy = [...copy, { key: allLogs.length + 2, id: allLogs.length + 1, task: fluidLevel, complete: false, date: todaysDate, liquidType: liquidType }];
        setAllLogs(copy)
        alert('New Log added!')
        setModalVisible(!modalVisible)
    }

    const total = () => {
        console.log(typeOfFLuids[1].icon + "playing")
        setDailyTotal(parseInt(dailyTotal) + parseInt(fluidLevel))
    }

    const dailyDough = () => {
        const percenty = parseInt(dailyTotal) / parseInt(maxFluids)
        const totPercenty = percenty * 100
        console.log(totPercenty + "PERCENT")
        setTotalPerccy(totPercenty + '%')
        console.log(totalPerccy)
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
        showDate()
        // getNotes()
    }, [])



    useEffect(() => {
        saveLogs()
        total()

    }, [allLogs])

    useEffect(() => {
        dailyDough()
    }, [dailyTotal, maxFluids])

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

                <View style={styles.modalView}>

                    <Text style={styles.modalText}>{liquidType}</Text>

                    <View style={styles.liquidAdd}>
                        <TouchableHighlight onPress={() => setFluidLevel(120)} underlayColor="white">
                            <View style={styles.row} >
                                <Icon name={liquidType} size={20} color="#4facfe" />
                                <Text >Small</Text>

                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => setFluidLevel(240)} underlayColor="white">
                            <View style={styles.row} >

                                <Icon name={liquidType} size={40} color="#4facfe" />
                                <Text>Medium</Text>


                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => setFluidLevel(360)} underlayColor="white">
                            <View style={styles.row} >
                                <Icon name={liquidType} size={60} color="#4facfe" />

                                <Text>Large</Text>


                            </View>
                        </TouchableHighlight>
                    </View>


                    <View style={styles.confirm2}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={increase}
                        >
                            <Font5 name="angle-double-up" size={40} />

                        </Pressable>

                        {/* <Text style={styles.liquidSetter} >{fluidLevel}</Text> */}

                        <TextInput
                            keyboardType='numeric'
                            style={styles.liquidSetter}
                            placeholder="0"
                            onChangeText={handleChange}

                            onSubmitEditing={() => handleAddTodo(allLogs)}
                        >{fluidLevel}</TextInput>
                        {/* <LogForm addTask={addTask} /> */}
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={decrease}
                        >
                            <Font5 name="angle-double-down" size={40} />

                        </Pressable>
                    </View>


                    <View style={styles.confirm}>

                        <Pressable
                            style={styles.confirmButt}
                            onPress={() => handleAddTodo(allLogs)}
                        >
                            <Text style={styles.confirmText}>Submit</Text>
                        </Pressable>
                    </View>
                    <View style={styles.confirm}>
                        <Pressable
                            style={[styles.cancelButt, styles.buttonClose]}
                            onPress={() => cancelLiq()}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>

            </Modal>


            <View style={styles.icons}>

                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => liquidTypeSetter('coffee')} underlayColor="white">
                        {/* <Image source={{ uri: 'https://newcastlebeach.org/images/coffee-icon-free-7.png' }}
                            style={{ width: "100%", height: "100%" }} /> */}
                        <Icon name="coffee" size={50} color="#4facfe" />
                    </Pressable>
                </View>
                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => liquidTypeSetter('cup')} underlayColor="white">
                        <MatCom name="cup" size={50} color="#4facfe" />
                    </Pressable>
                </View>
                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => liquidTypeSetter('beer')} underlayColor="white">
                        {/* <Image source={{ uri: 'http://simpleicon.com/wp-content/uploads/beer.png' }}
                            style={{ width: "100%", height: "100%" }} /> */}
                        <Icon name={typeOfFLuids[1].icon} size={50} color="#4facfe" />
                    </Pressable>
                </View>
                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => liquidTypeSetter('apple-alt')} underlayColor="white">
                        {/* <Image source={{ uri: 'https://i.pinimg.com/originals/d7/95/aa/d795aaaaa386c4f3a4252615f8673f5b.png' }}
                            style={{ width: "100%", height: "100%" }} /> */}
                        <Font5 name="apple-alt" size={50} color="#4facfe" />
                    </Pressable>
                </View>
                <View style={styles.box} onPress={() => setLiquidType('apple')}>
                    <Pressable onPress={() => liquidTypeSetter('glass')} underlayColor="white">
                        {/* <Image source={{ uri: 'https://img.icons8.com/pastel-glyph/2x/wine-glass.png' }}
                            style={{ width: "100%", height: "100%" }} /> */}
                        <Icon name="glass" size={50} color="#4facfe" />
                    </Pressable>
                </View>
                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => liquidTypeSetter('beer')} underlayColor="white">
                        {/* <Image source={{ uri: 'http://simpleicon.com/wp-content/uploads/beer.png' }}
                            style={{ width: "100%", height: "100%" }} /> */}

                        <MatCom name="beer" size={50} color="#4facfe" />
                    </Pressable>
                </View>
                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => liquidTypeSetter('bowl')} underlayColor="white">
                        {/* <Image source={{ uri: 'https://i.pinimg.com/originals/d7/95/aa/d795aaaaa386c4f3a4252615f8673f5b.png' }}
                            style={{ width: "100%", height: "100%" }} /> */}
                        <MatCom name="bowl" size={50} color="#4facfe" />
                    </Pressable>
                </View>
                <View style={styles.box} onPress={() => setLiquidType('apple')}>
                    <Pressable onPress={() => liquidTypeSetter('lemon-o')} underlayColor="white">

                        <Icon name="lemon-o" size={50} color="#4facfe" />
                    </Pressable>
                </View>
                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => liquidTypeSetter('ice-cream')} underlayColor="white">


                        <Font5 name="ice-cream" size={50} color="#4facfe" />
                    </Pressable>
                </View>

                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => liquidTypeSetter('coffee')} underlayColor="white">

                        <Font5 name="notes-medical" size={50} color="#4facfe" />
                    </Pressable>
                </View>
                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => liquidTypeSetter('cup')} underlayColor="white">
                        <MatCom name="cup-outline" size={50} color="#4facfe" />
                    </Pressable>
                </View>

                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => liquidTypeSetter('plus')} underlayColor="white">
                        <Icon name="plus" size={50} color="#4facfe" />
                    </Pressable>
                </View>


            </View>
            <View style={{ height: `${totalPerccy}`, backgroundColor: '#4facfe', width: '100%', position: 'absolute', bottom: 0 }}></View>

            <View style={styles.dailyTotalDisplay}>

                <Text style={styles.dailyTotalText}>{dailyTotal} / {maxFluids}</Text>

            </View>

            <FormButton buttonTitle="Logout" onPress={() => logout()} />
        </View>


    )
}

export default HomeScreen


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ebebeb",
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
        height: '28%',
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
        zIndex: 100,

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
        backgroundColor: '#4facfe',
        borderColor: 'black',

        borderWidth: 1,
        borderRadius: 7
    },

    confirmText: {
        fontSize: 48,
        color: 'white',
    },

    cancelButt: {
        width: '98%',
        height: '100%',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 7
    },

    cancelText: {
        fontSize: 24
    },

    box: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'white',
        height: '18%',
        width: '23%',
        margin: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: .4,
        shadowRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',

    },

    modalView: {
        marginTop: "15%",
        backgroundColor: "white",
        marginBottom: '40%',
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
        height: "70%",


    },

    modalText: {
        fontSize: 36,
    },

    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',

        padding: 10,
        justifyContent: 'space-between',
        width: '70%',
        height: 'auto',
        alignItems: 'center',



    },

    confirm: {
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        flexWrap: "wrap",

    },
    confirm2: {
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: '3%',
        marginBottom: '5%'
    },


    inputerr: {

    },

    liquidSetter: {
        display: 'flex',
        textAlign: 'center',
        fontSize: 40,
        width: 'auto',
        height: '100%',

        marginBottom: '20%',
        borderRadius: 8,
        color: '#4facfe',
        fontWeight: 'bold'
    },

    dailyTotalDisplay: {
        height: 60,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eca400',

        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: -30,
        zIndex: 100

    },

    dailyTotalText: {
        fontSize: 36,
        color: 'white',
        fontWeight: 'bold'
    },

    practice: {
        backgroundColor: 'yellow',

    }


})
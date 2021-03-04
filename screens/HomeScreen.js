import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, ScrollView, Alert, TouchableHighlight, Pressable, Modal, Image, TextInput, TouchableOpacity } from 'react-native'
import { AuthContext } from '../navigation/AuthProvider'
import { FluidContext } from '../navigation/FluidProvider'
import { LogsContext } from '../navigation/LogsProvider'
import FormButton from '../components/FormButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Task from '../components/LogItem'
// import { firebase } from '../firebase/Firebase'
// firebase.initializeApp(config);


const HomeScreen = () => {
    const { user, logout } = useContext(AuthContext)
    const [maxFluids, setMaxFluids] = useContext(FluidContext)
    const [modalVisible, setModalVisible] = useState(false);
    const [fluidLevel, setFluidLevel] = useState(0);
    const [dailyTotal, setDailyTotal] = useState(0)
    const [text, setText] = useState('');
    const [allLiquids, setAllLiquids] = useState([])
    const [newInput, setNewInput] = useState('1000')
    // const [list, setList] = useState([])
    // const [newData, setNewData] = useState(false)
    // const [index, setIndex] = useState(-1)
    const [totalPerccy, setTotalPerccy] = useState('')

    const [allLogs, setAllLogs] = useContext(LogsContext)
    const [everyLiquid, setEveryLiquid] = useContext(FluidContext)
    const [everyAll, setEveryAll] = useState([])
    const [value, setValue] = useState('')



    const handleAddTodo = () => {
        if (value.length > 0) {
            setEveryAll([...everyAll, {
                text: value, key: Date.now(), checked:
                    false
            }])
            setAllLogs(JSON.stringify(everyAll))
            console.log(allLogs + "yasssssssssss")
            setValue('')
        }
    }


    console.log(allLiquids)
    console.log(everyLiquid)
    const dailyDough = () => {
        const percenty = parseInt(dailyTotal) / parseInt(maxFluids)


        const totPercenty = percenty * 100

        console.log(totPercenty)

        setTotalPerccy(totPercenty)
    }


    // const adder = () => {
    //     let readyToAdd = [...allLogs, "11"]
    //     readyToAdd.push(fluidLevel)
    //     setAllLogs(readyToAdd)


    //     console.log(readyToAdd)

    //     let data = JSON.stringify(readyToAdd);
    //     AsyncStorage.setItem('liq', data);
    // }

    // const handleSubmit = () => {
    //     let currData = [...allLogs]
    //     if (newData) {
    //         currData.push(fluidLevel)
    //         setAllLogs(currData)
    //         setNewData(!newData)
    //     } else {
    //         currData[index] = fluidLevel
    //         setAllLogs(currData)
    //         setIndex(-1)
    //     }
    //     setFluidLevel('')
    //     setNotes(currData)
    // }



    // const getNotes = async () => {
    //     const allData = await AsyncStorage.getItem('liq')
    //     setAllLogs(allData ? JSON.parse(allData) : [])
    //     console.log(allData)
    // }

    // const setNotes = (currData) => {
    //     const stringifyData = JSON.stringify(currData)
    //     AsyncStorage.setItem('liq', stringifyData)
    // }



    const confirmAddition = (allLiquid) => {
        const newLiquid = [...allLiquids, allLiquid]




        setDailyTotal(dailyTotal + fluidLevel)
        setModalVisible(!modalVisible)
        setFluidLevel(0)
        handleAddTodo()
        setAllLogs(everyAll)
        console.log(allLogs + "Whattttttt")

        AsyncStorage.setItem("storedLiquid", JSON.stringify(newLiquid)).then(() => {
            setAllLiquids(newLiquid)

        }).catch(error => console.log("shit"))
        Alert.alert("Makinnnn Moneyyyy ..... run roulette function")
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


    const loadTodo = () => {
        try {
            AsyncStorage.getItem("storedLiquid").then(data => {
                if (data !== null) {
                    setAllLiquids(JSON.parse(data))
                    console.log(allLiquids + "hi")
                }
            })


        } catch (e) {
            alert('Failed to fetch the data from storage')
        }
    }
    useEffect(() => {
        loadTodo()
        dailyDough()
        // getNotes()
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
                        <Text style={styles.modalText}>Beer</Text>

                        <Text>You have this much fluid {fluidLevel}</Text>

                        <View style={styles.liquidAdd}>
                            <TouchableHighlight onPress={() => setFluidLevel(120)} underlayColor="white">
                                <View style={styles.row} >
                                    <Image source={{ uri: 'https://cdn5.vectorstock.com/i/1000x1000/87/14/simple-round-icon-coffee-cup-vector-13978714.jpg' }}
                                        style={{ width: "25%", height: "75%" }} />
                                    <Text >Beer Can Small</Text>
                                    <Text >120ml</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => setFluidLevel(240)} underlayColor="white">
                                <View style={styles.row} >
                                    <Image source={{ uri: 'https://cdn5.vectorstock.com/i/1000x1000/87/14/simple-round-icon-coffee-cup-vector-13978714.jpg' }}
                                        style={{ width: "25%", height: "75%" }} />
                                    <Text>Beer Can Medium</Text>
                                    <Text>200ml</Text>

                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => setFluidLevel(360)} underlayColor="white">
                                <View style={styles.row} >
                                    <Image source={{ uri: 'https://cdn5.vectorstock.com/i/1000x1000/87/14/simple-round-icon-coffee-cup-vector-13978714.jpg' }}
                                        style={{ width: "25%", height: "75%" }} />
                                    <Text>Beer Can Large</Text>
                                    <Text>360ml</Text>

                                </View>
                            </TouchableHighlight>
                        </View>


                        <View style={styles.confirm2}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setFluidLevel(fluidLevel + 1)}
                            >

                                <Image source={{ uri: 'https://www.iconpacks.net/icons/2/free-up-arrow-icon-3097-thumb.png' }}
                                    style={{ width: 50, height: 50 }} />
                            </Pressable>
                            {/* <TextInput
                                style={{ height: 40, width: "30%" }}
                                placeholder="100"
                                onChangeText={text => setText(text)}
                                defaultValue={fluidLevel}

                            /> */}
                            <Text style={styles.liquidSetter} >{fluidLevel}</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setFluidLevel(fluidLevel - 1)}
                            >

                                <Image source={{ uri: 'https://static.thenounproject.com/png/59745-200.png' }}
                                    style={{ width: 50, height: 50 }} />
                            </Pressable>
                        </View>
                        <View style={styles.confirm2}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}

                                onPress={() => confirmAddition()}

                            >
                                <Image source={{ uri: 'https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png' }}
                                    style={{ width: 50, height: 50 }} />
                                <Text style={styles.textStyle}>Confirm</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => cancelLiq()}
                            >
                                <Image source={{ uri: 'https://uxwing.com/wp-content/themes/uxwing/download/01-user_interface/red-x.png' }}
                                    style={{ width: 50, height: 50 }} />
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                            {/* <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => clearLiquids()}
                            >
                                <Image source={{ uri: 'https://uxwing.com/wp-content/themes/uxwing/download/01-user_interface/red-x.png' }}
                                    style={{ width: 50, height: 50 }} />
                                <Text style={styles.textStyle}>Clear liquids</Text>
                            </Pressable> */}

                        </View>
                        {/* <TextInput
                            style={styles.textInput}
                            multiline={true}
                            onChangeText={(value) => setValue(value)}
                            placeholder={'Do it now!'}
                            placeholderTextColor="white"
                            value={value}
                        />
                        <TouchableOpacity
                            onPress={() => handleAddTodo()}>
                            <Text>Click here</Text>
                        </TouchableOpacity>
                        <ScrollView style={{ width: '100%' }}>
                            {everyAll.map((task) => (
                                <Task
                                    text={task.text}
                                    key={task.key}
                                />
                            ))
                            }
                        </ScrollView> */}

                    </View>
                </View>
            </Modal>



            <View style={styles.icons}>
                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => setModalVisible(true)} underlayColor="white">
                        <Image source={{ uri: 'https://newcastlebeach.org/images/coffee-icon-free-7.png' }}
                            style={{ width: "100%", height: "100%" }} />
                    </Pressable>
                </View>
                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => setModalVisible(true)} underlayColor="white">
                        <Image source={{ uri: 'https://img.icons8.com/pastel-glyph/2x/wine-glass.png' }}
                            style={{ width: "100%", height: "100%" }} />
                    </Pressable>
                </View>
                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => setModalVisible(true)} underlayColor="white">
                        <Image source={{ uri: 'http://simpleicon.com/wp-content/uploads/beer.png' }}
                            style={{ width: "100%", height: "100%" }} />
                    </Pressable>
                </View>
                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => setModalVisible(true)} underlayColor="white">
                        <Image source={{ uri: 'https://i.pinimg.com/originals/d7/95/aa/d795aaaaa386c4f3a4252615f8673f5b.png' }}
                            style={{ width: "100%", height: "100%" }} />
                    </Pressable>
                </View>
                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => setModalVisible(true)} underlayColor="white">
                        <Image source={{ uri: 'https://img.icons8.com/pastel-glyph/2x/wine-glass.png' }}
                            style={{ width: "100%", height: "100%" }} />
                    </Pressable>
                </View>
                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => setModalVisible(true)} underlayColor="white">
                        <Image source={{ uri: 'http://simpleicon.com/wp-content/uploads/beer.png' }}
                            style={{ width: "100%", height: "100%" }} />
                    </Pressable>
                </View>

                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => setModalVisible(true)} underlayColor="white">
                        <Image source={{ uri: 'http://getdrawings.com/free-icon/medical-cross-icon-53.png' }}
                            style={{ width: "100%", height: "100%" }} />
                    </Pressable>
                </View>
                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => setModalVisible(true)} underlayColor="white">
                        <Image source={{ uri: 'http://simpleicon.com/wp-content/uploads/list.png' }}
                            style={{ width: "100%", height: "100%" }} />
                    </Pressable>
                </View>
                <View style={styles.box} onPress={() => Alert.alert('Button Clicked')}>
                    <Pressable onPress={() => setModalVisible(true)} underlayColor="white">
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
        borderWidth: 1,
        margin: 10,
        paddingTop: '10%',
    },

    buttonz: {
        backgroundColor: 'black',
        height: 80,
        width: 80,
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
        shadowOpacity: .8,
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
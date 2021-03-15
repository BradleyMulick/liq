// import React, { useContext, useState } from 'react';
// import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
// import { AuthContext } from '../navigation/AuthProvider'
// import FormButton from '../components/FormButton';
import AsyncStorage from '@react-native-async-storage/async-storage';


// const StatScreen = () => {
//     const { user, logout } = useContext(AuthContext)

//     const [textInputValue, setTextInputValue] = useState('');
//     // To set the value on Text
//     const [getValue, setGetValue] = useState('');

//     const saveValueFunction = () => {
//         // Function to save the value in AsyncStorage
//         if (textInputValue) {
//             // To check the input not empty
//             AsyncStorage.setItem('any_key_here', textInputValue);
//             // Setting a data to a AsyncStorage with respect to a key
//             setTextInputValue('');
//             // Resetting the TextInput
//             alert('Data Saved');
//             // Alert to confirm
//         } else {
//             alert('Please fill data');
//         }
//     };

//     const getValueFunction = () => {
//         // Function to get the value from AsyncStorage
//         AsyncStorage.getItem('any_key_here').then(
//             (value) =>
//                 // AsyncStorage returns a promise
//                 // Adding a callback to get the value
//                 setGetValue(value),
//             // Setting the value in Text
//         );
//     };

//     console.log({ user })
//     return (

//         <SafeAreaView style={{ flex: 1 }}>
//             <View style={styles.container}>
//                 <Text style={styles.titleText}>
//                     AsyncStorage in React Native to Store Data in Session
//         </Text>
//                 <TextInput
//                     placeholder="Enter Some Text here"
//                     value={textInputValue}
//                     onChangeText={(data) => setTextInputValue(data)}
//                     underlineColorAndroid="transparent"
//                     style={styles.textInputStyle}
//                 />
//                 <TouchableOpacity
//                     onPress={saveValueFunction}
//                     style={styles.buttonStyle}>
//                     <Text style={styles.buttonTextStyle}>
//                         SAVE VALUE
//           </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     onPress={getValueFunction}
//                     style={styles.buttonStyle}>
//                     <Text style={styles.buttonTextStyle}>
//                         GET VALUE
//           </Text>
//                 </TouchableOpacity>
//                 <Text style={styles.textStyle}>
//                     {getValue}
//                 </Text>
//             </View>
//         </SafeAreaView>
//     )
// }

// export default StatScreen


// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: "#fff",
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     text: {
//         fontSize: 20,
//         color: '#333333'
//     },
//     titleText: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         paddingVertical: 20,
//     },
//     textStyle: {
//         padding: 10,
//         textAlign: 'center',
//     },
//     buttonStyle: {
//         fontSize: 16,
//         color: 'white',
//         backgroundColor: 'green',
//         padding: 5,
//         marginTop: 32,
//         minWidth: 250,
//     },
//     buttonTextStyle: {
//         padding: 5,
//         color: 'white',
//         textAlign: 'center',
//     },
//     textInputStyle: {
//         textAlign: 'center',
//         height: 40,
//         width: '100%',
//         borderWidth: 1,
//         borderColor: 'green',
//     },
// })



// import React, { Component } from 'react';
// import {
//     View,
//     Text,

//     StyleSheet,
//     TouchableOpacity,
//     ScrollView,
//     TextInput,
//     Keyboard,
//     ActivityIndicator,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import LogsList from '../components/LogsList';
// export default class StatScreen extends Component {
//     state = {
//         isEdit: null,
//         list: [],
//         isLoading: false,
//         editText: '',
//     };
//     componentDidMount = () => {
//         this.setState({ isLoading: true });
//         // AsyncStorage.removeItem('list')
//         AsyncStorage.getItem('list')
//             .then(list => {
//                 if (list) {
//                     this.setState({ list: JSON.parse(list), isLoading: false });
//                 } else {
//                     this.setState({ list: [], isLoading: false });
//                 }
//             })
//             .catch(err => {
//                 this.setState({ isLoading: false });
//             });
//     };
//     add = () => {
//         let list = this.state.list;
//         list.push('');
//         this.setState({ list: list });
//         this.saveToStorage();

//         this.setEdit(list.length - 1);
//         console.log(list)
//     };
//     setEdit = index => {
//         if (this.state.isEdit !== index) {
//             this.setState({ isEdit: index, editText: this.state.list[index] });
//         }
//     };
//     setList = (text, index) => {
//         let list = this.state.list;
//         list[index] = text;
//         this.setState({ list: list, isEdit: null, editText: '' });

//         this.saveToStorage();
//     };
//     saveToStorage = () => {
//         let data = JSON.stringify(this.state.list);
//         AsyncStorage.setItem('list', data);
//     };
//     deleteItem = index => {
//         let list = this.state.list;
//         list.splice(index, 1);
//         this.setState({ list: list });
//         this.saveToStorage();
//     };
//     render() {
//         return (
//             <SafeAreaView>
//                 <ScrollView style={style.container}>
//                     <View style={style.header}>
//                         <Text style={style.headerText}>Liquid Log</Text>
//                     </View>
//                     {this.state.isLoading ? (
//                         <ActivityIndicator color="#d28888" size="large" />
//                     ) : (
//                         <View style={style.body}>
//                             {this.state.list.map((item, key) => (
//                                 <React.Fragment>
//                                     {this.state.isEdit === null || this.state.isEdit !== key ? (
//                                         <TouchableOpacity
//                                             style={style.item}
//                                             activeOpacity={0.5}
//                                             onLongPress={() => this.setEdit(key)}>
//                                             <Text style={style.itemText}>{item}</Text>
//                                             <TouchableOpacity
//                                                 style={style.itemDelete}
//                                                 onPress={() => this.deleteItem(key)}>
//                                                 <Text style={style.itemDeleteText}>Delete</Text>
//                                             </TouchableOpacity>
//                                         </TouchableOpacity>
//                                     ) : null}
//                                     {this.state.isEdit !== null ? (
//                                         key == this.state.isEdit ? (
//                                             <TextInput
//                                                 style={style.itemInput}
//                                                 onBlur={() => this.setList(this.state.editText, key)}
//                                                 onSubmitEditing={() =>
//                                                     this.setList(this.state.editText, key)
//                                                 }
//                                                 value={this.state.editText}
//                                                 autoFocus
//                                                 onChangeText={editText => this.setState({ editText })}
//                                             />
//                                         ) : null
//                                     ) : null}
//                                 </React.Fragment>
//                             ))}
//                             <TouchableOpacity style={style.btnAdd} onPress={() => this.add()}>
//                                 <Text style={style.btnAddText}>Add</Text>
//                             </TouchableOpacity>
//                         </View>
//                     )}
//                 </ScrollView>
//                 <View>
//                     <LogsList />
//                 </View>
//             </SafeAreaView>
//         );
//     }
// }

// const style = StyleSheet.create({
//     container: { backgroundColor: '#f2f2f2', height: '100%' },
//     header: {
//         backgroundColor: '#d2d2d2',
//         elevation: 5,
//         paddingHorizontal: '5%',
//         paddingVertical: 20,
//     },
//     headerText: {
//         fontSize: 20,
//     },
//     btnAdd: {
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 20,
//     },
//     btnAddText: {
//         fontSize: 25,
//         fontWeight: '700',
//     },
//     body: { paddingHorizontal: '4%', paddingVertical: 15 },
//     item: {
//         marginBottom: 10,
//         backgroundColor: '#fff',
//         padding: 10,
//         minHeight: 50,
//         position: 'relative',
//     },
//     itemDelete: {
//         position: 'absolute',
//         fontSize: 16,
//         padding: 10,
//         right: 0,
//     },
//     itemDeleteText: {
//         fontSize: 16,
//     },
//     itemText: {
//         fontSize: 16,
//         paddingHorizontal: '1%',
//     },
//     itemInput: {
//         borderBottomWidth: 1,
//         fontSize: 16,
//     },
// });




// import React, { useEffect, useState } from 'react'
// import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'


// const [data, setData] = useState([])
// const [index, setindex] = useState(-1)
// const [inputData, setInputData] = useState('')
// const [newData, setNewData] = useState(false)


// const handleSubmit = () => {
//     let currData = [...data]
//     if (newData) {
//         currData.push(inputData)
//         setData(currData)
//         setNewData(!newData)
//     } else {
//         currData[index] = inputData
//         setData(currData)
//         setIndex(-1)
//     }
//     setInputData('')
//     setNotes(currData)
// }

// const getNotes = async () => {
//     const allData = await AsyncStorage.getItem('notes')
//     setData(allData ? JSON.parse(allData) : [])
//     console.log(allData)
// }

// const setNotes = (currData) => {
//     const stringifyData = JSON.stringify(currData)
//     AsyncStorage.setItem('notes', stringifyData)
// }

// useEffect(() => {
//     getNotes()
// })





// import React, { useContext, useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Button, ScrollView } from 'react-native'
// import { AuthContext } from '../navigation/AuthProvider'
// import { FluidContext } from '../navigation/FluidProvider'
// import FormButton from '../components/FormButton';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { LogsContext } from '../navigation/LogsProvider'


// const STORAGE_KEY = '@save_age'

// const StatScreen = ({ navigation }) => {
//     const [maxFluids, setMaxFluids] = useContext(FluidContext)
//     // const [maxFluids, setMaxFluids] = useState('')
//     const [text, setText] = useState('');

//     const [allLogs, setAllLogs] = useContext(LogsContext)


//     const saveData = async () => {

//         try {

//             await

//                 AsyncStorage.setItem(STORAGE_KEY, maxFluids)
//             alert('Data successfully saved')
//         } catch (e) {
//             alert('Failed to save the data to the storage')
//         }
//     }



//     // const readData = async () => {
//     //     try {
//     //         const fluids = await AsyncStorage.getItem(STORAGE_KEY)

//     //         if (fluids !== null) {

//     //             setMaxFluids(fluids)
//     //         }
//     //     } catch (e) {
//     //         alert('Failed to fetch the data from storage')
//     //     }
//     // }
//     // useEffect(() => {
//     //     readData()
//     // }, [maxFluids])

//     const clearStorage = async () => {
//         try {
//             // await AsyncStorage.clear()
//             const keys = await AsyncStorage.getAllKeys();
//             await AsyncStorage.multiRemove(keys);
//             setMaxFluids(0)
//             alert('Storage successfully cleared!')

//         } catch (e) {
//             alert('Failed to clear the async storage.')
//         }
//     }





//     const onChangeText = fluids => setMaxFluids(fluids)

//     const onSubmitEditing = () => {

//         if (!maxFluids) return
//         saveData(maxFluids)

//         navigation.navigate('Home')

//     }

//     useEffect(() => {

//     }, [])

//     return (


//         <View style={styles.container}>


//             <View style={styles.header}>
//                 <Text style={styles.title}>Fluid Restrictions Settings</Text>
//                 <View style={styles.fluflu}>
//                     <TextInput
//                         style={styles.input}

//                         placeholder={text}
//                         onChangeText={onChangeText}
//                         onSubmitEditing={onSubmitEditing}
//                     ></TextInput>

//                     <Text style={styles.millers}>mL*</Text>
//                 </View>
//                 <Text >Current Fluid Max {maxFluids}mL*</Text>
//                 <Text style={styles.fluidDocWarning}>* Determine this number with your physician.</Text>

//             </View>







//             {/* <TextInput
//                 style={{ height: 40 }}
//                 placeholder="Type here to translate!"
//                 onChangeText={maxFluids => setMaxFluids(maxFluids)}
//                 defaultValue={maxFluids}
//             />
//             <Text style={{ padding: 10, fontSize: 42 }}>
//                 {maxFluids}
//             </Text> */}
//             <View style={styles.warning}>
//                 <ScrollView style={{ width: '100%' }}>
//                     {everyAll.map((task) => (
//                         <Task
//                             text={task.text}
//                             key={task.key}
//                         />
//                     ))
//                     }
//                 </ScrollView>
//             </View>
//         </View>




//     )
// }

// export default StatScreen


// const styles = StyleSheet.create({
//     container: {

//         flex: 1,

//         padding: 20,
//         paddingTop: 40,


//     },
//     text: {
//         fontSize: 20,
//         color: '#333333'
//     },
//     header: {
//         flex: 1,

//         alignItems: 'center',
//         paddingTop: 40,
//     },
//     title: {
//         fontSize: 24,
//         width: '75%'
//     },
//     millers: {
//         width: '25%',
//         fontSize: 24
//     },
//     fluflu: {
//         flexDirection: "row",
//     },
//     panel: {
//         height: 50,
//         backgroundColor: 'yellow',
//         alignItems: 'center',
//     },
//     input: {
//         width: "50%",
//         height: 60,
//         borderColor: 'black',
//         borderWidth: 1,
//         borderRadius: 7,
//         fontSize: 36,
//         textAlign: 'right',
//         padding: 10
//     },
//     fluidDocWarning: {
//         fontSize: 16,
//     },
//     warning: {
//         flex: 2,
//         padding: 10,

//         justifyContent: 'flex-end',
//         alignItems: 'center',



//     },
//     button: {
//         height: 50,
//         width: '69%',
//         backgroundColor: '#30c702',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 10,
//         marginTop: 10,


//     },
//     buttonText: {

//     },
//     bigWarning: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: 'red'
//     },
//     warningInfo: {
//         alignItems: 'center',
//         textAlign: 'center',


//     }
// })




import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext } from 'react/cjs/react.development';
import LogForm from '../components/LogForm';
import LogsList from '../components/LogsList';
import { LogsContext } from '../navigation/LogsProvider';
import sample from '../sample.json'



const StatScreen = () => {
    // const [toDoList, setToDoList] = useState([{
    //     "id": 1,
    //     "task": "Give dog a bath",
    //     "complete": true
    // }, {
    //     "id": 2,
    //     "task": "Do laundry",
    //     "complete": true
    // }]);

    const [allLogs, setAllLogs] = useContext(LogsContext)
    console.log("all logs stats page" + allLogs)
    const addTask = (userInput) => {
        let copy = [...allLogs];
        const date = new Date().toString()
        copy = [...copy, { id: allLogs.length + 1, task: userInput, complete: false, date: date }];
        setAllLogs(copy);
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>

                    <LogsList allLogs={allLogs} />


                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default StatScreen


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    text: {
        fontSize: 20,
        color: '#333333'
    }
})
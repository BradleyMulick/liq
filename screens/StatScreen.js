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



import React, { Component } from 'react';
import {
    View,
    Text,

    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Keyboard,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default class StatScreen extends Component {
    state = {
        isEdit: null,
        list: [],
        isLoading: false,
        editText: '',
    };
    componentDidMount = () => {
        this.setState({ isLoading: true });
        // AsyncStorage.removeItem('list')
        AsyncStorage.getItem('list')
            .then(list => {
                if (list) {
                    this.setState({ list: JSON.parse(list), isLoading: false });
                } else {
                    this.setState({ list: [], isLoading: false });
                }
            })
            .catch(err => {
                this.setState({ isLoading: false });
            });
    };
    add = () => {
        let list = this.state.list;
        list.push('');
        this.setState({ list: list });
        this.saveToStorage();

        this.setEdit(list.length - 1);
        console.log(list)
    };
    setEdit = index => {
        if (this.state.isEdit !== index) {
            this.setState({ isEdit: index, editText: this.state.list[index] });
        }
    };
    setList = (text, index) => {
        let list = this.state.list;
        list[index] = text;
        this.setState({ list: list, isEdit: null, editText: '' });

        this.saveToStorage();
    };
    saveToStorage = () => {
        let data = JSON.stringify(this.state.list);
        AsyncStorage.setItem('list', data);
    };
    deleteItem = index => {
        let list = this.state.list;
        list.splice(index, 1);
        this.setState({ list: list });
        this.saveToStorage();
    };
    render() {
        return (
            <SafeAreaView>
                <ScrollView style={style.container}>
                    <View style={style.header}>
                        <Text style={style.headerText}>Liquid Log</Text>
                    </View>
                    {this.state.isLoading ? (
                        <ActivityIndicator color="#d28888" size="large" />
                    ) : (
                            <View style={style.body}>
                                {this.state.list.map((item, key) => (
                                    <React.Fragment>
                                        {this.state.isEdit === null || this.state.isEdit !== key ? (
                                            <TouchableOpacity
                                                style={style.item}
                                                activeOpacity={0.5}
                                                onLongPress={() => this.setEdit(key)}>
                                                <Text style={style.itemText}>{item}</Text>
                                                <TouchableOpacity
                                                    style={style.itemDelete}
                                                    onPress={() => this.deleteItem(key)}>
                                                    <Text style={style.itemDeleteText}>Delete</Text>
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        ) : null}
                                        {this.state.isEdit !== null ? (
                                            key == this.state.isEdit ? (
                                                <TextInput
                                                    style={style.itemInput}
                                                    onBlur={() => this.setList(this.state.editText, key)}
                                                    onSubmitEditing={() =>
                                                        this.setList(this.state.editText, key)
                                                    }
                                                    value={this.state.editText}
                                                    autoFocus
                                                    onChangeText={editText => this.setState({ editText })}
                                                />
                                            ) : null
                                        ) : null}
                                    </React.Fragment>
                                ))}
                                <TouchableOpacity style={style.btnAdd} onPress={() => this.add()}>
                                    <Text style={style.btnAddText}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    container: { backgroundColor: '#f2f2f2', height: '100%' },
    header: {
        backgroundColor: '#d2d2d2',
        elevation: 5,
        paddingHorizontal: '5%',
        paddingVertical: 20,
    },
    headerText: {
        fontSize: 20,
    },
    btnAdd: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    btnAddText: {
        fontSize: 25,
        fontWeight: '700',
    },
    body: { paddingHorizontal: '4%', paddingVertical: 15 },
    item: {
        marginBottom: 10,
        backgroundColor: '#fff',
        padding: 10,
        minHeight: 50,
        position: 'relative',
    },
    itemDelete: {
        position: 'absolute',
        fontSize: 16,
        padding: 10,
        right: 0,
    },
    itemDeleteText: {
        fontSize: 16,
    },
    itemText: {
        fontSize: 16,
        paddingHorizontal: '1%',
    },
    itemInput: {
        borderBottomWidth: 1,
        fontSize: 16,
    },
});




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


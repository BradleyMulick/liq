// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack'
// import HomeScreen from '../screens/HomeScreen'
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



// const Stack = createStackNavigator()

// const Tab = createMaterialBottomTabNavigator();



// const AppStack = () => {

//     return (
//         <Stack.Navigator>
//             <Stack.Screen name="Home" component={HomeScreen} />
//         </Stack.Navigator>

//     )
// }

// export default AppStack



import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StatScreen from '../screens/StatScreen';
import FluidMax from '../screens/FluidMax';


const Stack = createStackNavigator()

const Tab = createBottomTabNavigator();



const AppStack = () => {

    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator>
                <Tab.Screen name="FluidMax" component={FluidMax} />
                <Tab.Screen name="StatScreen" component={StatScreen} />
                <Tab.Screen name="Home" component={HomeScreen} />
            </Tab.Navigator>
        </NavigationContainer>

    )
}

export default AppStack

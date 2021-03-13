
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StatScreen from '../screens/StatScreen';
import FluidMax from '../screens/FluidMax';
import { TextInput } from 'react-native-gesture-handler';


const Stack = createStackNavigator()

const Tab = createBottomTabNavigator();



const AppStack = () => {

    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="FluidMax" component={FluidMax} />
                <Tab.Screen name="StatScreen" component={StatScreen} />
            </Tab.Navigator>
        </NavigationContainer>

    )
}

export default AppStack


import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StatScreen from '../screens/StatScreen';
import FluidMax from '../screens/FluidMax';
import { TextInput } from 'react-native-gesture-handler';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator()

const Tab = createBottomTabNavigator();



const AppStack = () => {

    return (
        <NavigationContainer independent={true} >
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'home'
                                : 'home';
                        } else if (route.name === 'StatScreen') {
                            iconName = focused ? 'chart-area' : 'chart-area';
                        } else if (route.name === 'FluidMax') {
                            iconName = focused ? 'cog' : 'cog';
                        }

                        // You can return any component that you like here!
                        return <Font5 name={iconName} size={size} color={color} />

                    },
                })}
                tabBarOptions={{
                    showLabel: false,
                    activeTintColor: 'black',
                    inactiveTintColor: 'black',
                    activeBackgroundColor: 'transparent',
                    inactiveBackgroundColor: 'transparent',
                    style: {
                        backgroundColor: 'transparent',
                        borderTopWidth: 0,
                        position: 'absolute',
                        elevation: 0// <-- this is the solution
                    },
                }}>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="StatScreen" lazy="false" component={StatScreen} />
                <Tab.Screen name="FluidMax" component={FluidMax} />
            </Tab.Navigator>
        </NavigationContainer>

    )
}

export default AppStack

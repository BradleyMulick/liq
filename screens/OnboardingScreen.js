import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';


const Dots = ({ selected }) => {
    let backgroundColor
    backgroundColor = selected ? "#55ac1b" : "#220b0b"

    return (
        <View
            style={{
                width: 5,
                height: 5,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    )
}

const Skip = ({ ...props }) => (
    <Button
        title='Skip'
        color='#000000'
    />
)

const Next = ({ ...props }) => (
    <Button
        title='Next'
        color='#706161'
        {...props}
    />
)

const Done = ({ ...props }) => (

    <TouchableOpacity
        style={{ marginHorizontal: 8 }}
        {...props}
    >
        <Text style={{ fontSize: 16 }}>Done</Text>

    </TouchableOpacity>
)


const OnboardingScreen = ({ navigation }) => {
    return (
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            onSkip={() => navigation.replace("Login")}
            onDone={() => navigation.navigate("Login")}
            pages={[
                {
                    backgroundColor: '#74c925',
                    image: <Image source={require('../assets/150.png')} />,
                    title: 'Onboarding',
                    subtitle: 'Whatever',
                },
                {
                    backgroundColor: '#b30d0d',
                    image: <Image source={require('../assets/150.png')} />,
                    title: 'Onboarding',
                    subtitle: 'Whateverrrr',
                },

            ]}
        />
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
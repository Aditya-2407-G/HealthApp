import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from '../screens/Home'
import QR from '../screens/QR'
import ABHA from '../screens/ABHA'
import Find from '../screens/Find'
import { createStackNavigator } from '@react-navigation/stack'

export type AppStackParamList = {
    Home: undefined;
    QR: undefined;
    ABHA: undefined;
    BookTest: undefined;
    Find: undefined;
}

const Stack = createStackNavigator<AppStackParamList>(); 


export const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>

        <Stack.Screen name = 'Home' component={Home}/>
        <Stack.Screen name = 'QR' component= {QR}/>
        <Stack.Screen name = 'ABHA' component={ABHA}/>
        <Stack.Screen name = 'Find' component={Find}/>
        
    </Stack.Navigator>
  )
}



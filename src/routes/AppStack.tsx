import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from '../screens/Home'
import QR from '../screens/QR'
import ABHA from '../screens/ABHA'
import Find from './FindStack'
import { createStackNavigator } from '@react-navigation/stack'
import BookTest from '../screens/BookTest'


export type AppStackParamList = {
    Home: undefined;
    QR: undefined;
    ABHA: undefined;
    Find: undefined;
    BookTest: undefined
    
}

const Stack = createStackNavigator<AppStackParamList>(); 


export const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>

        <Stack.Screen name = 'Home' component={Home}/>
        <Stack.Screen name = 'QR' component= {QR}/>
        <Stack.Screen name = 'ABHA' component={ABHA}/>
        <Stack.Screen name = 'Find' component={Find}/>
        <Stack.Screen name = 'BookTest' component={BookTest}/>

        
    </Stack.Navigator>
  )
}



import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'
import { createStackNavigator } from '@react-navigation/stack'

export type AuthStackParamList = {
    Signup: undefined,
    Login: undefined
}

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack = () => {

  return (

    <Stack.Navigator screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false
    }}>

        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name= 'Signup' component={Signup}/>


    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})
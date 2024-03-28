import React, { useRef, useState } from 'react';
import { PaperProvider} from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FindHospitals from './FindHospitals'
import FindTest from './FindTest';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const BookTest = () => {

    const Tab = createMaterialTopTabNavigator();
    return (
        <View>
        <Text>BookTest</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
export default BookTest




// <PaperProvider>
// <Tab.Navigator>
// <Tab.Screen name="Tests" component={FindTest} />
// <Tab.Screen name="Hospitals" component={FindHospitals} />
// </Tab.Navigator>
// </PaperProvider>
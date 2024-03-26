import { View, Text, TouchableOpacity, Image, TextInput, FlatList, } from 'react-native';
import React, { useRef, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FindHospitals from './FindHospitals'
import FindDoctors from '../screens/FindDoctors'

const App = () => {

    const Tab = createMaterialTopTabNavigator();
    return (
        <PaperProvider>

            <Tab.Navigator>
            <Tab.Screen name="Doctors" component={FindDoctors} />
            <Tab.Screen name="Hospitals" component={FindHospitals} />
            </Tab.Navigator>

        </PaperProvider>



    );
};

export default App;

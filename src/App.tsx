import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import 'react-native-gesture-handler';
import { FirebaseProvider } from './firebase/FirebaseContext';
import Router from './routes/Router';


const App = () => {

  return (
    <FirebaseProvider>
      <Router/>
    </FirebaseProvider>
  );
}

export default App

const styles = StyleSheet.create({})
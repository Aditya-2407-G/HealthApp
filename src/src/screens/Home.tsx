import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import CustomStatusBar from '../components/CustomStatusBar'
import { useNavigation } from '@react-navigation/native'

//context API
import { AppwriteContext } from '../appwrite/AppwriteContext'
import { Button } from '@rneui/themed'

type UserObj = {
   name: string;
   email: String;
}



const Home = () => {


   const [userData, setUserData] = useState<UserObj>()
   const { appwrite, setIsLoggedIn } = useContext(AppwriteContext)

   useEffect(() => {
      appwrite.getCurrentUser()
         .then(response => {
            if (response) {
               const user: UserObj = {
                  name: response.name,
                  email: response.email
               }
               setUserData(user)
            }
         })
   }, [appwrite])


   // const userName = "Aditya"; 

   const navigation = useNavigation<any>();

   const handleScanQR = () => {
      navigation.navigate('QR')
   }
   const handleABHA = () => {
      navigation.navigate('ABHA')
   }
   const handleBookTest = () => {
      navigation.navigate('BookTest')
   }
   const handleFind = () => {
      navigation.navigate('Find')
   }



   return (
      <SafeAreaView style={styles.container}>

         <View style={styles.content}>
            <View>
               <CustomStatusBar userName={userData?.name || ''} />
            </View>

            <ScrollView style={styles.scrollView}>

               <View style={styles.container}>

                  <View style={styles.section}>

                     <View style={styles.section1}>

                        <TouchableOpacity style={styles.button1} onPress={handleScanQR}>
                           <Text style={styles.buttonText}>SCAN QR</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button2} onPress={handleABHA}>
                           <Text style={styles.buttonText}>ABHA ACCOUNT</Text>
                        </TouchableOpacity>
                        
                     </View>

                  </View>

                  <View style= {styles.logData}>

                     <View>
                        <Text style= {styles.healthHeading}>Healthcare Nearby </Text>
                        <Text style= {styles.healthText}>
                        Specialist and Top-Notch Medical Facilities are now one click away!
                        </Text>
                     </View>

                     
                     <View style= {styles.addButton}>
                        <Button onPress={handleFind} title={'FIND'} ></Button>
                     </View>

                  </View>


                  <View style={styles.section}>

                     <View style= {styles.healthContainer}>
                        <View>
                           <Text style={styles.healthHeading}>Health Records</Text>
                           <Text style={styles.healthText}>Keep all your health documents in one secure place to access easily</Text>
                        </View>

                        <View style={styles.addSection}>

                           <View style={styles.tile}>
                              <Text style={styles.addItemText}>Lab Reports</Text>
                           </View>
                           <View style={styles.tile}>
                              <Text style={styles.addItemText}>Doctor Notes</Text>
                           </View>
                           <View style={styles.tile}>
                              <Text style={styles.addItemText}>Medical Expense</Text>
                           </View>
                           <View style={styles.tile}>
                              <Text style={styles.addItemText}>Timings</Text>
                           </View>
                           <View style={styles.tile}>
                              <Text style={styles.addItemText}>Imaging</Text>
                           </View>
                           <View style={styles.tile}>
                              <Text style={styles.addItemText}>Imaging</Text>
                           </View>

                        </View>

                     </View>

                  </View>

               </View>

            </ScrollView>

            <TouchableOpacity style={styles.bookTestButton} >
               <Text style={styles.bookTestButtonText}>Book Tests</Text>
            </TouchableOpacity>

         </View>


      </SafeAreaView>
   );

}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
   },
   content: {
      flex: 1,
   },
   scrollView: {
      flex: 1,
      marginHorizontal: 10,
   },
   bookTestButton: {
      backgroundColor: '#007AFF',
      paddingVertical: 20,
      alignItems: 'center',
      borderRadius: 4,
      marginHorizontal: 10,
      marginBottom: 10, // Adjust as needed
   },
   bookTestButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
   },
   section: {
      marginTop: 10,
   },
   section1: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
   },
   sectionText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      color: 'black',
   },
   button1: {
      backgroundColor: '#007AFF',
      paddingVertical: 50,
      paddingHorizontal: 50,
      borderRadius: 4,
      marginTop: 10,
   },
   button2: {
      backgroundColor: '#007AFF',
      paddingVertical: 50,
      paddingHorizontal: 30,
      borderRadius: 4,
      marginTop: 10,
   },
   buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 'bold'
   },
   input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 4,
      paddingHorizontal: 10,
      marginTop: 10,
      color: 'black'
   },
   addSection: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
   },
   tile:{
      backgroundColor: '#89cff0',
      paddingVertical: 35,
      borderRadius: 4,
      width: '31%',
      marginTop: 20,
   },
   bottom: {
      flex: 1,
      width: "100%",
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
   },
   bookTest: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      backgroundColor: '#007AFF',
      paddingVertical: 25,
      borderRadius: 4,
   },
   addItemText: {
      color: 'black',
      fontSize: 14,
      textAlign: 'center',
      fontWeight: '500'
   },
   healthContainer: {
      backgroundColor: '#ecf0f1',
      borderRadius: 4,
      marginTop: 20,
      padding: 8
   },
   healthHeading: {
      color: 'purple',
      fontSize: 23,
      fontWeight: 'bold',
      marginBottom: 15,
   },
   healthText: {
      color: '#808080',
      fontSize: 15
   },
   logData:{
      flex: 1,
      marginTop: 20,
      backgroundColor: '#ecf0f1',
      borderRadius: 4,
      padding: 10,
      paddingBottom: 30
   },
   addButton:{
      flex: 1,
      alignItems:'center',
      marginTop: 15
   },
});

export default Home       













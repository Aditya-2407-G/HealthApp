import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Alert, StyleSheet, ToastAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '@react-native-firebase/auth';
import * as FileSystem from 'expo-file-system'
import storage from '@react-native-firebase/storage'

const ImageUploader = () => {


    const[image, setImage] = useState<string | null>(null);
    const[uploading, setUploading] = useState<boolean>(false);

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All, 
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if(!result.canceled) {
            setImage(result.assets[0].uri);
            ToastAndroid.show('Image selected successfully ', ToastAndroid.LONG);
        }

    };


    const uploadMedia = async () => {
        setUploading(true);
    
        try {
            if(image) {
                const {uri} = await FileSystem.getInfoAsync(image);

                const blob : Blob = await new Promise((resolve, reject) => {

                    const xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        resolve(xhr.response);
                    };
                    xhr.onerror = (e) => {
                        reject(new TypeError('Network request faileed'));
                    };

                    xhr.responseType = 'blob';
                    xhr.open('GET', uri, true);
                    xhr.send(null);
                });


                const filename = image.substring(image.lastIndexOf('/') + 1);
                const ref = storage().ref().child(filename);


                await ref.put(blob);
                setUploading(false);
                Alert.alert('photo Uploaded!!!'); 
                setImage(null)
            }
            else {
                Alert.alert('No image selected !', 'Please pick an image first')
            }
        }catch(error) {
            console.log(error);
            setUploading(false);
        }

    };
  return (

    <View style= {styles.container}>
    <TouchableOpacity style= {styles.pickBtn} onPress={pickImage}>
        <Text style= {styles.btnText}> Pick image </Text>
    </TouchableOpacity>
    <View>

        <TouchableOpacity style= {styles.uploadBtn} onPress={uploadMedia}>
            <Text style= {styles.btnText}> Upload Image </Text>
        </TouchableOpacity>
    </View>
</View>
  )
}

const styles = StyleSheet.create({
    
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickBtn:{
        backgroundColor: '#007AFF',
        width: 100,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadBtn:{
        marginTop: 20,
        backgroundColor: '#007AFF',
        width: 100,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: '#FFFFFF'
    }
    
    
    
})

export default ImageUploader
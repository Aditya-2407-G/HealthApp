import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Alert, ToastAndroid, StyleSheet} from 'react-native';
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system';
import storage from '@react-native-firebase/storage';
import { ProgressBar } from 'react-native-paper'; 

const FileUploader = () => {

    const [fileUri, setFileUri] = useState<string | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);


    const pickFile = async () => {
        try {
            const fileDetails = await DocumentPicker.getDocumentAsync({
                type: '*/*', // Allow picking any file type
            });

            if (!fileDetails.canceled && fileDetails.assets[0].uri) {
                setFileUri(fileDetails.assets[0].uri);
                ToastAndroid.show('File selected successfully', ToastAndroid.LONG);
            }
        } catch (error) {
            console.error('Error picking file:', error);
            Alert.alert('Error', 'Failed to pick file. Please try again later.');
        }
    };


    const uploadFile = async () => {
        if (!fileUri) {
            Alert.alert('No file selected', 'Please select a file before uploading.');
            return;
        }

        setUploading(true);

        try {


            const { uri } = await FileSystem.getInfoAsync(fileUri);
            const blob = await new Promise<Blob>((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => resolve(xhr.response);
                xhr.onerror = (e) => reject(new TypeError('Network request failed'));
                xhr.onprogress = (event) => {
                    const progress = event.loaded / event.total;
                    setUploadProgress(progress);
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
            });

            const filename = fileUri.substring(fileUri.lastIndexOf('/') + 1);
            const ref = storage().ref().child(filename);

            const uploadTask = ref.put(blob);

            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
                setUploadProgress(progress);
            });

            await uploadTask;
            setUploading(false);
            setFileUri(null);
            setUploadProgress(0);
            Alert.alert('File Uploaded', 'The file has been successfully uploaded to Firebase storage.');

        } catch (error) {
            console.error('Error uploading file:', error);
            Alert.alert('Error', 'Failed to upload file. Please try again later.');
            setUploading(false);
        }
    };



    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.pickBtn} onPress={pickFile}>
                <Text style={styles.btnText}> Pick a File </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadBtn} onPress={uploadFile}>
                <Text style={styles.btnText}> Upload a File </Text>
            </TouchableOpacity>
            {uploading && (
                <View style={styles.progressBarContainer}>
                    <ProgressBar
                        indeterminate={false}
                        progress={uploadProgress}
                        color="#2196F3"
                    />
                    <Text style={styles.progressText}>{Math.round(uploadProgress * 100)}% Uploaded</Text>
                </View>
            )}
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickBtn: {
        backgroundColor: '#007AFF',
        width: 100,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadBtn: {
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
    },
    progressBarContainer: {
        marginTop: 20,
        width: '80%'
    },
    progressText: {
        marginTop: 10,
        textAlign: 'center'
    },





})

export default FileUploader

function setUploadProgress(progress: number) {
    throw new Error('Function not implemented.');
}


import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Alert, StyleSheet, ToastAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '@react-native-firebase/auth';
import * as FileSystem from 'expo-file-system'
import storage from '@react-native-firebase/storage'
import ImageUploader from '../components/ImageUploader';
const Doctors = [   
    { Doctor: 'Doctor 1' },
    { Doctor: 'Doctor 2' },
    { Doctor: 'Doctor 3' },
    // Add more doctors as needed
];

const DoctorsComponent = () => {
    const [search, setSearch] = useState('');
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState(Doctors);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const searchRef = useRef<TextInput>(null);


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


    const onSearch = (search: string) => {
        if (search !== '') {
            let tempData = Doctors.filter(item => {
                return item.Doctor.toLowerCase().indexOf(search.toLowerCase()) > -1;
            });
            setData(tempData);
        } else {
            setData(Doctors);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                style={{
                    width: '90%',
                    height: 60,
                    borderRadius: 10,
                    borderWidth: 0.5,
                    alignSelf: 'center',
                    marginTop: 100,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: 15,
                    paddingRight: 15,
                }}
                onPress={() => {
                    setClicked(!clicked);
                }}>
                <Text style={{ color: '#000000' }}>
                    {selectedDoctor == '' ? 'Select Doctor' : selectedDoctor}
                </Text>
                {clicked ? (
                    <Image
                        source={require('../../asstes/upload.png')}
                        style={{ width: 20, height: 20 }}
                    />
                ) : (
                    <Image
                        source={require('../../asstes/dropdown.png')}
                        style={{ width: 20, height: 20 }}
                    />
                )}
            </TouchableOpacity>
            {clicked ? (
                <View
                    style={{
                        elevation: 5,
                        marginTop: 20,
                        height: 300,
                        alignSelf: 'center',
                        width: '90%',
                        backgroundColor: '#e6ebf2',
                        borderRadius: 10,
                    }}>
                    <TextInput
                        placeholder="Search.."
                        value={search}
                        ref={searchRef}
                        onChangeText={txt => {
                            onSearch(txt);
                            setSearch(txt);
                        }}
                        style={{
                            width: '90%',
                            height: 50,
                            alignSelf: 'center',
                            borderWidth: 0.7,
                            borderColor: '#000000',
                            borderRadius: 7,
                            marginTop: 20,
                            paddingLeft: 20,
                        }}
                    />

                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    style={{
                                        width: '85%',
                                        alignSelf: 'center',
                                        height: 50,
                                        justifyContent: 'center',
                                        borderBottomWidth: 0.7,
                                        borderColor: '#000000',
                                    }}
                                    onPress={() => {
                                        setSelectedDoctor(item.Doctor);
                                        setClicked(!clicked);
                                        onSearch('');
                                        setSearch('');
                                    }}>
                                    <Text style={{ fontWeight: 'bold', color: '#000000' }}>{item.Doctor}</Text>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            ) : null}

            
            <ImageUploader/>


        </View>
    );
};

const styles = StyleSheet.create({

    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickBtn:{
        backgroundColor: 'cyan',
        width: 100,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadBtn:{
        marginTop: 20,
        backgroundColor: 'cyan',
        width: 100,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },



})

export default DoctorsComponent;

import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Alert, ToastAndroid, StyleSheet } from 'react-native';
import FileUploader from '../components/FileUploader';


const Hospitals = [
    { Hospital: 'Hospital 1' },
    { Hospital: 'Hospital 2' },
    { Hospital: 'Hospital 3' },
    // Add more hospitals as needed
];

const HospitalComponent = () => {

    const [search, setSearch] = useState('');
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState(Hospitals);
    const [selectedHospital, setSelectedHospital] = useState('');
    const searchRef = useRef<TextInput>(null);

    const onSearch = (search: string) => {
        if (search !== '') {
            let tempData = Hospitals.filter(item => {
                return item.Hospital.toLowerCase().indexOf(search.toLowerCase()) > -1;
            });
            setData(tempData);
        } else {
            setData(Hospitals);
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
                    {selectedHospital == '' ? 'Select Hospital' : selectedHospital}
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
                                        setSelectedHospital(item.Hospital);
                                        setClicked(!clicked);
                                        onSearch('');
                                        setSearch('');
                                    }}>
                                    <Text style={{ color: '#000000', fontWeight: 'bold' }}>{item.Hospital}</Text>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            ) : null}

        <FileUploader/>


        </View>
    );
};

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
    }



})

export default HospitalComponent;

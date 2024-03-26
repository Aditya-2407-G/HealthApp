import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';

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
                    height: 50,
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
                <Text style={{ fontWeight: '600' }}>
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
                        backgroundColor: '#fff',
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
                            borderWidth: 0.2,
                            borderColor: '#8e8e8e',
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
                                        borderBottomWidth: 0.5,
                                        borderColor: '#8e8e8e',
                                    }}
                                    onPress={() => {
                                        setSelectedDoctor(item.Doctor);
                                        setClicked(!clicked);
                                        onSearch('');
                                        setSearch('');
                                    }}>
                                    <Text style={{ fontWeight: '600' }}>{item.Doctor}</Text>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            ) : null}
        </View>
    );
};

export default DoctorsComponent;

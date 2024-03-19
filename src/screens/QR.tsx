import React, { useEffect } from 'react';
import { StyleSheet, View, Button, ActivityIndicator, Dimensions, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';

const QR = () => {
    const device = useCameraDevice('back');
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            console.log(`Scanned ${codes.length} codes!`);
        }
    });
    const navigation = useNavigation();

    const goBackHome = () => {
        navigation.goBack();
    };

    if (device == null) {
        return <ActivityIndicator />;
    }

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                device={device}
                isActive={true}
                codeScanner={codeScanner}
            />
            <View style={styles.overlay}>
                <View style={styles.scanBox} />
            </View>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={goBackHome}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </Pressable>
            </View>
        </View>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        ...StyleSheet.absoluteFillObject
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanBox: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        opacity: 0.5,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 50,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default QR;

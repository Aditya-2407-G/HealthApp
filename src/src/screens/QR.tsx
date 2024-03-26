import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, ActivityIndicator, Dimensions, Pressable, Text, SafeAreaView, SafeAreaViewBase, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';

const QR = () => {
    const device = useCameraDevice('back');
    const navigation = useNavigation();

    const goBackHome = () => {
        navigation.goBack();
    };

    const [scanningEnabled, setScanningEnabled] = useState(true);

    const handleCodeScanned = (codes: any) => {
        if (scanningEnabled) {
            console.log(`Scanned ${codes.length} codes!`);
            // Disable scanning
            setScanningEnabled(false);

            // Display an alert when a QR code is scanned
            Alert.alert(
                'QR Code Scanned',
                `Scanned ${codes.length} codes!`,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            // Re-enable scanning after OK is pressed
                            setScanningEnabled(true);
                            console.log('OK Pressed');
                        },
                        style: 'cancel'
                    }
                ],
                { cancelable: false }
            );
        }
    };

    if (device == null) {
        return <ActivityIndicator />;
    }

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: handleCodeScanned
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.cameraContainer}>
                    <Camera
                        style={styles.camera}
                        device={device}
                        isActive={true}
                        codeScanner={codeScanner}
                    />
                    <View style={styles.overlay}>
                        <View style={styles.square} />
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button title='Go Back' onPress={goBackHome}/>
            </View>
        </SafeAreaView>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraContainer: {
        flex: 1,
        position: 'relative',
    },
    camera: {
        aspectRatio: width / height,
        width: width,
        height: height
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center'
    },
    square: {
        width: 200, 
        height: 200, 
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 5
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 2, // Ensure button stays on top
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

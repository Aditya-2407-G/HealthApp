import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Loading from '../components/Loading';
import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';
import { FirebaseContext } from '../firebase/FirebaseContext'; // Import FirebaseContext from your Firebase context file

export const Router = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { isLoggedIn } = useContext(FirebaseContext); // Destructure isLoggedIn from FirebaseContext

    useEffect(() => {
        setIsLoading(false); // Set isLoading to false once the component mounts
    }, []);

    // If still loading, display Loading component
    if (isLoading) {
        return <Loading />;
    }

    return (
        <NavigationContainer>
            {isLoggedIn ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({});

export default Router;

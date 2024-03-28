import { View, Text } from 'react-native';
import React, { FC, PropsWithChildren, createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

type FirebaseContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const FirebaseContext = createContext<FirebaseContextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => {}
});

export const FirebaseProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to check if a user is already logged in
    const checkIfLoggedIn = () => {
        const user = auth().currentUser;
        if (user) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    };

    // Check if user is logged in on mount
    useState(() => {
        checkIfLoggedIn();
    });

    // Listen for auth state changes
    auth().onAuthStateChanged(user => {
        if (user) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    });

    const defaultValue = {
        isLoggedIn,
        setIsLoggedIn
    };

    return (
        <FirebaseContext.Provider value={defaultValue}>
            {children}
        </FirebaseContext.Provider>
    );
};

export default FirebaseContext;

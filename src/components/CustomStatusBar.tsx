import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import FirebaseContext from '../firebase/FirebaseContext';
import Snackbar from 'react-native-snackbar';
import Icons from './Icons';
import Popover from 'react-native-popover-view';
import auth from '@react-native-firebase/auth'

type CustomStatusBarProps = {
  userName: string;
};

const user = auth().currentUser?.displayName;

const CustomStatusBar = ({ userName }: CustomStatusBarProps) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(FirebaseContext);
  const [isVisible, setIsVisible] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUserDisplayName(currentUser.displayName);
    }
  }, []);
  

  const handleLogout = () => {
    auth().signOut().then(() => {
        
        setIsLoggedIn(false);
        Snackbar.show({
          text: 'Logout Successful',
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .catch((error) => {
        console.error('Logout error:', error);
        Snackbar.show({
          text: 'Failed to logout',
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .finally(() => {
        setIsVisible(false);
      });
  };

  const togglePopover = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.userNameText}>Hello, {userDisplayName || 'User'}!</Text>
      </View>

      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={togglePopover}>
          <Icons name="dots-vertical" />
        </TouchableOpacity>
        <Popover
          isVisible={isVisible}
          onRequestClose={togglePopover}
          popoverStyle={styles.popover}
        >
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.menuItem}>Logout</Text>
          </TouchableOpacity>
        </Popover>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#0B0D32',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10
  },
  userNameText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight:5
  },
  popover: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    elevation: 4,

  },
  menuItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: '#000000',
  },
});

export default CustomStatusBar;

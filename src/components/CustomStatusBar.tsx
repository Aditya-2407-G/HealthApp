import React, { useContext, useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Pressable, Modal } from 'react-native';
import AppwriteContext from '../appwrite/AppwriteContext';
import Snackbar from 'react-native-snackbar';
import Icons from './Icons';
import Home from '../screens/Home';

type CustomStatusBarProps = {
  userName: string;
};

const CustomStatusBar = ({ userName }: CustomStatusBarProps) => {

  const { appwrite, setIsLoggedIn } = useContext(AppwriteContext)
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = () => {
    appwrite.logOut()
      .then(() => {
        setIsLoggedIn(false);
        Snackbar.show({
          text: 'Logout Successful',
          duration: Snackbar.LENGTH_SHORT
        })
      })
  }

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>

      <View style={styles.leftContainer}>
        <Text style={styles.userNameText}>Hello, {userName}!</Text>
      </View>

      <View style={styles.rightContainer}>

        <TouchableOpacity onPress={toggleMenu}>
          <Icons name="dots-vertical" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.modalBackground} onPress={() => setMenuVisible(false)}>
          <View style={styles.dropdownMenu}>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.menuText}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: '#0B0D32',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  dropdownMenu: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    margin: 20,
  },
  menuText: {
    fontSize: 16,
    color: '#000000',
  },
});
export default CustomStatusBar;
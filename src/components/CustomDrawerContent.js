import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import NavProfileHeader from './NavProfileHeader';
import { gStyle } from '../constants';

const CustomwerDrawerContent = () => {
  const userInfo = {
    img: 'user_avatar.jpg',
    name: 'Saif Abbas',
    rating: 4.5
  };

  const handleTripHistory = () => {
    // Handle Trip History navigation
  };

  const handleBecomeDriver = () => {
    // Handle Become Driver navigation
  };

  const handlePaymentMethod = () => {
    // Handle Payment Methods navigation
  };

  const handleAbout = () => {
    // Handle About navigation
  };

  const handleHelp = () => {
    // Handle Help navigation
  };

  const handleSignInOut = () => {
    // Handle Sign In/Out
  };

  const handleSettings = () => {
    // Handle Settings navigation
  };

  return (
    <View style={styles.container}>
      {/* User Info */}
      <View style={styles.userInfoContainer}>
        <Image
          source={require('../assets/icon.png')}
          style={styles.userImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userInfo.name}</Text>
          <Text style={styles.userRating}>Rating: {userInfo.rating}</Text>
        </View>
      </View>

      {/* Trip History */}
      <TouchableOpacity style={styles.menuItem} onPress={handleTripHistory}>
        <Text style={styles.menuItemText}>Trip History</Text>
      </TouchableOpacity>

      {/* Become Driver */}
      <TouchableOpacity style={styles.menuItem} onPress={handleBecomeDriver}>
        <Text style={styles.menuItemText}>Become Driver</Text>
      </TouchableOpacity>

      {/* PaymentMethod */}
      <TouchableOpacity style={styles.menuItem} onPress={handlePaymentMethod}>
        <Text style={styles.menuItemText}>Payment Methods</Text>
      </TouchableOpacity>

      {/* About */}
      <TouchableOpacity style={styles.menuItem} onPress={handleAbout}>
        <Text style={styles.menuItemText}>About</Text>
      </TouchableOpacity>

      {/* Help */}
      <TouchableOpacity style={styles.menuItem} onPress={handleHelp}>
        <Text style={styles.menuItemText}>Help</Text>
      </TouchableOpacity>

      {/* Sign In/Out */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bottomIcon} onPress={handleSignInOut}>
          <Text style={styles.bottomIconText}>🔒</Text>
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity style={styles.bottomIcon} onPress={handleSettings}>
          <Text style={styles.bottomIconText}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16
  },
  userInfo: {
    flex: 1
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
  },
  userRating: {
    fontSize: 14,
    color: '#888'
  },
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto'
  },
  bottomIcon: {
    padding: 16
  },
  bottomIconText: {
    fontSize: 20
  }
});

export default CustomwerDrawerContent;

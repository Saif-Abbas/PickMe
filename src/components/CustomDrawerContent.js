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
    <View style={gStyle.navContainer}>
      {/* User Info */}
      <View style={gStyle.userInfoContainer}>
        <Image
          source={require('../assets/icon.png')}
          style={gStyle.userImage}
        />
        <View style={gStyle.userInfo}>
          <Text style={gStyle.userName}>{userInfo.name}</Text>
          <Text style={gStyle.userRating}>Rating: {userInfo.rating}</Text>
        </View>
      </View>

      {/* Trip History */}
      <TouchableOpacity style={gStyle.menuItem} onPress={handleTripHistory}>
        <Text style={gStyle.menuItemText}>Trip History</Text>
      </TouchableOpacity>

      {/* Become Driver */}
      <TouchableOpacity style={gStyle.menuItem} onPress={handleBecomeDriver}>
        <Text style={gStyle.menuItemText}>Become Driver</Text>
      </TouchableOpacity>

      {/* PaymentMethod */}
      <TouchableOpacity style={gStyle.menuItem} onPress={handlePaymentMethod}>
        <Text style={gStyle.menuItemText}>Payment Methods</Text>
      </TouchableOpacity>

      {/* About */}
      <TouchableOpacity style={gStyle.menuItem} onPress={handleAbout}>
        <Text style={gStyle.menuItemText}>About</Text>
      </TouchableOpacity>

      {/* Help */}
      <TouchableOpacity style={gStyle.menuItem} onPress={handleHelp}>
        <Text style={gStyle.menuItemText}>Help</Text>
      </TouchableOpacity>

      {/* Sign In/Out */}
      <View style={gStyle.bottomContainer}>
        <TouchableOpacity style={gStyle.bottomIcon} onPress={handleSignInOut}>
          <Text style={gStyle.bottomIconText}>🔒</Text>
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity style={gStyle.bottomIcon} onPress={handleSettings}>
          <Text style={gStyle.bottomIconText}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomwerDrawerContent;

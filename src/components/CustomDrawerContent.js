import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import NavProfileHeader from './NavProfileHeader';
import { gStyle } from '../constants';
import { useNavigation } from '@react-navigation/native';

const CustomwerDrawerContent = () => {
  const navigation = useNavigation();

  const userInfo = {
    img: 'user_avatar.jpg',
    name: 'Saif Abbas',
    rating: 4.5
  };

  return (
    <View style={gStyle.navContainer}>
      {/* User Info */}
      <View style={gStyle.userInfoContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../assets/icon.png')}
            style={gStyle.userImage}
          />
        </TouchableOpacity>
        <View style={gStyle.userInfo}>
          <Text
            style={gStyle.userName}
            onPress={() => navigation.navigate('Profile')}
          >
            {userInfo.name}
          </Text>
          <Text style={gStyle.userRating}>Rating: {userInfo.rating}</Text>
        </View>
      </View>

      {/* Trip History */}
      <TouchableOpacity
        style={gStyle.menuItem}
        onPress={() => navigation.navigate('TripHistory')}
      >
        <Text style={gStyle.menuItemText}>Trip History</Text>
      </TouchableOpacity>

      {/* Become Driver */}
      <TouchableOpacity
        style={gStyle.menuItem}
        onPress={() => navigation.navigate('BecomeDriver')}
      >
        <Text style={gStyle.menuItemText}>Become Driver</Text>
      </TouchableOpacity>

      {/* PaymentMethods */}
      <TouchableOpacity
        style={gStyle.menuItem}
        onPress={() => navigation.navigate('PaymentMethods')}
      >
        <Text style={gStyle.menuItemText}>Payment Methods</Text>
      </TouchableOpacity>

      {/* About */}
      <TouchableOpacity
        style={gStyle.menuItem}
        onPress={() => navigation.navigate('About')}
      >
        <Text style={gStyle.menuItemText}>About</Text>
      </TouchableOpacity>

      {/* FAQ */}
      <TouchableOpacity
        style={gStyle.menuItem}
        onPress={() => navigation.navigate('FAQ')}
      >
        <Text style={gStyle.menuItemText}>FAQ</Text>
      </TouchableOpacity>

      {/* Sign In/Out */}
      <View style={gStyle.bottomContainer}>
        <TouchableOpacity
          style={gStyle.bottomIcon}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={gStyle.bottomIconText}>🔒</Text>
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity
          style={gStyle.bottomIcon}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={gStyle.bottomIconText}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomwerDrawerContent;

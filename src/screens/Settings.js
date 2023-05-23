import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ModalHeader from '../components/ModalHeader';
import { gStyle } from '../constants';

const Settings = () => {
  const handleLogout = () => {
    //// Implement your logout logic here
    // For demonstration purposes, let's navigate back to the login screen
    navigation.navigate('Login');
  };

  return (
    <View style={gStyle.container}>
      <ModalHeader text={'Settings'}/>
      <Text style={gStyle.settingHeader}>Settings</Text>
      <TouchableOpacity style={gStyle.settingButton} onPress={handleLogout}>
        <Text style={gStyle.settingButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
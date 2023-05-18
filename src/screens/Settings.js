import React from 'react';
import { View, Text } from 'react-native';
import ModalHeader from '../components/ModalHeader';
import { gStyle } from '../constants';

const Settings = () => {
  const test = '';
  return (
    <View style={gStyle.container}>
      <ModalHeader text={'Settings'}/>
      
    </View>
  );
};

export default Settings;
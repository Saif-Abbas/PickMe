import React from 'react';
import { View, Text } from 'react-native';
import ModalHeader from '../components/ModalHeader';
import { gStyle } from '../constants';

const About = () => {
  const test = '';
  return (
    <View style={gStyle.container}>
      <ModalHeader text={'About'}/>
      
    </View>
  );
};

export default About;
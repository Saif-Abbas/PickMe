import React from 'react';
import { View, Text } from 'react-native';
import ModalHeader from '../components/ModalHeader';
import { gStyle } from '../constants';

const PaymentMethods = () => {
  const test = '';
  return (
    <View style={gStyle.container}>
      <ModalHeader text={'Payment Methods'}/>
      
    </View>
  );
};

export default PaymentMethods;
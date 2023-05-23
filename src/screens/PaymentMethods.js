import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ModalHeader from '../components/ModalHeader';
import { gStyle } from '../constants';

const PaymentMethods = () => {
  const paymentMethods = [
    { id: 1, name: 'Credit Card' },
    { id: 2, name: 'Apple Pay' },
    { id: 3, name: 'Google Pay' },
    { id: 4, name: 'stc Pay' },
    { id: 5, name: 'PayPal' }
  ];
  const handlePaymentMethod = (id) => {
    console.log('Selected Payment Method: ', id);
  };

  return (
    <View style={gStyle.container}>
      <ModalHeader text="Payment Methods" />

      <View style={gStyle.paymentContainer}>
        <Text style={gStyle.paymentTitle}>Payment Methods</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={gStyle.paymentMethod}
            onPress={() => handlePaymentMethod(method.id)}
          >
            <Text>{method.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default PaymentMethods;

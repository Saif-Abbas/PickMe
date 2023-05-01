import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
// firebase
import ModalHeader from '../components/ModalHeader';
import { gStyle } from '../constants';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <View style={gStyle.container}>
      <ModalHeader text="Login" />

      <View style={gStyle.containerCenter}>
        {/* You may use your TextInputs here and use styling please :) not inside it after it baka ~ */}
        <TextInput
          style={gStyle.input}
          placeholder="Phone Number"
          placeholderTextColor="#000000"
          pattern="[0-9]{10}"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        {/* Conditional Rendering */}
        {phoneNumber.length === 10 && (
          /* Add Button here :) */
          /* TODO: Create your own button container */
          <Button
            title="Login"
            style={gStyle.button}
            onPress={() => Alert.alert('Login')}
          />
        )}
        {/* <TextInput
        style={gStyle.textInputs}
        placeholder="Email"
        placeholderTextColor="#000000"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
      />
      <TextInput
        style={gStyle.textInputs}
        placeholder="Password"
        placeholderTextColor="#000000"
      /> */}
      </View>
    </View>
  );
};
export default Login;

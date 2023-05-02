import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';
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
          <>
            <Button
              title="Login"
              style={gStyle.button}
              onPress={() => Alert.alert('Login')}
            />
          </>
        )}
        <TouchableOpacity>
          <Text style={gStyle.link}>Dont have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Login;

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { gStyle } from '../constants';
import ModalHeader from '../components/ModalHeader';

const Signup = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [nationalId, setNationalId] = useState('');

  return (
    <View style={gStyle.container}>
      <ModalHeader text="Sign Up" />
      <View style={gStyle.containerCenter}>
        <TextInput
          style={gStyle.input}
          placeholder="Phone Number"
          placeholderTextColor="#000000"
          pattern="[0-9]{10}"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <TextInput
          style={gStyle.input}
          placeholder="Name"
          placeholderTextColor="#000000"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={gStyle.input}
          placeholder="National ID"
          placeholderTextColor="#000000"
          pattern="[0-9]{10}"
          keyboardType="phone-pad"
          value={nationalId}
          onChangeText={(text) => setNationalId(text)}
        />
        {phoneNumber.length === 10 &&
          name.length > 0 &&
          nationalId.length > 0 && (
            <>
              <TouchableOpacity style={gStyle.button}>
                <Text style={gStyle.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </>
          )}
        <TouchableOpacity>
          <Text style={gStyle.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;

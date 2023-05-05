import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
// firebase
import ModalHeader from '../components/ModalHeader';
import { gStyle } from '../constants';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState();
  const [countryModalVisible, setCountryModalVisible] = useState();

  return (
    <View style={gStyle.container}>
      <ModalHeader text="Login" />

      <View style={gStyle.containerCenter}>
        <TouchableOpacity
          style={gStyle.country}
          onPress={() => setCountryModalVisible(true)}
        >
          <CountryPicker
            withFilter
            withFlag
            withAlphaFilter
            withCallingCode
            withCallingCodeButton
            withFlagButton
            countryCode={!selectedCountry ? 'SA' : selectedCountry.cca2}
            withEmoji
            onSelect={(country) => setSelectedCountry(country)}
          />
          <TextInput
            style={gStyle.input}
            placeholder="Phone Number"
            placeholderTextColor="#000000"
            pattern="[0-9]{10}"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </TouchableOpacity>
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

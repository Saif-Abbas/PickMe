import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import ModalHeader from '../components/ModalHeader';
import { gStyle } from '../constants';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState();
  const [countryModalVisible, setCountryModalVisible] = useState();
  const navigation = useNavigation();
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
            maxLength={9}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </TouchableOpacity>
        {/* Conditional Rendering */}
        {phoneNumber.length === 9 && (
          <>
            <Button
              title="Login"
              style={gStyle.button}
              onPress={() => Alert.alert('Login')}
            />
          </>
        )}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Signup');
          }}
        >
          <Text style={gStyle.link}>Dont have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Login;

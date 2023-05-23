import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { gStyle } from '../constants';
import ModalHeader from '../components/ModalHeader';
import CountryPicker from 'react-native-country-picker-modal';

const Signup = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState();
  const [countryModalVisible, setCountryModalVisible] = useState();
  const [name, setName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const navigation = useNavigation();

  return (
    <View style={gStyle.container}>
      <ModalHeader text="Sign Up" />
      <View style={gStyle.containerCenter}>
        {/* User Phone Number */}
        <View
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
            style={gStyle.phoneInput}
            placeholder="Phone Number"
            placeholderTextColor="#000000"
            maxLength={9}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>

        {/*User Name*/}
        <View style={gStyle.country}>
          <TextInput
            style={gStyle.nameInput}
            placeholder="Name"
            placeholderTextColor="#000000"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        {/* User National ID */}
        <View style={gStyle.country}>
          <TextInput
            style={gStyle.nationalIDInput}
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
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <Text style={gStyle.loginLink}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;

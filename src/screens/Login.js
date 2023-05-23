import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { useNavigation } from '@react-navigation/native';
import {
  auth,
  app,
  sendVerificationCode,
  loginWithCredentials,
  PhoneAuthProvider
} from '../services/firebase';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import ModalHeader from '../components/ModalHeader';
import { gStyle } from '../constants';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('SA');
  const [countryModalVisible, setCountryModalVisible] = useState();
  const [verificationId, setVerificationId] = useState();
  const [askedForVerification, setAskedForVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const recaptchaVerifier = useRef(null);
  const navigation = useNavigation();

  const handleVerification = useCallback(async () => {
    console.log(selectedCountry);
    const verId = await sendVerificationCode(
      `+${selectedCountry.callingCode[0]}${phoneNumber}`,
      recaptchaVerifier.current
    );
    setVerificationId(verId);
    setAskedForVerification(true);
    if (verificationId) {
      Alert.alert('Verification Code', 'Verification code has been sent');
    }
  }, [phoneNumber, selectedCountry]);

  const handleLogin = useCallback(async () => {
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await loginWithCredentials(credential, phoneNumber);
      navigation.navigate('Home');
    } catch (err) {
      Alert.alert(err.message);
    }
  }, [verificationCode, verificationId]);
  return (
    <View style={gStyle.container}>
      <ModalHeader text="Login" />

      <View style={gStyle.containerCenter}>
        <TouchableOpacity
          disabled={askedForVerification}
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
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={app.options}
            attemptInvisibleVerification
          />
        </TouchableOpacity>
        {askedForVerification && (
          <>
            <TextInput
              style={gStyle.phoneInput}
              placeholder="Verification Code"
              placeholderTextColor="#000000"
              keyboardType="phone-pad"
              maxLength={6}
              onChangeText={(text) => setVerificationCode(text)}
            />
          </>
        )}
        {/* Conditional Rendering */}
        {phoneNumber.length === 9 && !askedForVerification && (
          <>
            <TouchableOpacity
              onPress={() => handleVerification()}
              style={gStyle.loginButton}
            >
              <Text style={gStyle.loginButtonText}>Verify your phone</Text>
            </TouchableOpacity>
          </>
        )}
        {askedForVerification && verificationCode.length === 6 && (
          <>
            <TouchableOpacity
              onPress={() => handleLogin()}
              style={gStyle.loginButton}
            >
              <Text style={gStyle.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Signup');
          }}
        >
          <Text style={gStyle.loginLink}>Dont have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Login;

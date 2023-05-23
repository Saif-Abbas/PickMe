import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalHeader from '../components/ModalHeader';
import { gStyle } from '../constants';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [password, setPassword] = useState('');

  const handleChangeProfilePicture = () => {
    // Handle changing profile picture
  };

  const handleSave = () => {
    // Handle saving profile changes
  };

  const handleGoBack = () => {
    // Handle navigating back
  };

  return (
    <View style={gStyle.container}>
      <ModalHeader text="Profile" />

      <TouchableOpacity
        style={gStyle.profilePictureContainer}
        onPress={handleChangeProfilePicture}
      >
        <Image
          style={gStyle.imgUserProfile}
          source={require('../assets/icon.png')}
        />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <DateTimePicker
        value={birthday}
        mode="date"
        display="default"
        style={gStyle.profileDatePicker}
        onChange={(event, date) => setBirthday(date)}
        maximumDate={new Date()}
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  returnIcon: {
    position: 'absolute',
    top: 16,
    left: 16
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 24
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8
  },
  saveButton: {
    backgroundColor: '#00c',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center'
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default Profile;

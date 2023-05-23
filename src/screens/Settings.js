import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ModalHeader from '../components/ModalHeader';
import { gStyle } from '../constants';

const Settings = () => {
  const [searchText, setSearchText] = useState('');

  const handleButtonPress = (screenName) => {
    // Handle button press, e.g., navigate to another screen
    console.log(`Navigating to ${screenName} screen`);
  };
  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const handleSearch = () => {
    console.log('Search:', searchText);
    // Implement search functionality here
  };

  return (
    <View style={gStyle.container}>
      <ModalHeader text="Settings" />

      <View style={styles.container}>
        <View style={styles.searchArea}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchText}
            onChangeText={handleSearchTextChange}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Ionicons name="search-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress('Your Account')}
        >
          <Text style={styles.buttonText}>Your Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress('Security and Account Access')}
        >
          <Text style={styles.buttonText}>Security and Account Access</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress('Notifications')}
        >
          <Text style={styles.buttonText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress('Accessibility')}
        >
          <Text style={styles.buttonText}>Accessibility</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  searchArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12
  },
  searchButton: {
    marginLeft: 8,
    padding: 8
  },
  button: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default Settings;

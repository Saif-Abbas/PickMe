import * as React from 'react';
import { Text, View, Image, TextInput } from 'react-native';
import { gStyle } from '../constants';

// components
import ModalHeader from '../components/ModalHeader';

const Profile = () => {
  // TODO: Implement Back-end
  const test = '';
  return (
    <View style={gStyle.container}>
      <ModalHeader text="Profile" />

      <View style={gStyle.containerCenter}>
        <Text>{test} </Text>
        <Image style={gStyle.imgUser} source={require('../assets/icon.png')} />
        <View style={gStyle.flexCenter}>
          <View style={gStyle.flexRowNewLine}>
            <Text>Name</Text>
            <TextInput style={gStyle.input} placeholder="useless placeholder" />
          </View>
          <View style={gStyle.flexRowNewLine}>
            <Text>Email</Text>
            <TextInput
              style={gStyle.input}
              placeholder="useless placeholder"
              inputMode="email"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

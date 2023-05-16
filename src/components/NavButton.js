/* eslint-disable react/prop-types */
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { gStyle } from '../constants';

const NavButton = ({ name, style, action }) => (
  <View style={gStyle.navButton}>
    <TouchableOpacity onPress={action}>
      <Text style={style || gStyle.navText}>{name}</Text>
    </TouchableOpacity>
  </View>
);

export default NavButton;

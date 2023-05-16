import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { gStyle } from '../constants';

const NavProfileHeader = ({ img, action }) => {
  <View style={gStyle.navButton}>
    <TouchableOpacity onPress={action}>
      <Image source={img} style={gStyle.navProfileHeaderImage} />
    </TouchableOpacity>
  </View>;
};

export default NavProfileHeader;

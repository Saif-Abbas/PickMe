import * as React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { colors, device, fonts } from '../constants';
import NavButton from './NavButton';
import NavProfileHeader from './NavProfileHeader';

const CustomDrawerContent = () => (
  <View style={styles.container}>
    {/* Navigation here  */}
    {/* HEREeee YOU PUT AAAAA ANOTHER COMPONENT CALLED NAVPROFILEHEADER MAYBE */}
    {/* HERE PLEASE PUT A TERNARY EXPRESSION TO CHECK IF USER IS LOGGED IN OR NOT */}
    {/* IF USER IS LOGGED IN THEN SHOW THE PROFILE HEADER & THE BUTTONS */}
    {/* FOR EXAMPLE:  */}
    {/* {user ? <NavProfileHeader /> : <NavButton name="Login" action={() => Alert.alert('hi')} />} */}
    <NavProfileHeader
      img={require('../assets/icon.png')}
      action={() => Alert.alert('Profile Img')}
    />
    <NavButton name="Home" action={() => Alert.alert('hi')} />
    <NavButton name="Profile" action={() => Alert.alert('profile')} />
    <View style={styles.containerVersion}>
      <Text style={styles.versionText}>{`v${Constants.manifest.version}`}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  containerVersion: {
    bottom: device.iPhoneNotch ? 40 : 16,
    paddingHorizontal: 38,
    position: 'absolute',
    width: '100%'
  },
  versionText: {
    color: colors.grey,
    fontFamily: fonts.uberRegular,
    fontSize: 20,
    textAlign: 'right'
  }
});

export default CustomDrawerContent;

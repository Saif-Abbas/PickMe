import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import {Block} from '../components/';
import {useData, useTheme} from '../hooks';

const Home = () => {
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoords] = useState({lat: 0, lon: 0});

  const {isDark} = useData();
  const {colors} = useTheme();

  useEffect(() => {
    const getLocation = async () => {
      // get exisiting locaton permissions first
      const {status: existingStatus} =
        await Location.requestForegroundPermissionsAsync();
      let finalStatus = existingStatus;

      // ask again to grant locaton permissions (if not already allowed)
      if (existingStatus !== 'granted') {
        const {status} = await Location.requestForegroundPermissionsAsync();
        finalStatus = status;
      }

      // still not allowed to use location?
      if (finalStatus !== 'granted') {
        return;
      }

      const {coords} = await Location.getCurrentPositionAsync();

      setCoords({lat: coords.latitude, lon: coords.longitude});
      setShowMap(true);
    };

    getLocation().catch(console.error);
  }, []);

  return (
    <View>
      {showMap && (
        <MapView
          followsUserLocation
          region={{
            latitude: coordinates.lat,
            longitude: coordinates.lon,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation
          showsTraffic
          style={{height: '100%', width: '100%'}}
        />
      )}
      {!showMap && (
        <Block flex={0} center>
          <ActivityIndicator
            size="large"
            color={isDark ? colors.white : colors.black}
          />
        </Block>
      )}
    </View>
  );
};

export default Home;

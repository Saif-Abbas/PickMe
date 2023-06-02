import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, View } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Block, Button, Text } from "../components/";
import { useData, useTheme } from "../hooks";
import keys from "../../keys.json";

const Home = () => {
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoords] = useState({ lat: 0, lon: 0 });
  const [route, setRoute] = useState<any>(null);
  const mapView = useRef<MapView>(null);
  const { isDark, locationSelected, handleSelectedLocation, selectedLocation } =
    useData();
  const { colors, sizes, gradients } = useTheme();

  useEffect(() => {
    const getLocation = async () => {
      // get exisiting locaton permissions first
      const { status: existingStatus } =
        await Location.requestForegroundPermissionsAsync();
      let finalStatus = existingStatus;

      // ask again to grant locaton permissions (if not already allowed)
      if (existingStatus !== "granted") {
        const { status } = await Location.requestForegroundPermissionsAsync();
        finalStatus = status;
      }

      // still not allowed to use location?
      if (finalStatus !== "granted") {
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync();

      setCoords({ lat: coords.latitude, lon: coords.longitude });
      setShowMap(true);
    };

    getLocation().catch(console.error);
  }, []);

  return (
    <View>
      {showMap && (
        <MapView
          followsUserLocation
          initialRegion={{
            latitude: coordinates.lat,
            longitude: coordinates.lon,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation
          ref={mapView}
          showsTraffic
          mapType="hybrid"
          provider="google"
          camera={
            locationSelected
              ? {
                  center: {
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                  },
                  heading: 30,
                  pitch: 0,
                  zoom: 15,
                }
              : undefined
          }
          style={{ height: "100%", width: "100%" }}
          onLongPress={(e) => {
            const { latitude, longitude } = e.nativeEvent.coordinate;
            handleSelectedLocation(latitude, longitude);
          }}
        >
          {locationSelected && (
            <>
              <Marker coordinate={selectedLocation} />
              <MapViewDirections
                origin={{
                  latitude: coordinates.lat,
                  longitude: coordinates.lon,
                }}
                destination={selectedLocation}
                apikey={keys.GooglePlacesAPIKey}
                strokeWidth={5}
                strokeColor={colors.primary.toString()}
                timePrecision="now"
                onReady={(result) => {
                  console.log(`Distance: ${result.distance} km`);
                  console.log(`Duration: ${result.duration} min.`);
                  setRoute({
                    distance: result.distance,
                    duration: result.duration,
                  });
                }}
                onError={(errorMessage) => {
                  console.log("GOT AN ERROR");
                }}
              />
            </>
          )}
        </MapView>
      )}
      {route && (
        <Block
          white
          shadow
          radius={sizes.sm}
          style={{
            position: "absolute",
            bottom: sizes.sm,
            left: sizes.sm,
            right: sizes.sm,
            height: 90,
          }}
        >
          <Block flex={0}>
            <Text black bold center>
              Distance: {route.distance} km, Duration: {route.duration} min.
            </Text>
            <Text black>Estimated Price: {route.distance < 10}</Text>
            <Button top={10} gradient={gradients.primary}>
              <Text bold>START MATCHING</Text>
            </Button>
          </Block>
        </Block>
      )}
      {!showMap && (
        <Block flex={0} center>
          <ActivityIndicator
            size="large"
            color={isDark ? colors.white : colors.black}
            style={{ marginVertical: 350 }}
          />
        </Block>
      )}
    </View>
  );
};

export default Home;

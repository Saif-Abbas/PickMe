import React, { useState, useCallback, useEffect, useRef } from "react";
import { ActivityIndicator, View } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Alert, Block, Button, Text } from "../components/";
import { useData, useTheme, useTranslation } from "../hooks";
import { Ionicons } from "@expo/vector-icons";
import keys from "../../keys.json";
import { calculateDistance } from "../functions/mathematical";
import { get, ref, db } from "../services/firebase";
import { ITrip } from "../constants/types";

const Home = () => {
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoords] = useState({ lat: 0, lon: 0 });
  const [route, setRoute] = useState<any>(null);
  const { t, locale } = useTranslation();
  const [searched, setSearched] = useState(false);
  const [circle, setCircle] = useState(0);
  const mapView = useRef<MapView>(null);
  const {
    isDark,
    locationSelected,
    setLocationSelected,
    handleSelectedLocation,
    selectedLocation,
  } = useData();
  const { colors, sizes, gradients } = useTheme();
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  // Show the alert and close it after 5 seconds
  const showAlert = useCallback(
    (type: string, message: string) => {
      setAlert({ type, message });
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 5500);
    },
    [setAlert, setIsAlertVisible]
  );

  const handleTripSearch = useCallback(() => {
    setSearched(true);
    setCircle(500);
    get(ref(db, "trips")).then((snapshot) => {
      const trips = snapshot.val();
      const trip = trips.find((trip: ITrip) => {
        const distance = calculateDistance(
          coordinates.lat,
          coordinates.lon,
          trip.to.latitude,
          trip.to.longitude
        );
        console.log(distance);
        return distance <= 0.5;
      });
      if (trip) {
        showAlert("success", t("home.tripFound"));
        handleSelectedLocation(trip.latitude, trip.longitude);
        setCircle(0);
      } else {
        showAlert("danger", t("home.tripNotFound"));
        setCircle(0);
      }
    });
  }, []);

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
                  handleSelectedLocation(coordinates.lat, coordinates.lon);
                  showAlert("danger", "You can't go there!");
                  setLocationSelected(false);
                }}
              />
            </>
          )}
        </MapView>
      )}
      {route && (
        <Block
          white
          radius={sizes.sm}
          padding={sizes.sm}
          style={{
            position: "absolute",
            bottom: sizes.xxl,
            left: sizes.sm,
            right: sizes.sm,
            height: 190,
          }}
        >
          <Block flex={0} padding={sizes.sm}>
            <Block
              flex={0}
              // TODO: Implement RTL support for this
              justify="space-between"
              horizontal
            >
              {route && !searched ? (
                <>
                  <Text black bold>
                    <Ionicons
                      name="location"
                      size={sizes.sm * 1.2}
                      color={colors.secondary}
                    />{" "}
                    {t("home.distance", {
                      distance: Math.round(route.distance),
                    })}
                  </Text>
                  <Text black bold>
                    <Ionicons
                      name="time"
                      size={sizes.sm * 1.2}
                      color={colors.secondary}
                    />{" "}
                    {t("home.duration", {
                      duration: Math.round(route.duration),
                    })}
                  </Text>
                  <Text black bold>
                    <Ionicons
                      name="cash-outline"
                      size={sizes.sm * 1.2}
                      color={colors.secondary}
                    />{" "}
                    {t("home.price", {
                      price: Math.round(5 + route.distance * 0.5),
                    })}
                  </Text>
                </>
              ) : (
                <>
                  <ActivityIndicator
                    size="small"
                    color={isDark ? colors.white : colors.black}
                  />
                  <Text bold>{t("home.searching")}</Text>
                </>
              )}
            </Block>
            <Button
              top={10}
              vibrate={[300, 200, 100]}
              gradient={gradients.primary}
              onPress={() => {
                handleTripSearch();
              }}
            >
              <Text bold>{t("home.search")}</Text>
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
      {isAlertVisible && (
        <Alert
          type={alert.type}
          message={alert.message}
          isVisible={isAlertVisible}
        />
      )}
    </View>
  );
};

export default Home;

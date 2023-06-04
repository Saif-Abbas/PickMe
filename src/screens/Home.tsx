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
import { get, ref, db, update } from "../services/firebase";
import { ITrip } from "../constants/types";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoords] = useState({ lat: 0, lon: 0 });
  const [route, setRoute] = useState<any>(null);
  const { t, locale } = useTranslation();
  const [searched, setSearched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigation = useNavigation();
  const mapView = useRef<MapView>(null);
  const {
    isDark,
    locationSelected,
    setLocationSelected,
    handleSelectedLocation,
    selectedLocation,
    handleUserLocation,
    userLocation,
    setSelectedLocation,
    user,
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

  const handleTripSearch = useCallback(async () => {
    setSearched(true);
    console.log("searching for trip");
    console.log(locationSelected, selectedLocation);
    await Location.getCurrentPositionAsync().then(({ coords }) => {
      let found = false;
      if (locationSelected && selectedLocation) {
        get(ref(db, "trips")).then((snapshot) => {
          const trips = snapshot.val();
          const trip = trips.filter((trip: ITrip) => {
            const distance = calculateDistance(
              selectedLocation.latitude,
              selectedLocation.longitude,
              trip.to.latitude,
              trip.to.longitude
            );
            console.log(distance);
            switch (true) {
              case distance < 0.5:
                console.log("less than 0.5");
                found = true;
                return { ...trip, found };
              case distance < 1:
                console.log("less than 1");
                found = true;
                return { ...trip, found };
              case distance < 1.5:
                console.log("less than 1.5");
                found = true;
                return { ...trip, found };
              case distance < 100:
                console.log("less than 100");
                found = true;
                return { ...trip, found };
            }
            return distance <= 0.5;
          });
          if (found) {
            const dedicatedPrice = Math.round(5 + route.distance * 0.5);
            showAlert("success", t("home.tripFound"));
            setSearched(false);
            navigation.navigate("Trips", {
              trip,
              dedicatedPrice: dedicatedPrice,
            });
          } else {
            showAlert("danger", t("home.tripNotFound"));
            setSearched(false);
          }
        });
      }
    });
  }, [selectedLocation, locationSelected, route]);

  const handleTripSubmit = useCallback(async () => {
    setSearched(true);
    console.log("submitting trip");
    await Location.getCurrentPositionAsync().then(({ coords }) => {
      update(ref(db, "trips"), {
        availability: "available",
        date: new Date().toLocaleString(),
        id: Math.floor(Math.random() * 100000),
        status: "pending",
        from: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        to: {
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
        },
        user: user,
      });
      setSubmitted(true);
      setSearched(false);
      showAlert("success", t("home.tripSubmitted"));
    });
  }, [selectedLocation, userLocation, user]);

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

      const currentLocation = await Location.getLastKnownPositionAsync();

      if (!currentLocation) {
        return;
      }

      setCoords({
        lat: currentLocation?.coords.latitude,
        lon: currentLocation?.coords.longitude,
      });
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
                  heading: 0,
                  pitch: 0,
                  zoom: locationSelected ? 10 : 15,
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
              <Marker
                pinColor={colors.primary.toString()}
                coordinate={selectedLocation}
              />
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
          radius={sizes.sm}
          padding={sizes.sm}
          style={{
            position: "absolute",
            bottom: sizes.xxl,
            left: sizes.sm,
            right: sizes.sm,
            height: user && user.data.type === "Driver" ? 270 : "auto",
            backgroundColor: isDark ? colors.black : colors.white,
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
                  <Text bold>
                    <Ionicons
                      name="location"
                      size={sizes.sm * 1.2}
                      color={colors.secondary}
                    />{" "}
                    {t("home.distance", {
                      distance: Math.round(route.distance),
                    })}
                  </Text>
                  <Text bold>
                    <Ionicons
                      name="time"
                      size={sizes.sm * 1.2}
                      color={colors.secondary}
                    />{" "}
                    {t("home.duration", {
                      duration: Math.round(route.duration),
                    })}
                  </Text>
                  <Text bold>
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
            {!searched && (
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
            )}
            {!searched && user && user.data.type === "Driver" && (
              <Button
                top={20}
                vibrate={[300, 200, 100]}
                gradient={gradients.secondary}
                onPress={() => {
                  handleTripSubmit();
                }}
              >
                <Text bold>{t("home.searchForPassengers")}</Text>
              </Button>
            )}
            {!searched && submitted && (
              <>
                <ActivityIndicator
                  size="small"
                  color={isDark ? colors.white : colors.black}
                />
                <Text>{t("home.waitingForPassengers")}</Text>
                <Button
                  top={10}
                  vibrate={[300, 200, 100]}
                  gradient={gradients.primary}
                  onPress={() => {
                    //TODO: CANCEL TRIP
                  }}
                >
                  <Text bold>{t("home.cancel")}</Text>
                </Button>
              </>
            )}
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

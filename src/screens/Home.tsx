import React, { useState, useCallback, useEffect, useRef } from "react";
import { ActivityIndicator, View } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Alert, Block, Button, Text, TripCard } from "../components/";
import { useData, useTheme, useTranslation } from "../hooks";
import { Ionicons } from "@expo/vector-icons";
import keys from "../../keys.json";
import { calculateDistance } from "../functions/mathematical";
import { get, ref, db, update, onChildChanged } from "../services/firebase";
import { ITrip } from "../constants/types";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoords] = useState({ lat: 0, lon: 0 });
  const [route, setRoute] = useState<any>(null);
  const { t, locale } = useTranslation();
  const [searched, setSearched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [trips, setTrips] = useState<ITrip[]>([]);
  const [myTrip, setMyTrip] = useState<any>(null);
  const [matchedTrip, setMatchedTrip] = useState<ITrip | any>(null);
  const [foundMatch, setFoundMatch] = useState(false);
  const navigation = useNavigation();
  const [zoom, setZoom] = useState(15);
  const [id, setId] = useState(Math.floor(Math.random() * 100000));
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
    let found = false;
    if (locationSelected && selectedLocation) {
      // && user.data.type === "user")
      await get(ref(db, "trips")).then(async (snapshot) => {
        console.log(snapshot.val());
        const allTrips = snapshot.val();
        await Location.getCurrentPositionAsync().then((userLocation) => {
          const trip = Object.entries(allTrips).filter(([key, trip]: any) => {
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
              case distance < 2:
                console.log("less than 2");
                found = true;
                return { ...trip, found };
            }
            return distance <= 0.5;
          });
          if (found) {
            const dedicatedPrice = Math.round(5 + route.distance * 0.5);
            showAlert("success", t("home.tripFound"));
            console.log(trip);
            setFoundMatch(true);
            trip.forEach((t: any) => {
              console.log(user);
              console.log(`trips/${t[1].id}/requests/${user.auth.uid}`);
              update(ref(db, `trips/${t[1].id}/requests/${user.auth.uid}`), {
                id: user.auth.uid,
                name: user.data.name,
                avatar: user.data.avatar,
                from: {
                  latitude: userLocation.coords.latitude,
                  longitude: userLocation.coords.longitude,
                },
                to: {
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                },
                status: "pending",
              });
            });
          } else {
            showAlert("danger", t("home.tripNotFound"));
            setSearched(false);
          }
        });
      });
    }
  }, [user, selectedLocation, locationSelected, route]);

  const updateMyTrip = useCallback(async () => {
    console.log("updating my trip");
    await get(ref(db, `trips/${id}`)).then((snapshot) => {
      console.log(snapshot.val());
      setMyTrip(snapshot.val());
    });
  }, []);

  const dataChanged = onChildChanged(ref(db, "trips"), (snapshot) => {
    console.log("data changed");
    if (snapshot.val()) {
      // push new trip to trips array
      searched ? handleTripSearch() : updateMyTrip();
    }
  });

  useEffect(() => {
    dataChanged();
  }, []);

  const handleTripSubmit = useCallback(async () => {
    console.log("submitting trip");
    await Location.getCurrentPositionAsync().then(async ({ coords }) => {
      console.log(
        id,
        user.data,
        coords.latitude,
        coords.longitude,
        selectedLocation.latitude,
        selectedLocation.longitude
      );
      await update(ref(db, `trips/${id}`), {
        availability: "available",
        date: new Date(),
        id: id,
        status: "pending",
        from: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        to: {
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
        },
        user: user.data,
      });
      setMyTrip({
        availability: "available",
        date: new Date(),
        id: id,
        status: "pending",
        from: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        to: {
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
        },
        user: user.data,
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
                  zoom: zoom,
                }
              : undefined
          }
          style={{ height: "100%", width: "100%" }}
          onLongPress={(e) => {
            const { latitude, longitude } = e.nativeEvent.coordinate;
            handleSelectedLocation(latitude, longitude);
            setZoom(10);
          }}
        >
          {locationSelected && (
            <>
              <Marker
                pinColor={colors.primary.toString()}
                coordinate={locationSelected ? selectedLocation : undefined}
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
              {route && !searched && !submitted ? (
                <>
                  <Button
                    style={{
                      top: -40,
                      right: -20,
                      bottom: 40,
                      left: "auto",
                      position: "absolute",
                    }}
                    onPress={() => {
                      console.log("pressed");
                      setLocationSelected(false);
                      setRoute(null);
                      setZoom(15);
                    }}
                  >
                    <Ionicons
                      name={"close-outline"}
                      size={24}
                      color={isDark ? colors.white : colors.black}
                    />
                  </Button>
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
                searched && (
                  <>
                    <ActivityIndicator
                      size="small"
                      color={isDark ? colors.white : colors.black}
                    />
                    {foundMatch ? (
                      <Text bold>{t("home.foundMatch")}</Text>
                    ) : (
                      <Text bold>{t("home.searching")}</Text>
                    )}
                  </>
                )
              )}
            </Block>
            {!searched && !submitted && (
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
            {!searched && user && user.data.type === "Driver" && !submitted && (
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
                <Text>
                  {matchedTrip
                    ? t("home.gotAMatch")
                    : t("home.waitingForPassengers")}
                </Text>
                {myTrip &&
                  myTrip.requests &&
                  Object.entries(myTrip.requests).map((requester: any) => (
                    <TripCard key={`request-${requester}`} trip={requester} />
                  ))}
                <Button
                  top={100}
                  vibrate={[300, 200, 100]}
                  danger
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

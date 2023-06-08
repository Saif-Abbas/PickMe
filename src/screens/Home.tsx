import React, { useState, useCallback, useEffect, useRef } from "react";
import { ActivityIndicator, View } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Alert, Block, Button, Card, Text, TripCard } from "../components/";
import { useData, useTheme, useTranslation } from "../hooks";
import { Ionicons } from "@expo/vector-icons";
import keys from "../../keys.json";
import { calculateDistance } from "../functions/mathematical";
import {
  get,
  ref,
  db,
  update,
  onChildChanged,
  remove,
} from "../services/firebase";
import { ITrip } from "../constants/types";
import { useNavigation } from "@react-navigation/native";
import { DataSnapshot, onChildRemoved } from "firebase/database";
import UserTripCard from "../components/UserTripCard";

const Home = () => {
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoords] = useState({ lat: 0, lon: 0 });
  const [route, setRoute] = useState<any>(null);
  const { t, locale } = useTranslation();
  const [searched, setSearched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [trips, setTrips] = useState<ITrip[]>([]);
  const [myTrip, setMyTrip] = useState<any>(null);
  const [matchedTrips, setMatchedTrips] = useState<ITrip | any>(null);
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
  const [timer, setTimer] = useState(10);
  const [tripAccepted, setTripAccepted] = useState(false);
  const [userAccepted, setUserAccepted] = useState(false);
  const [assignedTrip, setAssignedTrip] = useState<any>(null);

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

  // Function to handle trip acceptance
  const handleTripAccepted = () => {
    setTripAccepted(true);
  };

  const handleTripStart = () => {
    navigation.navigate("Trips", { trip: myTrip });
  };

  useEffect(() => {
    // Use the tripAccepted state here or perform any other logic
    console.log("Trip accepted state:", tripAccepted);
  }, [tripAccepted]);

  // Function to handle user acceptance from the passengers object in database
  const handleUserAccepted = useCallback(() => {
    get(ref(db, `trips/${id}/passengers/${user.data.id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setUserAccepted(true);
      }
    });
  }, [user]);

  const handleTripSearch = useCallback(async () => {
    if (!user) return navigation.navigate("Login");
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
              setId(t[1].id);
              update(ref(db, `trips/${t[1].id}/requests/${user.auth.uid}`), {
                id: user.auth.uid,
                name: user.data.name,
                avatar: user.data.avatar,
                phone: user.data.phone,
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
              if (!userAccepted) {
                // If there's no response after 10 seconds drop the request
                setTimeout(() => {
                  remove(ref(db, `trips/${t[1].id}/requests/${user.auth.uid}`));
                  setFoundMatch(false);
                }, 10000);

                setTimeout(() => {
                  setSearched(false);
                }, 12000);
              }
            });
          } else {
            showAlert("danger", t("home.tripNotFound"));
            setSearched(false);
          }
        });
      });
    }
  }, [user, selectedLocation, locationSelected, route]);

  // Timer to start if a match is found and the user doesn't respond
  useEffect(() => {
    if (foundMatch) {
      const interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [foundMatch]);

  const updateMyTrip = useCallback(async () => {
    console.log("updating my trip");
    await get(ref(db, `trips/${id}`)).then((snapshot) => {
      console.log(snapshot.val());
      setMyTrip(snapshot.val());
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onChildRemoved(
      ref(db, `trips/${id}/requests`),
      (data) => {
        if (user && user.auth) {
          get(ref(db, `trips/${id}/passengers/${user.auth.uid}`)).then(
            (snapshot) => {
              if (snapshot.exists()) {
                setUserAccepted(true);
                get(ref(db, `trips/${id}`)).then((snapshot) => {
                  setAssignedTrip(snapshot.val());
                });
              }
            }
          );
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [foundMatch]);

  const handleChildChange = (snapshot: DataSnapshot) => {
    console.log("data changed");
    if (snapshot.val()) {
      if (searched) {
        handleTripSearch();
      } else {
        updateMyTrip();
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onChildChanged(ref(db, "trips"), handleChildChange);
    return () => {
      unsubscribe();
    };
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

  const handleTripCancel = useCallback(async () => {
    console.log("cancelling trip");
    await remove(ref(db, `trips/${id}`));
    setSubmitted(false);
    setSearched(false);
    setLocationSelected(false);
    setMyTrip(null);
    setAssignedTrip(null);
    setSelectedLocation(null);
    setFoundMatch(false);
    showAlert("success", t("home.tripCancelled"));
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
          {userAccepted && assignedTrip && (
            <Marker
              pinColor={colors.black.toString()}
              coordinate={assignedTrip.from}
            />
          )}
          {tripAccepted &&
            myTrip &&
            myTrip.passengers &&
            Object.entries(myTrip.passengers).map(([key, value]: any) => (
              <Marker
                key={key}
                pinColor={colors.black.toString()}
                coordinate={value.from}
              />
            ))}
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
            height:
              user && user.data.type === "Driver" && submitted
                ? 350
                : user && user.data.type === "Driver"
                ? 250
                : "auto",
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
              {route && !searched && !submitted && !tripAccepted ? (
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
                    {foundMatch && !userAccepted ? (
                      <Text bold>{t("home.foundMatch")}</Text>
                    ) : userAccepted && assignedTrip ? (
                      <UserTripCard
                        trip={assignedTrip}
                        reference={id}
                        avatar={assignedTrip.user.avatar}
                        name={assignedTrip.user.name}
                      />
                    ) : (
                      <Text bold>{t("home.searching")}</Text>
                    )}
                    {tripAccepted && <Text bold>{t("home.tripAccepted")}</Text>}
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
            {submitted && (
              <>
                <ActivityIndicator
                  size="small"
                  color={isDark ? colors.white : colors.black}
                />
                <Text>
                  {matchedTrips
                    ? t("home.gotAMatch")
                    : t("home.waitingForPassengers")}
                </Text>
                {myTrip &&
                  myTrip.requests &&
                  Object.entries(myTrip.requests).map(([key, value]: any) => (
                    <TripCard
                      key={`request-${key}`}
                      trip={[key, value]}
                      reference={id}
                      avatar={user.data.avatar}
                      name={user.data.name}
                      id={user.auth.uid}
                      onTripAccepted={handleTripAccepted}
                    />
                  ))}
                <Button
                  top={100}
                  vibrate={[300, 200, 100]}
                  color={tripAccepted ? colors.success : colors.danger}
                  onPress={() => {
                    tripAccepted ? handleTripStart() : handleTripCancel();
                  }}
                >
                  <Text bold>
                    {tripAccepted ? t("home.start") : t("home.cancel")}
                  </Text>
                </Button>
                <Button
                  top={100}
                  vibrate={[300, 200, 100]}
                  secondary
                  onPress={() => {
                    handleTripCancel();
                  }}
                >
                  <Text bold>{t("home.end")}</Text>
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

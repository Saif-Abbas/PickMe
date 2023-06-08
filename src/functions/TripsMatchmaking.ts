import {
  ref,
  get,
  update,
  db,
  onChildChanged,
  off,
} from "../services/firebase";
import * as Location from "expo-location";
import { calculateDistance } from "./mathematical";
import { IUser } from "../constants/types";

export const startTripMatchmaking = (
  user: IUser,
  onMatchedTrips: (trips: any[]) => void
) => {
  console.log("Starting trip matchmaking...");
  const userTripsRef = ref(db, `usersTrips/${user.uid}`);
  const driverTripsRef = ref(db, "trips");

  const handleUserTripChange = async (snapshot: any) => {
    const userTripData = snapshot.val();
    console.log(userTripData);

    if (!userTripData) {
      return;
    }

    const { to } = userTripData;

    // Find matching trips for the user
    const tripsSnapshot = await get(ref(db, "trips"));
    const trips = tripsSnapshot.val();
    console.log(trips);

    const matchingTrips = Object.entries(trips).filter(([_, trip]: any) => {
      console.log("Trip:", trip);
      const distance = calculateDistance(
        to.latitude,
        to.longitude,
        trip.to.latitude,
        trip.to.longitude
      );

      // NOTE: IT WILL SHOW ALL THE TRIPS WITHIN 2 KM RADIUS
      return distance < 2;
    });

    if (matchingTrips.length > 0) {
      // Show the user data to the driver
      const driverTripIds = matchingTrips.map(([key, _]: any) => key);
      console.log("Driver trips:", driverTripIds);

      // Pass the matching trips data to the callback function in Home component
      onMatchedTrips(matchingTrips);
    }
  };

  const handleDriverTripChange = async (snapshot: any) => {
    const driverTripData = snapshot.val();

    if (!driverTripData) {
      return;
    }

    const { passengers } = driverTripData;

    if (passengers && passengers.length > 0) {
      // Passengers found for the driver's trip
      const acceptedPassenger = passengers[0];

      // Show the driver's trip to the passenger
      console.log("Accepted passenger trip:", acceptedPassenger);

      // Perform necessary operations with the accepted passenger's data

      // Clean up the matchmaking process for the driver after finding a match
      cleanupMatchmaking();
    }
  };

  const userTripChangeListener = onChildChanged(
    userTripsRef,
    handleUserTripChange
  );

  const driverTripChangeListener = onChildChanged(
    driverTripsRef,
    handleDriverTripChange
  );

  // Cleanup the listeners when no longer needed
  const cleanupMatchmaking = () => {
    off(userTripsRef, "child_changed", userTripChangeListener);
    off(driverTripsRef, "child_changed", driverTripChangeListener);
  };

  return cleanupMatchmaking;
};

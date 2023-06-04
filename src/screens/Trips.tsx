import React, { useState, useEffect, useLayoutEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useTheme, useTranslation } from "../hooks/";
import { Block, Text, TripCard, Button, Image } from "../components/";
import { ITrip } from "../constants/types";
import { useNavigation } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/stack";

// ...

const Trips = ({ route }: { route: any }) => {
  const { t } = useTranslation();
  const { sizes, assets, colors } = useTheme();
  const { trip, dedicatedPrice } = route.params;
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [toArrayTrips, setToArrayTrips] = useState<ITrip[]>([]);

  const headerHeight = useHeaderHeight();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Image
          radius={0}
          resizeMode="cover"
          width={sizes.width}
          height={headerHeight}
          source={assets.header}
        />
      ),
    });
  }, [assets.header, navigation, sizes.width, headerHeight]);

  useEffect(() => {
    // Change trips from object to array
    const toArray = () => {
      const tripsArray = [];
      console.log(trip);
      for (const key in trip) {
        tripsArray.push(trip[key]);
      }
      console.log("tripsArray", tripsArray);
      setToArrayTrips(tripsArray);
      setLoading(false);
    };
    toArray();
  }, []);

  return (
    <Block safe>
      <Block paddingHorizontal={sizes.s}>
        <Block scroll marginTop={sizes.sm} paddingVertical={10}>
          <Block justify="space-between">
            {loading ? (
              <ActivityIndicator />
            ) : (
              toArrayTrips.map((trip: ITrip) => (
                <TripCard key={`trip-${trip.id}`} trip={trip} />
              ))
            )}
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Trips;

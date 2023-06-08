import React, { useState, useEffect, useLayoutEffect } from "react";
import { ActivityIndicator, Linking, TouchableOpacity } from "react-native";
import { useTheme, useTranslation } from "../hooks/";
import { Block, Text, TripCard, Button, Image } from "../components/";
import { ITrip } from "../constants/types";
import { useNavigation } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
// ...

const Trips = ({ route }: { route: any }) => {
  const { t } = useTranslation();
  const { sizes, assets, colors, gradients } = useTheme();
  const { trip } = route.params;
  const navigation = useNavigation();

  const headerHeight = useHeaderHeight();

  useEffect(() => {
    console.log(trip), [];
  });

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

  return (
    <Block safe>
      <Block>
        <Block scroll marginTop={sizes.sm} paddingVertical={6}>
          <Block justify="space-between">
            {trip &&
              trip.passengers &&
              Object.entries(trip.passengers).map((passenger: any) => (
                <Block key={passenger} card row paddingBottom={40}>
                  <TouchableOpacity
                    onPress={() => {
                      // TODO: Nothing rn
                    }}
                  >
                    <Image
                      source={{ uri: passenger[1].avatar }}
                      style={{
                        width: sizes.xxl,
                        height: sizes.xxl,
                        borderRadius: sizes.s,
                        marginLeft: sizes.s,
                      }}
                    />
                  </TouchableOpacity>
                  <Text
                    p
                    style={{
                      position: "absolute",
                      top: sizes.s,
                      left: sizes.xxl * 1.5,
                      marginTop: sizes.s,
                    }}
                  >
                    {passenger[1].name}
                  </Text>
                  <Block row justify="flex-end" marginHorizontal={5} top={7}>
                    <Button
                      gradient={gradients.primary}
                      onPress={() => {
                        Linking.openURL(`tel:${passenger[1].phone}`);
                      }}
                      paddingHorizontal={5}
                    >
                      <Ionicons
                        size={24}
                        name="phone-portrait-outline"
                        color={colors.white}
                      />
                    </Button>
                    <Button
                      gradient={gradients.primary}
                      onPress={() => {
                        Linking.openURL(
                          `https://maps.google.com/?q=${passenger[1].from.latitude},${passenger[1].from.longitude}`
                        );
                      }}
                    >
                      <Ionicons
                        size={24}
                        name="location-outline"
                        color={colors.white}
                      />
                    </Button>
                  </Block>
                </Block>
              ))}
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Trips;

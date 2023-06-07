import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { useTheme, useTranslation } from "../hooks";
import Block from "../components/Block";
import Text from "../components/Text";
import Button from "../components/Button";
import Image from "../components/Image";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { remove } from "../services/firebase";

const TripCard = (trip: any) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { sizes, gradients, colors } = useTheme();

  // TODO: SetTimeOut to remove the user from the trip from database
  return (
    <Block>
      <Block>
        <Block card row paddingBottom={75}>
          <TouchableOpacity
            onPress={() => {
              // TODO: Navigate to user profile
              console.log(trip.trip[0]);
            }}
          >
            <Image
              source={{ uri: trip.trip[1].avatar }}
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
            {trip.trip[1].name}
          </Text>
          <Block row justify="flex-end" top={7}>
            <Button success>
              <Ionicons
                size={24}
                name="checkmark-outline"
                color={colors.white}
              />
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default TripCard;

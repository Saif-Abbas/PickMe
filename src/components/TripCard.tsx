import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { useTheme, useTranslation } from "../hooks";
import Block from "../components/Block";
import Text from "../components/Text";
import Button from "../components/Button";
import Image from "../components/Image";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db, ref, remove, update } from "../services/firebase";

const TripCard = ({
  trip,
  reference,
  avatar,
  name,
  id,
  onTripAccepted,
}: any) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { sizes, gradients, colors } = useTheme();

  return (
    <Block>
      <Block>
        <Block card row paddingBottom={75}>
          <TouchableOpacity
            onPress={() => {
              // TODO: Navigate to user profile
              console.log(reference);
            }}
          >
            <Image
              source={{ uri: trip[1].avatar }}
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
            {trip[1].name}
          </Text>
          <Block row justify="flex-end" top={7}>
            <Button
              success
              onPress={() => {
                // Adding user to passengers
                update(ref(db, `trips/${reference}/passengers`), {
                  [trip[0]]: trip[1],
                });
                // Removing user from requests
                remove(ref(db, `trips/${reference}/requests/${trip[0]}`));
                // Adding trip to user's trips
                update(ref(db, `users/${trip[0]}/trips`), {
                  [reference]: {
                    avatar: avatar,
                    name: name,
                    id: id,
                    from: trip[1].from,
                    to: trip[1].to,
                  },
                });
                // Return a value to Home that user accepted the trip
                onTripAccepted();
                console.log("Trip accepted");
              }}
            >
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

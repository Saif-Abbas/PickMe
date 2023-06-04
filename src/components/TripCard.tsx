import React, { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/core";

import { useTheme, useTranslation } from "../hooks";
import Block from "../components/Block";
import Text from "../components/Text";
import Button from "../components/Button";
import Image from "../components/Image";
import { TouchableOpacity } from "react-native";

const TripCard = (trip: any) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { sizes, gradients } = useTheme();

  return (
    <Block>
      <Block style={{ paddingBottom: 15 }}>
        <Block card row paddingBottom={15}>
          <TouchableOpacity
            onPress={() => {
              // TODO: Navigate to user profile
            }}
          >
            <Image
              source={{ uri: trip.trip.user.avatar }}
              style={{
                width: sizes.xxl,
                height: sizes.xxl,
                borderRadius: sizes.s,
                marginLeft: sizes.s,
              }}
            />
          </TouchableOpacity>
          <Block marginLeft={sizes.s}>
            <Text p semibold>
              {trip.trip.user.name}
            </Text>
          </Block>
          <Button gradient={gradients.primary} style={{ width: "50%" }}>
            <Text white center>
              {t("trip.sendRequest")}
            </Text>
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

export default TripCard;

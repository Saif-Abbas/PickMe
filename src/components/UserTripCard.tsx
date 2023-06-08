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

const UserTripCard = ({ trip, reference, avatar, name }: any) => {
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
              source={{ uri: avatar }}
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
            {name}
          </Text>
        </Block>
      </Block>
    </Block>
  );
};

export default UserTripCard;

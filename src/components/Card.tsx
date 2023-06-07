import React from "react";
import Block from "./Block";
import { Ionicons } from "@expo/vector-icons";
import Text from "./Text";
import Image from "./Image";
import { useData, useTheme } from "../hooks";
import { TouchableWithoutFeedback } from "react-native";

const Card = ({ card }: any) => {
  const { sizes, colors, assets } = useTheme();
  const { isDark } = useData();
  return (
    <TouchableWithoutFeedback>
      <Block
        card
        color={isDark ? colors.dark : colors.gray}
        padding={0}
        marginTop={sizes.sm}
        height={200}
      >
        <Image
          background
          resizeMode="cover"
          radius={sizes.cardRadius}
          height={200}
          source={
            card.cardNumber.startsWith("4") ? assets.visa : assets.mastercard
          }
        >
          <Block color={colors.overlay} padding={sizes.padding}>
            <Text
              h5
              white
              marginTop={sizes.xxl * 1.9}
              marginBottom={sizes.sm / 2}
            >
              {card.cardNumber}
            </Text>
            <Text p left={200} top={150} white position="absolute">
              {card.cardExpiryDate}
            </Text>
            <Text h5 white>
              {card.cardHolderName}
            </Text>
          </Block>
        </Image>
      </Block>
    </TouchableWithoutFeedback>
  );
};

export default Card;

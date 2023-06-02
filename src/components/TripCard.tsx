import React, { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/core";

import { useTheme, useTranslation } from "../hooks";
import { Block, Image, Text, MiniTag } from ".";
import { TouchableOpacity } from "react-native";
import { IHistory } from "../constants/types";

const TripCard = (history: IHistory) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { assets, colors, sizes } = useTheme();

  return (
    <Block marginTop={sizes.s}>
      <Block
        key={`talented-${history.name}`}
        card
        flex={0}
        marginBottom={sizes.sm}
        width={
          ((sizes.width - sizes.padding * 2 - sizes.sm) / 2) * 2 + sizes.sm
        }
      >
        <Image
          source={{ uri: history.avatar }}
          style={{
            width: sizes.xxl,
            height: sizes.xxl,
            borderRadius: sizes.s,
            marginLeft: sizes.s,
          }}
        />
        <Block marginLeft={sizes.s}>
          <Text p semibold>
            {history.name}
          </Text>
          <Text p gray>
            Price: 50 per hour
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("UserProfile", { user: history });
            }}
          >
            <Block row flex={0} align="center">
              <Text
                p
                color={colors.link}
                semibold
                size={sizes.linkSize}
                marginRight={sizes.s}
              >
                {t("common.readMore")}
              </Text>
              <Image source={assets.arrow} color={colors.link} />
            </Block>
          </TouchableOpacity>
        </Block>
      </Block>
    </Block>
  );
};

export default TripCard;

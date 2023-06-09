import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  StackHeaderTitleProps,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/core";
import { DrawerActions } from "@react-navigation/native";
import { StackHeaderOptions } from "@react-navigation/stack/lib/typescript/src/types";

import { useData } from "./useData";
import { useTranslation } from "./useTranslation";

import Image from "../components/Image";
import Text from "../components/Text";
import useTheme from "../hooks/useTheme";
import Button from "../components/Button";
import Block from "../components/Block";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import keys from "../../keys.json";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
export default () => {
  const { t, locale } = useTranslation();
  const { user, isDark, handleSelectedLocation } = useData();
  const navigation = useNavigation();
  const { icons, colors, gradients, sizes } = useTheme();

  const menu = {
    headerStyle: { elevation: 0 },
    headerTitleAlign: "left",
    headerTitleContainerStyle: { marginLeft: -sizes.sm },
    headerLeftContainerStyle: { paddingLeft: sizes.s },
    headerRightContainerStyle: { paddingRight: sizes.s },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitle: ({ children }: StackHeaderTitleProps) => (
      <Text p>{children}</Text>
    ),
    headerLeft: () => (
      <Button onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Image source={icons.menu} radius={0} color={colors.icon} />
      </Button>
    ),
    headerRight: () => (
      <Block row flex={0} align="center" marginRight={sizes.padding}>
        <TouchableOpacity
          style={{ marginRight: sizes.xs }}
          onPress={() => navigation.navigate("Screens", {})}
        >
          <Image source={icons.bell} radius={0} color={colors.icon} />
          <Block
            flex={0}
            right={0}
            width={sizes.s}
            height={sizes.s}
            radius={sizes.xs}
            position="absolute"
            gradient={gradients?.primary}
          />
        </TouchableOpacity>
      </Block>
    ),
  } as StackHeaderOptions;

  const options = {
    stack: menu,
    components: {
      ...menu,
      headerTitle: () => (
        <Text p white>
          {t("navigation.components")}
        </Text>
      ),
      headerRight: () => null,
      headerLeft: () => (
        <Button
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Image source={icons.menu} radius={0} color={colors.white} />
        </Button>
      ),
    },
    back: {
      ...menu,
      headerRight: () => null,
      headerLeft: () => (
        <Button onPress={() => navigation.goBack()}>
          <Image
            radius={0}
            width={10}
            height={18}
            color={colors.icon}
            source={icons.arrow}
            transform={[{ rotate: "180deg" }]}
          />
        </Button>
      ),
    },
    profile: {
      ...menu,
      headerRight: () => (
        <Block row flex={0} align="center" marginRight={sizes.padding}>
          <TouchableOpacity
            style={{ marginRight: sizes.sm }}
            onPress={() => {
              console.log("hi");
            }}
          >
            <Image source={icons.bell} radius={0} color={colors.icon} />
            <Block
              flex={0}
              right={0}
              width={sizes.s}
              height={sizes.s}
              radius={sizes.xs}
              position="absolute"
              gradient={gradients?.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(
                DrawerActions.jumpTo("Screens", { screen: "Profile" })
              )
            }
          >
            <Image
              radius={6}
              width={24}
              height={24}
              source={{ uri: user.data.avatar }}
            />
          </TouchableOpacity>
        </Block>
      ),
    },
    home: {
      ...menu,
      headerRight: () => null,
      headerLeft: () => (
        <Button
          gradient={gradients.primary}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Image source={icons.menu} radius={0} color={colors.white} />
        </Button>
      ),
      headerTitle: () => (
        <GooglePlacesAutocomplete
          isRowScrollable
          minLength={4}
          placeholder="Search"
          fetchDetails={true}
          renderRow={(data) => (
            <Block row>
              <TouchableWithoutFeedback>
                <Text p>{data.description}</Text>
              </TouchableWithoutFeedback>
            </Block>
          )}
          onPress={(data, details) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
            handleSelectedLocation(
              details?.geometry.location.lat,
              details?.geometry.location.lng
            );
          }}
          styles={
            isDark
              ? {
                  container: {
                    position: "absolute",
                    top: -23,
                    left: 5,
                    right: 0,
                    height: sizes.xxl * 8,
                  },
                  textInput: {
                    backgroundColor: colors.dark,
                    color: colors.white,
                    height: sizes.xl,
                    marginHorizontal: 5,
                  },
                  row: {
                    backgroundColor: colors.dark,
                  },
                  poweredContainer: {
                    backgroundColor: colors.dark,
                  },
                  powered: {
                    tintColor: colors.white,
                  },
                }
              : {
                  container: {
                    position: "absolute",
                    top: -23,
                    left: 5,
                    right: 0,
                    height: sizes.xxl * 8,
                  },
                  textInput: {
                    color: colors.black,
                    height: sizes.xl,
                    marginHorizontal: 5,
                  },
                }
          }
          query={{
            key: keys.GooglePlacesAPIKey,
            language: locale,
            components: "country:sa",
          }}
        />
      ),
      headerTransparent: true,
    },
  };

  return options;
};

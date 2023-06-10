import React, { useState, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Platform,
  RefreshControl,
  Touchable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import * as regex from "../constants/regex";
import { Block, Button, Image, Text, Tag, Modal, Input } from "../components/";
import { useData, useTheme, useTranslation } from "../hooks/";
import { TouchableOpacity } from "react-native-gesture-handler";

const isAndroid = Platform.OS === "android";
interface IProfile {
  url: string;
}
interface IProfileValidation {
  url: boolean;
}

const Profile = () => {
  const { user, isDark } = useData();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { assets, colors, sizes } = useTheme();

  const [isLoading, setIsLoading] = useState(true);

  const [isValid, setIsValid] = useState<IProfileValidation>({
    url: false,
  });
  const [profile, setProfile] = useState<IProfile>({
    url: "",
  });

  const handleChange = useCallback(
    (value: any) => {
      setProfile((state) => ({ ...state, ...value }));
    },
    [setProfile]
  );
  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      url: regex.linkedin.test(profile.url) || regex.github.test(profile.url),
    }));
  }, [profile.url]);

  return (
    <Block safe marginTop={sizes.md}>
      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: sizes.padding }}
      >
        <Block flex={0}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            paddingBottom={sizes.l}
            radius={sizes.cardRadius}
            source={assets.background}
          >
            <Button
              row
              flex={0}
              justify="flex-start"
              onPress={() => navigation.goBack()}
            >
              <Image
                radius={0}
                width={10}
                height={18}
                color={colors.white}
                source={assets.arrow}
                transform={[{ rotate: "180deg" }]}
              />
              <Text p white marginLeft={sizes.s}>
                {t("profile.title")}
              </Text>
            </Button>
            <Block flex={0} align="center">
              <TouchableOpacity
              onPress={() => {navigation.navigate("EditProfile");}}
              >
              <Image
                width={64}
                height={64}
                marginBottom={sizes.sm}
                source={{ uri: user.data.avatar }}
              />
              </TouchableOpacity>
              <Text h5 center white>
                {user.data.name}
              </Text>
              {user.data.type === "User" ? null : (
                <Text p center white>
                  {user.data.type + " "}
                  <Ionicons
                    size={14}
                    name={
                      user.data.type === "Driver" ? "star-outline" : "person"
                    }
                    color={colors.white}
                  />
                </Text>
              )}
              <Button
                white
                marginVertical={sizes.sm}
                outlined
                shadow={false}
                radius={sizes.m}
                onPress={() => {
                  navigation.navigate("EditProfile");
                }}
              >
                <Block
                  justify="center"
                  radius={sizes.m}
                  paddingHorizontal={sizes.m}
                  color="rgba(255,255,255,0.2)"
                >
                  <Text white bold transform="uppercase">
                    {t("profile.editProfile")}
                  </Text>
                </Block>
              </Button>
            </Block>
          </Image>

          {/* profile: stats */}
          <Block
            flex={0}
            radius={sizes.sm}
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
            marginTop={-sizes.l}
            marginHorizontal="8%"
            color="rgba(255,255,255,0.2)"
          >
            <Block
              row
              blur
              flex={0}
              intensity={100}
              radius={sizes.sm}
              overflow="hidden"
              tint={colors.blurTint}
              justify="space-evenly"
              paddingVertical={sizes.sm}
              renderToHardwareTextureAndroid
            >
              <Block align="center">
                <Text h5>
                  <Image
                    source={assets?.star}
                    padding={sizes.s}
                    style={{
                      tintColor: colors.secondary,
                    }}
                  />
                </Text>
                <Text>{t("profile.rating")}</Text>
              </Block>
            </Block>
          </Block>

          {/* Profile: Skills */}
          <Block paddingHorizontal={sizes.sm}></Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Profile;

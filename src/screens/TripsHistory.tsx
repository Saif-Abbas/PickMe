import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { useData, useTheme, useTranslation } from "../hooks/";
import { useRoute } from "@react-navigation/native";
import { Block, Button, Image, Text } from "../components/";
import { IHistory, ITrip } from "../constants/types";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TripsHistory = ({ route }: { route: any }) => {
  const { t } = useTranslation();
  const { isDark, user } = useData();
  const navigation = useNavigation();
  //const { uid } = route.params;
  const { assets, colors, sizes, gradients } = useTheme();

  useEffect(() => {
    // Do something later
  }, []);

  return (
    <>
      <Block safe marginTop={sizes.md}>
        <Block paddingHorizontal={sizes.s}>
          <Block flex={0} style={{}}>
            <Image
              background
              resizeMode="cover"
              padding={sizes.sm}
              radius={sizes.cardRadius}
              source={assets.background}
              height={sizes.height * 0.3}
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
                  {t("common.goBack")}
                </Text>
              </Button>
              <Text h4 center white marginBottom={sizes.md}>
                {t("tripsHistory.title")}
              </Text>
            </Image>
          </Block>
        </Block>
      </Block>
      <Block card scroll paddingBottom={250}>
        {user &&
          user.data.trips &&
          Object.entries(user.data.trips).map((trip: any) => (
            <TouchableOpacity key={trip}>
              <TouchableOpacity
                onPress={() => {
                  // TODO: Navigate to user profile
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
              <Block justify="flex-end">
                <Button gradient={gradients.primary} onPress={() => {}}>
                  <Ionicons
                    size={24}
                    name="star-outline"
                    color={colors.white}
                  />
                </Button>
              </Block>
            </TouchableOpacity>
          ))}
      </Block>
    </>
  );
};
export default TripsHistory;

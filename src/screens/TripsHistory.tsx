import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { useData, useTheme, useTranslation } from "../hooks/";
import { useRoute } from "@react-navigation/native";
import { Block, Button, Image, Text } from "../components/";
import { IHistory, ITrip } from "../constants/types";
import { ActivityIndicator } from "react-native";

const TripsHistory = ({ route }: { route: any }) => {
  const { t } = useTranslation();
  const { isDark } = useData();
  const navigation = useNavigation();
  //const { uid } = route.params;
  const { assets, colors, sizes } = useTheme();
  const [history, setHistory] = useState<IHistory>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get Data from the firebase later
  }, []);

  return (
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
        {/* Trips History Here*/}
        {loading && (
          <ActivityIndicator
            size="large"
            color={isDark ? colors.white : colors.black}
            style={{ marginTop: sizes.xxl * 3.5 }}
          />
        )}
        {!history && !loading && (
          <Text p marginTop={sizes.xxl * 3.5} center marginLeft={sizes.s}>
            {t("tripsHistory.noHistory")}
          </Text>
        )}
      </Block>
    </Block>
  );
};
export default TripsHistory;

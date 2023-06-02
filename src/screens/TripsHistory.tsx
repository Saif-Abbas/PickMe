import { useState, useEffect } from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useData, useTheme, useTranslation } from "../hooks/";
import { useRoute } from "@react-navigation/native";
import {
  Block,
  Button,
  Image,
  Text,
} from "../components/";
import { IHistory, ITrip } from "../constants/types";

const TripsHistory = ({ route }: { route: any }) => {
  const { t } = useTranslation();
  const { isDark, handleUser } = useData();
  const navigation = useNavigation();
  //const { uid } = route.params;
  const { assets, colors, gradients, sizes } = useTheme();
  const [history, setHistory] = useState<IHistory>(null);
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
        {history && (
          <Text p white center marginLeft={sizes.s}>
            {t("tripsHistory.noTrips")}
          </Text>
        )}
      </Block>
    </Block>
  );
};
export default TripsHistory;
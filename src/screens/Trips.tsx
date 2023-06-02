import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useTheme, useTranslation } from "../hooks/";
import { Block, Input } from "../components/";
import UserCard from "../components/TripCard";
const Talented = () => {
  const { t } = useTranslation();
  const { colors, sizes } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [talented, setTalented] = useState([]);

  function calculateDistance(lat1: any, lon1: any, lat2: any, lon2: any) {
    const earthRadius = 6371; // Radius of the Earth in kilometers

    const latitudeDifference = ((lat2 - lat1) * Math.PI) / 180;
    const longitudeDifference = ((lon2 - lon1) * Math.PI) / 180;

    const squaredSinHalfLatitudeDifference =
      Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2);
    const cosLatitude1 = Math.cos((lat1 * Math.PI) / 180);
    const cosLatitude2 = Math.cos((lat2 * Math.PI) / 180);
    const squaredSinHalfLongitudeDifference =
      Math.sin(longitudeDifference / 2) * Math.sin(longitudeDifference / 2);

    const a =
      squaredSinHalfLatitudeDifference +
      cosLatitude1 * cosLatitude2 * squaredSinHalfLongitudeDifference;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;

    return distance;
  }

  useEffect(() => {
    async function getData() {
      setIsLoading(false);
    }
    setIsLoading(true);
    getData();
  }, []);
  return (
    <Block>
      {/* search input */}
      <Block color={colors.card} flex={0} padding={sizes.padding}>
        <Input search placeholder={t("common.search")} />
      </Block>

      {/* products list */}
      <Block
        scroll
        paddingHorizontal={sizes.padding}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: sizes.l }}
      >
        {isLoading ? (
          <ActivityIndicator
            size={"large"}
            style={{ position: "absolute", alignSelf: "center", bottom: 0 }}
          />
        ) : (
          <Block marginTop={sizes.sm}>
            {talented?.map((talenter: any) => (
              <UserCard key={`hi-${talenter?.fullName}`} {...talenter} />
            ))}
          </Block>
        )}
      </Block>
    </Block>
  );
};

export default Talented;

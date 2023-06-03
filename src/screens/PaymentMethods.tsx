import React, { useState, useCallback, useEffect } from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useData, useTheme, useTranslation } from "../hooks/";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  Block,
  Button,
  Input,
  Image,
  Text,
  Modal,
} from "../components/";

import { db, update, ref } from "../services/firebase";
import * as regex from "../constants/regex";
import { IUser } from "../constants/types";
const isAndroid = Platform.OS === "android";

interface IPayment {
  cardNumber: string;
  cardHolderName: string;
  cardExpiry: string;
  cardCvv: string;
}
interface IPaymentValidation {
  cardNumber: boolean;
  cardHolderName: boolean;
  cardExpiry: boolean;
  cardCvv: boolean;
}

const PaymentMethods = () => {
  const { assets, colors, gradients, sizes } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { user } = useData();
  const [payment, setPayment] = useState<IPayment>({
    cardNumber: "",
    cardHolderName: "",
    cardExpiry: "",
    cardCvv: "",
  });
  const [isValid, setIsValid] = useState<IPaymentValidation>({
    cardNumber: false,
    cardHolderName: false,
    cardExpiry: false,
    cardCvv: false,
  });
  useEffect(() => {
    setIsValid({
      cardNumber: regex.cardNumber.test(payment.cardNumber),
      cardHolderName: regex.cardHolderName.test(payment.cardHolderName),
      cardExpiry: regex.cardExpiry.test(payment.cardExpiry),
      cardCvv: regex.cardCvv.test(payment.cardCvv),
    });
  }, [payment, isValid]);
  //const handlePayment = useCallback(() => {

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
        <Text p white center marginLeft={sizes.s}>
          {t("tripsHistory.noTrips")}
        </Text>
      </Block>
    </Block>
  );
};
export default PaymentMethods;

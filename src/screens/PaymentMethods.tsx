import React, { useState, useCallback, useEffect } from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useData, useTheme, useTranslation } from "../hooks/";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Block, Card, Button, Input, Image, Text, Modal } from "../components/";

import { db, update, ref, get } from "../services/firebase";
import * as regex from "../constants/regex";
import { IUser } from "../constants/types";
import { ActivityIndicator } from "react-native";
const isAndroid = Platform.OS === "android";

interface IPayment {
  cardNumber: string;
  cardHolderName: string;
  cardExpiryDate: string;
  cardCvv: string;
}
interface IPaymentValidation {
  cardNumber: boolean;
  cardHolderName: boolean;
  cardExpiryDate: boolean;
  cardCvv: boolean;
}

const PaymentMethods = () => {
  const { assets, colors, gradients, sizes } = useTheme();
  const { t } = useTranslation();
  const { isDark } = useData();
  const navigation = useNavigation();
  const { user, handleUser } = useData();
  const [showAddCard, setShowAddCard] = useState(false);
  const [cards, setCards] = useState([
    {
      cardNumber: "4*** **** **** 1234",
      cardHolderName: "John Doe",
      cardExpiryDate: "12/24",
      cardCvv: "123",
    },
    {
      cardNumber: "5*** **** **** 4321",
      cardHolderName: "Anya Foger",
      cardExpiryDate: "10/25",
      cardCvv: "6",
    },
  ]);
  const [loading, setLoading] = useState(false); // NOTE: This is for testing purposes only
  const [payment, setPayment] = useState<IPayment>({
    cardNumber: "",
    cardHolderName: "",
    cardExpiryDate: "",
    cardCvv: "",
  });
  const [isValid, setIsValid] = useState<IPaymentValidation>({
    cardNumber: false,
    cardHolderName: false,
    cardExpiryDate: false,
    cardCvv: false,
  });

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      cardNumber: regex.cardNumber.test(payment.cardNumber),
      cardHolderName: regex.cardHolderName.test(payment.cardHolderName),
      cardExpiryDate: regex.cardExpiryDate.test(payment.cardExpiryDate),
      cardCvv: regex.cardCvv.test(payment.cardCvv),
    }));
  }, [payment]);

  const handleAddCard = useCallback(() => {
    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      const updatedUser: any = {
        ...user,
        paymentMethods: [...user.data.paymentMethods, payment],
      };
      update(userRef, updatedUser)
        .then(() => {
          setPayment({
            // Clearing the data
            cardNumber: "",
            cardHolderName: "",
            cardExpiryDate: "",
            cardCvv: "",
          });
          setShowAddCard(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // This useEffect hook will update the whole page
  // once the payment method is added
  // to ensure smoother experience
  const getData = useCallback(async () => {
    if (!user) return;
    await get(ref(db, `users/${user?.uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const userData: IUser = snapshot.val();
        // Updating the user data
        // to ensure the new payment method is added
        // to the user data
        // HandleUser is a function that will update the user data across the app
        user && handleUser(userData);
        setLoading(false);
      }
    });
  }, [handleUser, user]);
  useEffect(() => {
    // Calling the function
    getData();
  }, [handleUser, user]);

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
              {t("paymentMethods.title")}
            </Text>
          </Image>
          <Button
            row
            gradient={gradients.primary}
            marginVertical={sizes.s}
            width={sizes.md * 4}
            style={{ alignSelf: "flex-end" }}
            onPress={() => {
              setShowAddCard(true);
            }}
          >
            <Ionicons
              name="add-circle-outline"
              size={24}
              color={colors.white}
            />
            <Text white>{t("paymentMethods.addCard")}</Text>
          </Button>
        </Block>
        {/* Payment Methods Here*/}
        {showAddCard && (
          <Block scroll style={{ height: "100%" }}>
            <Modal
              visible={showAddCard}
              onRequestClose={() => setShowAddCard(false)}
            >
              <Input
                label={t("paymentMethods.cardHolderName")}
                marginVertical={sizes.sm}
                placeholder={t("paymentMethods.cardHolderNamePlaceholder")}
                value={payment.cardHolderName}
                onChangeText={(text) =>
                  setPayment((state) => ({ ...state, cardHolderName: text }))
                }
                success={isValid.cardHolderName}
                danger={
                  !isValid.cardHolderName && payment.cardHolderName !== ""
                }
              />
              <Input
                label={t("paymentMethods.cardNumber")}
                marginVertical={sizes.sm}
                placeholder={t("paymentMethods.cardNumberPlaceholder")}
                value={payment.cardNumber}
                onChangeText={(text) =>
                  setPayment((state) => ({ ...state, cardNumber: text }))
                }
                success={isValid.cardNumber}
                danger={!isValid.cardNumber && payment.cardNumber !== ""}
                keyboardType="number-pad"
              />
              <Block
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: sizes.sm * 6,
                  marginTop: sizes.s,
                }}
              >
                <Input
                  label={t("paymentMethods.expiryDate")}
                  marginVertical={sizes.sm}
                  style={{
                    width: "50%",
                    left: 0,
                  }}
                  placeholder={t("paymentMethods.expiryDatePlaceholder")}
                  value={payment.cardExpiryDate}
                  onChangeText={(text) =>
                    setPayment((state) => ({
                      ...state,
                      cardExpiryDate: text,
                    }))
                  }
                  success={isValid.cardExpiryDate}
                  danger={
                    !isValid.cardExpiryDate && payment.cardExpiryDate !== ""
                  }
                  keyboardType="number-pad"
                />
                <Input
                  label={t("paymentMethods.cvv")}
                  marginVertical={sizes.sm}
                  style={{
                    width: "30%",
                    left: 0,
                  }}
                  placeholder={t("paymentMethods.cvvPlaceholder")}
                  value={payment.cardCvv}
                  onChangeText={(text) =>
                    setPayment((state) => ({ ...state, cardCvv: text }))
                  }
                  success={isValid.cardCvv}
                  danger={!isValid.cardCvv && payment.cardCvv !== ""}
                  keyboardType="number-pad"
                />
              </Block>
              <Button
                gradient={gradients.primary}
                marginVertical={sizes.sm * 0.5}
                onPress={() => {
                  if (
                    isValid.cardNumber &&
                    isValid.cardHolderName &&
                    isValid.cardExpiryDate &&
                    isValid.cardCvv
                  ) {
                    handleAddCard();
                  } else {
                  }
                }}
              >
                <Text white center>
                  {t("paymentMethods.save")}
                </Text>
              </Button>
            </Modal>
          </Block>
        )}
        {loading && (
          <ActivityIndicator
            size="large"
            color={isDark ? colors.white : colors.black}
            style={{ marginTop: sizes.xxl * 2.5 }}
          />
        )}
        <Block scroll style={{ height: "100%" }}>
          {cards && !loading && (
            <Block justify="space-between" style={{ marginBottom: sizes.sm }}>
              {cards.map((card, index) => (
                <Card
                  key={`card-${index}`}
                  {...{ card }}
                  onPress={() => {
                    // TODO: Later on, we will add the ability to delete the card
                  }}
                />
              ))}
            </Block>
          )}
        </Block>
        {!cards && !loading && (
          <Text p marginTop={sizes.xxl * 2.5}>
            {t("paymentMethods.noCard")}
          </Text>
        )}
      </Block>
    </Block>
  );
};
export default PaymentMethods;

import React, { useState, useCallback } from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/core";
import DateTimePicker from "react-native-modal-datetime-picker";
import { useData, useTheme, useTranslation } from "../hooks/";
import { useRoute } from "@react-navigation/native";
import { Alert, Image, Block, Text, Button } from "../components/";
import { Ionicons } from "@expo/vector-icons";
import { db, update, ref } from "../services/firebase";
const isAndroid = Platform.OS === "android";

interface IComplete {
  date: string;
}

const BookRide = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { isDark } = useData();
  const { assets, colors, gradients, sizes } = useTheme();
  const [date, setDate] = useState("");
  const [requested, setRequested] = useState(false);
  const [complete, setComplete] = useState<IComplete>({
    date: "",
  });

  const handleChange = useCallback(
    (value: any) => {
      setComplete((state) => ({ ...state, ...value }));
    },
    [setComplete]
  );
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  const showAlert = useCallback(
    (type: string, message: string) => {
      setAlert({ type, message });
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 5500);
    },
    [setAlert, setIsAlertVisible]
  );
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

  const showDateTimePicker = () => {
    setIsDateTimePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setIsDateTimePickerVisible(false);
  };

  const handleDatePicked = (date: Date) => {
    setDate(date.toLocaleString("en-US"));
    hideDateTimePicker();
  };

  const handleBook = async () => {
    if (!complete.date) {
      return;
    }
    try {
      setRequested(true);
      console.log(date);
      showAlert("success", "Completed");
      navigation.navigate("Home");
    } catch (e) {
      showAlert("danger", `${e}`);
    }
  };
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
              {t("completeDriverProfile.title")}
            </Text>
          </Image>
        </Block>

        {/* Complete Driver Profile Form */}

        <Block
          keyboard
          behavior={!isAndroid ? "padding" : "height"}
          marginTop={-(sizes.height * 0.2 - sizes.l)}
        >
          <Block
            flex={0}
            radius={sizes.sm}
            marginHorizontal="8%"
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          >
            <Block
              blur
              flex={0}
              intensity={90}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}
            >
              <Block paddingHorizontal={sizes.sm}>
                <DateTimePicker
                  isVisible={isDateTimePickerVisible}
                  mode="datetime"
                  display="spinner"
                  minimumDate={new Date()}
                  onConfirm={handleDatePicked}
                  onCancel={hideDateTimePicker}
                  onChange={(value) => handleChange({ date: value })}
                />
                <Button
                  flex={1}
                  primary
                  outlined
                  onPress={showDateTimePicker}
                  marginBottom={sizes.sm}
                >
                  <Text p bold transform="uppercase">
                    <Ionicons
                      name="calendar-outline"
                      color={isDark ? colors.white : colors.black}
                      size={16}
                    />
                    {`${date.length <= 0 ? t("completeProfile.date") : date}`}
                  </Text>
                </Button>

                <Text>{t("completeDriverProfile.note")}</Text>
                <Button
                  onPress={handleBook}
                  marginVertical={sizes.s}
                  gradient={gradients.primary}
                  disabled={requested || !complete.date}
                >
                  <Text bold white transform="uppercase">
                    {t("completeDriverProfile.send")}
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
      {isAlertVisible && (
        <Alert
          type={alert.type}
          message={alert.message}
          isVisible={isAlertVisible}
        />
      )}
    </Block>
  );
};

export default BookRide;

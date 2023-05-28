import React, { useState, useCallback } from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/core";
import DateTimePicker from "react-native-modal-datetime-picker";
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
import { FlatList } from "react-native-gesture-handler";
import { db, update, ref } from "../services/firebase";
const isAndroid = Platform.OS === "android";

interface IComplete {
  name: string;
  email: string;
  date: string;
  gender: string;
}

const CompleteProfile = () => {
  const { t } = useTranslation();
  const { isDark, user } = useData();
  const navigation = useNavigation();
  const { assets, colors, gradients, sizes } = useTheme();
  const [date, setDate] = useState("");
  const [requested, setRequested] = useState(false);
  const genders = ["Male", "Female"];
  const [complete, setComplete] = useState<IComplete>({
    name: "",
    email: "",
    date: "",
    gender: "",
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
  const [showGenderModal, setGenderModal] = useState(false);

  const handleHire = async () => {
    if (
      !complete.date ||
      !complete.name ||
      !complete.email ||
      !complete.gender
    ) {
      return;
    }
    try {
      await update(ref(db, `users/${user.auth?.currentUser?.uid}`), {
        ...complete,
      })
        .then(() => {
          showAlert("success", "Profile Completed successfully");
          navigation.navigate("Home");
        })
        .catch((error) => {
          showAlert("danger", error.message);
        });
    } catch (e) {
      showAlert("danger", "Something went wrong");
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
              {t("hire.title")}
            </Text>
          </Image>
        </Block>

        {/* Complete Profile Form */}

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
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.s}
                  label={"Name"}
                  keyboardType="default"
                  placeholder={"Enter your name"}
                  onChangeText={(value) => handleChange({ name: value })}
                />
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.s}
                  label={"Email"}
                  keyboardType="email-address"
                  placeholder={"Enter your email"}
                  onChangeText={(value) => handleChange({ email: value })}
                />
                <DateTimePicker
                  isVisible={isDateTimePickerVisible}
                  mode="datetime"
                  display="inline"
                  maximumDate={new Date()}
                  onConfirm={handleDatePicked}
                  onCancel={hideDateTimePicker}
                  onChange={(value) => handleChange({ date: value })}
                />
                <Modal
                  visible={showGenderModal}
                  onRequestClose={() => setGenderModal(false)}
                >
                  <FlatList
                    keyExtractor={(index) => `${index}`}
                    data={genders}
                    renderItem={({ item }) => (
                      <Button
                        marginBottom={sizes.sm}
                        onPress={() => {
                          setGenderModal(false);
                        }}
                      >
                        <Text p white semibold transform="uppercase">
                          {item}
                        </Text>
                      </Button>
                    )}
                  />
                </Modal>
                <Button
                  white
                  outlined
                  shadow={false}
                  radius={sizes.m}
                  onPress={() => {
                    setGenderModal(true);
                  }}
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
                    {`  ${date.length <= 0 ? t("hire.date") : date}`}
                  </Text>
                </Button>
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.s}
                  label={t("hire.msg")}
                  keyboardType="default"
                  placeholder={t("hire.msgPlaceholder")}
                  onChangeText={(value) => handleChange({ message: value })}
                />
                <Button
                  onPress={handleHire}
                  marginVertical={sizes.s}
                  gradient={gradients.primary}
                  disabled={
                    requested ||
                    !complete.date ||
                    !complete.email ||
                    !complete.gender ||
                    !complete.name
                  }
                >
                  <Text bold white transform="uppercase">
                    {t("hire.send")}
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

export default CompleteProfile;

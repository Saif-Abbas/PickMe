import React, { useState, useCallback, useEffect } from "react";
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
import * as regex from "../constants/regex";
import { IUser } from "../constants/types";
const isAndroid = Platform.OS === "android";

interface IComplete {
  name: string;
  nationalId: string;
  date: string;
  gender: string;
}

interface ICompleteValidation {
  name: boolean;
  nationalId: boolean;
}

const EditProfile = ({ route }: { route: any }) => {
  const { t } = useTranslation();
  const { isDark, handleUser } = useData();
  const navigation = useNavigation();
  const { uid } = route.params;
  const { assets, colors, gradients, sizes } = useTheme();
  const [date, setDate] = useState("");
  const [requested, setRequested] = useState(false);
  const genders = ["Male", "Female"];
  const [complete, setComplete] = useState<IComplete>({
    name: "",
    nationalId: "",
    date: "",
    gender: "",
  });
  const [isValid, setIsValid] = useState<ICompleteValidation>({
    name: false,
    nationalId: false,
  });

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      name: regex.name.test(complete.name),
      nationalId: regex.nationalId.test(complete.nationalId),
    }));
  }, [complete, setIsValid]);

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
    setDate(date.toLocaleString("en-US").split(",")[0]);
    hideDateTimePicker();
  };
  const [showGenderModal, setGenderModal] = useState(false);

  const handleHire = async () => {
    if (
      !complete.date ||
      !complete.name ||
      !complete.nationalId ||
      !complete.gender
    ) {
      return;
    }
    try {
      setRequested(true);
      update(ref(db, `users/${uid}`), {
        name: complete.name,
        nationalId: complete.nationalId,
        dob: complete.date,
        gender: complete.gender,
      });
      // Update the data to the user object
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
              {t("completeProfile.title")}
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
                  label={t("completeProfile.name")}
                  keyboardType="default"
                  placeholder={"Enter your name"}
                  success={Boolean(complete.name && isValid.name)}
                  danger={Boolean(complete.name && !isValid.name)}
                  onChangeText={(value) => handleChange({ name: value })}
                />
                <Input
                  marginBottom={sizes.sm}
                  label={t("completeProfile.nationalId")}
                  keyboardType="numeric"
                  placeholder={"Enter your National ID"}
                  success={Boolean(complete.nationalId && isValid.nationalId)}
                  danger={Boolean(complete.nationalId && !isValid.nationalId)}
                  onChangeText={(value) => handleChange({ nationalId: value })}
                />
                <DateTimePicker
                  isVisible={isDateTimePickerVisible}
                  mode="date"
                  display="inline"
                  maximumDate={new Date()}
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
                    {`  ${date.length <= 0 ? t("completeProfile.date") : date}`}
                  </Text>
                </Button>

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
                          handleChange({ gender: item });
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
                  primary
                  outlined
                  shadow={false}
                  marginBottom={sizes.s}
                  onPress={() => {
                    setGenderModal(true);
                  }}
                >
                  <Text p bold color={isDark ? colors.white : colors.dark}>
                    {complete.gender || "Gender *"}
                  </Text>
                </Button>

                <Text>{t("completeProfile.note")}</Text>
                <Button
                  onPress={handleHire}
                  marginVertical={sizes.s}
                  gradient={gradients.primary}
                  disabled={
                    requested ||
                    !complete.date ||
                    !complete.nationalId ||
                    !complete.gender ||
                    !complete.name ||
                    !isValid.name ||
                    !isValid.nationalId
                  }
                >
                  <Text bold white transform="uppercase">
                    {t("editProfile.Save")}
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

export default EditProfile;

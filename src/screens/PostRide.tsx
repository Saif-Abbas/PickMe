import React, { useState, useCallback } from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/core";
import DateTimePicker from "react-native-modal-datetime-picker";
import { useData, useTheme, useTranslation } from "../hooks/";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
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

declare var Blob: {
  prototype: Blob;
  new (): Blob;
  new (request: any, mime: string): Blob;
};

interface IComplete {
  carManufacturer: string;
  carName: string;
  carModel: string;
  carPlate: string;
}

interface ICompleteValidation {
  carName: boolean;
  carModel: boolean;
  carPlate: boolean;
}

const PostRide = () => {
  const { t } = useTranslation();
  const { isDark, user } = useData();
  const navigation = useNavigation();
  const { assets, colors, gradients, sizes } = useTheme();
  const [date, setDate] = useState("");
  const [requested, setRequested] = useState(false);
  const [carLicenseUploaded, setCarLicenseUpload] = useState(false);
  const [licenseUploaded, setLicenseUploaded] = useState(false);
  const [licenseImage, setLicenseImage] = useState(new Blob());
  const [carLicenseImage, setCarLicenseImage] = useState(new Blob());
  const [complete, setComplete] = useState<IComplete>({
    carManufacturer: "",
    carName: "",
    carModel: "",
    carPlate: "",
  });

  const cars = [
    "Audi",
    "Auston Marten",
    "BMW",
    "Bently",
    "Citeroin",
    "Cheery",
    "Chevrolet",
    "Changan",
    "Chery",
    "Daihatsu",
    "Dodge",
    "Fiat",
    "Ford",
    "GEELY",
    "GMC",
    "HAVAL",
    "Honda",
    "HUMMER",
    "Huyandai",
    "Infinity",
    "Jaguar",
    "Kia",
    "Land-Rover",
    "Lexus",
    "Lincoln",
    "Maserati",
    "Mazda",
    "Mercedes-Benz",
    "MG",
    "Nissan",
    "Porsche",
    "Reno",
    "Sang-Yong",
    "Subaru",
    "Suzuki",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Volvo",
    "ZX-Auto",
  ];

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

  const uploadMedia = async (which: string) => {
    if (carLicenseUploaded && licenseUploaded) {
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });
    if (!result.canceled) {
      const response = await fetch(result.assets![0].uri);
      let blob = new Blob();
      blob = await response.blob();
      if (which === "license") {
        setLicenseImage(blob);
        setLicenseUploaded(true);
      } else {
        setCarLicenseImage(blob);
        setCarLicenseUpload(true);
      }
    }
  };

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
  const [showCarManufacturerModal, setCarManufacturerModal] = useState(false);

  const handleCompleteDriverProfile = async () => {
    if (
      !complete.carManufacturer ||
      !complete.carPlate ||
      !complete.carModel ||
      !complete.carName ||
      !licenseImage ||
      !carLicenseImage
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
                <Modal
                  visible={showCarManufacturerModal}
                  onRequestClose={() => setCarManufacturerModal(false)}
                >
                  <FlatList
                    keyExtractor={(index) => `${index}`}
                    data={cars}
                    renderItem={({ item }) => (
                      <Button
                        marginBottom={sizes.sm}
                        onPress={() => {
                          setCarManufacturerModal(false);
                          handleChange({ carManufacturer: item });
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
                    setCarManufacturerModal(true);
                  }}
                >
                  <Text p bold color={isDark ? colors.white : colors.dark}>
                    {complete.carManufacturer ||
                      t("completeDriverProfile.carManufacturer")}
                  </Text>
                </Button>
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.sm}
                  label={t("completeDriverProfile.carName")}
                  placeholder={"Fusion"}
                  onChangeText={(value) => handleChange({ carName: value })}
                />
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.sm}
                  label={t("completeDriverProfile.carModel")}
                  placeholder={"2014"}
                  onChangeText={(value) => handleChange({ carModel: value })}
                />
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.sm}
                  label={t("completeDriverProfile.carPlate")}
                  placeholder={"ZRJ 3775"}
                  onChangeText={(value) => handleChange({ carPlate: value })}
                />
                <Button
                  row
                  flex={0}
                  disabled={licenseUploaded}
                  onPress={() => {
                    uploadMedia("license");
                  }}
                  marginVertical={sizes.xs}
                  gradient={gradients.primary}
                >
                  <Image
                    radius={0}
                    width={10}
                    height={18}
                    marginRight={8}
                    color={colors.white}
                    source={licenseUploaded ? assets.star : assets.check}
                  />
                  <Text bold white transform="uppercase">
                    {licenseUploaded
                      ? t("completeDriverProfile.uploaded")
                      : t("completeDriverProfile.uploadLicense")}
                  </Text>
                </Button>
                <Button
                  row
                  flex={0}
                  disabled={carLicenseUploaded}
                  onPress={() => {
                    uploadMedia("carLicense");
                  }}
                  marginVertical={sizes.s}
                  gradient={gradients.primary}
                >
                  <Image
                    radius={0}
                    width={10}
                    height={18}
                    marginRight={8}
                    color={colors.white}
                    source={carLicenseUploaded ? assets.star : assets.check}
                  />
                  <Text bold white transform="uppercase">
                    {carLicenseUploaded
                      ? t("completeDriverProfile.uploaded")
                      : t("completeDriverProfile.uploadCarLicense")}
                  </Text>
                </Button>
                <Text>{t("completeDriverProfile.note")}</Text>
                <Button
                  onPress={handleCompleteDriverProfile}
                  marginVertical={sizes.s}
                  gradient={gradients.primary}
                  disabled={
                    requested ||
                    !complete.carManufacturer ||
                    !complete.carPlate ||
                    !complete.carModel ||
                    !complete.carName
                  }
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

export default PostRide;

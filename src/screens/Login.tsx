import React, { useCallback, useEffect, useState } from "react";
import { Platform, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/core";

import CountryPicker from "react-native-country-picker-modal";
import { useData, useTheme, useTranslation } from "../hooks/";
import * as regex from "../constants/regex";

import { Alert, Block, Button, Input, Image, Text } from "../components/";
import {
  PhoneAuthProvider,
  app,
  loginWithCredentials,
  sendVerificationCode,
} from "../services/firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { IUser } from "../constants/types";
const isAndroid = Platform.OS === "android";

interface ILogin {
  phoneNumber: string;
}
interface ILoginValidation {
  phoneNumber: boolean;
}

interface IVerify {
  code: string;
}
interface IVerifyValidation {
  code: boolean;
}

const Login = () => {
  const { isDark } = useData();
  const { handleUser } = useData();
  const { t } = useTranslation();

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyRequested, setAlreadyRequested] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  const Z_INDEX = 0;
  const [userData, setUserData]: any = useState<IUser>();
  const [credential, setCredential]: any = useState({
    verificationId: "",
    verificationCode: "",
  });
  const recaptchaVerifier: any = React.useRef(null);
  const [isValid, setIsValid] = useState<ILoginValidation>({
    phoneNumber: false,
  });
  const [isCodeValid, setIsCodeValid] = useState<IVerifyValidation>({
    code: false,
  });
  const [login, setLogin] = useState<ILogin>({
    phoneNumber: "",
  });
  const [verify, setVerify] = useState<IVerify>({
    code: "",
  });
  const { assets, colors, gradients, sizes } = useTheme();

  // Show the alert and close it after 5 seconds
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
  const handleChange = useCallback(
    (value: any) => {
      setLogin((state) => ({ ...state, ...value }));
      setVerify((state) => ({ ...state, ...value }));
    },
    [setLogin, setVerify]
  );
  const handleVerification = useCallback(async () => {
    if (alreadyRequested) {
      return;
    }
    try {
      if (!login.phoneNumber) {
        return;
      }
      setAlreadyRequested(true);
      setTimer(60);
      setTimeout(() => {
        setAlreadyRequested(false);
      }, 63000);
      const verId: any = await sendVerificationCode(
        "+966" + login.phoneNumber,
        recaptchaVerifier.current
      );
      setCredential({ verificationId: verId.verificationId });
      if (verId) {
        showAlert("success", "Verification Code has been sent to your phone.");
      }
    } catch (error: any) {
      showAlert("danger", error.message);
      console.error(error);
    }
  }, [alreadyRequested, login.phoneNumber, showAlert]);

  const handleSignIn = useCallback(async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(!isLoading);
    if (!Object.values(isValid).includes(false) && !isLoading) {
      try {
        console.log(credential);
        const c = PhoneAuthProvider.credential(
          credential.verificationId,
          verify.code
        );
        const user: any = await loginWithCredentials(
          c,
          "+966" + login.phoneNumber
        );
        console.log(user);
        if (user && user.data.name) {
          showAlert("success", "You're Logged in.");
          handleUser(user);
          navigation.navigate("Home");
        } else {
          showAlert("danger", "You're not registered.");
          navigation.navigate("CompleteProfile");
        }
      } catch (error: any) {
        showAlert("danger", `There was an error: ${error.message}`);
      }
      setIsLoading(!isLoading);
    }
  }, [
    handleUser,
    isLoading,
    isValid,
    login.phoneNumber,
    navigation,
    showAlert,
    userData,
    credential.verificationId,
    verify.code,
  ]);

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      phoneNumber: regex.phoneNumber.test(login.phoneNumber),
    }));
    setIsCodeValid((state) => ({
      ...state,
      code: regex.code.test(verify.code),
    }));
    if (!timer) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [login, setIsValid, timer, verify.code]);

  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{ zIndex: Z_INDEX }}>
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
              {t("login.title")}
            </Text>
          </Image>
        </Block>

        {/* login form */}
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
                  marginBottom={sizes.m}
                  keyboardType="numeric"
                  label={t("login.phoneNumber")}
                  disabled={alreadyRequested}
                  placeholder={t("login.phoneNumberPlaceholder")}
                  success={Boolean(login.phoneNumber && isValid.phoneNumber)}
                  danger={Boolean(login.phoneNumber && !isValid.phoneNumber)}
                  onChangeText={(value) => handleChange({ phoneNumber: value })}
                />
                <FirebaseRecaptchaVerifierModal
                  ref={recaptchaVerifier}
                  firebaseConfig={app.options}
                  attemptInvisibleVerification
                />
                <Button
                  onPress={handleVerification}
                  marginVertical={sizes.s}
                  outlined
                  primary
                  disabled={alreadyRequested}
                >
                  <Text
                    bold
                    color={isDark ? colors.white : colors.black}
                    transform="uppercase"
                  >
                    {alreadyRequested ? "" : t("login.requestCode")}
                    {alreadyRequested && timer}
                  </Text>
                </Button>
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t("login.code")}
                  keyboardType="numeric"
                  disabled={!alreadyRequested}
                  placeholder={t("login.codePlaceholder")}
                  success={Boolean(verify.code && isCodeValid.code)}
                  danger={Boolean(verify.code && !isCodeValid.code)}
                  onChangeText={(value) => handleChange({ code: value })}
                />
                <Button
                  onPress={handleSignIn}
                  marginVertical={sizes.s}
                  gradient={gradients.primary}
                  disabled={
                    Object.values(isCodeValid).includes(false) || isLoading
                  }
                >
                  <Text bold white transform="uppercase">
                    {isLoading ? "" : t("login.signin")}
                    {isLoading && <ActivityIndicator size={"small"} />}
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

export default Login;

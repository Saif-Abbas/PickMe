import React from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/core";

import { useTheme, useTranslation } from "../hooks";
import { Block, Button, Image, Text } from "../components";
const isAndroid = Platform.OS === "android";

const BecomeDriver = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const Z_INDEX = 0;
  const { assets, colors, sizes, gradients } = useTheme();

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
              {t("becomeDriver.title")}
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
                <Text h5 bold marginBottom={sizes.s}>
                  1. {t("becomeDriver.terms.introduction")}
                </Text>
                <Text
                  h5
                  marginBottom={sizes.s}
                  style={{ textAlign: "justify" }}
                >
                  {t("becomeDriver.terms.introductionText")}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  2. {t("becomeDriver.terms.intellectualPropertyRights")}
                </Text>
                <Text
                  h5
                  marginBottom={sizes.s}
                  style={{ textAlign: "justify" }}
                >
                  {t("becomeDriver.terms.intellectualPropertyRightsText")}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  3. {t("becomeDriver.terms.licenseToUseApplication")}
                </Text>
                <Text
                  h5
                  marginBottom={sizes.s}
                  style={{ textAlign: "justify" }}
                >
                  {t("becomeDriver.terms.licenseToUseApplicationText")}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  4. {t("becomeDriver.terms.acceptableUse")}
                </Text>
                <Text
                  h5
                  marginBottom={sizes.s}
                  style={{ textAlign: "justify" }}
                >
                  {t("becomeDriver.terms.acceptableUseText")}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  5. {t("becomeDriver.terms.userContent")}
                </Text>
                <Text
                  h5
                  marginBottom={sizes.s}
                  style={{ textAlign: "justify" }}
                >
                  {t("becomeDriver.terms.userContentText")}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  6. {t("becomeDriver.terms.indemnity")}
                </Text>
                <Text
                  h5
                  marginBottom={sizes.s}
                  style={{ textAlign: "justify" }}
                >
                  {t("becomeDriver.terms.indemnityText")}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  7. {t("becomeDriver.terms.breachesOfTheseTermsAndConditions")}
                </Text>
                <Text
                  h5
                  marginBottom={sizes.s}
                  style={{ textAlign: "justify" }}
                >
                  {t(
                    "becomeDriver.terms.breachesOfTheseTermsAndConditionsText"
                  )}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  8. {t("becomeDriver.terms.variation")}
                </Text>
                <Text
                  h5
                  marginBottom={sizes.s}
                  style={{ textAlign: "justify" }}
                >
                  {t("becomeDriver.terms.variationText")}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  9. {t("becomeDriver.terms.ourService")}
                </Text>
                <Text
                  h5
                  marginBottom={sizes.s}
                  style={{ textAlign: "justify" }}
                >
                  {t("becomeDriver.terms.ourServiceText")}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  10. {t("becomeDriver.terms.eligibility")}
                </Text>
                <Text
                  h5
                  marginBottom={sizes.s}
                  style={{ textAlign: "justify" }}
                >
                  {t("becomeDriver.terms.eligibilityText")}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  11. {t("becomeDriver.terms.clientObligations")}
                </Text>
                <Text
                  h5
                  marginBottom={sizes.s}
                  style={{ textAlign: "justify" }}
                >
                  {t("becomeDriver.terms.clientObligationsText")}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  12. {t("becomeDriver.terms.freelancerObligations")}
                </Text>
                <Text
                  h5
                  marginBottom={sizes.s}
                  style={{ textAlign: "justify" }}
                >
                  {t("becomeDriver.terms.freelancerObligationsText")}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  13. {t("becomeDriver.terms.disputeResolution")}
                </Text>
                <Text
                  h5
                  marginBottom={sizes.s}
                  style={{ textAlign: "justify" }}
                >
                  {t("becomeDriver.terms.disputeResolutionText")}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  14. {t("becomeDriver.terms.termination")}
                </Text>
                <Text
                  h5
                  marginBottom={sizes.s}
                  style={{ textAlign: "justify" }}
                >
                  {t("becomeDriver.terms.terminationText")}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  15. {t("becomeDriver.terms.liability")}
                </Text>
                <Text
                  h5
                  marginBottom={sizes.s}
                  style={{ textAlign: "justify" }}
                >
                  {t("becomeDriver.terms.liabilityText")}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  16. {t("becomeDriver.terms.governingLaw")}
                </Text>
                <Text
                  h5
                  marginBottom={sizes.s}
                  style={{ textAlign: "justify" }}
                >
                  {t("becomeDriver.terms.governingLawText")}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  17. {t("becomeDriver.terms.entireAgreement")}
                </Text>
                <Text
                  h5
                  marginBottom={sizes.s}
                  style={{ textAlign: "justify" }}
                >
                  {t("becomeDriver.terms.entireAgreementText")}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  © {t("becomeDriver.terms.ourDetailsText.companyName")}
                  {"\n"}
                  {t("becomeDriver.terms.ourDetailsText.registeredAddress")}
                </Text>
                <Text p marginBottom={sizes.s}>
                  {t("becomeDriver.terms.dateOfTerms")}
                </Text>
                <Button
                  onPress={() => {
                    navigation.navigate("CompleteDriverProfile");
                  }}
                  gradient={gradients.primary}
                >
                  <Text h5 white>
                    {t("becomeDriver.terms.submit")}
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default BecomeDriver;

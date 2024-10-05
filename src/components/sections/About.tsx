import { Text } from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";
import { Section } from "./Section";

export const About = () => {
  const { t } = useTranslation();
  return (
    <Section text={t("sections.about.name")} id="about">
      <Text>
        <Trans className="justify" i18nKey={"sections.about.text"} />
      </Text>
    </Section>
  );
};

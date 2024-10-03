import { Group, Text, Title } from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

export const About = () => {
  const { t } = useTranslation();
  return (
    <section id="about-me">
      <Group id="about-me-main">
        <Title order={3}>
          {"{ "}
          {t("sections.about.name")}
          {" }"}
        </Title>
        <Text>
          <Trans className="justify" i18nKey={"sections.about.text"} />
        </Text>
      </Group>
    </section>
  );
};

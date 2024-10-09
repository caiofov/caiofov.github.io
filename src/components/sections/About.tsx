import {
  Badge,
  ColorSwatch,
  Grid,
  GridCol,
  Group,
  Text,
  ThemeIcon,
  Timeline,
  Title,
} from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";
import { Section } from "./Section";
import {
  Icon,
  IconBrowser,
  IconDatabase,
  IconServer2,
} from "@tabler/icons-react";

import { typedEntries } from "../../utils/functions";

import { ABOUT_SECTIONS, SECTION_ICONS } from "../../utils/about";
const IconAbout: React.FC<{
  Icon: Icon;
  badges: string[];
  title: string;
  text: string;
  alignLeft: boolean;
}> = ({ Icon, title, text, badges, alignLeft }) => {
  const IconComponent = (
    <ThemeIcon size="xl" variant="transparent" c="inherit" radius="md">
      <Icon size="100" />
    </ThemeIcon>
  );
  const textAlign = alignLeft ? "left" : "right";

  const BodyComponent = (
    <Group w="47%" gap="xs" justify={!alignLeft ? "flex-end" : "flex-start"}>
      <Title style={{ fontSize: "1.8rem", textAlign }} order={4}>
        {title}
      </Title>
      <Text size="xl" style={{ textAlign }}>
        {text}
      </Text>
      <Group justify={!alignLeft ? "flex-end" : "flex-start"} gap="xs">
        {badges.map((b) => (
          <Badge key={b} variant="light">
            {b}
          </Badge>
        ))}
      </Group>
    </Group>
  );
  return (
    <Group
      w="80%"
      align="center"
      justify={alignLeft ? "flex-end" : "flex-start"}
    >
      {alignLeft ? (
        <>
          {IconComponent} {BodyComponent}
        </>
      ) : (
        <>
          {BodyComponent} {IconComponent}
        </>
      )}
    </Group>
  );
};

export const About = () => {
  const { t } = useTranslation();
  return (
    <Section text={t("sections.about.name")} id="about">
      <Group display="flex" justify="center">
        {typedEntries(ABOUT_SECTIONS).map(([section, skills], idx) => {
          return (
            <IconAbout
              Icon={SECTION_ICONS[section]}
              title={t(`sections.about.${section}.title`)}
              text={t(`sections.about.${section}.text`)}
              badges={skills}
              alignLeft={idx % 2 === 0}
              key={section}
            />
          );
        })}
      </Group>
    </Section>
  );
};

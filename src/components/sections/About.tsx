import {
  Badge,
  Group,
  Text,
  ThemeIcon,
  Title,
  useMatches,
} from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { Section } from "./Section";
import { Icon } from "@tabler/icons-react";

import { typedEntries } from "../../utils/functions";

import { ABOUT_SECTIONS, SECTION_ICONS } from "../../utils/about";

const ItemAboutMobile: React.FC<{
  Icon: Icon;
  badges: string[];
  title: string;
  text: string;
}> = ({ Icon, title, text, badges }) => {
  const [titleSize, textSize] = useMatches({
    sm: ["1.7rem", "xl"],
    base: ["1.6", "lg"],
  });
  return (
    <Group
      w="70%"
      align="center"
      justify="center"
      style={{ textAlign: "center", flexDirection: "column" }}
    >
      <ThemeIcon size="80" variant="transparent" c="inherit" radius="md">
        <Icon size="80" />
      </ThemeIcon>
      <Title style={{ fontSize: titleSize }} order={4}>
        {title}
      </Title>
      <Text size={textSize}>{text}</Text>
      <Group gap="xs" justify="center">
        {badges.map((b) => (
          <Badge key={b} variant="light">
            {b}
          </Badge>
        ))}
      </Group>
    </Group>
  );
};

const ItemAboutDesktop: React.FC<{
  Icon: Icon;
  badges: string[];
  title: string;
  text: string;
  alignLeft: boolean;
}> = ({ Icon, title, text, badges, alignLeft }) => {
  const IconComponent = (
    <ThemeIcon size="70" variant="transparent" c="inherit" radius="md">
      <Icon size="70" />
    </ThemeIcon>
  );
  const textAlign = alignLeft ? "left" : "right";

  const BodyComponent = (
    <Group w="45%" gap="xs" justify={!alignLeft ? "flex-end" : "flex-start"}>
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
  const isMobile = useMatches({ md: false, base: true });
  return (
    <Section text={t("sections.about.name")} id="about">
      <Group display="flex" justify="center" gap="xl">
        {typedEntries(ABOUT_SECTIONS).map(([section, skills], idx) => {
          return isMobile ? (
            <ItemAboutMobile
              Icon={SECTION_ICONS[section]}
              title={t(`sections.about.${section}.title`)}
              text={t(`sections.about.${section}.text`)}
              badges={skills}
              key={section}
            />
          ) : (
            <ItemAboutDesktop
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
